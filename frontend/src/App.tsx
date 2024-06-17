
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Landing } from './screens/Landing'
import { Chat } from './screens/Chat'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
