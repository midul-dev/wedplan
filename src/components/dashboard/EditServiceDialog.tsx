"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { apiFetch } from "@/lib/fetcher";
import {
  SERVICE_CATEGORIES,
  type IWeddingService,
  type ServiceCategory,
} from "@/types/wedding";
import { number } from "better-auth";
import { Pencil } from "lucide-react";

interface EditServiceDialogProps {
  service: IWeddingService;
}

export function EditServiceDialog({ service }: EditServiceDialogProps) {
  const router = useRouter();
  const [openDial, setOpenDial] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
const formData = new FormData(e.currentTarget)
const updatedData = Object.fromEntries(formData.entries())
const updatedService = {...updatedData, price: Number(formData.get("price")) as number}
console.log(updatedService)
    setIsSaving(true);
    try {
      await apiFetch(`/service/${service._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedService),
      });

      toast.success("Service updated", {
        description: `"${updatedData?.title}" has been saved.`,
      });
      setOpenDial(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update service",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={() => setOpenDial(true)}
      title="Edit service"
    >
      <Pencil className="size-3.5" />
    </Button>
    
    <Dialog open={openDial} onOpenChange={setOpenDial}>
      <DialogContent className="sm:max-w-lg bg-pure-alabaster border border-border rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-medium text-deep-ink">
            Edit service
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Update pricing, category, or description for this listing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-deep-ink">
              Service title
            </label>
            <Input
              required
              name="title"
              defaultValue={service.title}
              className="h-9 rounded-lg bg-pure-alabaster border-border text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-deep-ink">
                Category
              </label>
              <Select name="category" defaultValue={service.category}>
                <SelectTrigger className="w-full h-9 rounded-lg bg-pure-alabaster border-border text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-pure-alabaster border border-border rounded-xl">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-deep-ink">
                Base price (USD) & unit
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  required
                  name="price"
                  defaultValue={service.price}
                  className="w-1/2 h-9 rounded-lg bg-pure-alabaster border-border text-sm tabular-nums"
                />
                <Input
                  type="text"
                  placeholder="per event"
                  name="priceUnit"
                  defaultValue={service.priceUnit}
                  className="w-1/2 h-9 rounded-lg bg-pure-alabaster border-border text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-deep-ink">
                Location
              </label>
              <Input
                required
                name="location"
                defaultValue={service.location}
                className="h-9 rounded-lg bg-pure-alabaster border-border text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-deep-ink">
                Capacity (optional)
              </label>
              <Input
                name="capacity"
                defaultValue={service.capacity}
                className="h-9 rounded-lg bg-pure-alabaster border-border text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-deep-ink">
              Description
            </label>
            <Textarea
              rows={3}
              required
              name="description"
              defaultValue={service.description}
              className="rounded-lg bg-pure-alabaster border-border text-sm leading-relaxed"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenDial(false)}
              disabled={isSaving}
              className="rounded-lg h-9 text-sm border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-rosewood hover:bg-rosewood-hover text-pure-alabaster rounded-lg h-9 px-5 text-sm font-medium"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}
