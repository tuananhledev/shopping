import React, { useContext, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import axiosInstance from '../../../axios/axiosClient'
import { AppContext } from '../../../context/AppProvider'

const Login = ({ onClose, onChangeForm }) => {
   const { setAuth } = useContext(AppContext)
   const [loading, setLoading] = useState(false)

   const handleSubmit = async ({ username, password }) => {
      console.log(username, password);
      try {
         setLoading(true)
         const res = await axiosInstance.put('/User/login', {
            username, password
         })
         console.log(res);
         setAuth(res?.data?.metadata)
         localStorage.setItem('user', JSON.stringify(res?.data?.metadata))

         message.success('Đăng nhập thành công')
         setLoading(false)
         onClose()
      } catch (error) {
         console.log(error);
         setLoading(false)
         message.error('Tài khoản hoặc mật khẩu không đúng')
      }
   }

   return (
      <div className='bg-white rounded-lg w-[800px] flex relative'>
         <div className='w-[500px] p-10 mb-4'>
            <div>
               <h3 className='text-2xl font-semibold'>Xin chào,</h3>
               <p className='text-base'>Đăng nhập</p>
            </div>
            <Form className='mt-3' layout='vertical' onFinish={handleSubmit}>
               <Form.Item
                  name='username'
                  label="Tên đăng nhập"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập tên đăng nhập!',
                     }
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name='password'
                  label="Mật khẩu"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                     },
                  ]}
               >
                  <Input.Password />
               </Form.Item>
               <Button
                  type='primary'
                  danger
                  className='w-full h-10 mb-3'
                  htmlType='submit'
                  loading={loading}
               >
                  Đăng nhập
               </Button>
               <div
                  onClick={onChangeForm}
                  className='text-[#0d5cb6] text-sm text-center cursor-pointer select-none'
               >
                  Đăng ký
               </div>
            </Form>
         </div>

         <div className='w-[300px] rounded-e-lg f-center bg-gradient-to-br from-[#f0f8ff] to-[#dbeeff]'>
            <img
               className='w-[200px] object-cover'
               src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" alt=""
            />
         </div>

         <button
            onClick={onClose}
            className='w-10 h-10 rounded-full bg-white shadow absolute top-0 right-0 translate-x-1/4 -translate-y-1/4'
         >
            <i className="fa-solid fa-xmark"></i>
         </button>
      </div>
   )
}

export default Login