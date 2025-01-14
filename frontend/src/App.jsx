
import Nav from './components/Nav'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Apps from './pages/Apps'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {


  return (
    <>
    <Router>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apps' element={<Apps/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>       

      </Routes>
    </Router>
    
    </>
  )
}

export default App
