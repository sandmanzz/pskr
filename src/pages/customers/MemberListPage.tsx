import { useMemo, useState } from "react"
import { ChevronRight, LayoutGrid, Plus, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const mockMemberStats = { total: 0, active: 0, inactive: 0 }
const mockMembers: { id: number; email: string; status: string; createdAt: string }[] = []

export function MemberListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return mockMembers
    return mockMembers.filter((m) => m.email.toLowerCase().includes(q))
  }, [search])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className="flex items-center justify-between px-10 py-5"
        style={{
          background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-white">Member Management</h1>
        <Button
          className="bg-white/10 hover:bg-white/20 text-white border border-white/25 gap-1.5"
          onClick={() => navigate("/customers/member/new")}
        >
          <Plus className="h-4 w-4" />
          Create Member
        </Button>
      </header>

      <main className="px-10 py-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span className="text-slate-400">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-700 font-medium">Member</span>
        </nav>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-5 mb-7">
          <StatCard label="Total Members" value={mockMemberStats.total} />
          <StatCard label="Active Members" value={mockMemberStats.active} />
          <StatCard label="Inactive Members" value={mockMemberStats.inactive} />
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 rounded border border-slate-200 bg-white p-4 mb-0">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Data..."
              className="pl-9 border-slate-200 text-sm shadow-none focus-visible:ring-1"
            />
          </div>
          <Button
            size="icon"
            className="h-9 w-9 rounded-md bg-slate-950 hover:bg-slate-800 shrink-0"
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>

        {/* Table / Empty state */}
        <div className="rounded-b border border-t-0 border-slate-200 bg-white">
          {filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-7 w-7 text-slate-400" />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-slate-900">No data available</p>
                <p className="text-sm text-slate-400 mt-1">
                  Get started by creating your first data.
                </p>
              </div>
              <Button
                className="bg-slate-950 hover:bg-slate-800 text-white gap-1.5"
                onClick={() => navigate("/customers/member/new")}
              >
                <Plus className="h-4 w-4" />
                Create Your First data
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{m.email}</td>
                      <td className="px-4 py-3 text-slate-500">{m.status}</td>
                      <td className="px-4 py-3 text-slate-500">{m.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5">
      <p className="text-sm font-medium text-slate-600 mb-3">{label}</p>
      <p className="text-4xl font-bold text-slate-900">{value}</p>
    </div>
  )
}
