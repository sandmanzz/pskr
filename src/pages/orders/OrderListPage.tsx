import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  LayoutGrid,
  Search,
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
import { mockOrders } from "@/data/mockData"
import { cn } from "@/lib/utils"

const tableColumns = ["Order", "Quantity", "Total", "Status", "Date", "Actions"]

export function OrderListPage() {
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return mockOrders
    }

    return mockOrders.filter((order) =>
      [order.orderName, order.status, String(order.id)]
        .some((value) => value.toLowerCase().includes(query))
    )
  }, [search])

  return (
    <div className="min-h-screen bg-white">
      <header
        className="rounded-b-[20px] px-7 py-8 sm:px-10"
        style={{
          background: "linear-gradient(135deg, #4a1f7b 0%, #32245f 48%, #17213c 100%)",
        }}
      >
        <h1 className="text-3xl font-bold leading-tight text-white">Your Orders</h1>
        <p className="mt-1 text-lg text-white/70">Track your orders here</p>
      </header>

      <div className="px-6 py-5 sm:px-10">
        <nav className="flex items-center gap-3 text-base font-medium text-slate-500">
          <span className="text-slate-400">dashboard-user</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600">Order</span>
        </nav>

        <section className="mt-8 border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="DashboardUser.searchOrder"
                className="h-14 rounded-none border-slate-200 pl-12 text-base text-slate-700 shadow-none placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-0"
              />
            </div>

            <Button
              size="icon"
              className="h-12 w-12 self-end rounded-md bg-slate-950 shadow-md hover:bg-slate-800 sm:self-auto"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </section>

        <section className="mt-8 overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] table-fixed">
              <thead>
                <tr className="border-b border-slate-200">
                  {tableColumns.map((column) => (
                    <th
                      key={column}
                      className={cn(
                        "h-16 px-5 text-left text-base font-semibold text-slate-500",
                        column === "Order" && "w-[17%]",
                        column === "Quantity" && "w-[17%]",
                        column === "Total" && "w-[17%]",
                        column === "Status" && "w-[17%]",
                        column === "Date" && "w-[16%]",
                        column === "Actions" && "w-[16%]"
                      )}
                    >
                      <button
                        type="button"
                        className={cn(
                          "inline-flex items-center gap-3",
                          column === "Actions" && "cursor-default"
                        )}
                      >
                        {column}
                        {column !== "Actions" && (
                          <ChevronsUpDown className="h-5 w-5 text-slate-500" />
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-200 last:border-b-0">
                    <td className="px-5 py-4 align-middle">
                      <p className="text-base font-semibold text-slate-950">{order.orderName}</p>
                      <p className="mt-1 text-sm font-medium text-slate-500">#{order.id}</p>
                    </td>
                    <td className="px-5 py-4 text-base text-slate-950">{order.quantity}</td>
                    <td className="px-5 py-4 text-base text-slate-950">
                      ¥ {order.total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-amber-100 px-3 py-2 text-sm font-medium text-amber-700">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-base text-slate-950">{order.date}</td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        className="text-base font-medium text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-col items-end gap-4 border-x border-slate-200 bg-white px-3 py-0 sm:flex-row sm:justify-end sm:border-x-0">
          <div className="flex items-center gap-4">
            <span className="text-base font-medium text-slate-950">Rows per page</span>
            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
              <SelectTrigger className="h-12 w-28 rounded-none border-slate-200 text-base shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="min-w-36 text-center text-base font-semibold text-slate-950">Page 1 of -1</p>

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
      </div>
    </div>
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
      className="h-12 w-20 rounded-lg border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50 disabled:text-slate-400"
    >
      {children}
    </Button>
  )
}
