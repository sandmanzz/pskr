import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Globe,
  Users,
  UserCog,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Order",
    icon: ShoppingCart,
    children: [
      { label: "Manage Orders", href: "/orders" },
      { label: "Manage order by admin", href: "/orders/admin" },
      { label: "Order History", href: "/orders/history" },
    ],
  },
  {
    label: "Products",
    icon: Package,
    children: [
      { label: "Manage Product", href: "/products" },
      { label: "Categories", href: "/products/categories" },
    ],
  },
  {
    label: "Content",
    icon: Globe,
    children: [
      { label: "Pages", href: "/content/pages" },
      { label: "News", href: "/content/news" },
      { label: "Files", href: "/content/files" },
    ],
  },
  {
    label: "Agent",
    icon: UserCog,
    children: [
      { label: "Agents", href: "/agents" },
      { label: "Agent Commission", href: "/agents/commissions" },
    ],
  },
  {
    label: "Customer",
    icon: Users,
    children: [
      { label: "Users", href: "/customers" },
      { label: "Member", href: "/customers/member" },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { label: "Store Setting", href: "/settings" },
      { label: "Payment Methods", href: "/settings/payments" },
      { label: "Shipping Methods", href: "/settings/shipping" },
      { label: "Curva Integration", href: "/settings/curva" },
      { label: "Domain", href: "/settings/domain" },
    ],
  },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const initialOpenMenus = navItems
    .filter((item) => item.children?.some((child) => location.pathname.startsWith(child.href)))
    .map((item) => item.label)

  const [openMenus, setOpenMenus] = useState<string[]>(
    initialOpenMenus.length > 0 ? initialOpenMenus : ["Products"]
  )

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    )
  }

  const isChildActive = (children: { href: string }[]) =>
    children.some((c) => location.pathname.startsWith(c.href))

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 fixed left-0 top-0 z-40",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold">
              P
            </div>
            <span className="font-semibold text-gray-900 text-sm">Passukuru</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold mx-auto">
            P
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "p-1 rounded hover:bg-gray-100 text-gray-500",
            collapsed && "absolute right-0 translate-x-1/2 bg-white border border-gray-200 shadow-sm top-5"
          )}
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon

          if (!item.children) {
            return (
              <NavLink
                key={item.label}
                to={item.href!}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors mx-2 rounded-md",
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            )
          }

          const isOpen = openMenus.includes(item.label)
          const childActive = isChildActive(item.children)

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleMenu(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors mx-2 rounded-md",
                  "text-gray-700 hover:bg-gray-100",
                  childActive && !isOpen && "text-gray-900",
                  "w-[calc(100%-16px)]"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </>
                )}
              </button>

              {!collapsed && isOpen && (
                <div className="ml-8 mr-2 mb-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.href}
                      to={child.href}
                      end={
                        child.href === "/orders" ||
                        child.href === "/products" ||
                        child.href === "/agents" ||
                        child.href === "/customers"
                      }
                      className={({ isActive }) =>
                        cn(
                          "block px-3 py-2 text-sm rounded-md transition-colors",
                          isActive
                            ? "bg-gray-900 text-white font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        )
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Bottom: Language + User */}
      {!collapsed && (
        <div className="shrink-0 border-t border-gray-100">
          <div className="px-4 py-3">
            <p className="text-xs text-gray-400 mb-1.5">Language</p>
            <Select defaultValue="en">
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN  English</SelectItem>
                <SelectItem value="id">ID  Indonesian</SelectItem>
                <SelectItem value="ja">JA  Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50">
            <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs font-bold shrink-0">
              C
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">coconshop_admin</p>
              <p className="text-[10px] text-gray-400 truncate">coconshop_admin@yo...</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
