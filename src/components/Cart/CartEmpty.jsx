import React from 'react'
import Button from '../common/Button'


const CartEmpty = () => {
   return (
      <div className=' bg-rounded-md w-full px-5 py-10 f-center flex-col'>
         <div className='w-[190px]'>
            <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" alt="" />
         </div>
         <p className='mt-[15px] text-sm mb-[30px]'>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
         <Button className='w-[240px!important]'>Tiếp tục mua sắm</Button>
      </div>
   )
}

export default CartEmpty