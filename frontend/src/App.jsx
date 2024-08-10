import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import SignInPage from "./pages/auth/signin/SignInPage"
import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"
import { useQuery } from "@tanstack/react-query"
import apiClient from "./api"
import LoadingSpinner from "./components/common/LoadingSpinner"


function App() {

  const { data, isPending, isError, error  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => await apiClient.getLoggedInUser(),
    retry: false,
  });


  if(isPending) {
    return <LoadingSpinner />
  }


  return (
    <>
    <div className='flex max-w-6xl mx-auto'>

      <Routes>

        <Route>
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile/:username' element={<ProfilePage />} />
            <Route path='/notifications' element={<NotificationPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
          </Route>

          <Route path="*" element={<Navigate to={"/"} />} />

        </Route>


			</Routes>
    </div>
    </>
  )
}

export default App
