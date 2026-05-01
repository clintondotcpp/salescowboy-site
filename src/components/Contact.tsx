"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    city: "",
    state: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function hashSHA256(value: string) {
    if (!value) return "";
    const subtle =
      typeof window !== "undefined" && window.crypto?.subtle
        ? window.crypto.subtle
        : undefined;

    if (!subtle) {
      console.error("SubtleCrypto API is unavailable in this environment.");
      return "";
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(value.trim().toLowerCase());
    const hashBuffer = await subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response from server:", text);
        throw new Error(`Server returned ${response.status}: ${text.substring(0, 100)}`);
      }

      if (response.ok && data.success) {
        const eventId = crypto.randomUUID();

        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", { currency: "NGN", value: 0 }, { eventID: eventId });
        }

        const userData: Record<string, string> = {};
        if (formData.email) userData.em = await hashSHA256(formData.email);
        if (formData.phone) {
          const cleanedPhone = formData.phone.replace(/\D/g, "");
          if (cleanedPhone) userData.ph = await hashSHA256(cleanedPhone);
        }
        if (formData.city) userData.ct = await hashSHA256(formData.city);
        if (formData.state) userData.st = await hashSHA256(formData.state);
        userData.country = await hashSHA256("ng");

        try {
          console.log("[Contact] Sending CAPI Lead event...");
          const capResponse = await fetch("/api/meta-capi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventName: "Lead",
              eventId,
              url: typeof window !== "undefined" ? window.location.href : "",
              userData,
              customData: { currency: "NGN", value: 0 },
            }),
          });
          const capData = await capResponse.json();
          console.log("[Contact] CAPI Response:", capData);
        } catch (capError) {
          console.error("[Contact] Meta CAPI error", capError);
        }

        console.log("[Contact] Submission result:", data);
        
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          business: "",
          city: "",
          state: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "Rye, serif" }}>
              Get a Free Audit or Quote.
            </h2>
            <p className="text-xl text-muted-foreground">
              No fluff. No gimmicks. Just real strategies that work.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border border-border shadow-elegant">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-foreground">Name *</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Chukwu Emeka"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">Email *</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone</label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 802 404 5815"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="business" className="text-sm font-semibold text-foreground">Business Name</label>
                <Input
                  id="business"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-semibold text-foreground">City</label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Lagos"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-semibold text-foreground">State</label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Lagos State"
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-foreground">Message *</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us about your project..."
                rows={6}
                className="bg-background border-border resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg hover-lift"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
