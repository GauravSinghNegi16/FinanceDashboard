# 💰 Finset – Finance Dashboard

A modern and responsive **Finance Dashboard** built using **React.js and Tailwind CSS** to help users track balance, income, expenses, and financial trends in a clean and intuitive interface.

---

## 🚀 Overview

Finset is a frontend-focused project designed to demonstrate:
- Strong **React fundamentals**
- Clean **component architecture**
- Effective **state management using Context API**
- Modern **UI/UX design practices**

The application provides a centralized dashboard where users can visualize financial data and navigate through transactions, wallet, and analytics sections.

---

## ✨ Features

### 📊 Dashboard
- Displays **Total Balance, Income, and Expenses**
- Monthly comparison indicators (growth/decline)
- Clean card-based layout for quick insights

### 📈 Analytics
- **Bar Chart** for balance trends over time
- **Donut Chart** for expense category breakdown
- Consistent color theme for better readability

### 🧾 Transactions
- List of transactions with structured data
- Easy-to-read layout for financial tracking

### 💳 Wallet
- Overview of user balance and financial summary
- Reusable wallet card component

### 🧭 Navigation & UI
- Sidebar navigation (Dashboard, Transactions, Wallet, Analytics)
- Topbar with search and user controls
- Fully responsive design across devices

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
- Static mock data
- Utility helper functions

---

## ⚙️ Approach & Architecture

### 1. Component-Based Design
The UI is divided into reusable components such as:
- Sidebar
- Topbar
- Cards
- WalletCard
- TransactionItem  

This improves **code reusability and maintainability**.

---

### 2. Folder Structure Strategy
- `components/` → Reusable UI components  
- `pages/` → Main screens (Dashboard, Wallet, etc.)  
- `context/` → Global state management  
- `data/` → Static/mock data  
- `utils/` → Helper functions  

This structure ensures **scalability and clarity**.

---

### 3. State Management
Used **Context API** for lightweight global state instead of Redux:
- Handles transactions data
- Manages role-based UI logic (if applicable)

---

### 4. UI/UX Design Approach
- Minimal and modern design
- Consistent spacing and typography
- Purple-based theme for brand consistency
- Focus on readability and clarity

---

### 5. Data & Chart Strategy
- Static data used for demonstration
- Bar chart → Trend visualization  
- Donut chart → Category distribution  

Charts are designed to be **simple, readable, and visually consistent**.

---

## 🧑‍💻 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/finset-dashboard.git
cd finset-dashboard
