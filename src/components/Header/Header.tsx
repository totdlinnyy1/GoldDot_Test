import {FC} from 'react'
import {Box, Heading} from '@chakra-ui/react'

const Header:FC = () => {
  return <Box w='full' h='24' display='flex' alignItems='center'>
    <Heading as='h2' size='2xl'>
      Курсы валют на текущий день
    </Heading>
  </Box>
}

export default Header
