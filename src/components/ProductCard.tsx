import React from 'react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  
  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to product page
    addToCart(product, 1);
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 p-2">
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart size={20} className="text-gray-500 hover:text-red-500 transition-colors" />
          </button>
        </div>
        {product.discountPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            {product.discountPrice ? (
              <>
                <span className="text-lg font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <button 
            className={`flex items-center justify-center p-2 rounded-full ${
              isInCart(product.id) 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;