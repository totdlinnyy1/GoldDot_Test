import {FC, useEffect, useState} from 'react'
import {Box, Center, Heading, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useToast} from '@chakra-ui/react'
import axios from '../../utils/axios'
import {useLocation, useNavigate} from 'react-router-dom'
import {ValuteType} from '../../types/ValuteType'
import {deleteSlash} from '../../utils/deleteSlash'
import {AxiosError} from 'axios'
import {format} from 'date-fns'
import {valuteFindTimes} from '../../constants/constants'
import {getPreviousDate} from '../../utils/getPreviousDate'

const Valute: FC = () => {
  const toast = useToast()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [valute, setValute] = useState<ValuteType[]>([])

  const getDateValute = async (date: string) => {
    try {
      const json = await axios(`https://www.cbr-xml-daily.ru/archive/${date}/daily_json.js`)
      Object.keys(json.data.Valute).forEach(key => {
        if (json.data.Valute[key].CharCode === deleteSlash(pathname)) {
          Object.assign(json.data.Valute[key], {exist: true})
          setValute(oldValue => [...oldValue, json.data.Valute[key]])
          return
        }
      })
    } catch (e) {
      const valute: ValuteType = {exist: false}
      setValute(oldValue => [...oldValue, valute])
    }
  }

  useEffect(() => {
    async function fetchData() {
      let result: boolean = false
      try {
        const json = await axios('/daily_json.js')
        Object.keys(json.data.Valute).forEach(key => {
          if (json.data.Valute[key].CharCode === deleteSlash(pathname)) {
            result = true
            return setValute(oldValue => [...oldValue, json.data.Valute[key]])
          }
        })

        if (result) {
          for (let i = 1; i <= valuteFindTimes; i++) {
            const newDate = getPreviousDate(i + 33)
            setTimeout(async () => await getDateValute(format(newDate, 'yyyy/MM/dd')), 200)
          }
        } else navigate('/')
        setLoading(false)
      } catch (e) {
        const error = e as Error | AxiosError
        toast({
          title: error.message,
          status: 'error',
          position: 'bottom'
        })
      }
    }

    fetchData()
  }, [])
  return <Box w="full">
    {valute.length !== 0 &&
      <Box>
        <Heading as="h2" size="lg">
          {valute[0].Name} ({valute[0].CharCode})
        </Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Курс (₽)</Th>
              <Th>Дата</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {valute[0] && <Td>{valute[0].Value} ₽</Td>}
              <Td>{format(new Date(), 'dd.MM.yyyy')}</Td>
            </Tr>
            {valute.map((val, key) => {
              if (key > 0) {
                return <Tr key={key}>
                  <Td>{val.exist ? val.Value + ' ₽' : <Text color='red'>Невозможно получить курс из-за политики cors</Text>}</Td>
                  <Td>{format(getPreviousDate(key + 33), 'dd.MM.yyyy')}</Td>
                </Tr>
              }
            })}
          </Tbody>
        </Table>
      </Box>}
    {loading && <Center w="full" h="100px">
      <Spinner/>
    </Center>}
  </Box>
}

export default Valute
