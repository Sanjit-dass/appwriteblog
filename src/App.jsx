import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet, useNavigate } from 'react-router-dom'
import { ThemeProvider } from './Context/Theme'

function App() {
  const [loading, setLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

    // Show popup after 5 minutes (300000ms)
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 200000)

    return () => clearTimeout(timer)
  }, [])

  const handleQuizRedirect = () => {
    setShowPopup(false)
    navigate('/quiz')
  }

  return !loading ? (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-cyan-500 via-teal-300 via-pink-600 via-slate-400 via-red-600 to-blue-600 dark:bg-gradient-to-r dark:from-slate-900 dark:via-gray-800 dark:to-black">
        <Header />

        <main className="flex-1 relative">
          <Outlet />

          {/* Popup */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">How are you feeling?</h2>
                <div className="flex justify-center gap-6 text-4xl mb-6">
                  <button>😃</button>
                  <button>😐</button>
                  <button>😞</button>
                </div>
                <button
                  onClick={handleQuizRedirect}
                  className="mt-2 px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Play Quiz
                </button>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  ) : null
}

export default App
