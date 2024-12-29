import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup'
import Home from './pages/home'
import Blog from './pages/blog'
import SignIn from './pages/signin'
import { RecoilRoot} from "recoil"
import WaitingPage from './pages/verifyEmail'
import Dashboard from './pages/dashboard'
import { WriteEditor } from './components/write-editor'
import Profile from './pages/profile'

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
      <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/blog' element={<Blog></Blog>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}  ></Route>      
          <Route path='/signin' element={<SignIn></SignIn>}  ></Route>
          <Route path='/verifyemail' element={<WaitingPage></WaitingPage>}></Route>
          <Route path='/write' element={<WriteEditor></WriteEditor>}></Route>
          <Route path='/profile/:id' element={<Profile></Profile>}></Route>
          <Route path='*' element={<Home></Home>}></Route>
      </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
