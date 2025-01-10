import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { RecoilRoot } from "recoil";
// import Home from './pages/home';
// import SignUp from './pages/signup';
// import BlogEditor from './pages/write';
// import Dashboard from './pages/dashboard';
// import SignIn from './pages/signin';
// import WaitingPage from './pages/verifyEmail';
// import Profile from './pages/profile';

const SignUp = lazy(() => import('./pages/signup'));
const Home = lazy(() => import('./pages/home'));
const Blog = lazy(() => import('./pages/blog'));
const SignIn = lazy(() => import('./pages/signin'));
const WaitingPage = lazy(() => import('./pages/verifyEmail'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const BlogEditor = lazy(() => import('./pages/write'));

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Suspense fallback={<div className='w-[98vw] h-[98vh] flex justify-center items-center'>
          <BarLoader></BarLoader>
        </div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/verifyemail' element={<WaitingPage />} />
            <Route path='/write' element={<BlogEditor />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/asdfgh' element={<div />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
