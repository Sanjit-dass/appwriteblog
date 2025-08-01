import React from 'react'

function Container({children}) {
  return (
    <div className='mx-auto w-full px-4 max-w-7xl dark:bg-gradient-to-r dark:from-slate-900 dark:via-gray-800 dark:to-black'>{children}</div>
  )
}

export default Container