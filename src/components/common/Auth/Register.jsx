import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import axiosInstance from '../../../axios/axiosClient';

const Register = ({ onClose, onChangeForm }) => {
   const [loading, setLoading] = useState(false)

   const handleSubmit = async ({ name, email, username, password }) => {
      try {
         setLoading(true)
         await axiosInstance.post('/User/register', {
            name, email, username, password
         })
         message.success('Đăng ký thành công!')
         setLoading(false)
         onChangeForm()
      } catch (error) {
         message.error('Đã có lỗi!')
         setLoading(false)
         console.log({ error });
      }
   }

   return (
      <div className='bg-white rounded-lg w-[800px] flex relative'>
         <div className='w-[500px] p-10 mb-4'>
            <div>
               <h3 className='text-2xl font-semibold'>Xin chào,</h3>
               <p className='text-base'>Tạo tài khoản</p>
            </div>
            <Form className='mt-3' layout='vertical' onFinish={handleSubmit}>
               <Form.Item
                  name='name'
                  label="Họ tên"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập họ tên!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name='email'
                  label="Email"
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập email!',
                     },
                     {
                        type: 'email',
                        message: 'Vui lòng nhập đúng email!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
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
               <Form.Item
                  name='confirm'
                  label="Nhâp lại mật khẩu"
                  dependencies={['password']}
                  rules={[
                     {
                        required: true,
                        message: 'Vui lòng nhập lại mật khẩu!',
                     },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(new Error('Nhập lại mật khẩu không đúng!'));
                        },
                     }),
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
                  Đăng ký
               </Button>
               <div
                  onClick={onChangeForm}
                  className='text-[#0d5cb6] text-sm text-center cursor-pointer select-none'
               >
                  Đăng nhập
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

export default Register