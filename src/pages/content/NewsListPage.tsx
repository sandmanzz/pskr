import { useMemo, useState } from "react"
import { ChevronRight, LayoutGrid, Plus, Search, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/store/AppStore"

export function NewsListPage() {
  const { news, addNews, deleteNews } = useAppStore()
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [formTitle, setFormTitle] = useState("")
  const [formStatus, setFormStatus] = useState("draft")

  const filteredNews = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return news
    return news.filter((n) => n.title.toLowerCase().includes(q))
  }, [search, news])

  const stats = {
    total: news.length,
    published: news.filter((n) => n.status === "published").length,
    draft: news.filter((n) => n.status === "draft").length,
  }

  function handleSave() {
    if (!formTitle.trim()) { alert("Judul wajib diisi"); return }
    addNews({ title: formTitle.trim(), status: formStatus, publishedAt: formStatus === "published" ? new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "" })
    setShowModal(false)
    setFormTitle("")
    setFormStatus("draft")
  }

  function handleDelete(id: number) {
    if (!window.confirm("Hapus berita ini?")) return
    deleteNews(id)
  }

  return (
    <div className="min-h-screen bg-white">
      <header
        className="flex items-center justify-between px-10 py-5"
        style={{ background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)" }}
      >
        <h1 className="text-2xl font-bold text-white">News Management</h1>
        <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/25 gap-1.5" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Create News
        </Button>
      </header>

      <main className="px-10 py-5">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span className="text-slate-400">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-700 font-medium">News</span>
        </nav>

        <div className="grid grid-cols-3 gap-5 mb-7">
          <StatCard label="Total News" value={stats.total} />
          <StatCard label="News Published" value={stats.published} />
          <StatCard label="Draft News" value={stats.draft} />
        </div>

        <div className="flex items-center justify-between gap-4 rounded-t border border-slate-200 bg-white p-4 mb-0">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search News" className="pl-9 border-slate-200 text-sm shadow-none focus-visible:ring-1" />
          </div>
          <Button size="icon" className="h-9 w-9 rounded-md bg-slate-950 hover:bg-slate-800 shrink-0">
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-b border border-t-0 border-slate-200 bg-white">
          {filteredNews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-7 w-7 text-slate-400" />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-slate-900">No data available</p>
                <p className="text-sm text-slate-400 mt-1">Get started by creating your first data.</p>
              </div>
              <Button className="bg-slate-950 hover:bg-slate-800 text-white gap-1.5" onClick={() => setShowModal(true)}>
                <Plus className="h-4 w-4" />Create Your First data
              </Button>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Published At</th>
                  <th className="px-4 py-3 w-12" />
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((item) => (
                  <tr key={item.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{item.title}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === "published" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{item.publishedAt || "—"}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-slate-900">Create News</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">Title <span className="text-red-500">*</span></Label>
                <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Masukkan judul berita" className="border-slate-200 h-11" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">Status</Label>
                <div className="relative">
                  <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="w-full h-11 rounded-md border border-slate-200 px-3 text-sm text-slate-700 bg-white focus:outline-none appearance-none">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white flex-1" onClick={handleSave}>Create</Button>
              <Button variant="outline" className="border-slate-200 text-slate-600" onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
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
