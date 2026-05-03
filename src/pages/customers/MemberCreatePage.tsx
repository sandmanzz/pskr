import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Eye, EyeOff, Mail, Save, Shield, Upload, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

export function MemberCreatePage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [enableEmail, setEnableEmail] = useState(false)
  const [fileName, setFileName] = useState("")
  const [form, setForm] = useState({
    email: "",
    password: "",
    status: "",
    memo: "",
  })

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
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
          <h1 className="text-2xl font-bold text-white">Create Member</h1>
          <p className="text-sm text-purple-200 mt-0.5">Add a new member to the system</p>
        </div>
        <Button
          onClick={() => navigate("/customers/member")}
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
            onClick={() => navigate("/customers/member")}
          >
            Member
          </span>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700 font-medium">create</span>
        </nav>

        <div className="flex gap-6 items-start">
          {/* Main Form */}
          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-7">
            <h2 className="text-base font-bold text-slate-900 mb-6">Create new Member</h2>

            <div className="space-y-5">
              {/* Profile Avatar */}
              <Field
                label="Profile Avatar"
                required
                icon={<User className="h-4 w-4" />}
                hint="Upload an avatar image (JPEG, PNG, GIF, or WebP, max 5MB)"
              >
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-between h-11 rounded-md border border-slate-200 px-3 cursor-pointer hover:bg-slate-50 text-sm text-slate-500">
                    <span>{fileName || "Choose File  No file chosen"}</span>
                    <Upload className="h-4 w-4 text-slate-400" />
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="sr-only"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                    />
                  </label>
                </div>
              </Field>

              {/* Email */}
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

              {/* Password */}
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

              {/* Status */}
              <Field
                label="Status"
                required
                icon={<Shield className="h-4 w-4" />}
                hint="Select the member's current status"
              >
                <div className="relative">
                  <select value={form.status} onChange={set("status")} className={selectClass}>
                    <option value="" />
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="invited">Invited</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </Field>

              {/* Enable Email Notification */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="enableEmail"
                  checked={enableEmail}
                  onChange={(e) => setEnableEmail(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300"
                />
                <label htmlFor="enableEmail" className="cursor-pointer">
                  <p className="text-sm font-medium text-slate-700">Enable Email Notification</p>
                  <p className="text-xs text-slate-400 mt-0.5">Allow this member to receive email notifications</p>
                </label>
              </div>

              {/* Memo */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">Memo</Label>
                <textarea
                  value={form.memo}
                  onChange={set("memo")}
                  placeholder="Enter any additional notes"
                  rows={3}
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 resize-y"
                />
                <p className="text-xs text-slate-400">Optional memo or notes about this member (max 500 characters)</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  className="bg-slate-700 hover:bg-slate-600 text-white gap-2 px-6"
                  onClick={() => navigate("/customers/member")}
                >
                  <Save className="h-4 w-4" />
                  Create Member
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-600 gap-2"
                  onClick={() => navigate("/customers/member")}
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
                "Choose a clear, descriptive name for your category",
                "Select appropriate colors for text and background",
                "Use 6-digit hex codes for color values (e.g., ffffff)",
                "Use sort numbers to control the display order",
                "Lower sort numbers appear first in lists",
                "Category names must be unique and between 2-100 characters",
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
