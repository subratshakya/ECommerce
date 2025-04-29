import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Loader2, CheckCircle, CreditCard, ShoppingBag } from 'lucide-react';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping information
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    phone: '',
    
    // Payment information
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  // Redirect if not authenticated or cart is empty
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=checkout" />;
  }
  
  if (cart.items.length === 0) {
    return <Navigate to="/cart" />;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('confirmation');
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  const handleComplete = () => {
    clearCart();
    navigate('/orders');
  };
  
  // Calculate order summary
  const subtotal = cart.total;
  const shippingCost = subtotal >= 50 ? 0 : 4.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shippingCost + tax;
  
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === 'shipping' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-green-500 text-white'
                }`}
              >
                {currentStep === 'shipping' ? '1' : '✓'}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">Shipping</p>
            </div>
            <div className={`flex-1 h-1 ${currentStep === 'shipping' ? 'bg-gray-300' : 'bg-green-500'}`}></div>
            
            <div className="flex-1 flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === 'payment' 
                    ? 'bg-blue-600 text-white' 
                    : currentStep === 'shipping' 
                      ? 'bg-gray-300 text-gray-700' 
                      : 'bg-green-500 text-white'
                }`}
              >
                {currentStep === 'confirmation' ? '✓' : '2'}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">Payment</p>
            </div>
            <div className={`flex-1 h-1 ${currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            
            <div className="flex-1 flex flex-col items-end">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === 'confirmation' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                3
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">Confirmation</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Shipping Information */}
              {currentStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit}>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP/Postal Code *
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              )}
              
              {/* Payment Information */}
              {currentStep === 'payment' && (
                <form onSubmit={handlePaymentSubmit}>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                    
                    <div className="mb-6">
                      <div className="flex items-center space-x-4 p-4 border border-blue-200 rounded-md bg-blue-50">
                        <input
                          type="radio"
                          id="credit-card"
                          name="payment-method"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          checked
                          readOnly
                        />
                        <label htmlFor="credit-card" className="flex items-center">
                          <CreditCard size={20} className="text-blue-600 mr-2" />
                          <span className="font-medium">Credit Card</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required
                          placeholder="**** **** **** ****"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          required
                          placeholder="MM/YY"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          placeholder="***"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 size={20} className="animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>
                </form>
              )}
              
              {/* Order Confirmation */}
              {currentStep === 'confirmation' && (
                <div className="p-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your order!</h2>
                    <p className="text-gray-600">
                      Your order has been placed and will be processed soon.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
                    <p className="text-gray-700 mb-1">Order Number: <span className="font-medium">ORD-{Math.floor(Math.random() * 10000)}</span></p>
                    <p className="text-gray-700 mb-1">Order Date: <span className="font-medium">{new Date().toLocaleDateString()}</span></p>
                    <p className="text-gray-700">Estimated Delivery: <span className="font-medium">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span></p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                    <p className="text-gray-700">{formData.fullName}</p>
                    <p className="text-gray-700">{formData.address}</p>
                    <p className="text-gray-700">{formData.city}, {formData.state} {formData.postalCode}</p>
                    <p className="text-gray-700">{formData.country}</p>
                    <p className="text-gray-700">{formData.phone}</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                    <div className="flex items-center">
                      <CreditCard size={20} className="text-gray-500 mr-2" />
                      <p className="text-gray-700">
                        Credit Card ending in {formData.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <button
                      onClick={handleComplete}
                      className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
                    >
                      <ShoppingBag size={20} className="mr-2" />
                      View My Orders
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="max-h-64 overflow-y-auto mb-4">
                {cart.items.map(item => (
                  <div key={item.product.id} className="flex mb-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0">
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden mr-4">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-medium text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;