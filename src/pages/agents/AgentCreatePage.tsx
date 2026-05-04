import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store/AppStore"
import {
  ArrowLeft,
  Building2,
  CreditCard,
  Eye,
  EyeOff,
  Gift,
  Hash,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  Tag,
  User,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function Field({
  label,
  required,
  hint,
  icon,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-400">{icon}</span>}
        <Label className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      </div>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="pt-2 pb-1">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <div className="mt-2 border-t border-slate-100" />
    </div>
  )
}

export function AgentCreatePage() {
  const navigate = useNavigate()
  const { addAgent } = useAppStore()

  const [showPassword, setShowPassword] = useState(false)
  const [enableBonus, setEnableBonus] = useState(false)

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    member: "",
    parentAgent: "",
    managerName: "",
    status: "0",
    bankName: "",
    bankCode: "",
    bankBranchName: "",
    branchCode: "",
    bankType: "",
    bankAccountNumber: "",
    bankAccountHolderName: "",
    gtag: "",
    memo: "",
  })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$"
    const pwd = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
    setForm((prev) => ({ ...prev, password: pwd }))
  }

  const inputClass = "border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-300 h-11"
  const selectClass = "w-full h-11 rounded-md border border-slate-200 px-3 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 appearance-none"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="flex items-center justify-between px-10 py-5"
        style={{
          background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)",
        }}
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Create Agent</h1>
          <p className="text-sm text-purple-200 mt-0.5">Add a new agent to the network structure</p>
        </div>
        <Button
          onClick={() => navigate("/agents")}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/25 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to list
        </Button>
      </header>

      <main className="px-10 py-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span className="text-slate-400">Dashboard</span>
          <span className="text-slate-300">›</span>
          <span
            className="text-slate-400 cursor-pointer hover:text-slate-600"
            onClick={() => navigate("/agents")}
          >
            Agents
          </span>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700 font-medium">create</span>
        </nav>

        <div className="flex gap-6 items-start">
          {/* Main Form */}
          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-7">
            <h2 className="text-base font-bold text-slate-900 mb-5">Create Agents</h2>

            <div className="space-y-5">
              {/* Personal Information */}
              <SectionDivider title="Personal Information" />

              <Field
                label="Full name"
                required
                icon={<User className="h-4 w-4" />}
                hint="Full name must be at least 2 characters and not exceed 100 characters"
              >
                <Input
                  value={form.fullName}
                  onChange={set("fullName")}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Email"
                required
                icon={<Mail className="h-4 w-4" />}
                hint="Please enter a valid email address"
              >
                <Input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="Enter your email address"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Password"
                required
                icon={<Lock className="h-4 w-4" />}
                hint="Password must be at least 6 characters"
              >
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={set("password")}
                    placeholder="Enter your password"
                    className={cn(inputClass, "pr-10")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generatePassword}
                  className="mt-1 text-xs border-slate-200"
                >
                  Generate Password
                </Button>
              </Field>

              <Field
                label="Phone Number"
                icon={<Phone className="h-4 w-4" />}
                hint="Enter the user's phone number (optional)"
              >
                <Input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="Enter your phone number"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Address"
                icon={<MapPin className="h-4 w-4" />}
                hint="Enter the user's address (optional)"
              >
                <Input
                  value={form.address}
                  onChange={set("address")}
                  placeholder="Enter your address"
                  className={inputClass}
                />
              </Field>

              {/* Agent Information */}
              <SectionDivider title="Agent Information" />

              <Field
                label="Member"
                icon={<User className="h-4 w-4" />}
                hint="Enter the associated member"
              >
                <div className="relative">
                  <select value={form.member} onChange={set("member")} className={selectClass}>
                    <option value="">Select Member</option>
                    <option value="1">Member 1</option>
                    <option value="2">Member 2</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </Field>

              <Field
                label="Parent Agent"
                icon={<Users className="h-4 w-4" />}
                hint="Enter the parent agent ID"
              >
                <div className="relative">
                  <select value={form.parentAgent} onChange={set("parentAgent")} className={selectClass}>
                    <option value="">Select Parent Agent</option>
                    <option value="1">Agent 1</option>
                    <option value="2">Agent 2</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </Field>

              <Field
                label="Manager name"
                required
                icon={<Users className="h-4 w-4" />}
                hint="Enter the manager's name (1-255 characters)"
              >
                <Input
                  value={form.managerName}
                  onChange={set("managerName")}
                  placeholder="Enter your manager name"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Status"
                required
                hint="Select the agent's current status"
              >
                <div className="relative">
                  <select value={form.status} onChange={set("status")} className={selectClass}>
                    <option value="0">0 — Inactive</option>
                    <option value="1">1 — Active</option>
                    <option value="2">2 — Invited</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </Field>

              {/* Banking Information */}
              <SectionDivider title="Banking Information" />

              <Field
                label="Bank Name"
                required
                icon={<Building2 className="h-4 w-4" />}
                hint="Bank name must be at least 2 characters and not exceed 255 characters"
              >
                <Input
                  value={form.bankName}
                  onChange={set("bankName")}
                  placeholder="Enter the bank name"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Bank Code"
                required
                icon={<Hash className="h-4 w-4" />}
                hint="Select a bank to auto-fill this code, or type manually"
              >
                <Input
                  value={form.bankCode}
                  onChange={set("bankCode")}
                  placeholder="e.g. 0001"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Bank Branch Name"
                required
                icon={<Building2 className="h-4 w-4" />}
                hint="Bank branch name must be at least 2 characters and not exceed 255 characters"
              >
                <Input
                  value={form.bankBranchName}
                  onChange={set("bankBranchName")}
                  placeholder="Enter the bank branch name"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Branch Code"
                required
                icon={<Hash className="h-4 w-4" />}
                hint="Select a branch to auto-fill this code, or type manually"
              >
                <Input
                  value={form.branchCode}
                  onChange={set("branchCode")}
                  placeholder="e.g. 001"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Bank Type"
                required
                icon={<CreditCard className="h-4 w-4" />}
              >
                <div className="relative">
                  <select value={form.bankType} onChange={set("bankType")} className={selectClass}>
                    <option value="">Enter the bank type</option>
                    <option value="savings">Savings</option>
                    <option value="checking">Checking</option>
                    <option value="current">Current</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </Field>

              <Field
                label="Bank Account Number"
                required
                icon={<CreditCard className="h-4 w-4" />}
                hint="Bank account number must be at least 2 characters and not exceed 50 characters"
              >
                <Input
                  value={form.bankAccountNumber}
                  onChange={set("bankAccountNumber")}
                  placeholder="Enter the bank account number"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Bank Account Holder Name"
                required
                icon={<User className="h-4 w-4" />}
                hint="Bank account holder name must be at least 2 characters and not exceed 255 characters"
              >
                <Input
                  value={form.bankAccountHolderName}
                  onChange={set("bankAccountHolderName")}
                  placeholder="Enter the bank account holder name"
                  className={inputClass}
                />
              </Field>

              {/* Settings */}
              <SectionDivider title="Settings" />

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="enableBonus"
                  checked={enableBonus}
                  onChange={(e) => setEnableBonus(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
                />
                <label htmlFor="enableBonus" className="cursor-pointer">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Gift className="h-4 w-4 text-slate-400" />
                    Enable Bonus Setting
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Enable bonus settings for this agent</p>
                </label>
              </div>

              <Field
                label="GTag"
                icon={<Tag className="h-4 w-4" />}
                hint="GTag must be at least 2 characters and not exceed 100 characters"
              >
                <Input
                  value={form.gtag}
                  onChange={set("gtag")}
                  placeholder="Enter the GTag"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Memo"
                hint="Optional memo or notes about this member (max 500 characters)"
              >
                <textarea
                  value={form.memo}
                  onChange={set("memo")}
                  placeholder="Enter any additional notes"
                  rows={3}
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 resize-y"
                />
              </Field>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  className="bg-slate-700 hover:bg-slate-600 text-white gap-2 px-6"
                  onClick={() => {
                    if (!form.fullName.trim() || !form.email.trim()) {
                      alert("Nama dan email wajib diisi")
                      return
                    }
                    addAgent({ name: form.fullName.trim(), email: form.email.trim(), active: form.status === "1" })
                    navigate("/agents")
                  }}
                >
                  <Save className="h-4 w-4" />
                  Create Agents
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-600 gap-2"
                  onClick={() => navigate("/agents")}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div className="w-72 shrink-0 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="text-sm font-bold text-blue-800 mb-3">Guidelines Agents</h3>
            <ul className="space-y-2">
              {[
                "Enter the agent's full legal name as registered",
                "Use a valid and unique email address for login and communication",
                "Assign a parent agent correctly to maintain the agent hierarchy",
                "Select the correct status (active, inactive, or invited)",
                "Ensure manager name is accurate for reporting and supervision",
                "Bank information must match official records (bank name, branch, and codes)",
                "Bank account number and account holder name must be correct for payouts",
                "Double-check bank code and branch code consistency",
                "Enable bonus settings only if the agent is eligible",
                "Use memo field for internal notes only (not visible externally)",
              ].map((tip) => (
                <li key={tip} className="flex gap-1.5 text-xs text-blue-700">
                  <span className="mt-0.5 shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
