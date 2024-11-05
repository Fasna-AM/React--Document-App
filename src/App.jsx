
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Edit from './pages/Edit'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id/edit' element={<Edit/>}/>
      </Routes>
    </>
  )
}

export default App
