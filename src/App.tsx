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
import { ContentPagesPage } from "@/pages/content/ContentPagesPage"
import { NewsListPage } from "@/pages/content/NewsListPage"
import { AgentCreatePage } from "@/pages/agents/AgentCreatePage"
import { UserCreatePage } from "@/pages/customers/UserCreatePage"
import { MemberListPage } from "@/pages/customers/MemberListPage"
import { MemberCreatePage } from "@/pages/customers/MemberCreatePage"
import { SettingsPage } from "@/pages/settings/SettingsPage"

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
          <Route path="/content/pages" element={<ContentPagesPage />} />
          <Route path="/content/news" element={<NewsListPage />} />
          <Route path="/agents" element={<AgentListPage />} />
          <Route path="/agents/new" element={<AgentCreatePage />} />
          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<UserCreatePage />} />
          <Route path="/customers/member" element={<MemberListPage />} />
          <Route path="/customers/member/new" element={<MemberCreatePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
