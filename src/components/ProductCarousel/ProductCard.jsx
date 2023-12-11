import React from 'react'
import { Link } from 'react-router-dom'
import formatPrice from '../../utils/formatPrice'

const ProductCard = ({ data }) => {
   return (
      <div
         className='bg-white border border-[#ebebf0] rounded-lg overflow-hidden hover:shadow-lg flex flex-col h-full'
      >
         <Link to={`/products/${data?.id}`}>
            <div className='w-full h-[138px]'>
               <img
                  className='w-full h-full object-cover'
                  // src="https://salt.tikicdn.com/cache/280x280/ts/product/55/05/0e/c228a5145616db3b97ad51ee94a1f524.jpg.webp"
                  src={data?.image}
                  alt=""
               />
            </div>
         </Link>
         <div className='flex flex-col gap-2 px-2 pt-2'>
            <div className='h-5'>
               <img
                  className='w-ful h-full object-cover'
                  src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png"
                  alt=""
               />
            </div>
            <Link to={`/products/${data?.id}`}>
               <h3 className='text-truncate-2 text-xs text-[#27272a]'>
                  {/* Smart Tivi Samsung HD 32 inch 32T4202 - Model 2022 asdasd */}
                  {data?.name}
               </h3>
            </Link>

         </div>
         <div className='mt-auto'>
            <div className='flex flex-col gap-2 px-2 p-2 '>
               <div className='text-xs text-[#ffc400]'>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
               </div>
               <div className="text-base font-medium">
                  {/* 5.850.000<sup>₫</sup> */}
                  {formatPrice(data?.price)}
               </div>
            </div>
            <div className='mx-2 py-2 text-xs text-[#808089] border-t border-[#ebebf0] flex gap-1'>
               <div className='w-[30px] h-[15px]'>
                  <img
                     className='w-full h-full object-cover'
                     src="https://salt.tikicdn.com/ts/tka/7f/d3/02/47399a13bffceb9cb81179252bfc5fc1.png"
                     alt="tikipro"
                  />
               </div>
               <span>Hẹn giờ giao lắp</span>
            </div>
         </div>
      </div>
   )
}

export default ProductCard