import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  CircleCheck,
  CircleDollarSign,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Grid2X2,
  Inbox,
  LayoutGrid,
  Plus,
  Search,
  ShoppingCart,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockAdminOrders, mockAdminOrderStats } from "@/data/mockData"
import { cn } from "@/lib/utils"

const tableColumns = [
  "Customer",
  "Email",
  "Page",
  "Status",
  "Total",
  "Payment Method",
  "Created At",
  "Last Updated",
  "Payment Date",
]

const summaryCards = [
  {
    label: "Total Orders",
    value: mockAdminOrderStats.totalOrders,
    helper: "Total orders this period",
    icon: ShoppingCart,
    iconClassName: "bg-blue-100 text-blue-600",
  },
  {
    label: "Order Received",
    value: mockAdminOrderStats.orderReceived,
    helper: "Pending orders",
    icon: Inbox,
    iconClassName: "bg-amber-100 text-orange-500",
  },
  {
    label: "Total Order Paid",
    value: mockAdminOrderStats.totalOrderPaid,
    helper: "Payment confirmed",
    icon: CircleDollarSign,
    iconClassName: "bg-green-100 text-green-600",
  },
  {
    label: "Total Order Shipped",
    value: mockAdminOrderStats.totalOrderShipped,
    helper: "Out for delivery",
    icon: Truck,
    iconClassName: "bg-purple-100 text-purple-600",
  },
  {
    label: "Order Completed",
    value: mockAdminOrderStats.orderCompleted,
    helper: "Delivered orders",
    icon: CircleCheck,
    iconClassName: "bg-emerald-100 text-emerald-600",
  },
]

export function AdminOrderManagementPage() {
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return mockAdminOrders
    }

    return mockAdminOrders.filter((order) =>
      [
        order.customer,
        order.email,
        order.page,
        order.status,
        order.paymentMethod,
        order.createdAt,
        order.lastUpdated,
        order.paymentDate,
      ].some((value) => value.toLowerCase().includes(query))
    )
  }, [search])

  return (
    <div className="min-h-screen bg-white">
      <header
        className="flex flex-col gap-5 rounded-b-[18px] px-7 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10"
        style={{
          background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)",
        }}
      >
        <h1 className="text-3xl font-bold leading-tight text-white">Order Management</h1>
        <Button
          variant="outline"
          className="h-11 w-fit rounded-none border-white/25 bg-white/10 px-7 text-base font-medium text-white hover:bg-white/15 hover:text-white"
        >
          <Plus className="h-5 w-5" />
          Create Order
        </Button>
      </header>

      <main className="px-6 py-5 sm:px-10">
        <nav className="flex items-center gap-3 text-base font-medium text-slate-500">
          <span className="text-slate-400">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600">Orders</span>
        </nav>

        <section className="mt-7 grid gap-5 lg:grid-cols-3">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </section>

        <section className="mt-8 border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Data..."
                className="h-12 rounded-none border-slate-200 pl-12 text-base text-slate-700 shadow-none placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-0"
              />
            </div>

            <div className="flex self-end border border-slate-200 sm:self-auto">
              <Button
                size="icon"
                className="h-12 w-14 rounded-none bg-slate-950 text-white hover:bg-slate-800"
                aria-label="Table view"
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-14 rounded-none text-slate-950 hover:bg-slate-50"
                aria-label="Grid view"
              >
                <Grid2X2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1440px] table-fixed">
              <thead>
                <tr className="border-b border-slate-200">
                  {tableColumns.map((column) => (
                    <th
                      key={column}
                      className={cn(
                        "h-14 px-3 text-left text-sm font-semibold text-slate-500",
                        column === "Customer" && "w-[11%]",
                        column === "Email" && "w-[14%]",
                        column === "Page" && "w-[10%]",
                        column === "Status" && "w-[10%]",
                        column === "Total" && "w-[9%]",
                        column === "Payment Method" && "w-[13%]",
                        column === "Created At" && "w-[11%]",
                        column === "Last Updated" && "w-[11%]",
                        column === "Payment Date" && "w-[11%]"
                      )}
                    >
                      <button type="button" className="inline-flex items-center gap-3">
                        {column}
                        <ChevronsUpDown className="h-4 w-4 text-slate-500" />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-200 last:border-b-0">
                    <td className="px-3 py-3 text-base font-semibold text-slate-950">
                      {order.customer}
                    </td>
                    <td className="px-3 py-3">
                      <span className="block max-w-52 truncate text-base font-medium text-slate-500">
                        {order.email}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-base font-medium text-slate-500">{order.page}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-3 py-3 text-base font-semibold text-slate-950">
                      ¥ {order.total.toLocaleString("id-ID")}
                    </td>
                    <td className="px-3 py-3 text-base font-medium text-slate-500">
                      {order.paymentMethod}
                    </td>
                    <td className="px-3 py-3 text-base font-medium text-slate-500">
                      {order.createdAt}
                    </td>
                    <td className="px-3 py-3 text-base font-medium text-slate-500">
                      {order.lastUpdated}
                    </td>
                    <td className="px-3 py-3 text-base font-medium text-slate-500">
                      {order.paymentDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-col items-end gap-4 bg-white px-3 py-0 sm:flex-row sm:justify-end">
          <div className="flex items-center gap-4">
            <span className="text-base font-medium text-slate-950">Rows per page</span>
            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
              <SelectTrigger className="h-12 w-24 rounded-none border-slate-200 text-base shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="min-w-36 text-center text-base font-semibold text-slate-950">Page 1 of 4</p>

          <div className="flex items-center gap-3">
            <PaginationButton ariaLabel="First page" disabled>
              <ChevronsLeft className="h-5 w-5" />
            </PaginationButton>
            <PaginationButton ariaLabel="Previous page" disabled>
              <ChevronLeft className="h-5 w-5" />
            </PaginationButton>
            <PaginationButton ariaLabel="Next page">
              <ChevronRight className="h-5 w-5" />
            </PaginationButton>
            <PaginationButton ariaLabel="Last page">
              <ChevronsRight className="h-5 w-5" />
            </PaginationButton>
          </div>
        </div>
      </main>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  helper,
  icon: Icon,
  iconClassName,
}: {
  label: string
  value: number
  helper: string
  icon: typeof ShoppingCart
  iconClassName: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-8 py-8 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <p className="text-base font-semibold text-slate-700">{label}</p>
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full", iconClassName)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <p className="mt-8 text-4xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-base font-medium text-slate-500">{helper}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "Delivered"
      ? "bg-green-500 text-white"
      : status === "Payment Failed"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"

  return (
    <span className={cn("inline-flex max-w-36 rounded-lg px-2.5 py-2 text-sm font-semibold leading-tight", style)}>
      {status}
    </span>
  )
}

function PaginationButton({
  ariaLabel,
  children,
  disabled,
}: {
  ariaLabel: string
  children: ReactNode
  disabled?: boolean
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      disabled={disabled}
      aria-label={ariaLabel}
      className="h-12 w-14 rounded-none border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50 disabled:text-slate-400"
    >
      {children}
    </Button>
  )
}
