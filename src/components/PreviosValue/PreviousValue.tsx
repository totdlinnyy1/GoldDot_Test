import {FC} from 'react'
import {percentageDifference} from '../../utils/percentageDifference'
import {Text} from '@chakra-ui/react'

interface Props {
  valute: number
  previousValue: number
}

const PreviousValue:FC<Props> = ({valute, previousValue}) => {
  const percent = percentageDifference(valute, previousValue)
  return <Text color={percent.less ? 'red' : 'green'}>
    {percent.less ? '-' + percent.result + ' %' : percent.result + ' %'}
  </Text>
}

export default PreviousValue
