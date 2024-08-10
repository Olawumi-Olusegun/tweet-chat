import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import RightPanel from '../components/common/RightPanel'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../components/common/LoadingSpinner'

const ProtectedLayout = () => {

  const { data: authUser, isLoading, } = useAuth();
  
    if(isLoading) {
      return <LoadingSpinner />
    }

  return (
    <div className='flex w-full'>
        <Sidebar />
         { !authUser
         ? <Navigate to={"/signin"} replace={true} /> 
         : <div className="w-full"> <Outlet /> </div> }
         <RightPanel />
    </div>
  )
}

export default ProtectedLayout