

import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/login/LoginPage'
import SignupPage from './pages/auth/signup/SignupPage'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RigthPanel'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner'



function App() {

  //text-5xl text-red-500 bg-blue-300
  //flex max-w-6xl mx-auto
  const {data:authUser,isLoading}= useQuery({
    queryKey:['authUser'],
    queryFn: async()=>{
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if(!res.ok) throw new Error(data.error || "Something went wrong");
        
        console.log("authUser is here: ",data)
        return data
      } catch (error) {
        throw new Error(error);
        
      }
    },
    retry:false
  })

  if(isLoading){
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg'></LoadingSpinner>
      </div>
    )
  }

  console.log("authUser is here:",authUser)

  return (
    <div className='flex max-w-6xl mx-auto'>

      {authUser && <Sidebar/>}
      <Routes>
   
				<Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/"/>} />
        <Route path='/notifications' element={authUser ? <NotificationPage/> : <Navigate to="/login"/>} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
			</Routes>
     
      {authUser && <RightPanel/>}  
      
      
      <Toaster></Toaster>
    </div>
  )
}

export default App