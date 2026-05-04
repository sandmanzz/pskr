import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Plus, ArrowUpDown, LayoutGrid, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ProductDrawer } from "./ProductDrawer"
import { cn } from "@/lib/utils"
import { useAppStore, type Product } from "@/store/AppStore"

export function ProductListPage() {
  const navigate = useNavigate()
  const { products, deleteProduct } = useAppStore()
  const [search, setSearch] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: products.length,
    simple: products.filter((p) => p.type === "simple").length,
    subscription: products.filter((p) => p.type === "subscription").length,
  }

  function handleDelete(id: number) {
    if (!window.confirm("Hapus produk ini?")) return
    deleteProduct(id)
    if (selectedProduct?.id === id) setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="px-8 py-5 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)" }}
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Product Management</h1>
        </div>
        <Button
          onClick={() => navigate("/products/new")}
          className="bg-white text-gray-900 hover:bg-gray-100 font-medium gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Create Product
        </Button>
      </div>

      <div className="px-8 py-3 border-b border-gray-200 bg-white">
        <p className="text-sm text-gray-500">
          <span className="text-gray-400">Dashboard</span>
          <span className="mx-1.5 text-gray-300">›</span>
          <span>Products</span>
        </p>
      </div>

      <div className="px-8 py-6 space-y-5">
        <div className="grid grid-cols-3 gap-4">
          <Card className="shadow-sm border-gray-200">
            <CardContent className="px-6 py-5">
              <p className="text-sm text-gray-500">Total Product</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-gray-200">
            <CardContent className="px-6 py-5">
              <p className="text-sm text-gray-500">Simple Products</p>
              <p className="text-3xl font-bold text-green-500 mt-1">{stats.simple}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-gray-200">
            <CardContent className="px-6 py-5">
              <p className="text-sm text-gray-500">Subscription Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.subscription}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search Product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-gray-200"
            />
          </div>
          <Button variant="default" size="icon" className="bg-gray-900 hover:bg-gray-800 w-9 h-9">
            <LayoutGrid className="w-4 h-4" />
          </Button>
        </div>

        <Card className="shadow-sm border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  {["Default Thumbnail", "Product Name", "Variations", "Subscription Status", "Price", "Created At", "Last Updated", ""].map((col) => (
                    <th key={col} className="px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                      {col ? (
                        <button className="flex items-center gap-1 hover:text-gray-700">
                          {col}<ArrowUpDown className="w-3 h-3" />
                        </button>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-gray-400">
                      Belum ada produk. <button className="text-blue-500 hover:underline" onClick={() => navigate("/products/new")}>Buat produk pertama</button>
                    </td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={cn(
                        "border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors",
                        selectedProduct?.id === product.id && "bg-blue-50"
                      )}
                    >
                      <td className="px-4 py-3">
                        {product.thumbnail ? (
                          <img src={product.thumbnail} alt={product.name} className="w-16 h-16 object-cover rounded-md border border-gray-200" />
                        ) : (
                          <div className="w-16 h-16 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-gray-300" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {product.isNew && (
                            <Badge className="w-fit bg-green-500 hover:bg-green-500 text-white text-[10px] px-1.5 py-0">New</Badge>
                          )}
                          <span className="text-sm font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {product.variationCount > 0 ? (
                          <div>
                            <span>{product.variations}</span>
                            {product.variationCount > 1 && <span className="text-blue-500 block text-xs">+{product.variationCount} more</span>}
                          </div>
                        ) : <span className="text-gray-400">No Variations</span>}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={cn("text-xs font-medium", product.subscriptionStatus === "Enabled" ? "bg-gray-900 hover:bg-gray-900 text-white" : "bg-gray-200 hover:bg-gray-200 text-gray-600")}>
                          {product.subscriptionStatus}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">¥ {product.price.toLocaleString()}.00</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{product.createdAt}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{product.lastUpdated}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(product.id) }}
                          className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <ProductDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}
