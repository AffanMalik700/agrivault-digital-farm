// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Auth from "./pages/Auth";
// import FarmerDashboard from "./pages/farmer/FarmerDashboard";
// import Receipts from "./pages/farmer/Receipts";
// import ReceiptDetail from "./pages/farmer/ReceiptDetail";
// import ApplyLoan from "./pages/farmer/ApplyLoan";
// import SellTransfer from "./pages/farmer/SellTransfer";
// import WarehouseDashboard from "./pages/warehouse/WarehouseDashboard";
// import NewIntake from "./pages/warehouse/NewIntake";
// import BankDashboard from "./pages/bank/BankDashboard";
// import Marketplace from "./pages/trader/Marketplace";
// // data fetching client
// import express, { Request, Response } from "express";
// import { connectDB } from "../backend/config/db";

// const app = express();

// // Connect to DB
// connectDB();

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from TypeScript + MongoDB!");
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// //endpoints
// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/auth" element={<Auth />} />
          
//           {/* Farmer Routes */}
//           <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
//           <Route path="/farmer/receipts" element={<Receipts />} />
//           <Route path="/farmer/receipts/:id" element={<ReceiptDetail />} />
//           <Route path="/farmer/loan/:id" element={<ApplyLoan />} />
//           <Route path="/farmer/sell/:id" element={<SellTransfer />} />
          
//           {/* Warehouse Routes */}
//           <Route path="/warehouse/dashboard" element={<WarehouseDashboard />} />
//           <Route path="/warehouse/intake" element={<NewIntake />} />
          
//           {/* Bank Routes */}
//           <Route path="/bank/dashboard" element={<BankDashboard />} />
          
//           {/* Trader Routes */}
//           <Route path="/trader/marketplace" element={<Marketplace />} />
          
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import Receipts from "./pages/farmer/Receipts";
import ReceiptDetail from "./pages/farmer/ReceiptDetail";
import ApplyLoan from "./pages/farmer/ApplyLoan";
import SellTransfer from "./pages/farmer/SellTransfer";
import WarehouseDashboard from "./pages/warehouse/WarehouseDashboard";
import NewIntake from "./pages/warehouse/NewIntake";
import BankDashboard from "./pages/bank/BankDashboard";
import Marketplace from "./pages/trader/Marketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />

          {/* Farmer Routes */}
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/receipts" element={<Receipts />} />
          <Route path="/farmer/receipts/:id" element={<ReceiptDetail />} />
          <Route path="/farmer/loan/:id" element={<ApplyLoan />} />
          <Route path="/farmer/sell/:id" element={<SellTransfer />} />

          {/* Warehouse Routes */}
          <Route path="/warehouse/dashboard" element={<WarehouseDashboard />} />
          <Route path="/warehouse/intake" element={<NewIntake />} />

          {/* Bank Routes */}
          <Route path="/bank/dashboard" element={<BankDashboard />} />

          {/* Trader Routes */}
          <Route path="/trader/marketplace" element={<Marketplace />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
