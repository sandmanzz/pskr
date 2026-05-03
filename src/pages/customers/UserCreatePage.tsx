import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Eye, EyeOff, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

export function UserCreatePage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    nameKana: "",
    nickname: "",
    companyName: "",
    phone: "",
    postalCode: "",
    address: "",
  })

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$"
    const pwd = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
    setForm((prev) => ({ ...prev, password: pwd }))
  }

  const inputClass = "border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-300 h-11"

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
          <h1 className="text-2xl font-bold text-white">Create User</h1>
          <p className="text-sm text-purple-200 mt-0.5">Create a new user account</p>
        </div>
        <Button
          onClick={() => navigate("/customers")}
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
            onClick={() => navigate("/customers")}
          >
            Users
          </span>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700 font-medium">create</span>
        </nav>

        <div className="flex gap-6 items-start">
          {/* Main Form */}
          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-7">
            <h2 className="text-base font-bold text-slate-900 mb-6">Create new Users</h2>

            <div className="space-y-5">
              <Field
                label="Full name"
                required
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
                hint="Enter a secure password (8-255 characters)"
              >
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={set("password")}
                    placeholder="Enter your password"
                    className={`${inputClass} pr-10`}
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
                label="Name Kana"
                hint="Enter the user's name in katakana (optional)"
              >
                <Input
                  value={form.nameKana}
                  onChange={set("nameKana")}
                  placeholder="Enter your name in katakana"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Nickname"
                hint="Enter a nickname for the user (optional)"
              >
                <Input
                  value={form.nickname}
                  onChange={set("nickname")}
                  placeholder="Enter your nickname"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Company Name"
                hint="Enter the user's company name (optional)"
              >
                <Input
                  value={form.companyName}
                  onChange={set("companyName")}
                  placeholder="Enter your company name"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Phone Number"
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
                label="Postal Code"
                hint="Enter the user's postal code (optional)"
              >
                <Input
                  value={form.postalCode}
                  onChange={set("postalCode")}
                  placeholder="Enter your postal code"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Address"
                hint="Enter the user's address (optional)"
              >
                <Input
                  value={form.address}
                  onChange={set("address")}
                  placeholder="Enter your address"
                  className={inputClass}
                />
              </Field>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  className="bg-slate-700 hover:bg-slate-600 text-white gap-2 px-6"
                  onClick={() => navigate("/customers")}
                >
                  <Save className="h-4 w-4" />
                  Create Users
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-600 gap-2"
                  onClick={() => navigate("/customers")}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div className="w-72 shrink-0 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="text-sm font-bold text-blue-800 mb-3">Users Guidelines</h3>
            <ul className="space-y-2">
              {[
                "Enter the user's full name to clearly identify the account in the system",
                "Use a valid and unique email address for the user login",
                "Double-check the email address to avoid login issues",
                "Create a strong password using a mix of letters and numbers",
                "Avoid creating duplicate accounts for the same person",
                "Only create accounts for authorized users of the system",
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
