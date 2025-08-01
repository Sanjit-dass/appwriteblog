import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 border border-t-2 border-t-black bg-gradient-to-r from-gray-300 via-pink-200 via-blue-300 to-stone-500 dark:bg-gradient-to-r dark:from-slate-900 dark:via-gray-800 dark:to-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div className='mb-9 font-bold text-2xl rounded-lg p-2'>
                <h1 className='bg-gradient-to-r from-red-500 via-green-700 via-pink-500 via-red-500 to-pink-500 text-transparent bg-clip-text'>Post Vault</h1>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  &copy; 2025 Sanjit Das. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500 dark:text-gray-300">
                Company
              </h3>
              <ul>
                {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item, index) => (
                  <li key={index} className="mb-4 last:mb-0">
                    <Link className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300" to="/">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500 dark:text-gray-300">
                Support
              </h3>
              <ul>
                {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item, index) => (
                  <li key={index} className="mb-4 last:mb-0">
                    <Link className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300" to="/">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legals */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500 dark:text-gray-300">
                Legals
              </h3>
              <ul>
                {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item, index) => (
                  <li key={index} className="mb-4 last:mb-0">
                    <Link className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300" to="/">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer
