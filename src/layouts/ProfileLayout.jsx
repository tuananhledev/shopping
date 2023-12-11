import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import CategoryItem from '../components/Category/CategoryItem'
import { AppContext } from '../context/AppProvider'

const ProfileLayout = () => {
   const { auth } = useContext(AppContext)
   if (!auth) {
      return <Navigate to='/' replace />
   }
   return (
      <section className='container mx-auto'>
         <div className='flex gap-5 py-4'>
            <div className='h-fit w-[230px] px-2 py-3 bg-rounded sticky top-4'>
               <h3 className='mb-2 pl-4 text-sm font-bold'>Danh mục</h3>
               <ul>
                  <CategoryItem
                     to='/user/profile'

                     src='https://salt.tikicdn.com/ts/upload/41/28/7d/4713aa0d2855c5c770799f248692f0c5.png'
                  >
                     Thông tin tài khoản
                  </CategoryItem>
                  <CategoryItem
                     to='/user/purchase'

                     src='https://salt.tikicdn.com/ts/upload/41/28/7d/4713aa0d2855c5c770799f248692f0c5.png'
                  >
                     Quản lý đơn hàng
                  </CategoryItem>
               </ul>
            </div >

            <div className='flex flex-col gap-4 w-[calc(100%-250px)]'>
               <Outlet />
            </div>
         </div>
      </section>
   )
}

export default ProfileLayout