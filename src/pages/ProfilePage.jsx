import React, { useContext } from 'react'
import { Avatar, Button, Col, DatePicker, Form, Input, Row, Select, message } from 'antd'
import { AppContext } from '../context/AppProvider'

const ProfilePage = () => {
   const { auth } = useContext(AppContext)

   return (
      <div className='bg-rounded p-4 w-full'>
         <div className='max-w-[800px] mx-auto flex gap-5'>
            <Avatar
               size={120}
               icon={<img src={auth?.image} alt='' />}
            />
            <div className='flex-1'>
               <Form layout='vertical'>
                  <Form.Item name='name' label="Họ tên" initialValue={auth?.name}>
                     <Input disabled />
                  </Form.Item>
                  <Form.Item name='email' label="Email" initialValue={auth?.email}>
                     <Input disabled />
                  </Form.Item>
                  <Form.Item name='phone' label="Điện thoại" initialValue={auth?.phone}>
                     <Input disabled />
                  </Form.Item>
                  <Row gutter={[12, 12]}>
                     <Col span={12}>
                        <Form.Item name='dayOfBirth' label="Ngày sinh" initialValue={auth?.dayOfBirth}>
                           <DatePicker className='w-full' disabled />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item name='gender' initialValue='male' label="Giới tính">
                           <Select
                              options={[
                                 { value: 'male', label: 'Nam' },
                                 { value: 'female', label: 'Nữ' },
                              ]}
                              disabled
                           />
                        </Form.Item>
                     </Col>
                  </Row>
                  <Form.Item name='address' label="Địa chỉ" initialValue={auth?.address}>
                     <Input disabled />
                  </Form.Item>
                  <Form.Item className='text-end'>
                     <Button
                        type='primary'
                        danger
                        onClick={() => {
                           message.warning('Tinh năng này đang phát triển')
                        }}
                     >
                        Chỉnh sửa
                     </Button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div >
   )
}

export default ProfilePage