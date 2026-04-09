export const mockOrders = [
  {
    id: "ORD-7281",
    customer: "James Wilson",
    email: "james.w@example.com",
    date: "2024-03-15",
    total: 1250.00,
    status: "pending",
    priority: "high",
    items: 3,
    assigned: "Sarah Connor",
    avatar: "JW"
  },
  {
    id: "ORD-9120",
    customer: "Elena Rodriguez",
    email: "elena.r@example.com",
    date: "2024-03-14",
    total: 450.50,
    status: "progress",
    priority: "medium",
    items: 1,
    assigned: "Mike Ross",
    avatar: "ER"
  },
  {
    id: "ORD-4432",
    customer: "Marcus Chen",
    email: "m.chen@example.com",
    date: "2024-03-12",
    total: 3200.00,
    status: "completed",
    priority: "low",
    items: 5,
    assigned: "Harvey Specter",
    avatar: "MC"
  },
  {
    id: "ORD-5501",
    customer: "Olivia Smith",
    email: "olivia.s@example.com",
    date: "2024-03-10",
    total: 890.00,
    status: "cancelled",
    priority: "high",
    items: 2,
    assigned: "Louis Litt",
    avatar: "OS"
  },
  {
    id: "ORD-2290",
    customer: "Robert Fox",
    email: "robert@example.com",
    date: "2024-03-16",
    total: 150.00,
    status: "pending",
    priority: "medium",
    items: 1,
    assigned: "Donna Paulsen",
    avatar: "RF"
  }
];

export const orderStats = {
  total: 154,
  pending: 12,
  inProgress: 8,
  completed: 124,
  cancelled: 10
};
