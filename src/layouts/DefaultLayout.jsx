import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

const DefaultLayout = ({ children }) => {
   return (
      <main className='font-inter'>
         <Header />
         <div className='bg-[#f5f5fa] min-h-screen'>
            {children}
         </div>
         {/* <Footer /> */}
      </main>
   )
}

export default DefaultLayout