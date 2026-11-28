"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/fetcher";
import type { ApiResponse, WeddingService } from "@/types/wedding";

interface BookingRequestModalProps {
  service: WeddingService;
  triggerButton?: React.ReactNode;
}

function getServiceImage(service: WeddingService): string {
  const s = service as WeddingService & {
    featuredImage?: string;
    image?: string;
    images?: string | string[];
  };
  if (s.featuredImage) return s.featuredImage;
  if (s.image) return s.image;
  if (Array.isArray(s.images)) return s.images[0] || "";
  return typeof s.images === "string" ? s.images : "";
}

export function BookingRequestModal({
  service,
  triggerButton,
}: BookingRequestModalProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState(service.location || "");
  const [guestCount, setGuestCount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in with a Customer account to book.");
      return;
    }

    const s = service as WeddingService & { _id?: string; id?: string };
    const bookingPayload = {
      serviceId: s._id || s.id || "",
      serviceName: service.title,
      serviceCategory: service.category,
      serviceImage: getServiceImage(service),
      vendorId: service.vendorId,
      vendorName: service.vendorName,
      vendorEmail: service.vendorEmail,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      eventDate,
      eventLocation,
      guestCount: guestCount ? Number(guestCount) : undefined,
      totalAmount: Number(service.price) || 0,
      specialNotes: message.trim() || undefined,
    };

    setIsSubmitting(true);
    try {
      const res = await apiFetch<ApiResponse<unknown>>("/bookings", {
        method: "POST",
        body: JSON.stringify(bookingPayload),
      });

      if (res.success) {
        setIsSubmitted(true);
        toast.success("Booking request sent", {
          description: `Inquiry sent to ${service.vendorName}. They will review your requested date.`,
        });
        router.refresh();
      } else {
        toast.error("Failed to send booking request");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your booking."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEventDate("");
    setEventLocation(service.location || "");
    setMessage("");
    setGuestCount("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) handleReset();
      }}
    >
      <DialogTrigger
        render={
          triggerButton ? (
            (triggerButton as React.ReactElement)
          ) : (
            <Button className="w-full bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-10 font-medium transition-colors">
              Request booking
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md bg-pure-alabaster border border-border rounded-xl p-6">
        {isSubmitted ? (
          // Success Feedback
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-botanical-sage border border-emerald-200">
              <CheckCircle2 className="size-6" strokeWidth={1.5} />
            </div>
            <div className="space-y-1.5">
              <DialogTitle className="font-serif text-2xl font-medium text-deep-ink">
                Booking request sent
              </DialogTitle>
              <DialogDescription className="font-sans text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Your request has been delivered to{" "}
                <strong className="font-medium text-deep-ink">
                  {service.vendorName}
                </strong>
                . They typically review availability within 24 to 48 hours.
              </DialogDescription>
            </div>
            <div className="p-3 bg-soft-pearl rounded-lg text-xs text-muted-foreground border border-border text-left space-y-1">
              <p>
                <strong className="font-medium text-deep-ink">Service:</strong>{" "}
                {service.title}
              </p>
              {eventDate && (
                <p>
                  <strong className="font-medium text-deep-ink">
                    Target date:
                  </strong>{" "}
                  {eventDate}
                </p>
              )}
              {eventLocation && (
                <p>
                  <strong className="font-medium text-deep-ink">
                    Location:
                  </strong>{" "}
                  {eventLocation}
                </p>
              )}
            </div>
            <div className="pt-2">
              <DialogClose
                render={
                  <Button
                    onClick={() => setOpen(false)}
                    className="w-full bg-deep-ink hover:bg-deep-ink/90 text-pure-alabaster rounded-lg h-10 font-medium"
                  >
                    Close window
                  </Button>
                }
              />
            </div>
          </div>
        ) : (
          // Booking Form
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader className="space-y-1 text-left">
              <p className="text-xs font-medium text-rosewood">
                Direct date inquiry
              </p>
              <DialogTitle className="font-serif text-2xl font-medium text-deep-ink tracking-tight">
                Request {service.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground font-sans">
                Submit your celebration details directly to {service.vendorName}.
                No charges apply today.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 pt-2">
              {/* Event Date Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-deep-ink flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
                  <span>Celebration event date</span>
                </label>
                <Input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="rounded-lg bg-pure-alabaster border-border h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
                />
              </div>

              {/* Event Location Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-deep-ink flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
                  <span>Event location / venue</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Napa Valley, CA or Private Estate"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="rounded-lg bg-pure-alabaster border-border h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
                />
              </div>

              {/* Guest Count Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-deep-ink">
                  Estimated guest count (optional)
                </label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g. 150"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="rounded-lg bg-pure-alabaster border-border h-10 text-sm tabular-nums focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
                />
              </div>

              {/* Additional Message Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-deep-ink">
                  Additional notes
                </label>
                <Textarea
                  rows={3}
                  placeholder="Share details about your wedding schedule, specific requests, or consultation timeline"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-lg bg-pure-alabaster border-border text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
                />
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-border flex flex-col-reverse sm:flex-row gap-2">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    className="rounded-lg border-border text-deep-ink h-10 text-sm font-medium w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                }
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-10 text-sm font-medium transition-colors w-full sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit request"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
