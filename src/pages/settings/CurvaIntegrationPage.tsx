import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ChevronRight, Copy, Key, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CurvaIntegrationPage() {
  const navigate = useNavigate()
  const [curvaApiKey, setCurvaApiKey] = useState("")
  const [lineHandle, setLineHandle] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const apiKey = "kuru_live_7aed4fa572f4d8914e2fb0c60d2094d03798aa598024b8d6"
  const shopId = "kuru_shop_ae24f43f"

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className="flex items-center justify-between px-10 py-5"
        style={{
          background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-white">Curva Integration</h1>
        <Button
          onClick={() => navigate("/settings")}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/25 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </header>

      <main className="px-10 py-5 max-w-4xl">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span className="text-slate-400">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span
            className="text-slate-400 cursor-pointer hover:text-slate-600"
            onClick={() => navigate("/settings")}
          >
            Settings
          </span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-700 font-medium">integration</span>
        </nav>

        <div className="space-y-5">
          {/* API Key + Shop ID */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-1">
                <Key className="h-4 w-4 text-slate-500" />
                <h3 className="text-sm font-bold text-slate-900">Pasukuru API Key</h3>
              </div>
              <p className="text-xs text-slate-400">
                Share this API key with Curva to enable bidirectional communication.
              </p>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={apiKey}
                  className="border-slate-200 h-11 text-sm bg-white font-mono text-slate-600"
                />
                <button
                  onClick={() => copyToClipboard(apiKey, "api")}
                  className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-500"
                  title="Copy"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              {copied === "api" && (
                <p className="text-xs text-green-600">Copied!</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag className="h-4 w-4 text-slate-500" />
                <h3 className="text-sm font-bold text-slate-900">Shop ID</h3>
              </div>
              <p className="text-xs text-slate-400">
                Your unique shop identifier for external integrations
              </p>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={shopId}
                  className="border-slate-200 h-11 text-sm bg-white font-mono text-slate-600"
                />
                <button
                  onClick={() => copyToClipboard(shopId, "shop")}
                  className="flex items-center justify-center h-11 w-11 shrink-0 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-500"
                  title="Copy"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              {copied === "shop" && (
                <p className="text-xs text-green-600">Copied!</p>
              )}
            </div>
          </div>

          {/* Curva Connection */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Curva Connection</h3>
              <p className="text-sm text-slate-400 mt-0.5">
                Configure your connection to Curva using their API credentials.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-slate-400" />
                <label className="text-sm font-medium text-slate-700">Curva API Key</label>
              </div>
              <Input
                value={curvaApiKey}
                onChange={(e) => setCurvaApiKey(e.target.value)}
                placeholder="Enter Curva API key"
                className="border-slate-200 h-11"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                <label className="text-sm font-medium text-slate-700">LINE Account Handle</label>
              </div>
              <Input
                value={lineHandle}
                onChange={(e) => setLineHandle(e.target.value)}
                placeholder="Enter LINE account handle (e.g., @curva_shop)"
                className="border-slate-200 h-11"
              />
            </div>

            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8">
              Connect
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
