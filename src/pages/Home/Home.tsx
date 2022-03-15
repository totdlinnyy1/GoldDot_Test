import {FC, useEffect, useState} from 'react'
import {Box, Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import axios from '../../utils/axios'
import {ValuteType} from '../../types/ValuteType'
import {AxiosError} from 'axios'
import PreviousValue from '../../components/PreviosValue/PreviousValue'

const Home: FC = () => {
  const [valute, setValute] = useState<ValuteType[]>([])
  useEffect(() => {
    async function fetchData() {
      try {
        const json = await axios('/daily_json.js')
        const result = Object.keys(json.data.Valute).map(key => json.data.Valute[key])
        setValute(result)
      } catch (e) {
        const error = e as Error | AxiosError
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  return <Box w='full'>
    <Table>
      <Thead>
        <Tr>
          <Th>
            Код валюты
          </Th>
          <Th>
            Стоимость в рублях
          </Th>
          <Th>
            Разница с прошлым днем (%)
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {valute.length &&
        valute.map(val =>
        <Tr key={val.ID} transition="background-color 0.4s ease" _hover={{bg: 'blue.100'}}>
          <Td>{val.CharCode}</Td>
          <Td>{val.Value}</Td>
          <Td>
            <PreviousValue valute={val.Value} previousValue={val.Previous} />
          </Td>
        </Tr>)}
      </Tbody>
    </Table>
  </Box>
}

export default Home
