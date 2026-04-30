import { ShoppingCart, DollarSign, UserRound, UserPlus, RefreshCw, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockStats, mockRecentOrders } from "@/data/mockData"
import { useNavigate } from "react-router-dom"

const statCards = [
  {
    label: "Orders",
    value: mockStats.orders.toString(),
    sub: "Total orders this period",
    icon: ShoppingCart,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "GMV",
    value: `¥ ${mockStats.gmv.toLocaleString()}.00`,
    sub: "Gross Merchandise Value",
    icon: DollarSign,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "Agents",
    value: mockStats.agents.toString(),
    sub: "Total agents",
    icon: UserRound,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    label: "New Customers",
    value: mockStats.newCustomers.toString(),
    sub: "Fresh sign-ups",
    icon: UserPlus,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    label: "Repeat Rate",
    value: `${mockStats.repeatRate}%`,
    sub: "Customer retention",
    icon: RefreshCw,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
]

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div
        className="px-8 py-6"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-purple-200 text-sm mt-0.5">
          Welcome back! Here's what's happening with your account.
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="px-8 py-3 border-b border-gray-200 bg-white">
        <p className="text-sm text-gray-500">Dashboard</p>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-3 gap-4">
          {statCards.slice(0, 3).map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className="text-sm text-gray-400 mt-1">{stat.sub}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {statCards.slice(3).map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <p className="text-sm text-gray-400 mt-1">{stat.sub}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-3 gap-4">
          {/* Recent Orders Activity */}
          <div className="col-span-2">
            <Card className="shadow-sm border-gray-200 h-full">
              <CardContent className="p-6">
                <h2 className="text-base font-semibold text-gray-900">Recent Orders Activity</h2>
                <p className="text-sm text-gray-400 mt-0.5 mb-5">Latest orders across your workspace</p>

                <div className="space-y-4">
                  {mockRecentOrders.map((order) => (
                    <div key={order.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 leading-snug">
                          [{order.status}] {order.message}
                        </p>
                        <p className="text-xs text-blue-500 mt-0.5">
                          Order #{order.id} - {order.customer}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{order.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-base font-semibold text-gray-900">Quick Actions</h2>
                <p className="text-sm text-gray-400 mt-0.5 mb-5">Shortcuts to common tasks</p>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-11 text-sm font-medium border-gray-200"
                    onClick={() => navigate("/products/new")}
                  >
                    <Package className="w-4 h-4 text-gray-500" />
                    Create Product
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-11 text-sm font-medium border-gray-200"
                    onClick={() => navigate("/orders")}
                  >
                    <ShoppingCart className="w-4 h-4 text-gray-500" />
                    Create Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
