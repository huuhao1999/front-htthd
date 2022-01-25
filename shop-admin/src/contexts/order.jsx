import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);

  async function fetchOrder() {
    const response = await api.get('/orders/all-of-store/1');
    return response;
  }

  async function validateOrder(id) {
    const response = await api.put(`/orders/validate-order/${id}`);
    return response;
  };

  return (
    <OrderContext.Provider value={{ fetchOrder, validateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider.');
  }
  return context;
}

export default OrderContext;
