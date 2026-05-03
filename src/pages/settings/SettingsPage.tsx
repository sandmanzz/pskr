import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ChevronRight, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type Tab = "shop" | "user"

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
      <div>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
        checked ? "bg-slate-900" : "bg-slate-200"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  )
}

const selectClass =
  "w-full h-11 rounded-md border border-slate-200 px-3 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 appearance-none"

export function SettingsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>("shop")

  // Shop Information state
  const [brandName, setBrandName] = useState("Otten")
  const [repName, setRepName] = useState("otten")
  const [storeAddress, setStoreAddress] = useState("HQ Otten")
  const [shopLogo, setShopLogo] = useState("")
  const [contactEmail, setContactEmail] = useState("otten@yopmail.com")
  const [contactPhone, setContactPhone] = useState("08123080213")
  const [sellUsedGoods, setSellUsedGoods] = useState(false)
  const [enableTax, setEnableTax] = useState(true)
  const [taxRate, setTaxRate] = useState("10")
  const [taxLabel, setTaxLabel] = useState("消費税")
  const [taxDisplayMode, setTaxDisplayMode] = useState("inclusive")
  const [taxRegNumber, setTaxRegNumber] = useState("T1234567890123")
  const [paymentMethods, setPaymentMethods] = useState("Payment Methods & Payment Timing")
  const [deliveryTiming, setDeliveryTiming] = useState("Delivery Timing")
  const [returnPolicy, setReturnPolicy] = useState("")

  // User Information state
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="flex items-center justify-between px-10 py-5"
        style={{
          background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-white">Edit Settings</h1>
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/25 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to list
        </Button>
      </header>

      <main className="px-10 py-5 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-5">
          <span className="text-slate-400">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-700 font-medium">Settings</span>
        </nav>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-bold text-slate-900 mb-5">Edit Settings</h2>

          {/* Tabs */}
          <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1 mb-7">
            {(["shop", "user"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md transition-colors",
                  tab === t
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {t === "shop" ? "Shop Information" : "User Information"}
              </button>
            ))}
          </div>

          {tab === "shop" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Shop Information</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Provide details about your shop that will be displayed to customers on the website,
                  checkout page, and in order confirmation emails.
                </p>
              </div>

              {/* Basic Details */}
              <SectionCard
                title="Basic Details"
                subtitle="Essential information about your business."
              >
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Business / Store / Brand Name" required>
                    <Input
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="border-slate-200 h-11"
                    />
                  </Field>
                  <Field label="Representative Name" required>
                    <Input
                      value={repName}
                      onChange={(e) => setRepName(e.target.value)}
                      className="border-slate-200 h-11"
                    />
                  </Field>
                </div>
                <Field label="Store Address (This will be the address you shipping the order from)">
                  <Input
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    className="border-slate-200 h-11"
                  />
                </Field>
                <Field label="Shop Logo">
                  <div className="relative">
                    <select
                      value={shopLogo}
                      onChange={(e) => setShopLogo(e.target.value)}
                      className={selectClass}
                    >
                      <option value="" />
                      <option value="logo1">Logo 1</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </Field>
              </SectionCard>

              {/* Contact Information */}
              <SectionCard
                title="Contact Information"
                subtitle="How customers can reach you."
              >
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Contact Email">
                    <Input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="border-slate-200 h-11"
                    />
                  </Field>
                  <Field label="Contact Phone Number">
                    <Input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="border-slate-200 h-11"
                    />
                  </Field>
                </div>
              </SectionCard>

              {/* Product Type */}
              <SectionCard
                title="Product Type"
                subtitle="Specify whether you sell new or used goods."
              >
                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Do you sell used goods?</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Toggle this if your shop sells secondhand or used goods
                    </p>
                  </div>
                  <Toggle checked={sellUsedGoods} onChange={setSellUsedGoods} />
                </div>
              </SectionCard>

              {/* Tax Settings */}
              <SectionCard
                title="Tax Settings"
                subtitle="Configure how tax is calculated and displayed"
              >
                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Enable Tax</p>
                    <p className="text-xs text-slate-400 mt-0.5">Calculate and apply tax to orders</p>
                  </div>
                  <Toggle checked={enableTax} onChange={setEnableTax} />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <Field
                    label="Tax Rate (%)"
                    hint="Enter tax rate as a percentage (e.g. 10% = 10)"
                  >
                    <Input
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="border-slate-200 h-11"
                    />
                  </Field>
                  <Field label="Tax Label">
                    <Input
                      value={taxLabel}
                      onChange={(e) => setTaxLabel(e.target.value)}
                      className="border-slate-200 h-11"
                    />
                  </Field>
                </div>

                <Field
                  label="Tax Display Mode"
                  hint="Choose whether prices include tax (Japan standard) or exclude tax"
                >
                  <div className="relative">
                    <select
                      value={taxDisplayMode}
                      onChange={(e) => setTaxDisplayMode(e.target.value)}
                      className={selectClass}
                    >
                      <option value="inclusive">Tax Inclusive (price includes tax)</option>
                      <option value="exclusive">Tax Exclusive (price excludes tax)</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </Field>

                <Field
                  label="Tax Registration Number"
                  hint="Japan Qualified Invoice System registration number (optional)"
                >
                  <Input
                    value={taxRegNumber}
                    onChange={(e) => setTaxRegNumber(e.target.value)}
                    className="border-slate-200 h-11"
                  />
                </Field>
              </SectionCard>

              {/* Payment & Delivery */}
              <SectionCard
                title="Payment & Delivery"
                subtitle="Information shown to customers during checkout."
              >
                <Field
                  label="Payment Methods & Payment Timing"
                  hint="This information will be shown on the checkout page and in order confirmation emails."
                >
                  <textarea
                    value={paymentMethods}
                    onChange={(e) => setPaymentMethods(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 resize-y"
                  />
                </Field>
                <Field
                  label="Delivery Timing"
                  hint="This information will be shown on the checkout page and in order confirmation emails."
                >
                  <textarea
                    value={deliveryTiming}
                    onChange={(e) => setDeliveryTiming(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 resize-y"
                  />
                </Field>
              </SectionCard>

              {/* Return & Cancellation Policy */}
              <SectionCard
                title="Return & Cancellation Policy"
                subtitle="Customer-facing policy information."
              >
                <Field
                  label="Return & Cancellation Policy"
                  hint="Combine all return-related information here. This will be displayed on the website, checkout page, and in order confirmation emails."
                >
                  <textarea
                    value={returnPolicy}
                    onChange={(e) => setReturnPolicy(e.target.value)}
                    rows={5}
                    placeholder="Enter your return and cancellation policy details (including return date, return shipping, exchanges, and cancellations)"
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 resize-y"
                  />
                </Field>
              </SectionCard>
            </div>
          )}

          {tab === "user" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">User Information</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Manage your account credentials and login information
                </p>
              </div>

              <SectionCard title="" subtitle="">
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Email">
                    <Input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="otten@yopmail.com"
                      className="border-slate-200 h-11"
                    />
                  </Field>
                  <Field label="Password" hint="Leave blank to keep current password, or enter a new password to change it.">
                    <Input
                      type="password"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your password"
                      className="border-slate-200 h-11"
                    />
                  </Field>
                </div>
                <Field label="Profile Image">
                  <div className="relative">
                    <select className="w-full h-11 rounded-md border border-slate-200 px-3 text-sm text-slate-700 bg-white focus:outline-none appearance-none">
                      <option value="" />
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </Field>
              </SectionCard>
            </div>
          )}


          {/* Actions */}
          <div className="flex items-center gap-3 mt-7 pt-5 border-t border-slate-100">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2 px-6">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 text-slate-600 gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
