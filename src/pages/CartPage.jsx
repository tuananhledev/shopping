import React, { useContext, useState } from 'react'
import { Table, message, Button } from 'antd'
import Modal from '../components/common/Modal';
import CartEmpty from '../components/Cart/CartEmpty';
import Invoice from '../components/Cart/Invoice';
import { Link } from 'react-router-dom';
import formatPrice, { totalPrice } from '../utils/formatPrice';
import { AppContext } from '../context/AppProvider';

const CartPage = () => {
   const [isEmpty] = useState(false)
   const [showModal, setShowModal] = useState(false);
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const [selectedRows, setSelectedRows] = useState([]);

   const { carts, setCarts, auth } = useContext(AppContext)

   const columns = [
      {
         title: 'Tên sản phẩm',
         render: (_, record) => (
            <div className='flex gap-[10px]'>
               <div className='w-16 h-16 flex-shrink-0'>
                  <img
                     className='w-full h-full object-cover'
                     src={record?.image}
                     alt=''
                  />
               </div>
               <Link to={`/products/${record?.id}`}>
                  <p className='text-truncate-2'>{record?.name}</p>
               </Link>
            </div>
         ),
         width: '40%',
      },
      {
         title: 'Đơn giá',
         dataIndex: 'price',
         render: (text) => formatPrice(text)
      },
      {
         title: 'Số lượng',
         dataIndex: 'count',
         render: (text, record) => {
            return (
               <Quantity record={record} />
            )
         }
      },
      {
         title: 'Thành tiền',
         render: (_, record) => formatPrice(record.price * record.count)
      },
      {
         title: () => {
            return (
               <button>
                  <i className="fa-solid fa-trash-can"></i>
               </button>
            )
         },
         dataIndex: 'trash',
         render: (_, record) => {
            return (
               <button onClick={() => {
                  const newCarts = carts.filter(item => item.id !== record.id)
                  setCarts(newCarts)
                  localStorage.setItem('carts', JSON.stringify(newCarts))
               }}>
                  <i className="fa-solid fa-trash-can"></i>
               </button>
            )
         }
      }
   ];

   const onSelectChange = (newSelectedRowKeys, selectedRow) => {
      setSelectedRows(selectedRow)
      setSelectedRowKeys(newSelectedRowKeys);
   };

   const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
   };

   const handleCloseModal = () => {
      setShowModal(false)
      setSelectedRows([])
   }

   return (
      <section className='w-[1280px] px-[15px] pb-10 mx-auto'>
         <h2 className='uppercase text-xl font-medium py-5'>Giỏ hàng</h2>
         {isEmpty ? <CartEmpty /> : (
            <div className='flex gap-5'>
               <div className='w-[calc(100%-330px)]'>
                  <div className='bg-rounded-md p-3'>
                     <Table
                        rowKey='id'
                        pagination={false}
                        columns={columns}
                        dataSource={carts}
                        rowSelection={rowSelection}
                     />
                  </div>
               </div>

               <div className='w-[310px]'>
                  <div className='sticky top-4 text-sm text-[#333333]'>
                     <div className='bg-rounded-md px-5 py-4 flex flex-col'>
                        <div className='flex justify-between'>
                           <span>Tổng tiền</span>
                           <div className='flex flex-col items-end'>
                              <span className='text-2xl text-[#fe3834]'>{formatPrice(totalPrice(selectedRows) * 1.1)}</span>
                              <span className='text-xs mt-[3px] font-light'>(Đã bao gồm VAT nếu có)</span>
                           </div>
                        </div>
                     </div>

                     <Button
                        type='primary'
                        className='mt-2 w-full h-10'
                        danger
                        disabled={selectedRowKeys.length <= 0}
                        onClick={() => {
                           if (auth === null) {
                              message.warning('Vui lòng đăng nhập');
                              return;
                           }
                           if (selectedRowKeys.length > 0)
                              setShowModal(true)
                        }}
                     >
                        Mua hàng
                     </Button>

                     <Modal isOpen={showModal} onClose={handleCloseModal}>
                        <Invoice onClose={handleCloseModal} data={selectedRows} />
                     </Modal>
                  </div>
               </div>
            </div>
         )}
      </section>
   )
}

const Quantity = ({ record }) => {
   const { carts, setCarts } = useContext(AppContext)

   const [quantityRow, setQuantityRow] = useState(record?.count || 1)
   const handleChange = (e) => {
      const value = e.target.value;

      // Kiểm tra xem giá trị nhập vào có phải là số nguyên không
      if (/^\d*$/.test(value)) {
         // Nếu là số nguyên, cập nhật state
         setQuantityRow(value);
         const newCarts = carts.map(item => {
            if (record.id === item.id) {
               return { ...item, count: value };
            }
            return item;
         });

         setCarts(newCarts)
         localStorage.setItem('carts', JSON.stringify(newCarts))
      }
   }

   const handleChangeInput = (type) => {
      if (type === -1) {
         const newCart = carts.map(item => {
            if (record.id === item.id) {
               return { ...item, count: +quantityRow - 1 };
            }
            return item;
         });

         setCarts(newCart)
         localStorage.setItem('carts', JSON.stringify(newCart))

         quantityRow > 1 && setQuantityRow(+quantityRow - 1)
      }
      else if (type === 1) {
         const newCart = carts.map(item => {
            if (record.id === item.id) {
               return { ...item, count: +quantityRow + 1 };
            }
            return item;
         });

         setCarts(newCart)
         localStorage.setItem('carts', JSON.stringify(newCart))

         quantityRow < record.quantity && setQuantityRow(+quantityRow + 1)
      }
   }

   return (
      <div className='fy-center'>
         <button
            disabled={quantityRow <= 1}
            onClick={() => handleChangeInput(-1)}
            className='w-6 h-6 rounded-s border border-[#ececec] hover:bg-[#ececec] disabled:cursor-not-allowed'
         >
            <i className="fa-solid fa-minus"></i>
         </button>

         <input
            value={quantityRow}
            onChange={handleChange}
            type="text"
            className='outline-none w-8 h-6 px-[2px] py-[1px] border-y border-[#ececec] text-sm text-center focus:border-[#66afed] focus:shadow'
         />
         <button
            disabled={quantityRow >= record.quantity}
            onClick={() => handleChangeInput(1)}
            className='w-6 h-6 rounded-e border border-[#ececec] hover:bg-[#ececec] disabled:cursor-not-allowed'
         >
            <i className="fa-solid fa-plus"></i>
         </button>
      </div>
   )
}



export default CartPage