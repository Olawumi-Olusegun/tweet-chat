import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import SignInPage from "./pages/auth/signin/SignInPage"
import AuthLayout from "./layouts/AuthLayout"
import ProtectedLayout from "./layouts/ProtectedLayout"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from "./pages/profile/ProfilePage"



function App() {
  return (
    <>
    <div className='flex max-w-6xl mx-auto'>

      <Routes>

        <Route>
          <Route path='/'>
            
            <Route element={<ProtectedLayout />}>
              <Route index element={<HomePage />} />
              <Route path='/profile/:username' element={<ProfilePage />} />
              <Route path='/notifications' element={<NotificationPage />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path='/signin' element={<SignInPage />} />
              <Route path='/signup' element={<SignUpPage />} />
            </Route>

            <Route path="*" element={<Navigate to={"/"} />} />

          </Route>

        </Route>


			</Routes>
    </div>
    </>
  )
}

export default App
