import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import MainHome from './components/MainHome'
import HotelPage from './components/HotelPage'
import UseScrollToTop from './components/useScrollToTop'
import { useAuth } from './contexts/auth'
import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify'
import SignUp from './components/SignUp/SignUp'

const App = () => {

  return (
    <>
      <Header />

      <main className='w-full md:max-w-[90vw] sm:w-[98vw] sm:text-center mx-auto'>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<MainHome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/hotels/:hotel' element={<HotelPage />} />

        </Routes>
        <div className='flex justify-end sticky bottom-10 right-5'>
          <UseScrollToTop />
        </div>
      </main>

    </>
  )
}

export default App;
