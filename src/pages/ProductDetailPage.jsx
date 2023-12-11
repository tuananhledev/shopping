import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel';
import axiosInstance from '../axios/axiosClient';
import formatPrice from '../utils/formatPrice';
import Comment from '../components/Comment/Comment';
import { AppContext } from '../context/AppProvider';
import { Rate, message } from 'antd';

const ProductDetailPage = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const [product, setProduct] = useState({});
   const [productCarousel, setProductCarousel] = useState([]);
   const [evaluate, setEvaluate] = useState([]);
   const [quantity, setQuantity] = useState(1);

   const { carts, setCarts } = useContext(AppContext);

   const handleChange = (e) => {
      const value = e.target.value;

      // Kiểm tra xem giá trị nhập vào có phải là số nguyên không
      if (/^\d*$/.test(value)) {
         // Nếu là số nguyên, cập nhật state
         setQuantity(value);
      }
   };

   const handleChangeQuantity = (type) => {
      if (type === -1) {
         setQuantity(quantity - 1);
      } else if (type === 1) {
         setQuantity(quantity + 1);
      }
   };

   const handleAddToCart = () => {
      if (product?.quantity === 0) {
         message.warning('Sản phẩm đã hết hàng');
         return;
      }

      const isExistIndex = carts.findIndex((item) => item.id === product.id);
      if (isExistIndex !== -1) {
         // Sản phẩm đã tồn tại trong giỏ hàng
         const updatedCarts = [...carts];

         // console.log(updatedCarts[isExistIndex].count, product.quantity);
         if (updatedCarts[isExistIndex].count === product.quantity) {
            message.warning('Bạn đã thêm đủ số lượng trong giỏ hàng');
            return;
         }

         updatedCarts[isExistIndex].count += parseInt(quantity);
         localStorage.setItem('carts', JSON.stringify(updatedCarts));
         setCarts(updatedCarts);
         message.success('Cập nhật giỏ hàng thành công');
      } else {
         // Sản phẩm chưa tồn tại trong giỏ hàng
         const newData = [...carts, { ...product, count: quantity }];
         localStorage.setItem('carts', JSON.stringify(newData));
         setCarts(newData);
         message.success('Thêm thành công');
      }
   };

   const handleBuyNow = () => {
      handleAddToCart();
      navigate('/cart');
   };

   useEffect(() => {
      const fetchCarousel = async (categoryId) => {
         try {
            const res = await axiosInstance.get(
               `/ProductPortfolio/suggest?categoryId=${categoryId}`,
            );
            setProductCarousel(res?.data?.metadata);
         } catch (error) {
            console.log(error);
         }
      };
      const fetchProduct = async () => {
         const res = await axiosInstance.get(`ProductPortfolio/${id}`);
         fetchCarousel(res?.data?.metadata?.categoryId);
         setProduct(res?.data?.metadata);
      };

      fetchProduct();
   }, [id]);

   useEffect(() => {
      const fetchEvaluate = async () => {
         const res = await axiosInstance.get(
            `/Evaluate/ProductPortfolio/${id}`,
         );
         setEvaluate(res?.data?.metadata);
      };
      fetchEvaluate();
   }, [id]);

   return (
      <section className="container mx-auto">
         <div className="flex gap-5 py-4">
            <div className="w-[calc(100%-380px)] flex flex-col gap-3">
               {/* LEFT */}
               <div className="flex gap-5">
                  {/* Image  */}
                  <div className="sticky top-4 bg-rounded p-4 w-[400px] h-fit">
                     <div className="rounded-lg overflow-hidden">
                        <img
                           className="w-full h-full object-cover"
                           src={product?.image}
                           alt=""
                        />
                     </div>
                  </div>

                  {/* Detail  */}
                  <div className="w-[calc(100%-420px)] flex flex-col gap-3">
                     <div className="bg-rounded p-4">
                        <div className="flex flex-col gap-1">
                           <div className="fy-center gap-1">
                              <div className="h-5 w-fit">
                                 <img
                                    className="w-full h-full object-cover"
                                    src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                                    alt="tikipro"
                                 />
                              </div>
                              <span className="ml-1 text-sm font-normal">
                                 Thương hiệu: {product?.supplierName}
                              </span>
                           </div>

                           <h1 className="text-xl font-semibold text-truncate-2">
                              {/* Smart Tivi Coocaa HD 32 inch 32S3U */}
                              {product?.name}
                           </h1>

                           <div className="fy-center gap-2 text-sm">
                              {product?.star <= 0 ? (
                                 <span>Chưa có đánh giá</span>
                              ) : (
                                 <>
                                    <span className="">
                                       {Number.parseFloat(
                                          product?.star,
                                       ).toFixed(1)}
                                    </span>
                                    <Rate
                                       disabled
                                       allowHalf
                                       value={product?.star}
                                       className="text-base leading-none"
                                    />
                                 </>
                              )}
                              <div className="h-3 w-[1px] bg-[#c7c7c7]" />
                              <span className="text-[#787878]">
                                 {/* Đã bán 269 */}
                                 Còn {product?.quantity} sản phẩm
                              </span>
                           </div>
                        </div>

                        <div className="fy-center mt-[6px]">
                           <div className="text-2xl font-semibold">
                              {formatPrice(product?.price)}
                           </div>
                           <div className="ml-2 text-xs text-[#27272a] bg-[#f5f5fa] rounded p-1">
                              -5%
                           </div>
                        </div>
                     </div>

                     <div className="bg-rounded p-4">
                        <h3 className="font-semibold text-base">
                           Mô tả sản phẩm
                        </h3>
                        <p className="text-justify leading-normal mt-3">
                           {product?.description}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Comment */}
               <div>
                  <div className="bg-rounded p-4">
                     <h3 className="font-semibold text-base">Bình luận</h3>
                     <Comment data={evaluate} />
                  </div>
               </div>
            </div>

            {/* RIGHT */}
            <div className="w-[360px]">
               <div className="sticky top-4 bg-rounded p-4 flex flex-col gap-4">
                  <div>
                     <h3 className="font-semibold text-sm mb-2">Số lượng</h3>

                     <div className="fy-center gap-1">
                        <button
                           disabled={quantity <= 1}
                           onClick={() => handleChangeQuantity(-1)}
                           className="w-8 h-8 rounded border border-[#ececec] hover:bg-[#ececec] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                           <i className="fa-solid fa-minus"></i>
                        </button>

                        <input
                           value={product?.quantity === 0 ? 0 : quantity}
                           onChange={handleChange}
                           type="text"
                           className="outline-none w-10 h-8 px-[2px] py-[1px] rounded border border-[#ececec] text-sm text-center focus:border-[#66afed] focus:shadow"
                        />

                        <button
                           disabled={quantity >= product?.quantity}
                           onClick={() => handleChangeQuantity(1)}
                           className="w-8 h-8 rounded border border-[#ececec] hover:bg-[#ececec] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                           <i className="fa-solid fa-plus"></i>
                        </button>
                     </div>
                  </div>

                  <div>
                     <h3 className="font-semibold text-base mb-2">Tạm tính</h3>
                     <div className="font-semibold text-2xl">
                        {formatPrice(product?.price * quantity)}
                     </div>
                  </div>

                  <div>
                     <Button onClick={handleBuyNow} className="mb-2" primary>
                        Mua ngay
                     </Button>
                     <Button onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                     </Button>
                  </div>
               </div>
            </div>
         </div>

         {/* Selling products */}
         {productCarousel.length >= 8 && (
            <ProductCarousel
               slidesToShow={7}
               data={productCarousel}
               title="Sản phẩm bán chạy"
            />
         )}
      </section>
   );
};

export default ProductDetailPage;
