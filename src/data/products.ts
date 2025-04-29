import { Product } from '../types';

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    price: 249.99,
    discountPrice: 199.99,
    category: "Electronics",
    tags: ["headphones", "wireless", "audio"],
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.8,
    stock: 45,
    featured: true,
    createdAt: "2023-11-15T12:00:00Z"
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    description: "Stay connected and track your fitness with our latest smartwatch. Features heart rate monitoring, GPS, and a beautiful OLED display.",
    price: 299.99,
    category: "Electronics",
    tags: ["smartwatch", "fitness", "wearable"],
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.6,
    stock: 28,
    featured: true,
    createdAt: "2023-10-20T14:30:00Z"
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    description: "Work in comfort with our ergonomic office chair. Adjustable height, lumbar support, and breathable mesh back.",
    price: 189.99,
    category: "Furniture",
    tags: ["office", "chair", "ergonomic"],
    images: [
      "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.4,
    stock: 15,
    featured: false,
    createdAt: "2023-12-05T09:15:00Z"
  },
  {
    id: "4",
    name: "Professional DSLR Camera",
    description: "Capture stunning photos with our professional DSLR camera. 24.1MP sensor, 4K video recording, and includes 18-55mm lens.",
    price: 899.99,
    discountPrice: 799.99,
    category: "Photography",
    tags: ["camera", "dslr", "photography"],
    images: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.9,
    stock: 12,
    featured: true,
    createdAt: "2023-09-18T11:45:00Z"
  },
  {
    id: "5",
    name: "Leather Weekend Bag",
    description: "Stylish leather weekend bag perfect for short trips. Durable construction, multiple compartments, and classic design.",
    price: 159.99,
    category: "Fashion",
    tags: ["bag", "leather", "travel"],
    images: [
      "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.5,
    stock: 22,
    featured: false,
    createdAt: "2023-11-02T15:20:00Z"
  },
  {
    id: "6",
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks cold for 24 hours or hot for 12 with our vacuum-insulated water bottle. Durable, leak-proof, and eco-friendly.",
    price: 29.99,
    category: "Home",
    tags: ["bottle", "hydration", "eco-friendly"],
    images: [
      "https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.7,
    stock: 60,
    featured: false,
    createdAt: "2023-12-15T10:30:00Z"
  },
  {
    id: "7",
    name: "Organic Cotton T-Shirt",
    description: "Soft, comfortable organic cotton t-shirt. Ethically made, pre-shrunk, and available in multiple colors.",
    price: 24.99,
    category: "Fashion",
    tags: ["clothing", "t-shirt", "organic"],
    images: [
      "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.3,
    stock: 85,
    featured: false,
    createdAt: "2023-10-08T13:20:00Z"
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    description: "Convenient wireless charging for all Qi-enabled devices. Fast charging technology, sleek design, and non-slip surface.",
    price: 34.99,
    discountPrice: 29.99,
    category: "Electronics",
    tags: ["charging", "wireless", "accessories"],
    images: [
      "https://images.pexels.com/photos/3850216/pexels-photo-3850216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4526400/pexels-photo-4526400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    rating: 4.4,
    stock: 38,
    featured: false,
    createdAt: "2023-11-22T16:45:00Z"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (limit: number = 4): Product[] => {
  return products.filter(p => p.featured).slice(0, limit);
};

export const getCategories = (): string[] => {
  return [...new Set(products.map(p => p.category))];
};