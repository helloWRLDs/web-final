import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import LoginComponent from './components/LoginComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element= {<LoginComponent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
