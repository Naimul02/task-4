import React, { useContext } from 'react'
import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'
import { IoMdMenu } from "react-icons/io";
import { RiLogoutCircleLine } from 'react-icons/ri';
import { AuthContext } from '../../AuthProvider/AuthProvider';

export default function Home() {
  const {user , logOut} = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
    .then(() => {})
    .catch(() => {})
  }
  
  return (
    <div>
        <div className="container flex h-screen flex-col lg:flex-row lg:pl-10">
          <div>
         <div className='bg-base-200 w-full py-2 px-4  flex justify-between lg:hidden'>
             {/* You can open the modal using document.getElementById('ID').showModal() method */}
<div>
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}><IoMdMenu /></button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box ">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div className='max-h-[500px]  overflow-y-auto lg:hidden'>
      

    <Sidebar></Sidebar>
    </div>
  </div>
</dialog>
</div>


  <div className="dropdown dropdown-bottom dropdown-end ">
  <div tabIndex={0} role="button" className="btn  flex items-center gap-2 px-4   border-t w-full">  <img src={user?.photoURL} className='w-10 h-10 rounded-full' alt="" />

<div>
  <p className="font-semibold">{user?.displayName}</p>
</div>⬆️</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-200 text-center   z-1 w-full px-2 shadow-sm">
    <li onClick={handleLogout} className='text-center font-semibold text-base'><a className='text-center'>Logout <RiLogoutCircleLine className='text-xl font-semibold' /></a></li>
    
  </ul>
</div>
         </div>

<div>
    
</div>
          </div>
          <div className='w-[25%] hidden lg:block'>
          <Sidebar></Sidebar>
          </div>
          <div className='w-[100%] lg:w-[75%] h-full bg-base-200'>
          <Chat></Chat>
          </div>
        </div>
    </div>
  )
}
