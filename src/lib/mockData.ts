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
    id: "CUS-001",
    name: "Priya Sharma",
    phone: "+91 98765 11111",
    avatar: "👩",
    tags: ["VIP", "Regular"],
    totalOrders: 12,
    lifetimeValue: 8500,
    lastActive: "2024-01-19T08:00:00Z",
    source: "whatsapp" as Channel,
    profileImage: "/mock/user1.png",
    language: "English",
    totalChats: 32,
    status: "Active",
    ltv: 8500,
    lastOrder: "2024-01-18T10:30:00Z",
    city: "Mumbai",
    averageOrderValue: 850,
    preferredProducts: ["Chocolate Truffle Cake", "Red Velvet Cupcakes"],
    joinedOn: "2023-08-15T10:00:00Z",
    avgResponseTime: "2.3 min",
  },
  {
    id: "CUS-002",
    name: "Raj Patel",
    phone: "+91 99223 88331",
    avatar: "👨",
    tags: ["Hot Lead"],
    totalOrders: 0,
    lifetimeValue: 0,
    lastActive: "2024-01-19T16:45:00Z",
    source: "instagram" as Channel,
    profileImage: "/mock/user2.png",
    language: "English",
    totalChats: 11,
    status: "Lead",
    ltv: 3200,
    lastOrder: "2024-01-17T14:20:00Z",
    city: "Delhi",
    averageOrderValue: 640,
    preferredProducts: ["Black Forest Cake"],
    joinedOn: "2024-01-15T09:00:00Z",
    avgResponseTime: "5.1 min",
  },
  {
    id: "CUS-003",
    name: "Ananya Desai",
    phone: "+91 98903 99020",
    avatar: "👩‍💼",
    tags: ["Bulk Order", "VIP"],
    totalOrders: 14,
    lifetimeValue: 17800,
    lastActive: "2024-01-18T10:00:00Z",
    source: "whatsapp" as Channel,
    profileImage: "/mock/user3.png",
    language: "Hindi",
    totalChats: 91,
    status: "Returning",
    ltv: 12400,
    lastOrder: "2024-01-19T09:15:00Z",
    city: "Bangalore",
    averageOrderValue: 1240,
    preferredProducts: ["Red Velvet Cupcakes", "Croissants"],
    joinedOn: "2023-06-20T12:00:00Z",
    avgResponseTime: "1.8 min",
  },
  {
    id: "CUS-004",
    name: "Vikram Singh",
    phone: "+91 77882 11442",
    avatar: "🧑",
    tags: [],
    totalOrders: 2,
    lifetimeValue: 2250,
    lastActive: "2024-01-16T14:00:00Z",
    source: "facebook" as Channel,
    profileImage: "/mock/user4.png",
    language: "English",
    totalChats: 16,
    status: "Active",
    ltv: 1850,
    lastOrder: "2024-01-16T16:45:00Z",
    city: "Pune",
    averageOrderValue: 925,
    preferredProducts: ["Butterscotch Pastry"],
    joinedOn: "2023-12-10T15:00:00Z",
    avgResponseTime: "3.5 min",
  },
  {
    id: "CUS-005",
    name: "Meera Reddy",
    phone: "+91 98765 55555",
    avatar: "👩",
    tags: ["Regular"],
    totalOrders: 8,
    lifetimeValue: 5600,
    lastActive: "2024-01-19T11:00:00Z",
    source: "website" as Channel,
    profileImage: "/mock/user5.png",
    language: "English",
    totalChats: 24,
    status: "Active",
    ltv: 5600,
    lastOrder: "2024-01-19T11:00:00Z",
    city: "Hyderabad",
    averageOrderValue: 700,
    preferredProducts: ["Black Forest Cake", "Cookies"],
    joinedOn: "2023-09-05T11:00:00Z",
    avgResponseTime: "2.9 min",
  },
];

export const demoProducts = [
  {
    id: "PRD-101",
    name: "Chocolate Truffle Cake",
    price: 850,
    stock: 12,
    category: "Cakes",
    image: "/mock/choco_cake.png",
    status: "Available",
    channel: ["WhatsApp", "Website"],
    description: "Rich chocolate cake with creamy truffle frosting",
    sku: "CAKE-CHO-001",
  },
  {
    id: "PRD-102",
    name: "Black Forest Cake",
    price: 920,
    stock: 3,
    category: "Cakes",
    image: "/mock/black_forest.png",
    status: "Low Stock",
    channel: ["WhatsApp"],
    description: "Classic black forest cake with cherries and chocolate",
    sku: "CAKE-BLK-002",
  },
  {
    id: "PRD-103",
    name: "Vanilla Cupcake Box (6pcs)",
    price: 480,
    stock: 0,
    category: "Cupcakes",
    image: "/mock/vanilla_cupcake.png",
    status: "Out of Stock",
    channel: ["Instagram", "Website"],
    description: "Box of 6 vanilla cupcakes with buttercream frosting",
    sku: "CUP-VAN-003",
  },
  {
    id: "PRD-104",
    name: "Red Velvet Jar Cake",
    price: 250,
    stock: 20,
    category: "Jars",
    image: "/mock/red_velvet_jar.png",
    status: "Available",
    channel: ["WhatsApp", "Email"],
    description: "Individual red velvet cake in a jar",
    sku: "JAR-RED-004",
  },
];

// Team Members Mock Data
export const teamMembers = [
  { id: "T1", name: "Aman Gupta", avatar: "👨‍💼", status: "Online" as const },
  { id: "T2", name: "Riya Verma", avatar: "👩‍💼", status: "Away" as const },
  { id: "T3", name: "Karan Singh", avatar: "👨‍💻", status: "Offline" as const },
];

// Team Inbox Mock Data
export const teamInboxConversations = [
  {
    id: "CHAT-01",
    customerId: "CUS-001",
    customerName: "Priya Sharma",
    customerAvatar: "👩",
    platform: "whatsapp" as Channel,
    unread: 2,
    assignedTo: "Aman Gupta",
    priority: "High" as const,
    lastMessage: "Your order is on the way!",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    tags: ["VIP", "Urgent"],
    status: "active" as const,
    messages: [
      { 
        id: "m1", 
        role: "customer", 
        content: "Where is my package?", 
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        status: "read"
      },
      { 
        id: "m2", 
        role: "agent", 
        content: "It's shipped! You should receive it by tomorrow.", 
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
        status: "read"
      },
      { 
        id: "m3", 
        role: "customer", 
        content: "Okay, thank you!", 
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: "read"
      },
      { 
        id: "m4", 
        role: "agent", 
        content: "Your order is on the way!", 
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        status: "delivered"
      },
    ],
    activities: [
      { id: "a1", type: "assigned", agent: "Aman Gupta", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
      { id: "a2", type: "priority", value: "High", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
      { id: "a3", type: "tag", value: "VIP", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    ],
    internalNotes: [
      { id: "n1", agent: "Aman Gupta", note: "Customer is VIP, handle with priority", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() }
    ]
  },
  {
    id: "CHAT-02",
    customerId: "CUS-002",
    customerName: "Rahul Patel",
    customerAvatar: "👨",
    platform: "instagram" as Channel,
    unread: 0,
    assignedTo: "Unassigned",
    priority: "Medium" as const,
    lastMessage: "Thanks for the info!",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    tags: ["Lead"],
    status: "active" as const,
    messages: [
      { 
        id: "m1", 
        role: "customer", 
        content: "Do you ship to Mumbai?", 
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        status: "read"
      },
      { 
        id: "m2", 
        role: "agent", 
        content: "Yes we do! We ship across India.", 
        timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
        status: "read"
      },
      { 
        id: "m3", 
        role: "customer", 
        content: "Thanks for the info!", 
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        status: "read"
      },
    ],
    activities: [
      { id: "a1", type: "tag", value: "Lead", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
    ],
    internalNotes: []
  },
  {
    id: "CHAT-03",
    customerId: "CUS-003",
    customerName: "Ananya Desai",
    customerAvatar: "👩",
    platform: "facebook" as Channel,
    unread: 5,
    assignedTo: "Riya Verma",
    priority: "High" as const,
    lastMessage: "Are you there?",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    tags: ["Bulk Order"],
    status: "active" as const,
    messages: [
      { 
        id: "m1", 
        role: "customer", 
        content: "Hello?", 
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        status: "delivered"
      },
      { 
        id: "m2", 
        role: "customer", 
        content: "I need to place a bulk order", 
        timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(),
        status: "delivered"
      },
      { 
        id: "m3", 
        role: "customer", 
        content: "Are you there?", 
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        status: "delivered"
      },
    ],
    activities: [
      { id: "a1", type: "assigned", agent: "Riya Verma", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
      { id: "a2", type: "priority", value: "High", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
    ],
    internalNotes: [
      { id: "n1", agent: "Riya Verma", note: "Customer wants bulk order quote. Follow up ASAP.", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() }
    ]
  },
  {
    id: "CHAT-04",
    customerId: "CUS-004",
    customerName: "Vikram Singh",
    customerAvatar: "👨",
    platform: "whatsapp" as Channel,
    unread: 0,
    assignedTo: "Aman Gupta",
    priority: "Low" as const,
    lastMessage: "All good, thanks!",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    tags: [],
    status: "resolved" as const,
    messages: [
      { 
        id: "m1", 
        role: "customer", 
        content: "Can I change my delivery address?", 
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
        status: "read"
      },
      { 
        id: "m2", 
        role: "agent", 
        content: "Yes, I've updated it for you.", 
        timestamp: new Date(Date.now() - 24.5 * 60 * 60 * 1000).toISOString(),
        status: "read"
      },
      { 
        id: "m3", 
        role: "customer", 
        content: "All good, thanks!", 
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: "read"
      },
    ],
    activities: [
      { id: "a1", type: "assigned", agent: "Aman Gupta", timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() },
      { id: "a2", type: "resolved", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    ],
    internalNotes: []
  },
];

// Conversations list for Conversations page
export const demoConversations = [
  {
    id: "conv-001",
    customer: {
      id: "CUS-001",
      name: "Priya Sharma",
      avatar: "👩",
    },
    channel: "whatsapp" as Channel,
    unread: 2,
    lastMessage: "Thank you! The cake was amazing 🎉",
    timestamp: "2024-01-19T10:30:00Z",
    tags: ["VIP", "Regular"],
    status: "active",
    leadSource: "organic" as LeadSource,
  },
  {
    id: "conv-002",
    customer: {
      id: "CUS-002",
      name: "Raj Patel",
      avatar: "👨",
    },
    channel: "instagram" as Channel,
    unread: 1,
    lastMessage: "Do you deliver to Rohini?",
    timestamp: "2024-01-19T09:45:00Z",
    tags: ["Hot Lead"],
    status: "active",
    leadSource: "instagram_ads" as LeadSource,
  },
  {
    id: "conv-003",
    customer: {
      id: "CUS-003",
      name: "Ananya Desai",
      avatar: "👩",
    },
    channel: "facebook" as Channel,
    unread: 0,
    lastMessage: "I need 50 cupcakes for corporate event",
    timestamp: "2024-01-19T08:20:00Z",
    tags: ["Bulk Order", "VIP"],
    status: "active",
    leadSource: "facebook_ads" as LeadSource,
  },
];

// Orders list for Orders and Dashboard pages
export const demoOrders = [
  {
    id: "ORD-2401-1234",
    customer: {
      id: "CUS-001",
      name: "Priya Sharma",
      phone: "+91 98765 11111",
      avatar: "👩",
    },
    items: [
      { id: "PRD-101", name: "Chocolate Truffle Cake", quantity: 1, price: 850 }
    ],
    total: 850,
    status: "delivered",
    fulfillmentStatus: "delivered" as "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled",
    paymentStatus: "paid",
    paymentMethod: "prepaid" as "prepaid" | "cod",
    channel: "whatsapp" as Channel,
    createdAt: "2024-01-18T10:06:00Z",
    timestamp: "2024-01-19T15:00:00Z",
  },
  {
    id: "ORD-2401-1235",
    customer: {
      id: "CUS-003",
      name: "Ananya Desai",
      phone: "+91 98903 99020",
      avatar: "👩",
    },
    items: [
      { id: "PRD-102", name: "Black Forest Cake", quantity: 1, price: 920 },
      { id: "PRD-103", name: "Red Velvet Cupcakes", quantity: 1, price: 480 }
    ],
    total: 1400,
    status: "confirmed",
    fulfillmentStatus: "confirmed" as "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled",
    paymentStatus: "paid",
    paymentMethod: "prepaid" as "prepaid" | "cod",
    channel: "whatsapp" as Channel,
    createdAt: "2024-01-19T10:00:00Z",
    timestamp: "2024-01-19T10:00:00Z",
  },
  {
    id: "ORD-2401-1236",
    customer: {
      id: "CUS-004",
      name: "Vikram Singh",
      phone: "+91 77882 11442",
      avatar: "👨",
    },
    items: [
      { id: "PRD-103", name: "Vanilla Cupcake Box", quantity: 1, price: 480 }
    ],
    total: 480,
    status: "pending",
    fulfillmentStatus: "pending" as "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled",
    paymentStatus: "pending",
    paymentMethod: "cod" as "prepaid" | "cod",
    channel: "facebook" as Channel,
    createdAt: "2024-01-19T09:00:00Z",
    timestamp: "2024-01-19T09:00:00Z",
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

// Tasks Mock Data
export const mockTasks = [
  {
    id: "TASK-001",
    title: "Follow up with Priya about her order",
    description: "Call the customer regarding delayed delivery.",
    status: "To Do" as const,
    priority: "High" as const,
    assignedTo: "Aman Gupta",
    dueDate: "2025-11-25",
    relatedTo: {
      type: "Order" as const,
      refId: "ORD-2312",
      name: "Chocolate Truffle Cake Order"
    },
    tags: ["Follow-up", "Urgent"],
    createdAt: "2025-11-22",
    createdBy: "Aman Gupta",
    activities: [
      { id: "act-1", action: "Task created", user: "Aman Gupta", timestamp: "2025-11-22T10:00:00Z" },
      { id: "act-2", action: "Priority changed to High", user: "Aman Gupta", timestamp: "2025-11-22T10:05:00Z" },
    ],
    notes: [
      { id: "note-1", author: "Aman Gupta", content: "Customer mentioned urgent delivery needed for birthday party", timestamp: "2025-11-22T10:10:00Z" }
    ]
  },
  {
    id: "TASK-002",
    title: "Create Black Friday broadcast",
    description: "Prepare a new WhatsApp template for promo.",
    status: "In Progress" as const,
    priority: "Medium" as const,
    assignedTo: "Riya Verma",
    dueDate: "2025-11-26",
    relatedTo: {
      type: "Marketing" as const,
      refId: "BR-129",
      name: "Black Friday Campaign"
    },
    tags: ["Campaign"],
    createdAt: "2025-11-20",
    createdBy: "Riya Verma",
    activities: [
      { id: "act-1", action: "Task created", user: "Riya Verma", timestamp: "2025-11-20T09:00:00Z" },
      { id: "act-2", action: "Status changed to In Progress", user: "Riya Verma", timestamp: "2025-11-21T14:00:00Z" },
    ],
    notes: []
  },
  {
    id: "TASK-003",
    title: "Update product pricing",
    description: "Fix pricing inconsistency in dashboard.",
    status: "Completed" as const,
    priority: "Low" as const,
    assignedTo: "Karan Singh",
    dueDate: "2025-11-22",
    relatedTo: null,
    tags: ["Internal"],
    createdAt: "2025-11-19",
    createdBy: "Karan Singh",
    activities: [
      { id: "act-1", action: "Task created", user: "Karan Singh", timestamp: "2025-11-19T11:00:00Z" },
      { id: "act-2", action: "Status changed to Completed", user: "Karan Singh", timestamp: "2025-11-22T16:00:00Z" },
    ],
    notes: []
  },
  {
    id: "TASK-004",
    title: "Respond to bulk order inquiry",
    description: "Ananya needs quote for 50 cupcakes",
    status: "To Do" as const,
    priority: "High" as const,
    assignedTo: "Riya Verma",
    dueDate: "2025-11-23",
    relatedTo: {
      type: "Customer" as const,
      refId: "CUS-003",
      name: "Ananya Desai"
    },
    tags: ["Follow-up", "Urgent"],
    createdAt: "2025-11-22",
    createdBy: "Aman Gupta",
    activities: [
      { id: "act-1", action: "Task created", user: "Aman Gupta", timestamp: "2025-11-22T11:00:00Z" },
    ],
    notes: []
  },
  {
    id: "TASK-005",
    title: "Update inventory levels",
    description: "Stock count for all products",
    status: "In Progress" as const,
    priority: "Medium" as const,
    assignedTo: "Karan Singh",
    dueDate: "2025-11-24",
    relatedTo: null,
    tags: ["Internal"],
    createdAt: "2025-11-21",
    createdBy: "Karan Singh",
    activities: [
      { id: "act-1", action: "Task created", user: "Karan Singh", timestamp: "2025-11-21T10:00:00Z" },
      { id: "act-2", action: "Status changed to In Progress", user: "Karan Singh", timestamp: "2025-11-22T09:00:00Z" },
    ],
    notes: []
  },
];

export const mockBroadcasts = [
  {
    id: "BR-001",
    title: "Diwali Mega Sale",
    messagePreview: "Get 40% off on all items! 🎉",
    fullMessage: "🪔 Happy Diwali! 🪔\n\nCelebrate the festival of lights with our MEGA SALE!\n\nGet 40% OFF on all items using code: DIWALI40\n\nOffer valid till Oct 31st. Shop now!",
    status: "Completed",
    audience: "All Customers (245)",
    audienceSegment: "All Customers",
    audienceCount: 245,
    template: "Promo Template",
    sent: 245,
    delivered: 231,
    read: 190,
    clicks: 87,
    failed: 14,
    createdAt: "2025-10-28",
    scheduledAt: "2025-10-29 10:00 AM",
    createdBy: "Aman Gupta"
  },
  {
    id: "BR-002",
    title: "Abandoned Cart Reminder",
    messagePreview: "You left something in your cart! 🛒",
    fullMessage: "Hi {{name}}! 👋\n\nWe noticed you left some items in your cart.\n\nYour cart contains:\n• {{item1}}\n• {{item2}}\n\nComplete your purchase now and get FREE shipping!",
    status: "Sending",
    audience: "Abandoned Cart Users (89)",
    audienceSegment: "Abandoned Cart",
    audienceCount: 89,
    template: "Abandoned Cart",
    sent: 42,
    delivered: 30,
    read: 21,
    clicks: 12,
    failed: 2,
    createdAt: "2025-11-20",
    scheduledAt: "2025-11-20 9:00 AM",
    createdBy: "Riya Verma"
  },
  {
    id: "BR-003",
    title: "Loyalty Program Launch",
    messagePreview: "Join our reward program! ⭐",
    fullMessage: "Exciting News! 🎊\n\nWe're launching our VIP Loyalty Program!\n\nAs a valued customer, you're invited to join our exclusive rewards program.\n\n✨ Earn points on every purchase\n✨ Get exclusive discounts\n✨ Early access to sales\n\nJoin now!",
    status: "Draft",
    audience: "VIP Customers (40)",
    audienceSegment: "VIP Customers",
    audienceCount: 40,
    template: "Greeting Template",
    sent: 0,
    delivered: 0,
    read: 0,
    clicks: 0,
    failed: 0,
    createdAt: "2025-11-22",
    scheduledAt: null,
    createdBy: "Aman Gupta"
  },
  {
    id: "BR-004",
    title: "Black Friday Preview",
    messagePreview: "Early access to Black Friday deals! 🔥",
    fullMessage: "BLACK FRIDAY IS HERE! 🔥\n\nGet early access to our biggest sale of the year!\n\n50-70% OFF on everything\n\nUse code: BF2025\n\nSale starts Nov 29th at midnight!",
    status: "Scheduled",
    audience: "High-Value Customers (156)",
    audienceSegment: "High-Value",
    audienceCount: 156,
    template: "Promo Template",
    sent: 0,
    delivered: 0,
    read: 0,
    clicks: 0,
    failed: 0,
    createdAt: "2025-11-22",
    scheduledAt: "2025-11-29 12:00 AM",
    createdBy: "Karan Singh"
  },
  {
    id: "BR-005",
    title: "New Product Launch",
    messagePreview: "Check out our new collection! ✨",
    fullMessage: "NEW ARRIVALS ALERT! ✨\n\nWe just launched our Winter Collection 2025!\n\n🧥 Trendy winter wear\n🧣 Cozy accessories\n👢 Stylish boots\n\nBe the first to shop! Limited stock available.",
    status: "Failed",
    audience: "New Customers (78)",
    audienceSegment: "New Customers",
    audienceCount: 78,
    template: "Order Update",
    sent: 78,
    delivered: 45,
    read: 32,
    clicks: 8,
    failed: 33,
    createdAt: "2025-11-18",
    scheduledAt: "2025-11-19 11:00 AM",
    createdBy: "Riya Verma"
  }
];

export const mockBroadcastTemplates = [
  {
    id: "TMPL-001",
    name: "Promo Template",
    category: "Marketing",
    variables: ["discount", "code", "expiry"]
  },
  {
    id: "TMPL-002",
    name: "Order Update",
    category: "Transactional",
    variables: ["orderId", "status", "trackingLink"]
  },
  {
    id: "TMPL-003",
    name: "Abandoned Cart",
    category: "Marketing",
    variables: ["name", "item1", "item2"]
  },
  {
    id: "TMPL-004",
    name: "Greeting Template",
    category: "Engagement",
    variables: ["name"]
  }
];

export const mockAudienceSegments = [
  { id: "SEG-001", name: "All Customers", count: 1247 },
  { id: "SEG-002", name: "New Customers", count: 312 },
  { id: "SEG-003", name: "Returning Customers", count: 935 },
  { id: "SEG-004", name: "VIP Customers", count: 40 },
  { id: "SEG-005", name: "High-Value", count: 156 },
  { id: "SEG-006", name: "Abandoned Cart", count: 89 },
  { id: "SEG-007", name: "Inactive (30+ days)", count: 234 }
];

export const mockChatTemplates = [
  {
    id: "TMP-001",
    name: "Welcome Message",
    category: "Automated Flows",
    channel: "WhatsApp",
    content: "Hi {{customer_name}}! 👋\n\nWelcome to Bakery Bliss! We're thrilled to have you here.\n\nBrowse our delicious range of cakes, pastries, and desserts. Need help? Just reply to this message!\n\nHappy shopping! 🎂",
    variables: ["customer_name"],
    updatedAt: "2025-02-10",
    createdAt: "2025-01-15",
    createdBy: "Aman Gupta",
    usageCount: 245
  },
  {
    id: "TMP-002",
    name: "Order Confirmation",
    category: "Quick Replies",
    channel: "Instagram",
    content: "Thank you for your order! 🎉\n\nOrder ID: {{order_id}}\nTotal Amount: ₹{{amount}}\n\nYour delicious treats will be ready soon. We'll notify you once they're out for delivery!\n\nTrack your order: {{tracking_link}}",
    variables: ["order_id", "amount", "tracking_link"],
    updatedAt: "2025-02-08",
    createdAt: "2025-01-10",
    createdBy: "Riya Verma",
    usageCount: 412
  },
  {
    id: "TMP-003",
    name: "Payment Reminder",
    category: "Automated Flows",
    channel: "WhatsApp",
    content: "Hi {{customer_name}},\n\nFriendly reminder: Your order {{order_id}} is pending payment.\n\nAmount due: ₹{{amount}}\n\nComplete payment here: {{payment_link}}\n\nNeed assistance? Reply to this message.",
    variables: ["customer_name", "order_id", "amount", "payment_link"],
    updatedAt: "2025-02-07",
    createdAt: "2025-01-20",
    createdBy: "Karan Singh",
    usageCount: 89
  },
  {
    id: "TMP-004",
    name: "Delivery Update",
    category: "Quick Replies",
    channel: "WhatsApp",
    content: "Great news! 🚚\n\nYour order {{order_id}} is out for delivery!\n\nExpected delivery: {{delivery_time}}\n\nDelivery partner: {{partner_name}}\nContact: {{partner_phone}}\n\nTrack live: {{tracking_link}}",
    variables: ["order_id", "delivery_time", "partner_name", "partner_phone", "tracking_link"],
    updatedAt: "2025-02-06",
    createdAt: "2025-01-12",
    createdBy: "Aman Gupta",
    usageCount: 378
  },
  {
    id: "TMP-005",
    name: "Product Inquiry Response",
    category: "Support Replies",
    channel: "Facebook",
    content: "Thanks for your interest in our products!\n\nOur {{agent_name}} will be happy to help you with:\n\n✓ Product details\n✓ Customization options\n✓ Pricing & offers\n✓ Delivery information\n\nWhat would you like to know more about?",
    variables: ["agent_name"],
    updatedAt: "2025-02-05",
    createdAt: "2025-01-08",
    createdBy: "Riya Verma",
    usageCount: 156
  },
  {
    id: "TMP-006",
    name: "Birthday Greeting",
    category: "Broadcast Messages",
    channel: "WhatsApp",
    content: "🎉 Happy Birthday {{customer_name}}! 🎂\n\nWishing you a day filled with joy and sweetness!\n\nAs our birthday gift to you, enjoy 25% OFF on your next order. Use code: BDAY25\n\nValid for 7 days. Make it special! 🎁",
    variables: ["customer_name"],
    updatedAt: "2025-02-04",
    createdAt: "2025-01-25",
    createdBy: "Aman Gupta",
    usageCount: 67
  },
  {
    id: "TMP-007",
    name: "Bulk Order Quote",
    category: "Sales Script",
    channel: "Instagram",
    content: "Thank you for your bulk order inquiry!\n\nWe'd love to help you with your order of {{quantity}} items.\n\nOur team will prepare a custom quote including:\n• Special bulk pricing\n• Delivery timeline\n• Customization options\n\nExpect our quote within 24 hours!",
    variables: ["quantity"],
    updatedAt: "2025-02-03",
    createdAt: "2025-01-18",
    createdBy: "Karan Singh",
    usageCount: 34
  },
  {
    id: "TMP-008",
    name: "Feedback Request",
    category: "Automated Flows",
    channel: "WhatsApp",
    content: "Hi {{customer_name}}! 🌟\n\nWe hope you enjoyed your order!\n\nYour feedback means the world to us. Could you take 30 seconds to rate your experience?\n\nRate us: {{feedback_link}}\n\nThank you for choosing Bakery Bliss! 💚",
    variables: ["customer_name", "feedback_link"],
    updatedAt: "2025-02-02",
    createdAt: "2025-01-05",
    createdBy: "Riya Verma",
    usageCount: 198
  },
  {
    id: "TMP-009",
    name: "Cart Abandonment",
    category: "Automated Flows",
    channel: "WhatsApp",
    content: "Hey {{customer_name}}! 🛒\n\nYou left some goodies in your cart:\n\n{{cart_items}}\n\nTotal: ₹{{cart_total}}\n\nComplete your order now and get FREE delivery! Offer valid for 24 hours.\n\nCheckout here: {{checkout_link}}",
    variables: ["customer_name", "cart_items", "cart_total", "checkout_link"],
    updatedAt: "2025-02-01",
    createdAt: "2025-01-22",
    createdBy: "Aman Gupta",
    usageCount: 142
  },
  {
    id: "TMP-010",
    name: "Out of Stock Alert",
    category: "Support Replies",
    channel: "Unified Chat",
    content: "We're sorry, but {{product_name}} is currently out of stock. 😔\n\nWould you like to:\n\n1️⃣ Get notified when it's back\n2️⃣ See similar products\n3️⃣ Pre-order for next batch\n\nReply with your choice or contact {{agent_name}} for help!",
    variables: ["product_name", "agent_name"],
    updatedAt: "2025-01-31",
    createdAt: "2025-01-14",
    createdBy: "Karan Singh",
    usageCount: 78
  }
];

export const templateCategories = [
  "All",
  "Automated Flows",
  "Quick Replies",
  "Broadcast Messages",
  "Sales Script",
  "Support Replies"
];

export const templateChannels = [
  "All Channels",
  "WhatsApp",
  "Instagram",
  "Facebook",
  "Unified Chat"
];

export const templateVariables = [
  { value: "{{customer_name}}", label: "Customer Name" },
  { value: "{{order_id}}", label: "Order ID" },
  { value: "{{amount}}", label: "Amount" },
  { value: "{{agent_name}}", label: "Agent Name" },
  { value: "{{tracking_link}}", label: "Tracking Link" },
  { value: "{{payment_link}}", label: "Payment Link" },
  { value: "{{delivery_time}}", label: "Delivery Time" },
  { value: "{{partner_name}}", label: "Partner Name" },
  { value: "{{partner_phone}}", label: "Partner Phone" },
  { value: "{{quantity}}", label: "Quantity" },
  { value: "{{feedback_link}}", label: "Feedback Link" },
  { value: "{{cart_items}}", label: "Cart Items" },
  { value: "{{cart_total}}", label: "Cart Total" },
  { value: "{{checkout_link}}", label: "Checkout Link" },
  { value: "{{product_name}}", label: "Product Name" }
];
