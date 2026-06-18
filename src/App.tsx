import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { HomePage } from "./pages/home/Index";
import OrdersPage from "./pages/OrdersPage";
import ExpensesPage from "./pages/ExpensesPage";
import SavingsPage from "./pages/SavingsPage";
import SettingsPage from "./pages/SettingsPage";
import { seedLocalDatabase } from "./lib/localDb";

export default function App() {
  useEffect(() => {
    void seedLocalDatabase()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
