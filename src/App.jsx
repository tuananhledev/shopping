import React from 'react'
import { Route, Routes } from 'react-router-dom'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import DefaultLayout from './layouts/DefaultLayout'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import CartPage from './pages/CartPage'
import SearchPage from './pages/SearchPage'
import PurchasePage from './pages/PurchasePage';
import HomeLayout from './layouts/HomeLayout';
import ProfileLayout from './layouts/ProfileLayout';
import ProfilePage from './pages/ProfilePage';

const App = () => {
   return (
      <DefaultLayout>
         <Routes>
            <Route path='/' element={<HomeLayout />} >
               <Route path='/' element={<HomePage />} />
               <Route path='/search' element={<SearchPage />} />
            </Route>
            <Route path='/products/:id' element={<ProductDetailPage />} />
            <Route path='/cart' element={<CartPage />} />

            <Route path='/' element={<ProfileLayout />}>
               <Route path='/user/profile' element={<ProfilePage />} />
               <Route path='/user/purchase' element={<PurchasePage />} />
            </Route>

            <Route path='*' element={<NotFoundPage />} />
         </Routes>
      </DefaultLayout>
   )
}

export default App