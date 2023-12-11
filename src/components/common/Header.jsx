import React, { useContext, useState } from 'react'
import { ButtonCart, ButtonLink } from './Button'
import { Link, useNavigate } from 'react-router-dom'
import Modal from './Modal';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { AppContext } from '../../context/AppProvider';

const Header = () => {
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState('');
   const [showModal, setShowModal] = useState(false);
   const [isLogin, setIsLogin] = useState(true)

   const { auth, logout, carts } = useContext(AppContext)

   const handleSubmit = e => {
      e.preventDefault();

      searchQuery && navigate(`/search?query=${searchQuery}`)
   }

   return (
      <div className='container mx-auto py-2 fy-center justify-between gap-36'>
         <Link to='/' className='w-[72px] h-[72px]'>
            <img className='w-full h-full object-cover' src="/image/logo.png" alt="" />
         </Link>

         <div className='flex flex-1'>
            <div className='flex-1'>
               <form onSubmit={handleSubmit} className='fy-center border border-[#dddde3] rounded-lg text-sm'>
                  <img className='w-5 h-5 ml-4' src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png" alt="" />

                  <input
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     type="text"
                     placeholder='Tìm kiếm sản phẩm'
                     className='flex-1 outline-none px-2 border-r border-[#dddde3]'
                  />

                  <button
                     type='submit'
                     className='w-[92px] h-[38px] p-1 bg-transparent text-[#0a68ff] hover:bg-[#0060ff1f]'
                  >
                     Tìm kiếm
                  </button>
               </form>
            </div>

            <div className='fy-center justify-end ml-12'>
               <ButtonLink
                  to='/'
                  leftIcon={
                     <img
                        className='w-6 h-6 mr-1 object-cover'
                        src="https://salt.tikicdn.com/ts/upload/32/56/db/d919a4fea46f498b5f4708986d82009d.png"
                        alt=""
                     />
                  }
               >
                  Trang chủ
               </ButtonLink>
               {
                  auth ? (
                     <div className='relative group/drop'>
                        <ButtonLink
                           leftIcon={
                              <img
                                 className='w-6 h-6 mr-1 object-cover'
                                 src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                                 alt=""
                              />
                           }
                        >
                           {auth ? auth.name : 'Tài khoản'}
                        </ButtonLink>
                        <div
                           className='w-60 flex-col absolute top-[38px] left-0 -translate-x-1/2 bg-rounded shadow-list py-[10px] text-[#27272a] group-hover/drop:flex hidden transition-all ease-linear z-50'
                        >
                           <Link
                              to='/user/profile'
                              className='py-2 px-4 text-sm hover:bg-[#27272a1f] transition-all ease-linear'
                           >
                              Thông tin tài khoản
                           </Link>

                           <Link
                              to='/user/purchase'
                              className='py-2 px-4 text-sm hover:bg-[#27272a1f] transition-all ease-linear'
                           >
                              Đơn hàng của tôi
                           </Link>

                           <button
                              onClick={() => {
                                 logout()
                                 navigate('/')
                              }}
                              className='py-2 px-4 text-sm text-start hover:bg-[#27272a1f] transition-all ease-linear'
                           >
                              Đăng xuất
                           </button>
                        </div>
                     </div>
                  ) : (
                     <>
                        <ButtonLink
                           onClick={() => setShowModal(true)}
                           leftIcon={
                              <img
                                 className='w-6 h-6 mr-1 object-cover'
                                 src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                                 alt=""
                              />
                           }
                        >
                           Tài khoản
                        </ButtonLink>

                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                           {
                              isLogin ?
                                 <Login onClose={() => setShowModal(false)} onChangeForm={() => setIsLogin(false)} /> :
                                 <Register onClose={() => setShowModal(false)} onChangeForm={() => setIsLogin(true)} />
                           }
                        </Modal>
                     </>
                  )
               }

               <div className='h-5 w-[2px] mx-1 bg-[#ebebf0] rounded-sm' />

               <ButtonCart count={carts?.length || 0} />
            </div>
         </div>
      </div>
   )
}

export default Header