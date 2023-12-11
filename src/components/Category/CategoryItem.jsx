import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ children, to = '/', src }) => {
   return (
      <li className='hover:bg-[#27272a1f] rounded-lg transition-all'>
         <Link to={to} className='fy-center py-[7px] px-4 text-sm'>
            {src && <div className='w-8 h-8 mr-2 flex-shrink-0'>
               <img
                  className='w-full h-full object-cover'
                  src={src}
                  alt=""
               />
            </div>}
            <span>{children}</span>
         </Link>
      </li>
   )
}

export default CategoryItem