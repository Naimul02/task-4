import React from 'react'
import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'

export default function Home() {
  return (
    <div>
        <div className="container flex items-center gap-10 border">
          <div className='flex-1 border'>
          <Sidebar></Sidebar>
          </div>
          <div className='flex-2 border'>
          <Chat></Chat>
          </div>
        </div>
    </div>
  )
}
