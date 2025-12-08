import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import Receipts from "./pages/farmer/Receipts";
import ReceiptDetail from "./pages/farmer/ReceiptDetail";
import ApplyLoan from "./pages/farmer/ApplyLoan";
import SellTransfer from "./pages/farmer/SellTransfer";
import Loans from "./pages/farmer/Loans";
import Profile from "./pages/farmer/Profile";
import WarehouseDashboard from "./pages/warehouse/WarehouseDashboard";
import NewIntake from "./pages/warehouse/NewIntake";
import BankDashboard from "./pages/bank/BankDashboard";
import Marketplace from "./pages/trader/Marketplace";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />

        {/* Farmer Routes */}
        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/farmer/receipts" element={<Receipts />} />
        <Route path="/farmer/receipts/:id" element={<ReceiptDetail />} />
        <Route path="/farmer/loan/:id" element={<ApplyLoan />} />
        <Route path="/farmer/sell/:id" element={<SellTransfer />} />
        <Route path="/farmer/loans" element={<Loans />} />
        <Route path="/farmer/profile" element={<Profile />} />

        {/* Warehouse Routes */}
        <Route
          path="/warehouse/dashboard"
          element={
            <ProtectedRoute allowedRoles={["warehouse"]}>
              <WarehouseDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/warehouse/intake" element={<NewIntake />} />

        {/* Bank Routes */}
        <Route
          path="/bank/dashboard"
          element={
            <ProtectedRoute allowedRoles={["bank"]}>
              <BankDashboard />
            </ProtectedRoute>
          }
        />

        {/* Trader Routes */}
        <Route
          path="/trader/marketplace"
          element={
            <ProtectedRoute allowedRoles={["trader"]}>
              <Marketplace />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
