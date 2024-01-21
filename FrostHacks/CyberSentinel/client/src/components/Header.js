import React from 'react'

const Header = ({title}) => {
  return (
    <header className="mt-4"> 
      <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
              <span className="self-center text-3xl font-semibold whitespace-nowrap text-[#F8F8F8]">{title}</span>
          </a>
          <div className="w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-white hover:text-gray-900 rounded hover:bg-gray-100">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-white hover:text-gray-900 rounded hover:bg-gray-100">Check</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-white hover:text-gray-900 rounded hover:bg-gray-100">Scan</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-white hover:text-gray-900 rounded hover:bg-gray-100">Discover</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-white hover:text-gray-900 rounded hover:bg-gray-100">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
