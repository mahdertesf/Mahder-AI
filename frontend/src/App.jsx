
import Nav from './components/Nav'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Apps from './pages/Apps'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import TransformerClassifier from './pages/TransformerClassifier'
import TrainModels from './pages/TrainModels'

function App() {


  return (
    <main className='flex bg-gray-100 mt-0'>
    <Router>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apps' element={<Apps/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>    
        <Route path='/login' element={<Login/>}/>  
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/apps/telegramhatespeech' element={<TransformerClassifier/>}/>
        <Route path='apps/trainmodels' element={<TrainModels/>}/>       

      </Routes>
    </Router>
    </main>
    
  )
}

export default App
