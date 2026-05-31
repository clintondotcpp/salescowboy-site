"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronRight, ChevronLeft, Sparkles, MessageSquare, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const APP_TYPES = [
  { id: "property", label: "Property Listing Platform" },
  { id: "logistics", label: "Logistics & Courier Tracker" },
  { id: "vtu", label: "High-Volume VTU Gateway" },
  { id: "pos", label: "Inventory & Retail POS" },
  { id: "hotel", label: "Shortlet & Hotel System" },
  { id: "school", label: "School Portal & Ledgers" },
  { id: "church", label: "Church Management Engine" },
  { id: "microloan", label: "Micro-Loan & Savings Platform" },
  { id: "custom", label: "Other Custom Enterprise App" },
];

const BUDGET_OPTIONS = [
  { 
    id: "core", 
    label: "₦500,000 - ₦1,000,000", 
    tag: "Core Package", 
    desc: "Single-core custom app with unified dashboard and standard workflows." 
  },
  { 
    id: "advanced", 
    label: "₦1,000,000 - ₦2,500,000", 
    tag: "Advanced Package", 
    desc: "Multi-system sync, SMS triggers, and higher throughput." 
  },
  { 
    id: "enterprise", 
    label: "₦2,500,000+", 
    tag: "Full Enterprise", 
    desc: "Fully scalable custom architecture, dedicated databases, and custom API endpoints." 
  },
];

const TIMELINE_OPTIONS = [
  { id: "urgent", label: "Urgent (Within 2-3 weeks)" },
  { id: "standard", label: "Standard (4-8 weeks)" },
  { id: "flexible", label: "Flexible (No rush)" },
];

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

function getFbc(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const cookieFbc = getCookie("_fbc");
  if (cookieFbc) return cookieFbc;
  
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get("fbclid");
  if (fbclid) {
    const creationTime = Date.now();
    return `fb.1.${creationTime}.${fbclid}`;
  }
  return undefined;
}

function getFbp(): string | undefined {
  return getCookie("_fbp");
}

export default function LeadQualificationForm() {
  const [step, setStep] = useState(1);
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("core");
  const [selectedTimeline, setSelectedTimeline] = useState("standard");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [customFeatures, setCustomFeatures] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAppSelect = (id: string) => {
    setSelectedApp(id);
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !businessName.trim() || !phone.trim() || !email.trim() || !selectedBudget || !selectedTimeline) return;

    setIsSubmitting(true);

    const appLabel = APP_TYPES.find((a) => a.id === selectedApp)?.label || "Custom Software";
    const budgetLabel = BUDGET_OPTIONS.find((b) => b.id === selectedBudget)?.label || "₦500,000+";
    const timelineLabel = TIMELINE_OPTIONS.find((t) => t.id === selectedTimeline)?.label || "Standard";

    // Create custom WhatsApp message
    const waBaseMessage = `Hi SalesCowboy! I want to build a custom ${appLabel} for my business (${businessName}).\n\n- Phone: ${phone}\n- Email: ${email}\n- Budget Range: ${budgetLabel}\n- Desired Timeline: ${timelineLabel}\n- Custom Requirements: ${customFeatures || "Standard Core Features"}\n\nLet's review my project requirements!`;
    const waUrl = `https://wa.me/2348104933232?text=${encodeURIComponent(waBaseMessage)}`;

    // Generate unique Event ID for deduplication
    const eventId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

    // 1. Meta Pixel Tracking (Client-Side)
    if (typeof window !== "undefined" && (window as any).fbq) {
      console.log(`[LeadQualificationForm] Firing Pixel Lead event...`);
      (window as any).fbq("track", "Lead", {
        content_name: `Custom App Qualification: ${appLabel}`,
        content_category: "Software Lead",
        value: selectedBudget === "core" ? 500000 : selectedBudget === "advanced" ? 1000000 : 2500000,
        currency: "NGN",
      }, { eventID: eventId });

      console.log(`[LeadQualificationForm] Firing Pixel Purchase event...`);
      (window as any).fbq("track", "Purchase", {
        content_name: `Custom App Qualification: ${appLabel}`,
        content_category: "Software Purchase",
        value: selectedBudget === "core" ? 500000 : selectedBudget === "advanced" ? 1000000 : 2500000,
        currency: "NGN",
      }, { eventID: "purchase-" + eventId });
    }

    // 2. Meta Conversions API (CAPI) Tracking (Server-Side)
    try {
      console.log(`[LeadQualificationForm] Firing Conversions API Lead event...`);
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "Lead",
          eventId,
          url: typeof window !== "undefined" ? window.location.href : "",
          userData: {
            em: email.trim().toLowerCase(),
            ph: phone.trim().replace(/\D/g, ""),
            fbc: getFbc(),
            fbp: getFbp(),
          },
          customData: {
            content_name: `Custom App Qualification: ${appLabel}`,
            value: selectedBudget === "core" ? 500000 : selectedBudget === "advanced" ? 1000000 : 2500000,
            currency: "NGN",
          },
        }),
        keepalive: true,
      }).catch((error) => {
        console.error("[LeadQualificationForm] CAPI Lead Tracking error:", error);
      });

      console.log(`[LeadQualificationForm] Firing Conversions API Purchase event...`);
      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "Purchase",
          eventId: "purchase-" + eventId,
          url: typeof window !== "undefined" ? window.location.href : "",
          userData: {
            em: email.trim().toLowerCase(),
            ph: phone.trim().replace(/\D/g, ""),
            fbc: getFbc(),
            fbp: getFbp(),
          },
          customData: {
            content_name: `Custom App Qualification: ${appLabel}`,
            value: selectedBudget === "core" ? 500000 : selectedBudget === "advanced" ? 1000000 : 2500000,
            currency: "NGN",
          },
          notificationData: {
            appLabel,
            businessName,
            phone,
            email,
            selectedBudget,
            selectedTimeline,
            customFeatures,
          }
        }),
        keepalive: true,
      }).catch((error) => {
        console.error("[LeadQualificationForm] CAPI Purchase Tracking error:", error);
      });
    } catch (error) {
      console.error("[LeadQualificationForm] CAPI fetch invocation error:", error);
    }

    // Redirect to WhatsApp directly using window.location.href (bypasses browser popup blockers completely)
    window.location.href = waUrl;
    setIsSubmitting(false);
  };

  const getAppName = () => {
    return APP_TYPES.find((a) => a.id === selectedApp)?.label || "Web App";
  };

  return (
    <div className="relative max-w-3xl mx-auto bg-card/60 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Steps indicator */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 relative z-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Lead Qualification System
        </span>
        <div className="flex items-center gap-1.5">
          {[1, 2].map((s) => (
            <div 
              key={s} 
              className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                s === step 
                  ? "bg-primary w-16" 
                  : s < step 
                    ? "bg-green-500" 
                    : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 min-h-[340px] flex flex-col justify-between">
        {/* STEP 1: SELECT APP TYPE */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                What do you want to build?
              </h3>
              <p className="text-muted-foreground text-sm">
                Select your software product type to customize your technical draft.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {APP_TYPES.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => handleAppSelect(app.id)}
                  className={`flex flex-col items-start justify-center p-4 rounded-xl border transition-all text-left space-y-1 group ${
                    selectedApp === app.id
                      ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(244,63,94,0.15)] text-white"
                      : "bg-background/40 border-white/5 hover:border-white/10 text-muted-foreground hover:text-white"
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-primary opacity-80 group-hover:opacity-100">
                    Software Type
                  </span>
                  <span className="text-sm font-semibold leading-tight">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Native Mobile App Disclaimer */}
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 mt-2 text-left">
              <ShieldAlert className="w-4.5 h-4.5 text-amber-500 flex-shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-normal">
                <span className="text-amber-500 font-bold uppercase tracking-wider">Web Apps Scope Notice:</span> These packages are for high-throughput <strong className="text-white">Web Applications</strong> (accessible on all desktop and mobile browsers). Native iOS or Android mobile apps submitted to the Apple App Store or Google Play Store are not included.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT BLUEPRINT CONFIGURATION */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Configure your platform blueprint
              </h3>
              <p className="text-muted-foreground text-sm">
                Provide your custom requirements to generate your pre-filled inquiry.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column: B2B Contact Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    Business / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Logistics, Elite Real Estate"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08104933232"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    Business Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. contact@yourbrand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Right Column: Platform Configuration */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                      Target Budget
                    </label>
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full bg-background/50 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-primary transition-colors text-xs"
                    >
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">
                          {opt.tag} ({opt.label})
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-emerald-400 mt-1 font-semibold leading-normal">
                      Range: {BUDGET_OPTIONS.find((b) => b.id === selectedBudget)?.label}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                      Timeline
                    </label>
                    <select
                      value={selectedTimeline}
                      onChange={(e) => setSelectedTimeline(e.target.value)}
                      className="w-full bg-background/50 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-primary transition-colors text-xs"
                    >
                      {TIMELINE_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    Custom Requirements (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe any special features (e.g. split billing, rider tracking maps, custom inventory SMS alerts)..."
                    value={customFeatures}
                    onChange={(e) => setCustomFeatures(e.target.value)}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-xs resize-none text-white"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <Button type="button" variant="outline" onClick={prevStep} className="border-white/10 text-white hover:bg-white/5">
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>

              <Button 
                type="submit" 
                disabled={isSubmitting || !businessName.trim() || !phone.trim() || !email.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 font-bold flex items-center gap-2 group transition-all rounded-xl py-6"
              >
                {isSubmitting ? (
                  <>Initializing Blueprint...</>
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.513 5.361 1.514 5.432 0 9.854-4.41 9.857-9.835.002-2.628-1.017-5.097-2.868-6.95C17.096 2.03 14.629.98 12.019.98c-5.438 0-9.863 4.41-9.866 9.837-.001 2.09.55 4.122 1.596 5.922L2.744 21.2l4.887-1.28.016-.008-.003-.008zM17.47 14.397c-.3-.149-1.777-.876-2.05-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.95 1.174-.175.199-.35.224-.65.075-1.044-.523-2.062-1.275-2.894-2.004-.645-.565-1.285-1.274-1.685-1.873-.175-.299-.019-.461.13-.61.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.2.05-.375-.025-.524-.075-.15-.674-1.624-.924-2.223-.244-.582-.513-.504-.704-.514-.18-.01-.387-.012-.594-.012-.206 0-.543.078-.827.387-.283.309-1.082 1.058-1.082 2.578 0 1.52 1.102 2.99 1.252 3.19.15.199 2.169 3.313 5.255 4.646.734.317 1.307.506 1.752.648.74.235 1.414.201 1.947.122.593-.088 1.776-.726 2.025-1.426.25-.7 0-1.294-.075-1.419-.075-.125-.275-.199-.575-.349z" />
                    </svg>
                    Build My Custom {getAppName()} Now on WhatsApp
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
