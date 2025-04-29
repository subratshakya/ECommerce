# 🛍️ ShopHub - MERN E-commerce Website

**ShopHub** is a full-stack e-commerce web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)** with modern UI/UX using Tailwind CSS and TypeScript. Users can browse products, manage a shopping cart, register/login, and go through a simulated checkout process. An admin dashboard allows for managing products and orders.

---

## 🚀 Features

### 🧑‍💻 Customer Features
- **Product Listing** with category filters and search
- **Product Details Page** with images, description, and suggestions
- **Shopping Cart** with quantity adjustments and remove feature
- **Authentication**: User registration, login, and profile management
- **Checkout Process**: Shipping and payment info (mocked)
- **Order History** for users
- **Responsive Design** for mobile, tablet, and desktop

### 🛠 Admin Features
- **Dashboard** to view/manage all products and orders
- **Add/Edit/Delete Products**
- **Order Management Panel**

---

## 🎨 UI/UX Design Highlights

- **Primary Color**: Deep Blue `#1E40AF`
- **Accent Color**: Soft Green `#059669`
- **Typography**: Clean and readable font with high contrast
- **Spacing System**: 8px modular spacing
- **Accessibility**: WCAG AA color compliance
- **Animations**: Subtle transitions and hover effects
- **Image Gallery**: Zoom + thumbnails in product detail view

---
🛠 Tech Stack
Frontend: React + TypeScript + Tailwind CSS

Backend: Node.js + Express

Database: MongoDB (integration ready)

Authentication: JWT-based user auth

Routing: react-router-dom

State Management: React Context API

Icon Library: lucide-react

⚙️ Getting Started
Prerequisites
Node.js (v16+)

MongoDB (local or Atlas)

npm or yarn

# Install dependencies
npm install

# Run the development server
npm run dev
Visit http://localhost:5173 to access the app

🧪 Environment Variables
Create a .env file in the root directory for backend configuration:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
🔮 Future Enhancements
Stripe or Razorpay integration for payments

Real-time order status updates

Admin role access restrictions

Product reviews & ratings

Email notifications for orders


📃 License
Licensed under the MIT License.
## 🗂️ File Structure

```bash
src/
├── types/                 # TypeScript type definitions
├── data/                  # Mock product data
│   └── products.ts
├── context/               # Global contexts for Auth and Cart
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── components/            # Reusable UI and page components
│   ├── ProductCard.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductList.tsx
│   └── HeroSection.tsx
├── pages/                 # Page components
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── AuthPages.tsx      # Login & Register
│   └── AdminPages.tsx     # Admin dashboard, product/order mgmt
├── App.tsx                # Root app component with routing
├── index.html             # HTML template
└── package.json           # Project dependencies and scripts









