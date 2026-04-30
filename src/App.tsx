import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { LoginPage } from "@/pages/LoginPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { ProductListPage } from "@/pages/products/ProductListPage"
import { ProductEditPage } from "@/pages/products/ProductEditPage"
import { CategoryListPage } from "@/pages/products/CategoryListPage"
import { OrderListPage } from "@/pages/orders/OrderListPage"
import { AdminOrderManagementPage } from "@/pages/orders/AdminOrderManagementPage"
import { CustomerListPage } from "@/pages/customers/CustomerListPage"
import { AgentListPage } from "@/pages/agents/AgentListPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="/orders/admin" element={<AdminOrderManagementPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/categories" element={<CategoryListPage />} />
          <Route path="/products/new" element={<ProductEditPage />} />
          <Route path="/products/:id/edit" element={<ProductEditPage />} />
          <Route path="/agents" element={<AgentListPage />} />
          <Route path="/customers" element={<CustomerListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
