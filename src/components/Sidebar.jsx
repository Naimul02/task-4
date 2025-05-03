import React, { useContext } from 'react'
import Search from './Search'
import Chats from './Chats'
import { AuthContext } from '../AuthProvider/AuthProvider'
import { RiLogoutCircleLine } from 'react-icons/ri'

export default function Sidebar() {
  const {user , logOut} = useContext(AuthContext);


  
  const handleLogout = () => {
    logOut()
    .then(() => {})
    .catch(() => {})

  }
  return (
    <div className='relative h-full'>
        <Search></Search>

        <Chats></Chats>
        <div className="dropdown dropdown-top dropdown-end absolute  bottom-3 w-full hidden lg:block">
  <div tabIndex={0} role="button" className="btn  flex items-center gap-2 px-4   border-t w-full">  <img src={user?.photoURL} className='w-10 h-10 rounded-full' alt="" />

<div>
  <p className="font-semibold">{user?.displayName}</p>
</div>⬆️</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-200 text-center   z-1 w-full px-2 shadow-sm">
    <li onClick={handleLogout} className='text-center font-semibold text-base'><a className='text-center'>Logout <RiLogoutCircleLine className='text-xl font-semibold' /></a></li>
    
  </ul>
</div>
        

    </div>
  )
}
