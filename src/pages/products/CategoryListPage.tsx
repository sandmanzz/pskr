import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  ArrowLeft,
  Box,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Clock,
  FolderOpen,
  Info,
  LayoutGrid,
  Pencil,
  Plus,
  Search,
  Trash2,
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
import { mockCategories, mockCategoryStats } from "@/data/mockData"
import { cn } from "@/lib/utils"

type Category = (typeof mockCategories)[number]

const columns = ["Category Name", "Associated Items", "Created At"]

export function CategoryListPage() {
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return mockCategories
    return mockCategories.filter((category) =>
      [category.name, String(category.associatedItems), category.createdAt].some((value) =>
        value.toLowerCase().includes(query)
      )
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
        <h1 className="text-3xl font-bold leading-tight text-white">Category Management</h1>
        <Button
          variant="outline"
          className="h-11 w-fit rounded-lg border-white/25 bg-white/10 px-7 text-base font-medium text-white hover:bg-white/15 hover:text-white"
        >
          <Plus className="h-5 w-5" />
          Create Category
        </Button>
      </header>

      <main className="px-6 py-5 sm:px-10">
        <nav className="flex items-center gap-3 text-base font-medium text-slate-500">
          <span className="text-slate-400">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600">Categories</span>
        </nav>

        <section className="mt-7 grid gap-5 lg:grid-cols-3">
          <StatBox label="Total Categories" value={mockCategoryStats.total} />
          <StatBox label="Active Categories" value={mockCategoryStats.active} />
          <StatBox label="Inactive Categories" value={mockCategoryStats.inactive} />
        </section>

        <section className="mt-8 border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Category"
                className="h-12 rounded-none border-slate-200 pl-12 text-base text-slate-700 shadow-none placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-0"
              />
            </div>

            <Button
              size="icon"
              className="h-12 w-12 self-end rounded-lg bg-slate-950 shadow-sm hover:bg-slate-800 sm:self-auto"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </section>

        <div className="relative mt-8 flex gap-0">
          {/* Table */}
          <section
            className={cn(
              "overflow-hidden border border-slate-200 bg-white transition-all duration-300",
              selectedCategory ? "w-[55%]" : "w-full"
            )}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] table-fixed">
                <thead>
                  <tr className="border-b border-slate-200">
                    {columns.map((column) => (
                      <th
                        key={column}
                        className={cn(
                          "h-14 px-4 text-left text-sm font-semibold text-slate-500",
                          column === "Category Name" && "w-[40%]",
                          column === "Associated Items" && "w-[35%]",
                          column === "Created At" && "w-[25%]"
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
                  {filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "cursor-pointer border-b border-slate-200 last:border-b-0 hover:bg-slate-50",
                        selectedCategory?.id === category.id && "bg-purple-50"
                      )}
                    >
                      <td className="px-4 py-3 text-base font-semibold text-slate-950">
                        {category.name}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-950 shadow-sm">
                          <Box className="h-4 w-4" />
                          {category.associatedItems} Items
                        </span>
                      </td>
                      <td className="px-4 py-3 text-base font-medium text-slate-500">
                        {category.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Detail Panel */}
          {selectedCategory && (
            <aside className="w-[45%] border border-l-0 border-slate-200 bg-white">
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <div className="flex items-center gap-1">
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900">
                    <Info className="h-4 w-4" />
                  </button>
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Categories Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <FolderOpen className="h-4 w-4 text-slate-500" />
                    <h3 className="text-sm font-semibold text-slate-900">Categories Information</h3>
                  </div>

                  <p className="text-xs text-slate-400 mb-1">Category Name</p>
                  <p className="text-xl font-bold text-slate-900 mb-4">{selectedCategory.name}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-400 mb-1.5 flex items-center gap-1">
                        <span className="font-medium">#</span> Categories ID
                      </p>
                      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                        {selectedCategory.id}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1.5">Sort Number</p>
                      <p className="text-sm font-semibold text-slate-900 py-2">{selectedCategory.sortNumber}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 mb-2">Associated Items</p>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-950 shadow-sm">
                      <Box className="h-4 w-4" />
                      {selectedCategory.associatedItems} Items
                    </span>
                  </div>
                </div>

                {/* Timeline Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <h3 className="text-sm font-semibold text-slate-900">Timeline Information</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> Created At
                      </p>
                      <p className="text-sm font-semibold text-slate-900">{selectedCategory.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> Last Updated
                      </p>
                      <p className="text-sm font-semibold text-slate-900">{selectedCategory.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>

        <div className="flex flex-col items-end gap-4 bg-white px-3 py-5 sm:flex-row sm:justify-end">
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

          <p className="min-w-36 text-center text-base font-semibold text-slate-950">Page 1 of 1</p>

          <div className="flex items-center gap-3">
            <PaginationButton ariaLabel="First page" disabled>
              <ChevronsLeft className="h-5 w-5" />
            </PaginationButton>
            <PaginationButton ariaLabel="Previous page" disabled>
              <ChevronLeft className="h-5 w-5" />
            </PaginationButton>
            <PaginationButton ariaLabel="Next page" disabled>
              <ChevronRight className="h-5 w-5" />
            </PaginationButton>
            <PaginationButton ariaLabel="Last page" disabled>
              <ChevronsRight className="h-5 w-5" />
            </PaginationButton>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-8 py-8">
      <p className="text-base font-semibold text-slate-700">{label}</p>
      <p className="mt-5 text-4xl font-bold text-slate-950">{value}</p>
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
      className="h-12 w-16 rounded-lg border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50 disabled:text-slate-400"
    >
      {children}
    </Button>
  )
}
