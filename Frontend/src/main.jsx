import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { RoleProvider } from "./context/RoleContext";
import { TransactionsProvider } from "./context/TransactionsContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <RoleProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </RoleProvider>
    </StrictMode>
  </BrowserRouter>
);