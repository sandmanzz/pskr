import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ChevronRight, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PaymentSettingsPage() {
  const navigate = useNavigate()
  const [stripeKey, setStripeKey] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className="flex items-center justify-between px-10 py-5"
        style={{
          background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-white">Payment Settings</h1>
        <Button
          onClick={() => navigate("/settings")}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/25 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </header>

      <main className="px-10 py-5 max-w-5xl">
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
          <span className="text-slate-700 font-medium">payments</span>
        </nav>

        <div className="space-y-5">
          {/* Stripe Settings */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-bold text-slate-900 mb-5">Stripe Settings</h3>
            <div className="space-y-1.5 mb-4">
              <label className="text-sm font-medium text-slate-700">Stripe Secret Key</label>
              <Input
                value={stripeKey}
                onChange={(e) => setStripeKey(e.target.value)}
                placeholder="Enter your Stripe secret key (sk_test_... or sk_live_...)"
                className="border-slate-200 h-11"
              />
              <p className="text-xs text-slate-400">
                Your Stripe secret key is used to process payments. Keep this secure and never share it publicly.
              </p>
            </div>
            <div className="flex justify-end">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
                <Save className="h-4 w-4" />
                save
              </Button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-bold text-slate-900 mb-5">Payment Methods</h3>
            <p className="text-sm text-slate-400">No payment methods available.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
