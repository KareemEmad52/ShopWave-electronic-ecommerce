import React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function AdminPanel() {
  return (<>
  <div className='flex flex-col md:flex-row'>
    <div className='h-[60vh] md:h-[90vh]'>
    <Sidebar />
    </div>
    <Outlet />
    </div>
  </>
  )
}

export default AdminPanel