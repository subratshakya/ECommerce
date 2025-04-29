import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, getCategories, getProductsByCategory } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RefreshCw, Shield, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();
  
  return (
    <div>
      <HeroSection />
      
      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-2 text-gray-600">Discover our handpicked selection of premium items</p>
            </div>
            <Link 
              to="/products" 
              className="mt-4 md:mt-0 flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View all products 
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Shop by Category */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="mt-2 text-gray-600">Browse our collections by category</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {
              const categoryProducts = getProductsByCategory(category);
              if (categoryProducts.length === 0) return null;
              
              const imageUrl = categoryProducts[0].images[0];
              
              return (
                <Link 
                  key={category}
                  to={`/products?category=${category}`}
                  className="group relative overflow-hidden rounded-lg shadow-md aspect-[4/3] transition-transform hover:scale-[1.02]"
                >
                  <img 
                    src={imageUrl} 
                    alt={category} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white capitalize">{category}</h3>
                      <p className="text-sm text-gray-200 mt-1">
                        {categoryProducts.length} products
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Why Shop With Us */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Shop With Us</h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              We strive to provide the best shopping experience for our customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free shipping on all orders over $50
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                30-day hassle-free return policy
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Multiple secure payment methods
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Shopping?</h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
            Join thousands of satisfied customers and experience our premium products and exceptional service.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center bg-white text-blue-700 px-6 py-3 rounded-md font-semibold text-lg transition-transform hover:scale-105 shadow-lg"
          >
            Explore All Products
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;