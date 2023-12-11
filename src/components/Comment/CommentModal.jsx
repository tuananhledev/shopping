import React, { useContext, useState } from 'react'
import { Divider, Form, Rate, Input, Button, message } from 'antd'
import formatPrice from '../../utils/formatPrice';
import axiosInstance from '../../axios/axiosClient';
import { AppContext } from '../../context/AppProvider';

const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

const CommentModal = ({ data, onClose = () => { } }) => {
   const { auth } = useContext(AppContext);
   const [value, setValue] = useState(3);
   const [loading, setLoading] = useState(false)

   const handleSubmit = async ({ content }) => {
      try {
         setLoading(true)
         await axiosInstance.post('/Evaluate/create', {
            productPortfolioId: data?.productId,
            userId: auth?.id,
            content: content,
            star: value
         })
         message.success('Đánh giá sản phẩm thành công');
         setLoading(false)
         onClose();
      } catch (error) {
         message.error('Đã có lỗi')
         setLoading(false)
      }
   }

   return (
      <div className='w-[600px] bg-rounded p-4 pt-10 relative'>
         <button
            onClick={onClose}
            className='w-10 h-10 rounded-full bg-white shadow absolute top-0 right-0 translate-x-1/4 -translate-y-1/4'
         >
            <i className="fa-solid fa-xmark"></i>
         </button>
         <div className='max-h-[80vh] overflow-scroll -mr-4'>
            <div className='pr-2'>
               <h2 className='text-2xl font-bold'>Đánh giá sản phẩm</h2>
               <div className='mt-4'>
                  <div className='flex gap-[10px]'>
                     <div className='w-16 h-16 flex-shrink-0 rounded overflow-hidden'>
                        <img
                           className='w-full h-full object-cover'
                           src={data?.productImage}
                           alt=''
                        />
                     </div>
                     <div className='flex flex-col gap-2'>
                        <p className='text-truncate-2 leading-tight'>{data?.productName}</p>
                        <h4 className='font-bold'>Giá: {formatPrice(data?.price)}</h4>
                     </div>
                  </div>
                  <Divider className='my-3' />
                  <Form layout='vertical' onFinish={handleSubmit}>
                     <Form.Item label="Chất lượng sản phẩm" className='mb-2' required>
                        <div className='fy-center gap-2'>
                           <Rate allowClear={false} tooltips={desc} onChange={setValue} value={value} />
                           {value ? <span className="font-semibold text-[#ffc400]">{desc[value - 1]}</span> : ''}
                        </div>
                     </Form.Item>
                     <Form.Item
                        label='Bình luận'
                        name='content'
                        rules={[{
                           required: true,
                           message: 'Vui lòng nhập nội dung đánh giá!'
                        }]}
                     >
                        <Input.TextArea rows={4} placeholder="maxLength is 6" />
                     </Form.Item>
                     <Form.Item className='text-end'>
                        <Button loading={loading} htmlType='submit' type="primary" danger>Hoàn thành</Button>
                     </Form.Item>
                  </Form>
               </div>
            </div>
         </div>
      </div >
   )
}

export default CommentModal