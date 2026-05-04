import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, ChevronRight, Plus, Save, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppStore } from "@/store/AppStore"

interface Variation {
  id: number
  name: string
  price: string
}

export function ShippingCreatePage() {
  const navigate = useNavigate()
  const { addShippingMethod } = useAppStore()
  const [methodName, setMethodName] = useState("")
  const [variations, setVariations] = useState<Variation[]>([{ id: 1, name: "", price: "0" }])
  const [saved, setSaved] = useState(false)

  const addVariation = () =>
    setVariations((prev) => [...prev, { id: Date.now(), name: "", price: "0" }])

  const removeVariation = (id: number) =>
    setVariations((prev) => prev.filter((v) => v.id !== id))

  const updateVariation = (id: number, key: keyof Variation, value: string) =>
    setVariations((prev) => prev.map((v) => (v.id === id ? { ...v, [key]: value } : v)))

  function handleSave() {
    if (!methodName.trim()) { alert("Nama shipping method wajib diisi"); return }
    if (variations.some((v) => !v.name.trim())) { alert("Semua variasi harus memiliki nama"); return }
    addShippingMethod(methodName.trim(), variations)
    setSaved(true)
    setTimeout(() => navigate("/settings/shipping"), 800)
  }

  const inputClass = "border-slate-200 h-11 text-sm"

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className="flex items-center justify-between px-10 py-5"
        style={{ background: "linear-gradient(135deg, #4a1f7b 0%, #31245f 48%, #17213c 100%)" }}
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Create Shipping Method</h1>
          <p className="text-sm text-purple-200 mt-0.5">Add a new shipping method to offer to your customers</p>
        </div>
        <Button onClick={() => navigate("/settings/shipping")} className="bg-white/10 hover:bg-white/20 text-white border border-white/25 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to list
        </Button>
      </header>

      <main className="px-10 py-5">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span className="text-slate-400">Dashboard</span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-400 cursor-pointer hover:text-slate-600" onClick={() => navigate("/settings/shipping")}>
            Shipping Methods
          </span>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-700 font-medium">create</span>
        </nav>

        <div className="flex gap-6 items-start">
          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-7">
            <h2 className="text-base font-bold text-slate-900 mb-6">Create new Shipping Methods</h2>

            {saved && (
              <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                Shipping method berhasil dibuat! Mengalihkan...
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700">
                  Shipping Method Name <span className="text-red-500">*</span>
                </Label>
                <Input value={methodName} onChange={(e) => setMethodName(e.target.value)} placeholder="Enter shipping method name" className={inputClass} />
                <p className="text-xs text-slate-400">Enter the shipping method name (2-100 characters)</p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    Shipping Variations <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-xs text-slate-400 mt-0.5">Add different pricing options for this shipping method (minimum 1, maximum 50)</p>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 mb-1">
                    <Label className="text-xs font-medium text-slate-500">Variation Name <span className="text-red-500">*</span></Label>
                    <Label className="text-xs font-medium text-slate-500">Variation Price <span className="text-red-500">*</span></Label>
                  </div>

                  {variations.map((v) => (
                    <div key={v.id} className="flex items-center gap-2">
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <Input value={v.name} onChange={(e) => updateVariation(v.id, "name", e.target.value)} placeholder="e.g., Standard, Express" className={inputClass} />
                        <Input value={v.price} onChange={(e) => updateVariation(v.id, "price", e.target.value)} className={inputClass} type="number" />
                      </div>
                      {variations.length > 1 && (
                        <button type="button" onClick={() => removeVariation(v.id)} className="text-slate-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <Button type="button" variant="outline" className="w-full border-slate-200 text-slate-600 gap-2 text-sm" onClick={addVariation}>
                  <Plus className="h-4 w-4" />Add Variation
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button className="bg-slate-700 hover:bg-slate-600 text-white gap-2 px-6" onClick={handleSave}>
                  <Save className="h-4 w-4" />Create new Shipping Methods
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-600 gap-2" onClick={() => navigate("/settings/shipping")}>
                  <X className="h-4 w-4" />Cancel
                </Button>
              </div>
            </div>
          </div>

          <div className="w-72 shrink-0 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="text-sm font-bold text-blue-800 mb-3">Create Shipping Method Information</h3>
            <ul className="space-y-2">
              {[
                "Choose a clear, descriptive name for your Shipping Methods",
                "Select appropriate colors for text and background",
                "Use 6-digit hex codes for color values (e.g., ffffff)",
                "Use sort numbers to control the display order",
                "Lower sort numbers appear first in lists",
                "Shipping Methods names must be unique and between 2-100 characters",
              ].map((tip) => (
                <li key={tip} className="flex gap-1.5 text-xs text-blue-700">
                  <span className="mt-0.5 shrink-0">•</span><span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
