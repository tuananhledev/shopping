const formatPrice = (price) => {
   return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

export const totalPrice = (arr = []) => {
   let total = 0;
   arr.forEach(value => {
      total += value.count * value.price
   })

   return total
}


export default formatPrice