"use client";

import React, { useState } from "react";
import { Calendar, MapPin, CheckCircle2, Sparkles } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { WeddingService } from "@/types/wedding";

interface BookingRequestModalProps {
  service: WeddingService;
  triggerButton?: React.ReactNode;
}

export function BookingRequestModal({
  service,
  triggerButton,
}: BookingRequestModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form states
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState(service.location || "");
  const [guestCount, setGuestCount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pure presentational UI: simulate submission
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEventDate("");
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
            <Button className="w-full bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-11 font-medium transition-colors shadow-xs">
              Request Booking
            </Button>
          )
        }
      />

      <DialogContent className="sm:max-w-md bg-pure-alabaster border border-zinc-200 rounded-2xl p-6 shadow-xl">
        {isSubmitted ? (
          // Success Feedback
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-botanical-sage border border-emerald-200">
              <CheckCircle2 className="size-7" />
            </div>
            <div className="space-y-1.5">
              <DialogTitle className="font-serif text-2xl font-semibold text-deep-ink">
                Booking Request Sent
              </DialogTitle>
              <DialogDescription className="font-sans text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
                Your request has been delivered to <strong>{service.vendorName}</strong>.
                They typically review availability and reply within 24 to 48 hours.
              </DialogDescription>
            </div>
            <div className="p-3 bg-soft-pearl rounded-xl text-xs text-zinc-600 border border-zinc-200/70 text-left space-y-1">
              <p>
                <strong>Service:</strong> {service.title}
              </p>
              {eventDate && (
                <p>
                  <strong>Target Date:</strong> {eventDate}
                </p>
              )}
              {eventLocation && (
                <p>
                  <strong>Celebration Location:</strong> {eventLocation}
                </p>
              )}
            </div>
            <div className="pt-2">
              <DialogClose
                render={
                  <Button
                    onClick={() => setOpen(false)}
                    className="w-full bg-deep-ink hover:bg-black text-white rounded-xl h-10 font-medium"
                  >
                    Close Window
                  </Button>
                }
              />
            </div>
          </div>
        ) : (
          // Booking Form
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader className="space-y-1 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rosewood uppercase tracking-wider">
                <Sparkles className="size-3" />
                <span>Direct Date Inquiry</span>
              </div>
              <DialogTitle className="font-serif text-2xl font-semibold text-deep-ink tracking-tight">
                Request {service.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-500 font-sans">
                Submit your celebration details directly to {service.vendorName}. No charges apply today.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5 pt-2">
              {/* Event Date Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-deep-ink flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-zinc-400" />
                  <span>Celebration Event Date</span>
                </label>
                <Input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
                />
              </div>

              {/* Event Location Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-deep-ink flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-zinc-400" />
                  <span>Event Location / Venue</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Napa Valley, CA or Private Estate"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
                />
              </div>

              {/* Guest Count Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-deep-ink">
                  Estimated Guest Count (Optional)
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 150"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="rounded-xl bg-white border-zinc-200 h-10 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
                />
              </div>

              {/* Additional Message Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-deep-ink">
                  Additional Message or Special Vision
                </label>
                <Textarea
                  rows={3}
                  placeholder="Share details about your wedding cadence, specific requests, or consultation timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-xl bg-white border-zinc-200 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
                />
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-zinc-100 flex flex-col-reverse sm:flex-row gap-2">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl border-zinc-200 text-zinc-700 h-10 text-sm font-medium w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                }
              />
              <Button
                type="submit"
                className="bg-rosewood hover:bg-rosewood-hover text-white rounded-xl h-10 text-sm font-medium transition-colors shadow-xs w-full sm:w-auto"
              >
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
