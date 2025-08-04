import React, { useState, useEffect } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi'
import { Themebtn } from '../index'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  // Set or remove 'dark' class on <html>
  // useEffect(() => {
  //   const html = document.documentElement
  //   if (isDarkMode) {
  //     html.classList.add('dark')
  //     localStorage.setItem('theme', 'dark')
  //   } else {
  //     html.classList.remove('dark')
  //     localStorage.setItem('theme', 'light')
  //   }
  // }, [isDarkMode])

  // const toggleTheme = () => setIsDarkMode(!isDarkMode)



  

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    {
      name:'Contact', slug:'./contact', active:authStatus
    },
    { name: 'Profile', slug: '/profile', active: authStatus },
    
  ]

  return (
    <header className='py-1 shadow bg-gradient-to-r from-blue-500 via-red-500 via-blue-400 to-pink-500 font-semibold text-xl z-50 sticky top-0 dark:bg-gradient-to-r dark:from-slate-900 dark:via-gray-800 dark:to-slate-950'>
      <Container>
        <nav className='flex items-center justify-between flex-wrap'>

          {/* Left Section: Logo + Toggle */}
         
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            {/* <button
              onClick={toggleTheme}
              className="text-white text-2xl bg-black bg-opacity-20 p-2 rounded-full hover:bg-opacity-30"
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button> */}
          <Themebtn/>
            

            {/* Logo */}
            <Link to='/'>
              <Logo width='60px' />
            </Link>
          </div>
         

          {/* Mobile Menu Toggle */}
          <button
            className='md:hidden text-white text-3xl focus:outline-none'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiMenu />
          </button>

          {/* Nav Items */}
          <ul
            className={`w-full md:w-auto md:flex items-center gap-2 mt-2 md:mt-0 transition-all duration-300 ${
              isMobileMenuOpen ? 'block' : 'hidden'
            } md:block`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setIsMobileMenuOpen(false)
                      }}
                      className='block px-6 py-2 text-black hover:bg-blue-100 rounded-full text-left w-full md:inline-block dark:text-white dark:hover:bg-gray-700'
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
