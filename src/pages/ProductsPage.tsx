import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { products } from '../data/products';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery('');
    }
  }, [location.search]);

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="mt-2 text-gray-600">
            Browse our collection of premium products
          </p>
        </div>
        
        <ProductList products={products} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ProductsPage;