import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export const ProductContext = createContext({});
export const ProductProvider = ({ children }) => {
    async function getProducts() {
        return await api.get(`/products/all/${global.config.STORE_ID}`);
    }

    async function getProductById(id) {
        return await api.get(`/products/${id}`);
    }

    
    async function updateProductById(id) {
        return await api.put(`/products/${id}`);
    }

    async function deleteProductById(id) {
        return await api.delete(`/products/${id}`);
    }

    return (
        <ProductContext.Provider value={{ getProducts, getProductById, updateProductById, deleteProductById }}>
            {children}
        </ProductContext.Provider>
    );
};

export function useProduct() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within an ProductProvider.');
    }
    return context;
}

export default ProductContext;
