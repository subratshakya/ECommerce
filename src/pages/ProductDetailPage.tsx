import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../data/products';
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Truck, ArrowLeft, Plus, Minus } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart } = useCart();
  
  if (!productId) {
    return <Navigate to="/products" replace />;
  }
  
  const product = getProductById(productId);
  
  if (!product) {
    return <Navigate to="/products" replace />;
  }
  
  const relatedProducts = getRelatedProducts(product);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, product.stock));
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={14} />
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-600">Products</Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={14} />
            </li>
            <li>
              <Link 
                to={`/products?category=${product.category}`} 
                className="hover:text-blue-600"
              >
                {product.category}
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={14} />
            </li>
            <li className="text-gray-900 font-medium truncate">{product.name}</li>
          </ol>
        </nav>
        
        <div className="mb-4">
          <Link
            to="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to products</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Product Images */}
            <div>
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-gray-100">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-sm font-bold rounded">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </div>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-md overflow-hidden aspect-square bg-gray-100 ${
                        selectedImage === index ? 'ring-2 ring-blue-600' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - View ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                      className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">{product.rating} stars</span>
              </div>
              
              <div className="mb-4">
                {product.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
                    <span className="text-lg text-gray-500 line-through ml-3">${product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="font-semibold text-gray-900 mb-2">Tags:</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    {product.stock > 0 && product.stock < 10 && ` (Only ${product.stock} left)`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-gray-500" />
                  <span className="text-gray-700">Free shipping on orders over $50</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Quantity Selector */}
                <div className="flex items-center">
                  <span className="mr-4 text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1 text-center w-12">{quantity}</span>
                    <button 
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-white ${
                      isInCart(product.id)
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } transition-colors`}
                  >
                    <ShoppingCart size={20} />
                    {isInCart(product.id) ? 'Update Cart' : 'Add to Cart'}
                  </button>
                  
                  <button
                    className="flex-1 sm:flex-initial px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Heart size={20} />
                  </button>
                  
                  <button
                    className="flex-1 sm:flex-initial px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;