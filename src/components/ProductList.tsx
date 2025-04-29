import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { getCategories } from '../data/products';
import { ListFilter, Search } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  searchQuery?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, searchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activePriceFilter, setActivePriceFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = ['all', ...getCategories()];
  
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: '$200 - $500', value: '200-500' },
    { label: 'Over $500', value: '500-9999' }
  ];
  
  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest', value: 'newest' }
  ];
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (localSearchQuery) {
      const searchLower = localSearchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply category filter
    if (activeCategoryFilter !== 'all') {
      result = result.filter(product => product.category === activeCategoryFilter);
    }
    
    // Apply price filter
    if (activePriceFilter !== 'all') {
      const [min, max] = activePriceFilter.split('-').map(Number);
      result = result.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= min && price <= max;
      });
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        // Featured items first, then sort by newest
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }
    
    setFilteredProducts(result);
  }, [products, localSearchQuery, activeCategoryFilter, activePriceFilter, sortOption]);
  
  // Update local search when prop changes
  useEffect(() => {
    if (searchQuery !== undefined) {
      setLocalSearchQuery(searchQuery);
    }
  }, [searchQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Just update the local search state, the useEffect will handle filtering
  };
  
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
        </h2>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </form>
          
          <div className="relative z-10">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <ListFilter size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar - desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="space-y-2 mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategoryFilter(category)}
                  className={`block w-full text-left px-2 py-1.5 rounded-md capitalize ${
                    activeCategoryFilter === category 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <h3 className="font-semibold text-lg mb-4">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map(range => (
                <button
                  key={range.value}
                  onClick={() => setActivePriceFilter(range.value)}
                  className={`block w-full text-left px-2 py-1.5 rounded-md ${
                    activePriceFilter === range.value
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile filter drawer */}
        {isFilterOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsFilterOpen(false)}></div>
            <div className="relative w-80 max-w-[80%] bg-white h-full overflow-y-auto shadow-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2 mb-6">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategoryFilter(category);
                      setIsFilterOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-1.5 rounded-md capitalize ${
                      activeCategoryFilter === category 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <h3 className="font-semibold text-lg mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <button
                    key={range.value}
                    onClick={() => {
                      setActivePriceFilter(range.value);
                      setIsFilterOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-1.5 rounded-md ${
                      activePriceFilter === range.value
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Product grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600">No products found matching your criteria.</p>
              <button 
                onClick={() => {
                  setLocalSearchQuery('');
                  setActiveCategoryFilter('all');
                  setActivePriceFilter('all');
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;