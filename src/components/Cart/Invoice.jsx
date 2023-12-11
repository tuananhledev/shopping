import React, { useContext, useState } from 'react';
import { Form, Input, Button, message, Radio, Space } from 'antd';
import { AppContext } from '../../context/AppProvider';
import formatPrice, { totalPrice } from '../../utils/formatPrice';
import axiosInstance from '../../axios/axiosClient';

const Invoice = ({ data = [], onClose }) => {
   const { auth, carts, setCarts } = useContext(AppContext);
   const [loading, setLoading] = useState(false);

   const currentDate = new Date();

   const getProductData = (data = []) => {
      return data?.map((item) => item.id);
   };

   const handleSubmit = async ({ payment, address, phone }) => {
      try {
         const productIds = getProductData(data);
         setLoading(true);

         const totalAmount = (totalPrice(data) * 1.1).toFixed(0);

         const requestData = {
            userId: auth?.id,
            employeeId: '1',
            customerName: auth?.name,
            address: address,
            phone: phone,
            totalAmount: totalAmount,
            createDate: new Date(),
            orderType: 'Online',
            orderStatus: payment ? 'Đã xác nhận' : 'Chờ xác nhận',
            orderItems: data.map((item) => ({
               productId: item?.id,
               orderId: '',
               price: item?.price,
               quantity: item?.count,
            })),
            payment: {
               orderId: 'string',
               totalAmount: totalAmount,
               content: payment ? `Online - Momo - ${totalAmount}` : 'string',
               paymentMethod: payment ? 'Online' : 'string',
               status: payment ? 'Đã thanh toán' : 'Chưa thanh toán',
               createDate: new Date(),
            },
         };

         if (payment == true) {
            await axiosInstance.post('/Order/create', requestData);

            window.open(
               res?.data?.metadata?.payUrl,
               '_self',
               'noopener,noreferrer',
            );

            const res = await axiosInstance.post('/Payment/momo', {
               amount: totalAmount,
               redirectUrl: 'http://localhost:3000/user/purchase',
            });
         } else {
            await axiosInstance.post('/Order/create', requestData);
         }



         if (carts.length === data.length) {
            setCarts([]);
            localStorage.setItem('carts', JSON.stringify([]));
         } else {
            const newCart = carts.filter(
               (item) => !item.id.includes(productIds),
            );
            setCarts(newCart);
            localStorage.setItem('carts', JSON.stringify(newCart));
         }
         setLoading(false);
         message.success('Đặt hàng thành công');
         onClose();
      } catch (error) {
         console.log(error);
         setLoading(false);
         message.error('Đã có lỗi');
      }
   };


   return (
      <div className="w-[800px] bg-rounded py-10 pl-4 pr-1 relative">
         <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white shadow absolute top-0 right-0 translate-x-1/4 -translate-y-1/4"
         >
            <i className="fa-solid fa-xmark"></i>
         </button>
         <div className="max-h-[70vh] overflow-y-auto scroll-bar">
            <Form
               layout="vertical"
               className="pr-2 flex flex-col justify-between"
               onFinish={handleSubmit}
            >
               <div className="w-full">
                  {/* INFOR */}
                  <h2 className="text-center text-2xl font-bold">
                     Chi tiết đơn hàng
                  </h2>
                  <div className="my-2">
                     <Form.Item
                        name="payment"
                        label="Phương thức thanh toán"
                        rules={[
                           {
                              required: true,
                              message: 'Vui lòng chọn phương thức thanh toán!',
                           },
                        ]}
                     >
                        <Radio.Group>
                           <Space direction="vertical">
                              <Radio value={false}>
                                 Thanh toán khi nhận hàng
                              </Radio>
                              <Radio value={true}>Thanh toán momo</Radio>
                           </Space>
                        </Radio.Group>
                     </Form.Item>

                     <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[
                           {
                              required: true,
                              message: 'Vui lòng nhập địa chỉ!',
                           },
                        ]}
                        hasFeedback
                     >
                        <Input className="w-full" />
                     </Form.Item>
                     <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                           {
                              required: true,
                              message: 'Vui lòng nhập số điện thoại!',
                           },
                        ]}
                        hasFeedback
                     >
                        <Input className="w-full" />
                     </Form.Item>
                  </div>

                  {/* TABLE */}
                  <h3 className="text-base font-bold">Danh sách sản phẩm</h3>
                  <div className="mt-2">
                     <table className="table-auto border border-collapse w-full">
                        <thead>
                           <tr>
                              <th className="border px-4 py-2">Tên sản phẩm</th>
                              <th className="border px-4 py-2 text-center">
                                 Đơn giá
                              </th>
                              <th className="border px-4 py-2 w-1/6 text-center">
                                 Số lượng
                              </th>
                              <th className="border px-4 py-2 text-center">
                                 Thành tiền
                              </th>
                           </tr>
                        </thead>
                        <tbody className="text-sm">
                           {data.map((item) => (
                              <tr key={item?.id}>
                                 <td className="border px-4 py-2 max-w-xs">
                                    {item?.name}
                                 </td>
                                 <td className="border px-4 py-2 text-center">
                                    {formatPrice(item?.price)}
                                 </td>
                                 <td className="border px-4 py-2 w-1/6 text-center">
                                    {item?.count}
                                 </td>
                                 <td className="border px-4 py-2 text-center">
                                    {formatPrice(item?.price * item?.count)}
                                 </td>
                              </tr>
                           ))}
                           <tr>
                              <td className="px-4 py-2 text-center font-bold">
                                 Tổng tiền
                              </td>
                              <td className="px-4 py-2"></td>
                              <td className="px-4 py-2"></td>
                              <td className="px-4 py-2 text-center font-bold text-red-500">
                                 {formatPrice(totalPrice(data) * 1.1)}
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  {/* TABLE */}
                  <div className="flex justify-end my-3">
                     <div className="fy-center flex-col justify-end w-fit">
                        <h3 className="font-bold">Ngày đặt hàng</h3>
                        <div>
                           Ngày {currentDate.getDate()} tháng{' '}
                           {currentDate.getMonth() + 1} năm{' '}
                           {currentDate.getFullYear()}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="text-end">
                  <Button
                     loading={loading}
                     htmlType="submit"
                     type="primary"
                     danger
                     className="w-52 h-10"
                  >
                     Đặt hàng
                  </Button>
               </div>
            </Form>
         </div>
      </div>
   );
};

export default Invoice;
