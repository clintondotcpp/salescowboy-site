"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthToken, type User } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  business: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface DashboardContentProps {
  user: User;
  onLogout: () => void;
}

export default function DashboardContent({ user, onLogout }: DashboardContentProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { toast } = useToast();

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    const token = getAuthToken();
    
    if (!token) {
      onLogout();
      return;
    }

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
      });
      if (statusFilter) {
        params.append("status", statusFilter);
      }

      const response = await fetch(`/api/contacts?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setContacts(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        toast({
          title: "Error",
          description: "Failed to load contacts",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load contacts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, onLogout, toast]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const updateStatus = async (id: number, status: string) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await fetch("/api/contacts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Contact status updated",
        });
        fetchContacts();
      } else {
        toast({
          title: "Error",
          description: "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const deleteContact = async (id: number) => {
    if (!confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await fetch(`/api/contacts?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Contact deleted",
        });
        fetchContacts();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete contact",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Rye, serif' }}>
              Contact Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.name || user.email}</p>
          </div>
          <Button onClick={onLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Contact Submissions</CardTitle>
                <CardDescription>Manage and respond to contact form submissions</CardDescription>
              </div>
              <Select value={statusFilter} onValueChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading contacts...</p>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No contacts found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-left p-3 font-semibold">Email</th>
                        <th className="text-left p-3 font-semibold">Phone</th>
                        <th className="text-left p-3 font-semibold">Business</th>
                        <th className="text-left p-3 font-semibold">Message</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Date</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="border-b border-border hover:bg-muted/50">
                          <td className="p-3">{contact.name}</td>
                          <td className="p-3">
                            <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                              {contact.email}
                            </a>
                          </td>
                          <td className="p-3">{contact.phone || "-"}</td>
                          <td className="p-3">{contact.business || "-"}</td>
                          <td className="p-3 max-w-xs truncate">{contact.message}</td>
                          <td className="p-3">
                            <Select
                              value={contact.status}
                              onValueChange={(value) => updateStatus(contact.id, value)}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {formatDate(contact.created_at)}
                          </td>
                          <td className="p-3">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteContact(contact.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
