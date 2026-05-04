import { createContext, useContext, useState, type ReactNode } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  id: number
  name: string
  thumbnail: string
  images: string[]
  isNew: boolean
  variations: string
  variationCount: number
  subscriptionStatus: string
  price: number
  createdAt: string
  lastUpdated: string
  shortSummary: string
  productSummary: string
  category: string
  visibility: string
  profitTiers: number
  subscription: string
  subscriptionPeriod: string
  type: string
}

export interface Category {
  id: number
  name: string
  associatedItems: number
  createdAt: string
  lastUpdated: string
  sortNumber: number
  active: boolean
}

export interface AdminOrder {
  id: number
  customer: string
  email: string
  page: string
  status: string
  total: number
  paymentMethod: string
  createdAt: string
  lastUpdated: string
  paymentDate: string
}

export interface Customer {
  id: number
  fullName: string
  email: string
  companyName: string
  phoneNumber: string
  createdAt: string
  active: boolean
}

export interface Member {
  id: number
  email: string
  status: string
  memo: string
  createdAt: string
}

export interface Agent {
  id: number
  name: string
  email: string
  referralCode: string
  createdAt: string
  active: boolean
}

export interface NewsItem {
  id: number
  title: string
  status: string
  publishedAt: string
  createdAt: string
}

export interface ShippingVariation {
  id: number
  name: string
  price: string
}

export interface ShippingMethod {
  id: number
  name: string
  status: string
  variations: ShippingVariation[]
  createdAt: string
}

export interface ShopSettings {
  brandName: string
  repName: string
  storeAddress: string
  contactEmail: string
  contactPhone: string
  sellUsedGoods: boolean
  enableTax: boolean
  taxRate: string
  taxLabel: string
  taxDisplayMode: string
  taxRegNumber: string
  paymentMethods: string
  deliveryTiming: string
  returnPolicy: string
}

export interface UserSettings {
  email: string
  password: string
}

export interface PaymentSettings {
  stripeKey: string
}

export interface CurvaSettings {
  curvaApiKey: string
  lineHandle: string
}

// ─── Initial dummy data ───────────────────────────────────────────────────────

const initialProducts: Product[] = [
  {
    id: 15,
    name: "Chitato Rasa Keju Panggang",
    thumbnail: "https://placehold.co/80x80/f97316/white?text=Chitato",
    images: [
      "https://placehold.co/300x300/f97316/white?text=Chitato+1",
      "https://placehold.co/300x300/ef4444/white?text=Chitato+2",
      "https://placehold.co/300x300/eab308/white?text=Chitato+3",
    ],
    isNew: true,
    variations: "L / Cheese",
    variationCount: 3,
    subscriptionStatus: "Enabled",
    price: 10000,
    createdAt: "4/22/2026",
    lastUpdated: "4/22/2026",
    shortSummary: "Super delicious Chitato snack",
    productSummary: "HARGA TERTERA UNTUK KEMASAN 1 PCS\n\nChitato Kriuk Kentang 68 gr",
    category: "Snack",
    visibility: "Visible",
    profitTiers: 0,
    subscription: "Enabled",
    subscriptionPeriod: "Unknown",
    type: "simple",
  },
  {
    id: 14,
    name: "Subscription Test",
    thumbnail: "",
    images: [],
    isNew: false,
    variations: "",
    variationCount: 3,
    subscriptionStatus: "Enabled",
    price: 10000,
    createdAt: "4/21/2026",
    lastUpdated: "4/21/2026",
    shortSummary: "Test subscription product",
    productSummary: "This is a subscription test product.",
    category: "General",
    visibility: "Visible",
    profitTiers: 0,
    subscription: "Enabled",
    subscriptionPeriod: "Monthly",
    type: "subscription",
  },
  {
    id: 13,
    name: "Cocon Pass Master",
    thumbnail: "https://placehold.co/80x80/374151/white?text=Pass",
    images: ["https://placehold.co/300x300/374151/white?text=Cocon+Pass"],
    isNew: false,
    variations: "",
    variationCount: 0,
    subscriptionStatus: "Enabled",
    price: 4200,
    createdAt: "4/14/2026",
    lastUpdated: "4/15/2026",
    shortSummary: "Master level cocon pass",
    productSummary: "Full access Cocon Pass Master tier.",
    category: "Pass",
    visibility: "Visible",
    profitTiers: 0,
    subscription: "Enabled",
    subscriptionPeriod: "Monthly",
    type: "simple",
  },
  {
    id: 12,
    name: "Cocon Pass Lover",
    thumbnail: "https://placehold.co/80x80/6b7280/white?text=Lover",
    images: ["https://placehold.co/300x300/6b7280/white?text=Lover"],
    isNew: false,
    variations: "",
    variationCount: 0,
    subscriptionStatus: "Enabled",
    price: 2500,
    createdAt: "4/14/2026",
    lastUpdated: "4/14/2026",
    shortSummary: "Lover level cocon pass",
    productSummary: "Mid-tier Cocon Pass for fans.",
    category: "Pass",
    visibility: "Visible",
    profitTiers: 0,
    subscription: "Enabled",
    subscriptionPeriod: "Monthly",
    type: "simple",
  },
  {
    id: 10,
    name: "Seafood Aglio e Olio",
    thumbnail: "https://placehold.co/80x80/16a34a/white?text=Seafood",
    images: ["https://placehold.co/300x300/16a34a/white?text=Seafood"],
    isNew: false,
    variations: "",
    variationCount: 0,
    subscriptionStatus: "Disabled",
    price: 1900,
    createdAt: "4/14/2026",
    lastUpdated: "4/14/2026",
    shortSummary: "Seafood pasta",
    productSummary: "Aglio e Olio with fresh seafood.",
    category: "Food",
    visibility: "Hidden",
    profitTiers: 0,
    subscription: "Disabled",
    subscriptionPeriod: "N/A",
    type: "simple",
  },
]

const initialCategories: Category[] = [
  { id: 1, name: "Snack", associatedItems: 1, createdAt: "Apr 22, 2026", lastUpdated: "Apr 22, 2026", sortNumber: 1, active: true },
  { id: 2, name: "Food", associatedItems: 1, createdAt: "Apr 14, 2026", lastUpdated: "Apr 14, 2026", sortNumber: 2, active: true },
  { id: 3, name: "Pass", associatedItems: 3, createdAt: "Apr 14, 2026", lastUpdated: "Apr 15, 2026", sortNumber: 3, active: true },
  { id: 4, name: "General", associatedItems: 1, createdAt: "Apr 21, 2026", lastUpdated: "Apr 21, 2026", sortNumber: 4, active: false },
]

const initialAdminOrders: AdminOrder[] = [
  { id: 1, customer: "Budi Santoso", email: "budi@example.com", page: "LP Page 1", status: "Payment Confirmed", total: 35000, paymentMethod: "Credit Card", createdAt: "May 1, 2026", lastUpdated: "May 1, 2026", paymentDate: "May 1, 2026" },
  { id: 2, customer: "Siti Rahayu", email: "siti@example.com", page: "LP Page 2", status: "Delivered", total: 12500, paymentMethod: "Bank Transfer", createdAt: "Apr 30, 2026", lastUpdated: "May 1, 2026", paymentDate: "Apr 30, 2026" },
  { id: 3, customer: "Ahmad Fauzi", email: "ahmad@example.com", page: "LP Page 3", status: "Payment Failed", total: 8000, paymentMethod: "Credit Card", createdAt: "Apr 29, 2026", lastUpdated: "Apr 30, 2026", paymentDate: "Apr 29, 2026" },
  { id: 4, customer: "Dewi Lestari", email: "dewi@example.com", page: "LP Page 1", status: "Payment Confirmed", total: 20000, paymentMethod: "Delivery Cash", createdAt: "Apr 28, 2026", lastUpdated: "Apr 28, 2026", paymentDate: "Apr 28, 2026" },
  { id: 5, customer: "Eko Prasetyo", email: "eko@example.com", page: "LP Page 4", status: "Delivered", total: 55000, paymentMethod: "Credit Card", createdAt: "Apr 27, 2026", lastUpdated: "Apr 29, 2026", paymentDate: "Apr 27, 2026" },
  { id: 6, customer: "Rina Kusuma", email: "rina@example.com", page: "LP Page 2", status: "Payment Confirmed", total: 9800, paymentMethod: "Bank Transfer", createdAt: "Apr 26, 2026", lastUpdated: "Apr 26, 2026", paymentDate: "Apr 26, 2026" },
]

const initialCustomers: Customer[] = [
  { id: 1, fullName: "Budi Santoso", email: "budi@example.com", companyName: "PT Maju Jaya", phoneNumber: "081234567890", createdAt: "May 1, 2026", active: true },
  { id: 2, fullName: "Siti Rahayu", email: "siti@example.com", companyName: "CV Berkah", phoneNumber: "082345678901", createdAt: "Apr 28, 2026", active: true },
  { id: 3, fullName: "Ahmad Fauzi", email: "ahmad@example.com", companyName: "", phoneNumber: "083456789012", createdAt: "Apr 20, 2026", active: true },
  { id: 4, fullName: "Dewi Lestari", email: "dewi@example.com", companyName: "Toko Makmur", phoneNumber: "084567890123", createdAt: "Apr 15, 2026", active: false },
]

const initialMembers: Member[] = [
  { id: 1, email: "member1@example.com", status: "active", memo: "VIP member sejak 2025", createdAt: "Jan 10, 2026" },
  { id: 2, email: "member2@example.com", status: "active", memo: "", createdAt: "Feb 5, 2026" },
  { id: 3, email: "member3@example.com", status: "inactive", memo: "Suspended karena payment gagal", createdAt: "Mar 12, 2026" },
]

const initialAgents: Agent[] = [
  { id: 1, name: "Testing Agent", email: "j_loh+3@cocon-inc.co.jp", referralCode: "fdYVxJOyqV", createdAt: "Jan 7, 2026", active: true },
  { id: 2, name: "cust09@gmail.com", email: "cust09@gmail.com", referralCode: "YwDGjrIHJI", createdAt: "Dec 15, 2025", active: true },
  { id: 3, name: "Acme Agent 1", email: "agent1@example.com", referralCode: "v277lumAXh", createdAt: "Oct 13, 2025", active: true },
  { id: 4, name: "Acme Agent", email: "renaldyramadhan567@gmail.com", referralCode: "0kP21cOveM", createdAt: "Oct 13, 2025", active: true },
]

const initialNews: NewsItem[] = [
  { id: 1, title: "Grand Opening Passukuru Store!", status: "published", publishedAt: "May 1, 2026", createdAt: "Apr 28, 2026" },
  { id: 2, title: "New Product Launch: Cocon Pass Series", status: "published", publishedAt: "Apr 20, 2026", createdAt: "Apr 18, 2026" },
  { id: 3, title: "Promo Ramadan: Diskon 20% Semua Produk", status: "draft", publishedAt: "", createdAt: "Apr 10, 2026" },
  { id: 4, title: "Tips Belanja Hemat di Passukuru", status: "published", publishedAt: "Mar 15, 2026", createdAt: "Mar 12, 2026" },
]

const initialShippingMethods: ShippingMethod[] = [
  {
    id: 1,
    name: "JNE Regular",
    status: "active",
    variations: [
      { id: 1, name: "Jabodetabek", price: "15000" },
      { id: 2, name: "Jawa", price: "18000" },
      { id: 3, name: "Luar Jawa", price: "25000" },
    ],
    createdAt: "Apr 1, 2026",
  },
  {
    id: 2,
    name: "JNE YES",
    status: "active",
    variations: [
      { id: 1, name: "Jabodetabek", price: "25000" },
      { id: 2, name: "Jawa", price: "30000" },
    ],
    createdAt: "Apr 1, 2026",
  },
  {
    id: 3,
    name: "Gosend Instant",
    status: "inactive",
    variations: [
      { id: 1, name: "Same Day", price: "20000" },
    ],
    createdAt: "Apr 5, 2026",
  },
]

const initialShopSettings: ShopSettings = {
  brandName: "Otten",
  repName: "otten",
  storeAddress: "HQ Otten",
  contactEmail: "otten@yopmail.com",
  contactPhone: "08123080213",
  sellUsedGoods: false,
  enableTax: true,
  taxRate: "10",
  taxLabel: "消費税",
  taxDisplayMode: "inclusive",
  taxRegNumber: "T1234567890123",
  paymentMethods: "Payment Methods & Payment Timing",
  deliveryTiming: "Delivery Timing",
  returnPolicy: "",
}

const initialUserSettings: UserSettings = {
  email: "otten@yopmail.com",
  password: "",
}

const initialPaymentSettings: PaymentSettings = {
  stripeKey: "",
}

const initialCurvaSettings: CurvaSettings = {
  curvaApiKey: "",
  lineHandle: "",
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppStoreContextValue {
  // Products
  products: Product[]
  addProduct: (p: Omit<Product, "id" | "createdAt" | "lastUpdated">) => void
  updateProduct: (id: number, changes: Partial<Product>) => void
  deleteProduct: (id: number) => void

  // Categories
  categories: Category[]
  addCategory: (name: string, sortNumber: number) => void
  updateCategory: (id: number, changes: Partial<Category>) => void
  deleteCategory: (id: number) => void

  // Orders
  adminOrders: AdminOrder[]
  updateOrderStatus: (id: number, status: string) => void
  deleteOrder: (id: number) => void

  // Customers
  customers: Customer[]
  addCustomer: (c: Omit<Customer, "id" | "createdAt">) => void
  deleteCustomer: (id: number) => void

  // Members
  members: Member[]
  addMember: (m: Omit<Member, "id" | "createdAt">) => void
  deleteMember: (id: number) => void

  // Agents
  agents: Agent[]
  addAgent: (a: Omit<Agent, "id" | "createdAt" | "referralCode">) => void
  deleteAgent: (id: number) => void

  // News
  news: NewsItem[]
  addNews: (n: Omit<NewsItem, "id" | "createdAt">) => void
  deleteNews: (id: number) => void

  // Shipping Methods
  shippingMethods: ShippingMethod[]
  addShippingMethod: (name: string, variations: ShippingVariation[]) => void
  deleteShippingMethod: (id: number) => void

  // Settings
  shopSettings: ShopSettings
  updateShopSettings: (s: Partial<ShopSettings>) => void
  userSettings: UserSettings
  updateUserSettings: (s: Partial<UserSettings>) => void
  paymentSettings: PaymentSettings
  updatePaymentSettings: (s: Partial<PaymentSettings>) => void
  curvaSettings: CurvaSettings
  updateCurvaSettings: (s: Partial<CurvaSettings>) => void
}

const AppStoreContext = createContext<AppStoreContextValue | null>(null)

function randomCode(len = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

function today() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function nextId<T extends { id: number }>(arr: T[]) {
  return arr.length === 0 ? 1 : Math.max(...arr.map((x) => x.id)) + 1
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>(initialAdminOrders)
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [agents, setAgents] = useState<Agent[]>(initialAgents)
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>(initialShippingMethods)
  const [shopSettings, setShopSettings] = useState<ShopSettings>(initialShopSettings)
  const [userSettings, setUserSettings] = useState<UserSettings>(initialUserSettings)
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(initialPaymentSettings)
  const [curvaSettings, setCurvaSettings] = useState<CurvaSettings>(initialCurvaSettings)

  const value: AppStoreContextValue = {
    // Products
    products,
    addProduct: (p) =>
      setProducts((prev) => [{ ...p, id: nextId(prev), createdAt: today(), lastUpdated: today() }, ...prev]),
    updateProduct: (id, changes) =>
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes, lastUpdated: today() } : p))),
    deleteProduct: (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),

    // Categories
    categories,
    addCategory: (name, sortNumber) =>
      setCategories((prev) => [
        { id: nextId(prev), name, sortNumber, associatedItems: 0, createdAt: today(), lastUpdated: today(), active: true },
        ...prev,
      ]),
    updateCategory: (id, changes) =>
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...changes, lastUpdated: today() } : c))),
    deleteCategory: (id) => setCategories((prev) => prev.filter((c) => c.id !== id)),

    // Orders
    adminOrders,
    updateOrderStatus: (id, status) =>
      setAdminOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status, lastUpdated: today() } : o))),
    deleteOrder: (id) => setAdminOrders((prev) => prev.filter((o) => o.id !== id)),

    // Customers
    customers,
    addCustomer: (c) =>
      setCustomers((prev) => [{ ...c, id: nextId(prev), createdAt: today() }, ...prev]),
    deleteCustomer: (id) => setCustomers((prev) => prev.filter((c) => c.id !== id)),

    // Members
    members,
    addMember: (m) =>
      setMembers((prev) => [{ ...m, id: nextId(prev), createdAt: today() }, ...prev]),
    deleteMember: (id) => setMembers((prev) => prev.filter((m) => m.id !== id)),

    // Agents
    agents,
    addAgent: (a) =>
      setAgents((prev) => [{ ...a, id: nextId(prev), referralCode: randomCode(), createdAt: today() }, ...prev]),
    deleteAgent: (id) => setAgents((prev) => prev.filter((a) => a.id !== id)),

    // News
    news,
    addNews: (n) =>
      setNews((prev) => [{ ...n, id: nextId(prev), createdAt: today() }, ...prev]),
    deleteNews: (id) => setNews((prev) => prev.filter((n) => n.id !== id)),

    // Shipping Methods
    shippingMethods,
    addShippingMethod: (name, variations) =>
      setShippingMethods((prev) => [
        { id: nextId(prev), name, status: "active", variations, createdAt: today() },
        ...prev,
      ]),
    deleteShippingMethod: (id) => setShippingMethods((prev) => prev.filter((s) => s.id !== id)),

    // Settings
    shopSettings,
    updateShopSettings: (s) => setShopSettings((prev) => ({ ...prev, ...s })),
    userSettings,
    updateUserSettings: (s) => setUserSettings((prev) => ({ ...prev, ...s })),
    paymentSettings,
    updatePaymentSettings: (s) => setPaymentSettings((prev) => ({ ...prev, ...s })),
    curvaSettings,
    updateCurvaSettings: (s) => setCurvaSettings((prev) => ({ ...prev, ...s })),
  }

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext)
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider")
  return ctx
}
