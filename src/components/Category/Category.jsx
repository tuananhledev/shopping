import React, { useEffect, useState } from 'react'
import CategoryItem from './CategoryItem'
import axiosInstance from '../../axios/axiosClient'

const Category = () => {
   const [categories, setCategories] = useState([])

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const res = await axiosInstance.get('/Category/get-all')
            setCategories(res?.data?.metadata)
         } catch (error) {
            console.log(error);
         }
      }

      fetchCategories();
   }, [])

   return (
      <div className='h-fit w-[230px] px-2 py-3 bg-rounded sticky top-4'>
         <h3 className='mb-2 pl-4 text-sm font-bold'>Danh mục</h3>
         <ul>
            {
               categories.map(item => (
                  <CategoryItem
                     to={`/search?categoryName=${item?.id}`}
                     key={item?.id}
                     src='https://salt.tikicdn.com/ts/upload/41/28/7d/4713aa0d2855c5c770799f248692f0c5.png'
                  >
                     {item?.name}
                  </CategoryItem>
               ))
            }
         </ul>
      </div >
   )
}

export default Category