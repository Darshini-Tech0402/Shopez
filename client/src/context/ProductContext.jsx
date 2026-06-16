import React, { createContext, useContext, useState } from 'react';
import { products as allProductsData, categories as allCategoriesData } from '../data/products';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products] = useState(allProductsData);
  const [categories] = useState(allCategoriesData);

  const getProductById = (id) => products.find(p => p.id === parseInt(id));
  const getProductsByCategory = (cat) => products.filter(p => p.category === cat);
  const searchProducts = (query) => products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ProductContext.Provider value={{ products, categories, getProductById, getProductsByCategory, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used inside ProductProvider');
  return context;
}