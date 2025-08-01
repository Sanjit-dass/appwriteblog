import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './Context/Theme'
 

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))

        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <ThemeProvider>
      <div className="   min-h-screen flex flex-col justify-between bg-gradient-to-r from-cyan-500 via-teal-300 via-pink-600 via-slate-400 via-red-600 to-blue-600  dark:bg-gradient-to-r dark:from-slate-900 dark:via-gray-800 dark:to-black">
        <Header />
       
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  ) : null
}

export default App