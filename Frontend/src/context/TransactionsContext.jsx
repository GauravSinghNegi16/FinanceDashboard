import React, { createContext, useContext, useState } from "react";
import { transactionsData as initialData } from "../data/transactions";

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialData);

  // 🔥 Add
  const addTransaction = (newTx) => {
    setTransactions((prev) => [
      { id: Date.now(), ...newTx },
      ...prev,
    ]);
  };

  // 🔥 Delete
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((tx) => tx.id !== id)
    );
  };

  // 🔥 Edit
  const editTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === updatedTx.id ? updatedTx : tx
      )
    );
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);