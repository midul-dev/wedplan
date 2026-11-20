export const SERVICE_CATEGORIES = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export type UserRole = "customer" | "vendor" | "admin";
export type VendorTier = "free" | "premium";
export type ServiceStatus = "approved" | "pending" | "rejected";
export type BookingStatus = "pending" | "accepted" | "rejected" | "paid" | "completed" | "cancelled";
export type TransactionStatus = "paid" | "pending" | "failed";
export type SubscriptionPlan = "free" | "premium_monthly" | "premium_annual";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  vendorTier?: VendorTier;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  businessName?: string;
  isVerified?: boolean;
  createdAt: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface WeddingService {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  vendorId: string;
  vendorName: string;
  vendorTier: VendorTier;
  vendorAvatar?: string;
  price: number;
  priceUnit: string;
  location: string;
  images: string[];
  featuredImage: string;
  description: string;
  shortDescription: string;
  rating: number;
  reviewCount: number;
  status: ServiceStatus;
  capacity?: string;
  amenities?: string[];
  packages?: ServicePackage[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  serviceImage: string;
  vendorId: string;
  vendorName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  eventDate: string;
  guestCount?: number;
  totalAmount: number;
  status: BookingStatus;
  specialNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionTransaction {
  id: string;
  vendorId: string;
  vendorName: string;
  plan: SubscriptionPlan;
  amount: number;
  currency: string;
  status: TransactionStatus;
  stripePaymentIntentId?: string;
  stripeInvoiceId?: string;
  billingInterval: "monthly" | "annual";
  createdAt: string;
  nextBillingDate?: string;
}
