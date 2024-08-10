import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../components/common/LoadingSpinner';

const AuthLayout = () => {

  const { data: authUser, isLoading } = useAuth();

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className='w-full'>
       { authUser ? <Navigate to={"/"} />  :  <Outlet /> }
    </div>
  )
}

export default AuthLayout