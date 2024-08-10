import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import RightPanel from '../components/common/RightPanel'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const MainLayout = () => {

  const queryClient = useQueryClient();
  const { data: userData } = useQuery({queryKey: ["authUser"]})
	const authUser = userData?.data;


  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ["authUser"]});
  }, [queryClient])

  return (
    <div className='flex w-full'>
        <Sidebar />
         { !authUser 
         ? <Navigate to={"/signin"} replace={true} /> 
         : (
          <div className="w-full">
            <Outlet />
          </div>
         ) }
         <RightPanel />
    </div>
  )
}

export default MainLayout