import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Wallet from "./pages/Wallet";
import Analytics from "./pages/Analytics";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        <Topbar setIsOpen={setIsOpen} />

        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
