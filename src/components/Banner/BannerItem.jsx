import React from 'react'
import cx from 'classnames'

const BannerItem = ({ className, image }) => {
   return (
      <div className={cx('rounded-lg overflow-hidden border border-[#0000000d]', className)}>
         <img
            className='w-full h-full object-cover'
            // src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/99/d5/94/edb6354a01246aba206280ff072ff54b.png.webp"
            src={image}
            alt=""
         />
      </div >
   )
}

export default BannerItem