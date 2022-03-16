import {FC} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import {Box, Container} from '@chakra-ui/react'
import Valute from './pages/Valute/Valute'

const App:FC = () => {
  return <Router>
    <Box w='full'>
      <Container maxW='container.lg'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:valute' element={<Valute />} />
        </Routes>
      </Container>
    </Box>
  </Router>
}

export default App
