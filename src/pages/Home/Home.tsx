import {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Box, Center, Spinner, Table, Tbody, Td, Th, Thead, Tooltip, Tr, useToast} from '@chakra-ui/react'
import axios from '../../utils/axios'
import {ValuteType} from '../../types/ValuteType'
import {AxiosError} from 'axios'
import PreviousValue from '../../components/PreviosValue/PreviousValue'

const Home: FC = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [valute, setValute] = useState<ValuteType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    async function fetchData() {
      try {
        const json = await axios('/daily_json.js')
        const result = Object.keys(json.data.Valute).map(key => json.data.Valute[key])
        setValute(result)
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

  const handlePush = (url: string) => navigate(url)

  return <Box w="full">
    {loading ? <Center w="full" h="100px">
        <Spinner/>
      </Center> :
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              Код валюты
            </Th>
            <Th>
              Стоимость в рублях (₽)
            </Th>
            <Th>
              Разница с прошлым днем (%)
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {valute.length !== 0 &&
            valute.map(val =>
              <Tooltip key={val.ID} label={val.Name}>
                <Tr transition="background-color 0.4s ease" _hover={{bg: 'blue.100'}}
                    onClick={() => handlePush(val.CharCode!)}>
                  <Td>{val.CharCode}</Td>
                  <Td>{val.Value} ₽</Td>
                  <Td>
                    <PreviousValue valute={val.Value!} previousValue={val.Previous!}/>
                  </Td>
                </Tr>
              </Tooltip>)}
        </Tbody>
      </Table>}
  </Box>
}

export default Home
