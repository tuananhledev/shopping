export default function processOrders(orderData = []) {
   const orderDict = {};

   orderData.forEach(order => {
      const orderId = order.id;

      if (!orderDict[orderId]) {
         orderDict[orderId] = { ...order };
         orderDict[orderId].orderItems = [];
      }

      order.orderItems.forEach(orderItem => {
         const productId = orderItem.productId;

         const existingItem = orderDict[orderId].orderItems.find(item => item.productId === productId);

         if (existingItem) {
            existingItem.quantity += 1;
         } else {
            orderDict[orderId].orderItems.push({
               ...orderItem,
               quantity: 1,
            });
         }
      });
   });

   const uniqueOrders = Object.values(orderDict);

   return uniqueOrders;
}