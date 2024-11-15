
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import Pagenotfound from './pages/Pagenotfound'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginResponseContext } from './context/Contextshare'



function App() {

  const {loginResponse}=useContext(loginResponseContext)

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={loginResponse?<Dashboard/>:<Pagenotfound/>}/>
      <Route path='/login' element={<Auth/>}/> 
      <Route path='/register' element={<Auth register={true}/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
      <Route path='/projects' element={loginResponse?<Projects/>:<Pagenotfound/>}/>

          </Routes>
          <Footer/>
    </>
  )
}

export default App
