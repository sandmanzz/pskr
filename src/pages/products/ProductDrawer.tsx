import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Info, Pencil, Trash2, ChevronLeft, ChevronRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { mockProducts } from "@/data/mockData"

type Product = (typeof mockProducts)[0]

interface ProductDrawerProps {
  product: Product | null
  onClose: () => void
}

export function ProductDrawer({ product, onClose }: ProductDrawerProps) {
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState(0)

  if (!product) return null

  const images = product.images.length > 0 ? product.images : [""]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[520px] bg-white shadow-2xl z-50 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <Button variant="ghost" size="sm" onClick={onClose} className="gap-1.5 text-gray-600 px-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-500">
              <Info className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-500"
              onClick={() => navigate(`/products/${product.id}/edit`)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 text-red-400 hover:text-red-500 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Product Hero */}
        <div className="p-5">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Main image */}
            <div className="relative bg-gray-50 flex items-center">
              <div className="flex-1 p-4 flex items-center justify-center min-h-[220px]">
                {images[activeImage] ? (
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="max-h-52 object-contain rounded"
                  />
                ) : (
                  <div className="w-full h-52 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
                    No image
                  </div>
                )}
              </div>

              {/* Name overlay on right side */}
              <div className="w-40 p-4 border-l border-gray-200 self-stretch flex flex-col justify-center bg-white">
                <h2 className="text-base font-bold text-gray-900 leading-tight">{product.name}</h2>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.shortSummary}</p>
                {product.variationCount > 0 && (
                  <p className="text-xs text-blue-500 mt-2">Has Variations</p>
                )}
              </div>

              {/* Prev/Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                    className="absolute right-[168px] top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 p-3 border-t border-gray-100 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "w-14 h-14 rounded-md border-2 shrink-0 overflow-hidden",
                    i === activeImage ? "border-blue-500" : "border-gray-200"
                  )}
                >
                  {img ? (
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 flex-1">
          <Tabs defaultValue="overview">
            <TabsList className="w-full border-b border-gray-200 rounded-none bg-transparent p-0 h-auto">
              {["Overview", "Variations", "Detail"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase()}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-sm"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="pt-4 space-y-5">
              {/* Product Status */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">Product Status</h3>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1.5">Visibility</p>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-medium text-xs">
                      {product.visibility}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1.5">Profit Tiers</p>
                    <p className="text-sm font-semibold text-gray-900">{product.profitTiers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1.5">Subscription</p>
                    <Badge
                      className={cn(
                        "font-medium text-xs",
                        product.subscription === "Enabled"
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      )}
                    >
                      {product.subscription}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Subscription Period</p>
                  <p className="text-sm font-semibold text-gray-900">{product.subscriptionPeriod}</p>
                </div>
              </div>

              {/* Categories */}
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Categories (1)</h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="variations" className="pt-4">
              {product.variationCount > 0 ? (
                <div className="border border-gray-200 rounded-xl p-5">
                  <p className="text-sm text-gray-600">
                    This product has <span className="font-semibold">{product.variationCount + 1}</span> variations.
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="text-sm text-gray-700 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      {product.variations}
                    </div>
                    {Array.from({ length: product.variationCount }).map((_, i) => (
                      <div key={i} className="text-sm text-gray-700 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        Variation {i + 2}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400 text-sm">No variations for this product.</div>
              )}
            </TabsContent>

            <TabsContent value="detail" className="pt-4">
              <div className="border border-gray-200 rounded-xl p-5 space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Short Summary</p>
                  <p className="text-sm text-gray-700">{product.shortSummary}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Product Summary</p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{product.productSummary}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Price</p>
                  <p className="text-sm font-semibold text-gray-900">¥ {product.price.toLocaleString()}.00</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="h-8" />
      </div>
    </>
  )
}
