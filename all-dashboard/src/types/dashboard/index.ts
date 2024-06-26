export interface DashboardData {
    currency: string
    currencySymbol: string
    earnings: Earnings
    total_bookings: number
    upcoming_bookings: number
    graph: Graph[]
    reservations: Reservations
    insights: Insight[]
  }
  
  export interface Earnings {
    weekly: Weekly
    monthly: Monthly
    yearly: Yearly
    listings: Listings
  }
  
  export interface Weekly {
    price: string
    percentage: string
  }
  
  export interface Monthly {
    price: string
    percentage: string
  }
  
  export interface Yearly {
    price: string
    percentage: string
  }
  
  export interface Listings {
    high: High[]
    low: Low[]
  }
  
  export interface High {
    name: string
    type: string
    earnings: string
    ratings: number
    percentage: number
  }
  
  export interface Low {
    name: string
    type: string
    earnings: string
    ratings: number
    percentage: number
  }
  
  export interface Graph {
    month: string
    value: string
  }
  
  export interface Reservations {
    recent: Recent[]
  }
  
  export interface Recent {
    listing: Listing
    code: string
    createdAt: string
    grand_total: string
    checkIn: string
    checkOut: string
    checkout_status: string
    user: User
  }
  
  export interface Listing {
    listing_id: string
    title: string
  }
  
  export interface User {
    user_name: string
    user_picture: string
  }
  
  export interface Insight {
    title: string
    value: string
    percentage: number
  }