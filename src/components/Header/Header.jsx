import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container  from '../container/Container'
import  LogoutBtn from './LogoutBtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-slate-800 text-white rounded-xl'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <h1 className='font-bold text-2xl pl-2'>Logo</h1>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block md:px-4 sm:px-3 lg:px-6 py-2 duration-200 hover:bg-black rounded-full px-4'
                // className='inline-block py-2'
                >{item.name}</button>
              </li>
            ) : null
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
