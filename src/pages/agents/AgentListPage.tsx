import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown,
  GitFork, LayoutGrid, Plus, Search, Trash2,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppStore } from "@/store/AppStore"
import { cn } from "@/lib/utils"

const columns = ["Name", "Email", "Unique Referal Code", "Created At"]

export function AgentListPage() {
  const navigate = useNavigate()
  const { agents, deleteAgent } = useAppStore()
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState("10")

  const filteredAgents = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return agents
    return agents.filter((a) =>
      [a.name, a.email, a.referralCode, a.createdAt].some((v) => v.toLowerCase().includes(query))
    )
  }, [search, agents])

  const stats = {
    total: agents.length,
    active: agents.filter((a) => a.active).length,
    inactive: agents.filter((a) => !a.active).length,
  }

  function handleDelete(id: number) {
    if (!window.confirm("Hapus agent ini?")) return
    deleteAgent(id)
  }

  return (
    <div className="min-h-screen bg-white">
      <header
        className="flex flex-col gap-5 rounded-b-[18px] px-7 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10"
        style={{ background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)" }}
      >
        <h1 className="text-3xl font-bold leading-tight text-white">Agents Management</h1>
        <Button
          onClick={() => navigate("/agents/new")}
          variant="outline"
          className="h-11 w-fit rounded-none border-white/25 bg-white/10 px-7 text-base font-medium text-white hover:bg-white/15 hover:text-white"
        >
          <Plus className="h-5 w-5" />
          Create Agents
        </Button>
      </header>

      <main className="px-6 py-5 sm:px-10">
        <nav className="flex items-center gap-3 text-base font-medium text-slate-500">
          <span className="text-slate-400">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-600">Agents</span>
        </nav>

        <section className="mt-7 grid gap-5 lg:grid-cols-3">
          <StatBox label="Total Agents" value={stats.total} />
          <StatBox label="Active Agents" value={stats.active} valueClassName="text-green-600" />
          <StatBox label="Inactive Agents" value={stats.inactive} valueClassName="text-slate-500" />
        </section>

        <section className="mt-8 border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Data..."
                className="h-12 rounded-none border-slate-200 pl-12 text-base text-slate-700 shadow-none placeholder:text-slate-500 focus-visible:ring-1"
              />
            </div>
            <div className="flex self-end border border-slate-200 sm:self-auto">
              <Button size="icon" className="h-12 w-14 rounded-none bg-slate-950 text-white hover:bg-slate-800">
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-14 rounded-none text-slate-950 hover:bg-slate-50">
                <GitFork className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] table-fixed">
              <thead>
                <tr className="border-b border-slate-200">
                  {columns.map((col) => (
                    <th key={col} className={cn("h-14 px-4 text-left text-sm font-semibold text-slate-500", col === "Name" && "w-[22%]", col === "Email" && "w-[32%]", col === "Unique Referal Code" && "w-[22%]", col === "Created At" && "w-[18%]")}>
                      <button type="button" className="inline-flex items-center gap-3">
                        {col}<ChevronsUpDown className="h-4 w-4 text-slate-500" />
                      </button>
                    </th>
                  ))}
                  <th className="h-14 px-4 w-[6%]" />
                </tr>
              </thead>
              <tbody>
                {filteredAgents.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-16 text-slate-400">Belum ada agent</td></tr>
                ) : (
                  filteredAgents.map((agent) => (
                    <tr key={agent.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                      <td className="px-4 py-3 text-base font-semibold text-slate-950">{agent.name}</td>
                      <td className="px-4 py-3 text-base font-semibold text-slate-950">{agent.email}</td>
                      <td className="px-4 py-3 text-base font-semibold text-slate-950">{agent.referralCode}</td>
                      <td className="px-4 py-3 text-base font-medium text-slate-500">{agent.createdAt}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleDelete(agent.id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

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
            <PaginationButton ariaLabel="First page" disabled><ChevronsLeft className="h-5 w-5" /></PaginationButton>
            <PaginationButton ariaLabel="Previous page" disabled><ChevronLeft className="h-5 w-5" /></PaginationButton>
            <PaginationButton ariaLabel="Next page" disabled><ChevronRight className="h-5 w-5" /></PaginationButton>
            <PaginationButton ariaLabel="Last page" disabled><ChevronsRight className="h-5 w-5" /></PaginationButton>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatBox({ label, value, valueClassName }: { label: string; value: number; valueClassName?: string }) {
  return (
    <div className="border border-slate-200 bg-white px-8 py-8">
      <p className="text-base font-semibold text-slate-950">{label}</p>
      <p className={cn("mt-4 text-3xl font-bold text-slate-950", valueClassName)}>{value}</p>
    </div>
  )
}

function PaginationButton({ ariaLabel, children, disabled }: { ariaLabel: string; children: ReactNode; disabled?: boolean }) {
  return (
    <Button type="button" variant="outline" size="icon" disabled={disabled} aria-label={ariaLabel} className="h-12 w-14 rounded-none border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-50 disabled:text-slate-400">
      {children}
    </Button>
  )
}
