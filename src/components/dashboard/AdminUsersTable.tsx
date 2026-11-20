"use client";

import React, { useState, useMemo } from "react";
import { Search, Ban, CheckCircle2, ShieldAlert } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { MOCK_USERS } from "@/data/mockData";
import type { UserProfile } from "@/types/wedding";

interface UserWithStatus extends UserProfile {
  isBlocked?: boolean;
}

export function AdminUsersTable() {
  const [users, setUsers] = useState<UserWithStatus[]>(() =>
    MOCK_USERS.map((u) => ({ ...u, isBlocked: false }))
  );
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        !search.trim() ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchRole =
        roleFilter === "all" || u.role.toLowerCase() === roleFilter.toLowerCase();

      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const toggleBlockStatus = (id: string, currentBlocked: boolean, name: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isBlocked: !currentBlocked } : u))
    );
    const msg = currentBlocked
      ? `Account for ${name} has been unblocked.`
      : `Account for ${name} has been blocked and suspended from the directory.`;
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-4">
      {/* Feedback Banner */}
      {feedback && (
        <div className="p-3 bg-zinc-100 text-deep-ink border border-zinc-200 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0 text-botanical-sage" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Top Search & Filter Toolbar */}
      <div className="p-4 bg-pure-alabaster border border-zinc-200 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        {/* Search by Name/Email */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-white border-zinc-200 text-sm focus-visible:ring-rosewood/30 focus-visible:border-rosewood"
          />
        </div>

        {/* Role Filter Select */}
        <div className="w-full sm:w-48">
          <Select value={roleFilter} onValueChange={(val) => setRoleFilter(val || "all")}>
            <SelectTrigger className="w-full h-10 rounded-xl bg-white border-zinc-200 text-sm font-sans">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-zinc-200 rounded-xl shadow-lg">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <EmptyState
          icon={ShieldAlert}
          title="No Users Match"
          description="Try broadening your search keyword or resetting the role filter."
        />
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-pure-alabaster overflow-hidden shadow-xs">
          <Table>
            <TableHeader className="bg-soft-pearl/80">
              <TableRow className="border-b border-zinc-200 hover:bg-transparent">
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 pl-6">
                  User Details
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Platform Role
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Subscription Tier
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5">
                  Account Status
                </TableHead>
                <TableHead className="font-semibold text-deep-ink text-xs uppercase tracking-wider py-3.5 text-right pr-6">
                  Account Control
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => {
                const isBlocked = Boolean(u.isBlocked);

                return (
                  <TableRow
                    key={u.id}
                    className="border-b border-zinc-100 hover:bg-soft-pearl/30 transition-colors"
                  >
                    {/* User Identity */}
                    <TableCell className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9 border border-zinc-200">
                          {u.avatar && <AvatarImage src={u.avatar} alt={u.name} />}
                          <AvatarFallback className="bg-rose-50 text-rosewood text-xs font-serif font-bold">
                            {getInitials(u.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-serif font-semibold text-sm text-deep-ink leading-tight">
                            {u.name}
                          </p>
                          <p className="text-xs text-zinc-500 font-sans mt-0.5">
                            {u.email}
                          </p>
                          {u.businessName && (
                            <span className="text-[10px] text-zinc-400 font-sans">
                              {u.businessName}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell className="py-4">
                      <StatusBadge
                        status={u.role}
                        showDot={false}
                        className="uppercase text-[10px] font-semibold"
                      />
                    </TableCell>

                    {/* Subscription Tier */}
                    <TableCell className="py-4 text-xs font-sans text-zinc-600">
                      {u.role === "vendor" ? (
                        u.vendorTier === "premium" ? (
                          <span className="font-semibold text-champagne-amber">
                            Premium Plan ($49/mo)
                          </span>
                        ) : (
                          <span className="text-zinc-500">Free Tier (Max 3)</span>
                        )
                      ) : (
                        <span className="text-zinc-400">—</span>
                      )}
                    </TableCell>

                    {/* Account Status Badge */}
                    <TableCell className="py-4">
                      {isBlocked ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="size-1.5 rounded-full bg-rose-600" />
                          Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-botanical-sage border border-emerald-200">
                          <span className="size-1.5 rounded-full bg-botanical-sage" />
                          Active
                        </span>
                      )}
                    </TableCell>

                    {/* Block / Unblock Action Button */}
                    <TableCell className="py-4 text-right pr-6">
                      {u.role === "admin" ? (
                        <span className="text-[11px] text-zinc-400 italic">
                          Protected Admin
                        </span>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleBlockStatus(u.id, isBlocked, u.name)}
                          className={
                            isBlocked
                              ? "h-8 px-3 text-xs font-medium border-emerald-300 text-botanical-sage hover:bg-emerald-50 cursor-pointer"
                              : "h-8 px-3 text-xs font-medium border-rose-300 text-rose-700 hover:bg-rose-50 cursor-pointer"
                          }
                        >
                          {isBlocked ? (
                            <>
                              <CheckCircle2 className="size-3.5 mr-1 text-botanical-sage" />
                              Unblock User
                            </>
                          ) : (
                            <>
                              <Ban className="size-3.5 mr-1 text-rose-600" />
                              Block User
                            </>
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
