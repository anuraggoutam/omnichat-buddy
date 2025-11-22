// Mock data for OmniChat OS Demo - "Bakery Bliss"

export type Channel = "whatsapp" | "instagram" | "facebook" | "email" | "website";
export type LeadSource = "website" | "facebook_ads" | "instagram_ads" | "google_ads" | "referral" | "organic";
export type MessageType = "text" | "voice" | "image" | "document" | "system";

export const demoTenant = {
  id: "bakery-bliss-001",
  name: "Bakery Bliss",
  timezone: "Asia/Kolkata",
  locale: "en-IN",
  currency: "₹",
  phone: "+91 98765 43210",
  email: "hello@bakerybliss.in",
  logo: "🧁",
};

export const demoCustomers = [
  {
    id: "cust-001",
    name: "Priya Sharma",
    phone: "+91 98765 11111",
    avatar: "👩",
    ltv: 8500,
    lastOrder: "2024-01-18T10:30:00Z",
    tags: ["VIP", "Regular"],
    city: "Mumbai",
    language: "en",
    averageOrderValue: 850,
    preferredProducts: ["Chocolate Truffle Cake", "Red Velvet Cupcakes"],
  },
  {
    id: "cust-002",
    name: "Raj Patel",
    phone: "+91 98765 22222",
    avatar: "👨",
    ltv: 3200,
    lastOrder: "2024-01-17T14:20:00Z",
    tags: ["Hot Lead"],
    city: "Delhi",
    language: "hi",
    averageOrderValue: 640,
    preferredProducts: ["Black Forest Cake"],
  },
  {
    id: "cust-003",
    name: "Ananya Desai",
    phone: "+91 98765 33333",
    avatar: "👩‍💼",
    ltv: 12400,
    lastOrder: "2024-01-19T09:15:00Z",
    tags: ["VIP", "Bulk Orders"],
    city: "Bangalore",
    language: "en",
    averageOrderValue: 1240,
    preferredProducts: ["Red Velvet Cupcakes", "Croissants"],
  },
  {
    id: "cust-004",
    name: "Vikram Singh",
    phone: "+91 98765 44444",
    avatar: "🧑",
    ltv: 1850,
    lastOrder: "2024-01-16T16:45:00Z",
    tags: ["New"],
    city: "Pune",
    language: "en",
    averageOrderValue: 925,
    preferredProducts: ["Butterscotch Pastry"],
  },
  {
    id: "cust-005",
    name: "Meera Reddy",
    phone: "+91 98765 55555",
    avatar: "👩",
    ltv: 5600,
    lastOrder: "2024-01-19T11:00:00Z",
    tags: ["Regular"],
    city: "Hyderabad",
    language: "en",
    averageOrderValue: 700,
    preferredProducts: ["Black Forest Cake", "Cookies"],
  },
];

export const demoProducts = [
  {
    id: "prod-001",
    name: "Chocolate Truffle Cake",
    price: 850,
    stock: 12,
    image: "🎂",
    category: "Cakes",
    topSelling: true,
    sales7d: 24,
  },
  {
    id: "prod-002",
    name: "Red Velvet Cupcakes (6pc)",
    price: 420,
    stock: 35,
    image: "🧁",
    category: "Cupcakes",
    topSelling: true,
    sales7d: 18,
  },
  {
    id: "prod-003",
    name: "Butterscotch Pastry",
    price: 120,
    stock: 48,
    image: "🍰",
    category: "Pastries",
    topSelling: false,
    sales7d: 32,
  },
  {
    id: "prod-004",
    name: "Chocolate Chip Cookies (12pc)",
    price: 180,
    stock: 60,
    image: "🍪",
    category: "Cookies",
    topSelling: false,
    sales7d: 15,
  },
  {
    id: "prod-005",
    name: "Fresh Croissants (4pc)",
    price: 240,
    stock: 28,
    image: "🥐",
    category: "Breads",
    topSelling: true,
    sales7d: 22,
  },
  {
    id: "prod-006",
    name: "Black Forest Cake (1kg)",
    price: 920,
    stock: 8,
    image: "🎂",
    category: "Cakes",
    topSelling: true,
    sales7d: 16,
  },
];

export const demoConversations = [
  {
    id: "conv-001",
    customer: demoCustomers[0],
    lastMessage: "Thank you! The cake was amazing 🎉",
    timestamp: "2024-01-19T10:30:00Z",
    unread: 0,
    tags: ["Happy Customer"],
    status: "resolved",
    channel: "whatsapp" as Channel,
    leadSource: "website" as LeadSource,
  },
  {
    id: "conv-002",
    customer: demoCustomers[1],
    lastMessage: "Do you deliver to Rohini?",
    timestamp: "2024-01-19T09:45:00Z",
    unread: 2,
    tags: ["Hot Lead"],
    status: "active",
    channel: "whatsapp" as Channel,
    leadSource: "facebook_ads" as LeadSource,
  },
  {
    id: "conv-003",
    customer: demoCustomers[2],
    lastMessage: "I need 50 cupcakes for corporate event",
    timestamp: "2024-01-19T08:20:00Z",
    unread: 1,
    tags: ["Bulk Order", "VIP"],
    status: "active",
    channel: "instagram" as Channel,
    leadSource: "instagram_ads" as LeadSource,
  },
  {
    id: "conv-004",
    customer: demoCustomers[3],
    lastMessage: "What are your chocolate cake options?",
    timestamp: "2024-01-18T16:15:00Z",
    unread: 0,
    tags: [],
    status: "active",
    channel: "email" as Channel,
    leadSource: "google_ads" as LeadSource,
  },
  {
    id: "conv-005",
    customer: demoCustomers[4],
    lastMessage: "Can I customize the message on cake?",
    timestamp: "2024-01-18T14:30:00Z",
    unread: 1,
    tags: ["Pending Payment"],
    status: "pending",
    channel: "website" as Channel,
    leadSource: "organic" as LeadSource,
  },
];

export const demoOrders = [
  {
    id: "ORD-2401-1234",
    customer: demoCustomers[0],
    items: [
      { product: demoProducts[0], quantity: 1 },
      { product: demoProducts[3], quantity: 2 },
    ],
    total: 1210,
    paymentStatus: "paid",
    fulfillmentStatus: "delivered",
    createdAt: "2024-01-18T10:30:00Z",
    deliveredAt: "2024-01-19T15:00:00Z",
  },
  {
    id: "ORD-2401-1235",
    customer: demoCustomers[2],
    items: [{ product: demoProducts[1], quantity: 10 }],
    total: 4200,
    paymentStatus: "pending",
    fulfillmentStatus: "processing",
    createdAt: "2024-01-19T09:15:00Z",
  },
  {
    id: "ORD-2401-1236",
    customer: demoCustomers[4],
    items: [
      { product: demoProducts[5], quantity: 1 },
      { product: demoProducts[4], quantity: 2 },
    ],
    total: 1400,
    paymentStatus: "payment_link_sent",
    fulfillmentStatus: "awaiting_payment",
    createdAt: "2024-01-19T11:00:00Z",
  },
  {
    id: "ORD-2401-1237",
    customer: demoCustomers[1],
    items: [{ product: demoProducts[2], quantity: 4 }],
    total: 480,
    paymentStatus: "paid",
    fulfillmentStatus: "shipped",
    createdAt: "2024-01-17T14:20:00Z",
    shippedAt: "2024-01-18T10:00:00Z",
  },
];

export const demoMessages = {
  "conv-001": [
    {
      id: "msg-001-1",
      role: "customer",
      content: "Hi! I want to order a chocolate cake for birthday",
      timestamp: "2024-01-18T10:00:00Z",
      status: "read",
      type: "text" as MessageType,
    },
    {
      id: "msg-001-2",
      role: "assistant",
      content: "Hello! 🎂 I'd be happy to help you order a birthday cake. We have Chocolate Truffle Cake (₹850) and Black Forest Cake (₹920). Both are 1kg. Which one would you prefer?",
      timestamp: "2024-01-18T10:01:00Z",
      status: "read",
      type: "text" as MessageType,
    },
    {
      id: "msg-001-3",
      role: "customer",
      content: "Chocolate Truffle please",
      timestamp: "2024-01-18T10:02:00Z",
      status: "read",
      type: "text" as MessageType,
    },
    {
      id: "msg-001-4",
      role: "assistant",
      content: "Perfect choice! I've added Chocolate Truffle Cake to your order. Would you like to add a custom message on the cake? Also, when do you need it delivered?",
      timestamp: "2024-01-18T10:03:00Z",
      status: "read",
      type: "text" as MessageType,
    },
    {
      id: "msg-001-5",
      role: "customer",
      content: "Yes, write 'Happy Birthday Rohan' and deliver tomorrow by 6 PM",
      timestamp: "2024-01-18T10:05:00Z",
      status: "read",
      type: "text" as MessageType,
    },
    {
      id: "msg-001-6",
      role: "system",
      content: "Order #ORD-2401-1234 created • ₹850",
      timestamp: "2024-01-18T10:06:00Z",
      status: "read",
      type: "system" as MessageType,
      metadata: { orderId: "ORD-2401-1234", amount: 850 },
    },
    {
      id: "msg-001-7",
      role: "assistant",
      content: "Wonderful! 🎉 Your order is confirmed:\n\n🎂 Chocolate Truffle Cake - ₹850\n📝 Message: 'Happy Birthday Rohan'\n🚚 Delivery: Jan 19, by 6 PM\n💰 Total: ₹850\n\nPaying via UPI/Card? I'll send you a payment link.",
      timestamp: "2024-01-18T10:06:30Z",
      status: "read",
      type: "text" as MessageType,
    },
    {
      id: "msg-001-8",
      role: "customer",
      content: "voice_note_001.ogg",
      timestamp: "2024-01-18T10:08:00Z",
      status: "read",
      type: "voice" as MessageType,
      metadata: { duration: 12 },
    },
    {
      id: "msg-001-9",
      role: "customer",
      content: "Thank you! The cake was amazing 🎉",
      timestamp: "2024-01-19T10:30:00Z",
      status: "read",
      type: "text" as MessageType,
    },
  ],
  "conv-002": [
    {
      id: "msg-002-1",
      role: "customer",
      content: "Do you deliver to Rohini?",
      timestamp: "2024-01-19T09:45:00Z",
      status: "delivered",
      type: "text" as MessageType,
    },
  ],
  "conv-003": [
    {
      id: "msg-003-1",
      role: "customer",
      content: "I need 50 cupcakes for corporate event",
      timestamp: "2024-01-19T08:20:00Z",
      status: "delivered",
      type: "text" as MessageType,
    },
  ],
};

export const dashboardKPIs = {
  newConversations: {
    value: 12,
    change: 8,
    trend: "up",
  },
  orders: {
    value: 28,
    change: 15,
    trend: "up",
  },
  products: {
    value: 18,
    change: 0,
    trend: "neutral",
  },
  revenue: {
    value: 42850,
    change: 22,
    trend: "up",
  },
};

export const salesChartData = [
  { date: "Jan 13", revenue: 3200, orders: 8 },
  { date: "Jan 14", revenue: 2800, orders: 6 },
  { date: "Jan 15", revenue: 4100, orders: 10 },
  { date: "Jan 16", revenue: 3600, orders: 9 },
  { date: "Jan 17", revenue: 5200, orders: 12 },
  { date: "Jan 18", revenue: 6800, orders: 16 },
  { date: "Jan 19", revenue: 7400, orders: 18 },
];

export const aiSuggestions = [
  {
    id: "sug-001",
    type: "broadcast",
    title: "Send Weekend Special Broadcast",
    description: "20% off on all cakes - target customers who haven't ordered in 15+ days",
    expectedReach: 145,
    potentialRevenue: "₹8,500",
  },
  {
    id: "sug-002",
    type: "product",
    title: "Bundle: Cake + Cookies Combo",
    description: "Customers who buy cakes often add cookies. Create a combo offer.",
    potentialRevenue: "₹12,000",
  },
  {
    id: "sug-003",
    type: "automation",
    title: "Automate Payment Reminders",
    description: "Send automatic reminders 2 hours after payment link is sent",
    expectedSales: "+8 orders/week",
  },
];

export const storeHealth = {
  responseTime: {
    value: "2.3 min",
    score: 92,
    status: "excellent",
  },
  orderFulfillment: {
    value: "96%",
    score: 96,
    status: "excellent",
  },
  refundRate: {
    value: "1.2%",
    score: 88,
    status: "good",
  },
  customerSatisfaction: {
    value: "4.8/5",
    score: 96,
    status: "excellent",
  },
};

// Activity timeline mock data
export const activityTimeline = {
  "cust-001": [
    {
      id: "act-001-1",
      type: "message_opened",
      content: "Opened WhatsApp message",
      timestamp: "2024-01-19T10:29:00Z",
      icon: "📱",
    },
    {
      id: "act-001-2",
      type: "order_delivered",
      content: "Order #ORD-2401-1234 delivered",
      timestamp: "2024-01-19T15:00:00Z",
      icon: "📦",
    },
    {
      id: "act-001-3",
      type: "payment_completed",
      content: "Payment received • ₹850",
      timestamp: "2024-01-18T10:07:00Z",
      icon: "💰",
    },
    {
      id: "act-001-4",
      type: "ai_reply",
      content: "AI Auto-Reply: Product recommendation sent",
      timestamp: "2024-01-18T10:01:00Z",
      icon: "✨",
    },
  ],
  "cust-002": [
    {
      id: "act-002-1",
      type: "clicked_link",
      content: "Clicked Facebook Ad: Diwali Offer",
      timestamp: "2024-01-19T09:40:00Z",
      icon: "🔗",
    },
    {
      id: "act-002-2",
      type: "message_sent",
      content: "Sent first message",
      timestamp: "2024-01-19T09:45:00Z",
      icon: "💬",
    },
  ],
  "cust-003": [
    {
      id: "act-003-1",
      type: "instagram_view",
      content: "Viewed Instagram Story: Cupcake Promo",
      timestamp: "2024-01-19T08:15:00Z",
      icon: "📸",
    },
    {
      id: "act-003-2",
      type: "message_sent",
      content: "Sent bulk order inquiry",
      timestamp: "2024-01-19T08:20:00Z",
      icon: "💬",
    },
  ],
};

// Internal notes mock data
export const internalNotes = {
  "conv-001": [
    {
      id: "note-001-1",
      author: "Sarah",
      authorAvatar: "👩‍💼",
      content: "Customer mentioned it's their son's birthday. Follow up in a year!",
      timestamp: "2024-01-18T10:10:00Z",
      mentions: [],
    },
  ],
  "conv-002": [
    {
      id: "note-002-1",
      author: "John",
      authorAvatar: "👨‍💼",
      content: "@Sarah This looks like a hot lead from our Facebook campaign. Priority follow-up needed.",
      timestamp: "2024-01-19T09:50:00Z",
      mentions: ["Sarah"],
    },
  ],
};
