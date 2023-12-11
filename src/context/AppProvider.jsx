import { message } from "antd";
import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
   const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem('user')) || null)
   const [carts, setCarts] = useState(() => JSON.parse(localStorage.getItem('carts')) || [])

   const logout = () => {
      setAuth(null)
      localStorage.removeItem('user')
      message.success('Đăng xuất thành công')
   }

   return (
      <AppContext.Provider value={{ auth, logout, setAuth, carts, setCarts }}>
         {children}
      </AppContext.Provider>
   )
}

export default AppProvider