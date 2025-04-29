import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 800 800">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path fill="none" stroke="currentColor" strokeWidth="1" d="M0 20h40M20 0v40"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Shop Smarter, <br />
              <span className="text-blue-300">Live Better</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-xl">
              Discover our curated collection of premium products designed to enhance your lifestyle.
              Enjoy free shipping, easy returns, and outstanding customer service.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-white text-blue-800 px-6 py-3 rounded-md font-semibold text-lg transition-transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/featured"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold text-lg transition-colors hover:bg-white hover:bg-opacity-10"
              >
                Explore Featured
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="Customer" />
                <img className="w-8 h-8 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="Customer" />
                <img className="w-8 h-8 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="Customer" />
              </div>
              <div className="text-sm text-blue-100">
                <span className="font-semibold">5,000+</span> happy customers
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-20 blur-3xl"></div>
            <img 
              src="https://images.pexels.com/photos/5709639/pexels-photo-5709639.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Shopping Experience" 
              className="relative rounded-lg shadow-2xl transform hover:-translate-y-2 transition-transform duration-300"
            />
            <div className="absolute -left-8 bottom-12 w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;