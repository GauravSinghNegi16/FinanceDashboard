# 💰 Finset – Finance Dashboard

A modern, responsive **Finance Dashboard** built using **React + Tailwind CSS**, designed to track income, expenses, and financial trends in a clean and interactive UI.

---

## 🚀 Features

- 📊 Interactive Dashboard UI
- 💳 Wallet & Balance Overview
- 📈 Analytics & Spending Breakdown
- 🧾 Transaction Management
- 🔍 Search & Filtering UI
- 📱 Fully Responsive (Desktop, Tablet, Mobile)
- 🎨 Clean and Minimal UI Design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM

### State Management
- Context API
  - RoleContext
  - TransactionsContext

### Data Handling
- Static mock data (`/data/transactions.js`)
- Utility helpers (`/utils/helpers.js`)

### UI & Charts
- Reusable Components (Cards, Sidebar, Topbar, Wallet)
- Custom Bar Chart (Balance Trend)
- Donut Chart (Spending Breakdown)

---

## 📁 Project Structure
Frontend/
│
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── Card.jsx
│ │ ├── Sidebar.jsx
│ │ ├── Topbar.jsx
│ │ ├── WalletCard.jsx
│ │ └── TransactionItem.jsx
│ │
│ ├── context/
│ │ ├── RoleContext.jsx
│ │ └── TransactionsContext.jsx
│ │
│ ├── data/
│ │ └── transactions.js
│ │
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Transactions.jsx
│ │ ├── Wallet.jsx
│ │ └── Analytics.jsx
│ │
│ ├── store/
│ ├── utils/
│ │ └── helpers.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── index.html
├── eslint.config.js
└── .gitignore  

---

## ⚙️ Approach & Architecture

### Component-Based Design
- Built reusable UI components (Card, Sidebar, Topbar, etc.)
- Improves scalability and maintainability

### Layout System
- Flexbox-based layout using Tailwind CSS
- Sidebar + Main content structure
- Fully responsive design

### State Management
- Used React Context API instead of Redux
- Centralized handling of:
  - User roles
  - Transactions data

### Data Flow
- Static data stored in `/data`
- Passed via Context → consumed by pages/components

### UI/UX Approach
- Minimal and clean finance UI
- Consistent spacing, typography, and colors
- Focus on readability and clarity

### Chart Strategy
- Bar Chart → Balance trend over months
- Donut Chart → Expense category distribution
- Maintained consistent color theme (purple-based)

---

## 🧑‍💻 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/finset-dashboard.git

# Navigate to project
cd finset-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
