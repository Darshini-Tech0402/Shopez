ShopEZ - README Content

---

markdown
ShopEZ - Full Stack E-Commerce Web Application

> A complete, modern e-commerce web application built with the MERN Stack.
> Browse products, manage your cart, and checkout seamlessly.

---
Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Context Architecture](#context-architecture)
- [Pages and Components](#pages-and-components)
- [Author](#author)

---

About the Project

ShopEZ is a fully functional e-commerce web application developed as part of
my B.Tech Computer Science curriculum at Anurag University (2024–2028).

The goal was to build a real-world shopping platform that demonstrates full-stack
development skills including frontend UI, state management, authentication,
REST APIs, and database integration.

The application supports complete shopping workflows — from browsing products
and filtering by category, to adding items to cart, completing checkout with
multiple payment options, and managing products via an admin dashboard.

---

Features

Shopping
- Browse 27+ products across 7 categories
- Search products with live dropdown results
- Filter by category with instant updates
- Product detail page with quantity selector
- Add to Cart and Buy Now functionality

Cart
- Add, remove, and update product quantities
- Auto-calculated subtotal, 5% tax, and shipping
- Free shipping on orders above ₹1000
- Cart persists after page refresh using localStorage
- Empty cart UI with Continue Shopping button

Authentication
- User Signup with name, email, password validation
- User Login with session persistence via localStorage
- Logout clears user state and cart
- Protected routes for profile and admin pages

Checkout
- 3-step checkout flow: Shipping → Payment → Review
- Full shipping form with validation
- Payment options: Cash on Delivery, UPI, Credit Card, Debit Card
- Card fields appear dynamically when card payment selected
- Auto-generated Order ID on successful order (SHOP-2026-XXXXX)
- Cart clears automatically after order placement

Admin Dashboard
- View all products in a table
- Add new products with form
- Edit existing products
- Delete products with confirmation
- Live product stats (total, in stock, min/max price)

Responsive Design
- Mobile-first layout
- Hamburger menu with animated sidebar
- Works on all screen sizes
- Pink-themed modern UI

---

Tech Stack

Frontend
| Technology | Purpose |
|------------|---------|
| React.js 18 | UI Library |
| React Router v6 | Client-side Routing |
| Context API | Global State Management |
| CSS3 | Custom Styling |
| LocalStorage | Cart and Auth Persistence |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication Tokens |
| bcryptjs | Password Hashing |
| dotenv | Environment Variables |
| cors | Cross-Origin Resource Sharing |

---

Project Structure

```
ShopEZ/
│
├── client/                          # React Frontend
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx           # Top navigation with search
│       │   ├── Navbar.css
│       │   ├── Sidebar.jsx          # Mobile hamburger menu
│       │   ├── Sidebar.css
│       │   ├── ProductCard.jsx      # Reusable product card
│       │   ├── ProductCard.css
│       │   ├── Footer.jsx
│       │   └── Footer.css
│       │
│       ├── context/
│       │   ├── AuthContext.jsx      # Login, signup, logout state
│       │   ├── CartContext.jsx      # Cart state with localStorage
│       │   └── ProductContext.jsx   # Product data and search
│       │
│       ├── data/
│       │   └── products.js          # Local product data (27 products)
│       │
│       ├── pages/
│       │   ├── Home.jsx             # Homepage with filters
│       │   ├── Home.css
│       │   ├── ProductDetails.jsx   # Single product page
│       │   ├── ProductDetails.css
│       │   ├── Cart.jsx             # Cart page
│       │   ├── Cart.css
│       │   ├── Checkout.jsx         # 3-step checkout
│       │   ├── Checkout.css
│       │   ├── Login.jsx
│       │   ├── Login.css
│       │   ├── Signup.jsx
│       │   ├── Signup.css
│       │   ├── UserProfile.jsx
│       │   ├── UserProfile.css
│       │   ├── CategoryPage.jsx     # Products by category
│       │   ├── CategoryPage.css
│       │   ├── AdminDashboard.jsx   # Admin product management
│       │   └── AdminDashboard.css
│       │
│       ├── App.js                   # Routes and provider setup
│       ├── App.css
│       ├── index.js                 # React entry point
│       └── index.css
│
├── server/                          # Node.js + Express Backend
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── adminController.js
│   │
│   ├── middleware/
│   │   └── auth.js                  # JWT middleware
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── .env
│   ├── server.js                    # Express app entry point
│   └── package.json
│
└── README.md
```

---

 Getting Started

Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

Installation

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/shopez.git
cd shopez
```

2. Setup the Frontend

```bash
cd client
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

3. Setup the Backend

```bash
cd server
npm install
npm run dev
```

Backend runs at: `http://localhost:5000`

Environment Variables

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopez
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

---

API Endpoints

Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (protected) |

Product Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Add product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

Order Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place new order |
| GET | `/api/orders/my` | Get user orders (protected) |
| GET | `/api/orders` | Get all orders (admin) |

---

Context Architecture

```
App.js
└── AuthProvider          → user, isLoggedIn, login, signup, logout
    └── ProductProvider   → products, categories, getProductById, searchProducts
        └── CartProvider  → cart, addToCart, removeFromCart, updateQuantity,
                            clearCart, subtotal, tax, shipping, total, cartCount
```

All pages and components consume these contexts using custom hooks:
- `useAuth()` — from AuthContext
- `useProducts()` — from ProductContext
- `useCart()` — from CartContext

---

Pages and Components

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Product listing with search and category filter |
| Product Details | `/product/:id` | Full product info with add to cart |
| Category | `/category/:name` | Products filtered by category |
| Cart | `/cart` | Cart management with totals |
| Checkout | `/checkout` | 3-step checkout with payment |
| Login | `/login` | User login form |
| Signup | `/signup` | User registration form |
| Profile | `/profile` | User info and logout |
| Admin | `/admin` | Product management dashboard |

---

Design System

| Property | Value |
|----------|-------|
| Primary Color | `#d97ba6` (Hot Pink) |
| Accent Color | `#e91e8c` (Deep Pink) |
| Background | `#fff9fc` (Soft Pink White) |
| Border Color | `#f8d7e8` (Light Pink) |
| Font | Segoe UI, system-ui |
| Border Radius | 12px – 24px |

- LinkedIn: www.linkedin.com/in/darshini-deetya-talamarla-920052317



