# 💰 Finset – Finance Dashboard

A modern and responsive **Finance Dashboard** built using **React.js and Tailwind CSS** to visualize financial data such as balance, income, expenses, and spending trends.

🔗 **Live Demo:** https://finance-dashboard-lemon-seven.vercel.app/

---

## 🚀 Overview

Finset is a frontend-focused project designed to showcase:
- Clean and scalable **React architecture**
- Efficient **state management using Context API**
- Modern **UI/UX design with Tailwind CSS**
- Interactive **financial data visualization**

The application provides a centralized dashboard where users can monitor their financial data through intuitive charts and structured layouts.

---

## ✨ Features

### 📊 Dashboard
- Displays **Total Balance, Income, and Expenses**
- Monthly comparison indicators (growth/decline)
- Clean card-based UI for quick insights

### 📈 Analytics
- **Bar Chart** for balance trends across months
- **Donut Chart** for expense breakdown by category
- Consistent and minimal design for better readability

### 🧾 Transactions
- Structured transaction list
- Easy-to-read financial records

### 💳 Wallet
- Summary of user balance and financial status
- Reusable wallet card component

### 🧭 Navigation & UI
- Sidebar navigation (Dashboard, Transactions, Wallet, Analytics)
- Topbar with search and user controls
- Fully responsive layout (mobile, tablet, desktop)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM

### State Management
- React Context API
  - RoleContext
  - TransactionsContext

### Data Handling
- Static mock data (`transactions.js`)
- Utility helper functions

---

## ⚙️ Approach & Architecture

### 1. Component-Based Design
The UI is divided into reusable components:
- Sidebar
- Topbar
- Cards
- WalletCard
- TransactionItem  

This improves **reusability and maintainability**.

---

### 2. Folder Structure Strategy
- `components/` → Reusable UI elements  
- `pages/` → Main screens  
- `context/` → Global state management  
- `data/` → Mock data  
- `utils/` → Helper functions  

Ensures **scalable and organized codebase**.

---

### 3. State Management
Used **Context API** instead of Redux for simplicity:
- Centralized transactions data
- Handles role-based UI logic

---

### 4. UI/UX Design Approach
- Minimal and modern interface
- Consistent spacing and typography
- Purple-based theme for visual identity
- Focus on clarity and usability

---

### 5. Data Visualization Strategy
- Bar Chart → Monthly balance trends  
- Donut Chart → Expense categories  
- Designed for simplicity and readability

---


---

## 🧑‍💻 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/finset-dashboard.git
cd finset-dashboard
