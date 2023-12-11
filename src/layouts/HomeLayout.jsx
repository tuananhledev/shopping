import React from 'react'
import { Outlet } from 'react-router-dom'
import Category from '../components/Category/Category'

const HomeLayout = () => {
   return (
      <section className='container mx-auto'>
         <div className='flex gap-5 py-4'>
            <Category />

            <Outlet />
         </div>
      </section>
   )
}

export default HomeLayout