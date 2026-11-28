import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Store, CalendarCheck2, Clock, Plus } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { VendorBookingRequestsTable } from "@/components/dashboard/VendorBookingRequestsTable";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { apiFetch } from "@/lib/fetcher";
import type {
  ApiResponse,
  BookingRequest,
  IUser,
  IWeddingService,
} from "@/types/wedding";

type BookingDoc = BookingRequest & { _id?: string };

export default async function VendorOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const vendorUser: IUser = session.user;

  const [servicesRes, bookingsRes] = await Promise.all([
    apiFetch<ApiResponse<IWeddingService[]>>(
      `/service?vendorId=${vendorUser.id}`,
      { cache: "no-store" }
    ).catch(() => ({ success: false, data: [] as IWeddingService[] })),
    apiFetch<ApiResponse<BookingDoc[]>>(
      `/bookings?vendorId=${vendorUser.id}`,
      { cache: "no-store" }
    ).catch(() => ({ success: false, data: [] as BookingDoc[] })),
  ]);

  const services: IWeddingService[] = servicesRes.data ?? [];
  const activeService = services.filter((s) => s.isActive === true);

  const bookings: BookingRequest[] = (bookingsRes.data ?? []).map((b) => ({
    ...b,
    id: b._id || b.id,
  }));
  const acceptedCount = bookings.filter((b) => b.status === "accepted").length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <p className="text-xs font-medium text-rosewood">Vendor studio</p>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-deep-ink tracking-tight">
            {vendorUser.businessName || vendorUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Manage your service portfolio, review incoming date requests, and
            track inquiry conversions.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            href="/dashboard/vendor/add-service"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-9 px-4 text-sm font-medium"
            )}
          >
            <Plus className="size-4 mr-1.5" strokeWidth={1.5} />
            Add service
          </Link>
        </div>
      </div>

      {/* 5 StatCards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard
          label="Total Services"
          value={services.length}
          description="Total listings"
          icon={Store}
        />
        <StatCard
          label="Active Services"
          value={activeService.length}
          description="Active listings"
          icon={Store}
        />
        <StatCard
          label="Accepted Bookings"
          value={acceptedCount}
          trend={{ value: "Confirmed", isPositive: true }}
          description="Active client events"
          icon={CalendarCheck2}
        />
        <StatCard
          label="Pending Booking Requests"
          value={pendingCount}
          trend={{ value: "Action Required", isPositive: true }}
          description="Awaiting your response"
          icon={Clock}
        />
        <StatCard
          label="Current Subscription Plan"
          value={vendorUser.vendorTier === "premium" ? "Premium" : "Free Plan"}
          description="3 of 3 slots used"
        />
      </div>

      {/* Recent Client Requests */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-medium text-deep-ink tracking-tight">
              Recent client inquiries
            </h2>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">
              Review event dates and decide to accept or decline bookings
            </p>
          </div>
          <Link
            href="/dashboard/vendor/bookings"
            className="text-xs font-medium text-rosewood hover:underline tabular-nums"
          >
            View all requests ({bookings.length})
          </Link>
        </div>

        <VendorBookingRequestsTable bookings={bookings} limit={3} />
      </div>
    </div>
  );
}
