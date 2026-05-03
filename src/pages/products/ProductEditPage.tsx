import { useRef, useState } from "react"
import type { ReactNode } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Plus,
  Quote,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { mockProducts } from "@/data/mockData"

export function ProductEditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = !id || id === "new"
  const product = isNew ? null : (mockProducts.find((p) => p.id === Number(id)) ?? null)

  const [name, setName] = useState(isNew ? "" : (product?.name ?? ""))
  const [price, setPrice] = useState(isNew ? "" : (product?.price.toString() ?? ""))
  const [shortSummary, setShortSummary] = useState(isNew ? "" : (product?.shortSummary ?? ""))
  const [productSummary, setProductSummary] = useState(isNew ? "" : toRichTextValue(product?.productSummary ?? ""))
  const [category, setCategory] = useState(isNew ? "Snack" : (product?.category ?? "Snack"))

  const pageTitle = isNew ? "Create Product" : "Edit Products"
  const pageSubtitle = isNew
    ? "Fill in the details for the new product"
    : `Update "${product?.name}" Products Information`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div
        className="px-8 py-5 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
        }}
      >
        <div>
          <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
          <p className="text-purple-200 text-sm mt-0.5">{pageSubtitle}</p>
        </div>
        <Button
          onClick={() => navigate("/products")}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to list
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="px-8 py-3 border-b border-gray-200 bg-white">
        <p className="text-sm text-gray-500">
          <span className="text-gray-400">Dashboard</span>
          <span className="mx-1.5 text-gray-300">›</span>
          <span
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => navigate("/products")}
          >
            Products
          </span>
          <span className="mx-1.5 text-gray-300">›</span>
          {!isNew && (
            <>
              <span className="text-gray-400">{id}</span>
              <span className="mx-1.5 text-gray-300">›</span>
            </>
          )}
          <span>edit</span>
        </p>
      </div>

      <div className="px-8 py-6 max-w-5xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">{pageTitle}</h2>

        {/* Product Information Card */}
        <Card className="shadow-sm border-gray-200 mb-5">
          <CardContent className="p-6">
            <h3 className="text-base font-semibold text-gray-900">Product Information</h3>
            <p className="text-sm text-gray-400 mt-0.5 mb-6">Essential information about your product</p>

            {/* Name + Price row */}
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-gray-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Product Price (¥) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-gray-200"
                />
              </div>
            </div>

            {/* Short Summary */}
            <div className="space-y-1.5 mb-5">
              <Label htmlFor="short-summary" className="text-sm font-medium text-gray-700">
                Short Summary <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="short-summary"
                value={shortSummary}
                onChange={(e) => setShortSummary(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 resize-y focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Product Summary */}
            <div className="space-y-1.5">
              <Label htmlFor="product-summary" className="text-sm font-medium text-gray-700">
                Product Summary <span className="text-red-500">*</span>
              </Label>
              <RichTextEditor
                id="product-summary"
                value={productSummary}
                onChange={setProductSummary}
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Card */}
        <Card className="shadow-sm border-gray-200 mb-5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Categories <span className="text-red-500">*</span>
              </h3>
              <Button variant="ghost" size="sm" className="gap-1.5 text-gray-600 text-sm">
                <Plus className="w-3.5 h-3.5" />
                Add Categories
              </Button>
            </div>

            <div className="relative border border-gray-200 rounded-md">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 text-sm text-gray-900 bg-transparent focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
              >
                <option>Snack</option>
                <option>Food</option>
                <option>Pass</option>
                <option>General</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Images Card */}
        <Card className="shadow-sm border-gray-200 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Product Images{" "}
                <span className="text-sm font-normal text-gray-400">
                  {(product?.images ?? []).length}/8
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {(product?.images ?? []).map((img, i) => (
                <div key={i} className="relative group">
                  <div className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              ))}

              {/* Upload slot */}
              <button className="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center gap-1 text-gray-400 transition-colors">
                <Plus className="w-5 h-5" />
                <span className="text-xs">Add Image</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            className="bg-gray-900 hover:bg-gray-800 text-white px-8"
            onClick={() => navigate("/products")}
          >
            {isNew ? "Create Product" : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={() => navigate("/products")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

function RichTextEditor({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (value: string) => void
}) {
  const editorRef = useRef<HTMLDivElement>(null)

  const runCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, commandValue)
    onChange(editorRef.current?.innerHTML ?? "")
  }

  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white focus-within:ring-2 focus-within:ring-ring">
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-2">
        <EditorButton label="Heading" onClick={() => runCommand("formatBlock", "h2")}>
          <Heading2 className="h-4 w-4" />
        </EditorButton>
        <EditorButton label="Bold" onClick={() => runCommand("bold")}>
          <Bold className="h-4 w-4" />
        </EditorButton>
        <EditorButton label="Italic" onClick={() => runCommand("italic")}>
          <Italic className="h-4 w-4" />
        </EditorButton>
        <div className="mx-1 h-6 w-px bg-gray-200" />
        <EditorButton label="Bulleted list" onClick={() => runCommand("insertUnorderedList")}>
          <List className="h-4 w-4" />
        </EditorButton>
        <EditorButton label="Numbered list" onClick={() => runCommand("insertOrderedList")}>
          <ListOrdered className="h-4 w-4" />
        </EditorButton>
        <EditorButton label="Quote" onClick={() => runCommand("formatBlock", "blockquote")}>
          <Quote className="h-4 w-4" />
        </EditorButton>
      </div>
      <div
        id={id}
        ref={editorRef}
        role="textbox"
        aria-multiline="true"
        contentEditable
        suppressContentEditableWarning
        className="min-h-40 w-full px-3 py-3 text-sm text-gray-900 outline-none [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-3 [&_h2]:text-lg [&_h2]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  )
}

function EditorButton({
  label,
  children,
  onClick,
}: {
  label: string
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-white hover:text-gray-900"
    >
      {children}
    </button>
  )
}

function toRichTextValue(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("")
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}
