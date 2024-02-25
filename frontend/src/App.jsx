import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import LoginComponent from './components/LoginComponent'
import { HeaderComponent, FooterComponent } from './components/StaticComponents'
import RegisterComponent from './components/RegisterComponent'
import MainComponent from './components/MainComponent'
import { UserProvider } from './context/UserContext'
import UserComponent from './components/UserComponent'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <UserProvider>
        <HeaderComponent />
          <Routes>
            <Route path='/login' element= {< LoginComponent />}/>
            <Route path='/register' element = {< RegisterComponent />} />
            <Route path='/' element= {< MainComponent />} />
            <Route path='/users/:id' element= {< UserComponent />} />
          </Routes>
        <FooterComponent />
      </UserProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
