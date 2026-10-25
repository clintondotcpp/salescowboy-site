"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, MessageCircle, Clock, CheckCircle2, Shield } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const serviceDivisions = [
  "Marketing & Ads (Meta, Google, SEO)",
  "Digital Products (Web, App, Software)",
  "CRM & AI Automation",
  "Brand Identity & Research",
  "CAC Registration & Compliance",
];

const budgetRanges = [
  "Under ₦250,000",
  "₦250,000 – ₦750,000",
  "₦750,000 – ₦2,500,000",
  "₦2,500,000+",
];

const fieldClass =
  "w-full bg-transparent border-0 border-b border-border px-0 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors";

async function hashSHA256(value: string) {
  if (!value || typeof window === "undefined" || !window.crypto?.subtle) return "";
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const hash = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const empty = {
  name: "",
  email: "",
  phone: "",
  business: "",
  budget: "",
  message: "",
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(empty);
  const [service, setService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const detailedMessage = [
        service ? `[SERVICE DIVISION]: ${service}` : "",
        formData.business ? `[BUSINESS / INDUSTRY]: ${formData.business}` : "",
        formData.budget ? `[BUDGET RANGE]: ${formData.budget}` : "",
        `[MESSAGE]:\n${formData.message}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          business: formData.business,
          city: "",
          state: "",
          message: detailedMessage,
        }),
      });

      const isJson = response.headers.get("content-type")?.includes("application/json");
      if (!isJson) throw new Error(`Server returned ${response.status}`);
      const data = await response.json();

      if (response.ok && data.success) {
        const eventId = crypto.randomUUID();
        window.fbq?.("track", "Lead", { currency: "NGN", value: 0 }, { eventID: eventId });

        const userData: Record<string, string> = { country: await hashSHA256("ng") };
        if (formData.email) userData.em = await hashSHA256(formData.email);
        const phone = formData.phone.replace(/\D/g, "");
        if (phone) userData.ph = await hashSHA256(phone);

        fetch("/api/meta-capi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName: "Lead",
            eventId,
            url: window.location.href,
            userData,
            customData: { currency: "NGN", value: 0 },
          }),
        }).catch(() => {});

        toast({
          title: "Proposal request received",
          description: "We'll review your scope and reply within 24 hours.",
        });
        setFormData(empty);
        setService("");
      } else {
        throw new Error(data.error);
      }
    } catch {
      toast({
        title: "Couldn't send request",
        description: "Please tap the WhatsApp button below for instant chat.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-16">
        {/* Left Column: Context, Trust & Expectations */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
              08 — Direct Consultation
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Let&apos;s talk about your project.
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed font-sans">
              Whether you need to scale customer acquisition, engineer custom business software, or automate follow-ups, we’re ready to assist.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              What happens after you reach out:
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">24-Hour Review:</strong> Our lead engineer & strategist evaluates your requirements.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Scoped Proposal:</strong> You receive a transparent milestone plan and budget estimate.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">No High-Pressure Sales:</strong> Just clear technical architecture and strategic options.
                </span>
              </li>
            </ul>
          </div>

          {/* Quick WhatsApp Alternative */}
          <div className="pt-2">
            <span className="text-xs text-muted-foreground block mb-3 font-medium">
              Prefer an immediate conversation?
            </span>
            <a
              href="https://wa.me/2348082697841?text=Hello%20Sales%20Cowboy%2C%20I%20want%20to%20discuss%20a%20project%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Directly on WhatsApp
            </a>
          </div>
        </div>

        {/* Right Column: Qualification Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8 bg-card/40 p-6 sm:p-10 rounded-3xl border border-border">
            {/* Service Selection */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">
                Select Primary Requirement
              </label>
              <div className="flex flex-wrap gap-2">
                {serviceDivisions.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setService(service === s ? "" : s)}
                    className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      service === s
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <input
                  id="phone"
                  name="phone"
                  required
                  placeholder="WhatsApp / Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <input
                  id="business"
                  name="business"
                  placeholder="Company / Business Name"
                  value={formData.business}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
            </div>

            {/* Budget Range Selection */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                Estimated Project Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`${fieldClass} cursor-pointer bg-background`}
              >
                <option value="">Select budget tier (optional)</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                placeholder="Briefly describe what you want to achieve or current bottlenecks..."
                value={formData.message}
                onChange={handleChange}
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              id="contact-submit"
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-8 py-4 text-sm sm:text-base font-semibold transition-colors hover:bg-primary disabled:opacity-60"
            >
              {isSubmitting ? "Submitting Request..." : "Request Scoped Proposal"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
