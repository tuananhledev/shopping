import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCarousel/ProductCard'
import { Button, Pagination, Select } from 'antd'
import Category from '../components/Category/Category'
import axiosInstance from '../axios/axiosClient'
import { useSearchParams } from 'react-router-dom'
import Loading from '../components/common/Loading'

const SearchPage = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const [products, setProducts] = useState([])
   const [sort, setSort] = useState('asc')
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchSearch = async () => {
         try {
            setLoading(true)
            const res = await axiosInstance.get('/ProductPortfolio/search', {
               params: {
                  query: searchParams.get('query'),
                  supplierName: searchParams.get('supplierName'),
                  categoryName: searchParams.get('categoryName'),
                  // pageNumber: searchParams.get('pageNumber') || 1,
                  // pageSize: searchParams.get('pageSize') || 12,
               }
            })
            setProducts(res?.data?.metadata)
            setLoading(false)
         } catch (error) {
            console.log(error);
            setLoading(false)
         }
      }

      fetchSearch()
   }, [searchParams])

   return (
      <div className='flex flex-col gap-4 w-[calc(100%-250px)]'>
         {loading ? <Loading /> : (<>
            <div className='bg-rounded p-4 fy-center justify-between'>
               <div className='f-center gap-2'>
                  <span className='text-sm'>Sắp xếp</span>
                  <Select
                     defaultValue={sort}
                     style={{
                        width: 140,
                     }}
                     onChange={(value) => setSort(value)}
                     options={[
                        {
                           value: 'asc',
                           label: 'Giá tăng',
                        },
                        {
                           value: 'desc',
                           label: 'Giá giảm',
                        },
                     ]}
                  />
               </div>
            </div>
            <div>
               {
                  products?.length > 0 ?
                     (
                        <div className='grid grid-cols-6 gap-2'>
                           {
                              products.sort((a, b) => sort === 'asc' ? b.price - a.price : a.price - b.price).map(item => (
                                 <ProductCard data={item} key={item?.id} />
                              ))
                           }
                        </div>
                     ) : (
                        <div className=' bg-rounded-md w-full px-5 py-10 f-center flex-col'>
                           <div className='w-[190px]'>
                              <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" alt="" />
                           </div>
                           <p className='mt-[15px] text-sm mb-[30px]'>Không tìm thấy sản phẩm</p>
                        </div>
                     )
               }
               {products.length > 0 && (<div className='mt-3 text-end'>
                  {/* <Button className='w-[240px!important]'>Xem thêm</Button> */}
               </div>)}
            </div>
         </>)}
      </div>
   )
}

export default SearchPage