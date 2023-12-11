import React from 'react'
import BannerItem from './BannerItem'

const Banner = () => {
   return (
      <div className='bg-rounded p-4'>
         <div className='grid grid-cols-6 grid-rows-2 gap-3'>
            <BannerItem className='col-span-2 row-span-2' image='/image/panel/panel1.png' />
            <BannerItem image='/image/panel/panel2.png' />
            <BannerItem image='/image/panel/panel3.png' />
            <BannerItem image='/image/panel/panel4.png' />
            <BannerItem image='/image/panel/panel5.png' />
            <BannerItem image='/image/panel/panel6.png' />
            <BannerItem image='/image/panel/panel7.png' />
            <BannerItem image='/image/panel/panel8.png' />
            <BannerItem image='/image/panel/panel9.png' />
         </div>
      </div>
   )
}

export default Banner