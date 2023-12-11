import React, { useEffect, useState } from 'react'
import Category from '../components/Category/Category'
import Banner from '../components/Banner/Banner'
import ProductCarousel from '../components/ProductCarousel/ProductCarousel'
import ProductCard from '../components/ProductCarousel/ProductCard'
import Button from '../components/common/Button'
import axiosInstance from '../axios/axiosClient'

const HomePage = () => {
   const [products, setProducts] = useState([])
   const [productCarousel, setProductCarousel] = useState([])
   const [pagination, setPagination] = useState({
      currentPage: 1,
      totalPage: 8,
      currentEntry: 12
   })

   useEffect(() => {
      const fetchCarousel = async (pageNumber) => {
         try {
            const res = await axiosInstance.get(`/ProductPortfolio/get-all?pageNumber=${pageNumber}&pageSize=12`)
            setProductCarousel(res?.data?.metadata)
         } catch (error) {
            console.log(error);
         }
      }
      const fetchProduct = async () => {
         try {
            const res = await axiosInstance.get('/ProductPortfolio/get-all?pageNumber=1&pageSize=12')

            setProducts(res?.data?.metadata)

            setPagination(res?.data?.pagination)

            if (productCarousel <= 0) {
               const random = Math.floor(Math.random() * res?.data?.pagination?.totalPage)
               fetchCarousel(random === 0 ? 1 : random)
            }
         } catch (error) {
            console.log(error);
         }
      }

      fetchProduct()
   }, [productCarousel])

   const handleLoadMore = async () => {
      try {
         if (pagination.currentPage === pagination.totalPage) return;
         const res = await axiosInstance.get(`/ProductPortfolio/get-all?pageNumber=${pagination.currentPage + 1}&pageSize=12`)
         setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })
         setProducts(prev => [...prev, ...res?.data?.metadata])
      } catch (error) {

      }
   }

   return (
      <div className='flex flex-col gap-4 w-[calc(100%-250px)]'>
         {/* Banner */}
         <Banner />

         {/* Selling products */}
         <ProductCarousel data={productCarousel} title='Sản phẩm bán chạy' />

         {/* Suggestion */}

         <div className='bg-rounded p-4 flex flex-col gap-3'>
            <h3 className='font-semibold text-base'>Gợi ý cho bạn</h3>
            <div className='grid grid-cols-6 gap-2'>
               {
                  products.map(item => (
                     <ProductCard data={item} key={item?.id} />
                  ))
               }
            </div>
            <div className='mt-3 text-center'>
               {
                  pagination.currentPage !== pagination.totalPage &&
                  <Button
                     className='w-[240px!important]'
                     onClick={handleLoadMore}
                  >
                     Xem thêm
                  </Button>
               }
            </div>
         </div>
      </div>
   )
}

export default HomePage