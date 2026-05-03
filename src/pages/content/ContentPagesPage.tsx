import { useState } from "react"
import { ChevronRight, Info, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const mockPages = [
  { id: 1, title: "Home", slug: "/", status: "Published", lastUpdated: "Apr 30, 2026" },
]

export function ContentPagesPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="px-10 py-6"
        style={{
          background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-white">Content Management</h1>
      </header>

      <main className="px-10 py-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span className="text-slate-400">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-700 font-medium">Content</span>
        </nav>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-5 mb-7">
          {/* Current Plan */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Current Plan</p>
              <button className="text-slate-400 hover:text-slate-600">
                <Info className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xl font-bold text-slate-900 mb-3">Trial Business Plan</p>
            <p className="text-sm text-slate-600 mb-1">
              Until the end of <span className="font-bold text-slate-900">15</span>
            </p>
            <p className="text-xs text-slate-400 mb-4">
              * After termination, various functions will be restricted.
            </p>
            <Button variant="outline" className="border-slate-300 text-slate-700 text-sm px-5">
              Upgrade Plan
            </Button>
          </div>

          {/* Usage Status */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500 mb-2">Usage Status</p>
            <p className="text-4xl font-bold text-slate-900 mb-2">1 / 20</p>
            <p className="text-sm text-slate-500">You have 20 pages left to create</p>
          </div>
        </div>

        {/* Website Layout */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 mb-7">
          <h2 className="text-base font-bold text-slate-900 mb-1">Website Layout</h2>
          <p className="text-sm text-slate-500 mb-5">
            Your header and footer appear on all pages of your website.
          </p>

          <div className="grid grid-cols-2 gap-5">
            {/* Global Header */}
            <div className="rounded-xl border border-slate-200 p-5">
              {/* Header preview mockup */}
              <div className="rounded-md border border-slate-100 bg-slate-50 p-3 mb-4 flex items-center justify-between">
                <div className="h-2.5 w-24 rounded bg-slate-200" />
                <div className="flex gap-2">
                  <div className="h-2 w-10 rounded bg-slate-200" />
                  <div className="h-2 w-10 rounded bg-slate-200" />
                  <div className="h-2 w-10 rounded bg-slate-200" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Global Header</h3>
              <p className="text-xs text-slate-500 mb-4">
                This header appears on all pages of your website. Any changes made here will update
                every page automatically.
              </p>
              <Button className="w-full bg-slate-950 hover:bg-slate-800 text-white text-sm">
                Edit Header
              </Button>
            </div>

            {/* Global Footer */}
            <div className="rounded-xl border border-slate-200 p-5">
              {/* Footer preview mockup */}
              <div className="rounded-md border border-slate-100 bg-slate-50 p-3 mb-4">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-slate-200" />
                      <div className="h-1.5 w-3/4 rounded bg-slate-100" />
                      <div className="h-1.5 w-1/2 rounded bg-slate-100" />
                    </div>
                  ))}
                </div>
                <div className="h-1.5 w-1/3 rounded bg-slate-200" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Global Footer</h3>
              <p className="text-xs text-slate-500 mb-4">
                This footer appears on all pages of your website. Any changes made here will update
                every page automatically.
              </p>
              <Button className="w-full bg-slate-950 hover:bg-slate-800 text-white text-sm">
                Edit Footer
              </Button>
            </div>
          </div>
        </div>

        {/* Pages Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">Pages</h2>
            <Button
              className="bg-slate-950 hover:bg-slate-800 text-white text-sm gap-1.5"
              onClick={() => navigate("/content/pages/new")}
            >
              <Plus className="h-4 w-4" />
              Create Page
            </Button>
          </div>

          <div className="mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages..."
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Slug</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Last Updated</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {mockPages
                  .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
                  .map((page) => (
                    <tr key={page.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{page.title}</td>
                      <td className="px-4 py-3 text-slate-500">{page.slug}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                          {page.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{page.lastUpdated}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="text-xs text-slate-500">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
