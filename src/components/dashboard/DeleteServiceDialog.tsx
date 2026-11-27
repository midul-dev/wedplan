"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { apiFetch } from "@/lib/fetcher";
import type { IWeddingService } from "@/types/wedding";

interface DeleteServiceDialogProps {
  service: IWeddingService 
}

export function DeleteServiceDialog({
  service
}: DeleteServiceDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDial, setOpenDial] = useState(false);

  const handleConfirmDelete = async () => {
    if (!service) return;

    setIsDeleting(true);
    try {
      await apiFetch(`/service/${service._id}`, {
        method: "DELETE",
      });

      toast.success("Service deleted", {
        description: `"${service.title}" was removed from your catalog.`,
      });
      setOpenDial(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete service",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => setOpenDial(true)}
        className="text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg cursor-pointer"
        title="Delete service"
      >
        <Trash2 className="size-3.5" strokeWidth={1.5} />
      </Button>

      <Dialog open={openDial} onOpenChange={setOpenDial}>
        <DialogContent className="sm:max-w-md bg-pure-alabaster border border-border rounded-xl p-6">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-700 border border-rose-200/80">
                <AlertTriangle className="size-4" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <DialogTitle className="font-serif text-lg font-medium text-deep-ink">
                  Delete service
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  This action cannot be undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <p className="text-sm text-deep-ink/85 leading-relaxed">
            Are you sure you want to permanently delete{" "}
            <span className="font-medium text-deep-ink">{service?.title}</span>?
            It will be removed from your studio and public directory.
          </p>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenDial(false)}
              disabled={isDeleting}
              className="rounded-lg h-9 text-sm border-border"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="rounded-lg h-9 px-4 text-sm font-medium"
            >
              {isDeleting ? "Deleting..." : "Delete service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
