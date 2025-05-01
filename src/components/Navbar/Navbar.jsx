import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider/AuthProvider'

export default function Navbar() {
  const {user, logOut} = useContext(AuthContext);
  console.log("navbar" , user)


  const handleLogout = () => {
    logOut()
    .then(() => {})
    .catch(() => {})

  }
  return (
    <div>
        <div className="navbar bg-base-100 shadow-sm flex">
  <a className="btn btn-ghost text-xl">daisyUI</a>

  <div className='gap-4'>
    
    <Link to={'/register'}>Register</Link>
    {
      user ? <div className='flex items-center gap-4'>
<img className='w-12 h-12 rounded-full' src={user?.photoURL} alt="" />
<span>{user?.displayName}</span>
<button className='btn'onClick={handleLogout}>Logout</button>
      </div>  : <Link to={'/login'}>Login</Link>
    
    }
  </div>
</div>

    </div>
  )
}
