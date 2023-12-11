export default function formatDate(inputDateTime) {
   const date = new Date(inputDateTime);
   const day = date.getDate();
   const month = date.getMonth() + 1;
   const year = date.getFullYear();

   // Đảm bảo rằng ngày và tháng có dạng 'dd' và 'mm'
   const formattedDay = day < 10 ? `0${day}` : day;
   const formattedMonth = month < 10 ? `0${month}` : month;

   // Tạo chuỗi định dạng 'dd/mm/yyyy'
   return `${formattedDay}/${formattedMonth}/${year}`;
}