import React, { useRef } from 'react'
import Slider from 'react-slick';
import ProductCard from './ProductCard'

const ProductCarousel = ({ data = [], title = '', slidesToShow = 6 }) => {
   const slickRef = useRef()

   let settings = {
      infinite: true,
      slidesToShow: slidesToShow,
      slidesToScroll: 4,
      dots: false,
      arrows: false,
   };
   return (
      <div className='bg-rounded p-4 flex flex-col gap-3 w-full'>
         <h3 className='font-semibold text-base'>{title}</h3>

         <div className='relative'>
            <Slider ref={slickRef} {...settings} className='rounded-lg overflow-hidden'>
               {
                  data.map(item => (
                     <ProductCard data={item} key={item?.id} />
                  ))
               }
            </Slider>
            <button
               onClick={() => slickRef?.current.slickPrev()}
               className='w-7 h-7 rounded-full bg-white shadow-md absolute inset-y-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-20 select-none'
            >
               <i className="fa-solid fa-chevron-left" />
            </button>
            <button
               onClick={() => slickRef?.current.slickNext()}
               className='w-7 h-7 rounded-full bg-white shadow-md absolute inset-y-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-20 select-none'
            >
               <i className="fa-solid fa-chevron-right" />
            </button>
         </div>
      </div>
   )
}

export default ProductCarousel