import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup'
import Home from './pages/home'
import Blog from './pages/blog'
import SignIn from './pages/signin'
import { RecoilRoot } from "recoil"

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
      <Routes>
          <Route path='/' element={<Home></Home>}></Route>      
          <Route path='/signup' element={<SignUp></SignUp>}  ></Route>      
          <Route path='/blog' element={<Blog></Blog>}  ></Route>      
          <Route path='/signin' element={<SignIn></SignIn>}  ></Route>      
      </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
