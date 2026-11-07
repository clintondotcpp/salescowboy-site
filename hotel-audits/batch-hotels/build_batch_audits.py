import os
import subprocess
import re
import fitz  # PyMuPDF

HOTELS = [
    {
        "id": "monek-luxe-villa",
        "name": "Monek Luxe Villa",
        "short_name": "Monek Luxe",
        "tagline": "Luxury Serviced Short-Stay Apartments",
        "address": "191 Mount Carmel Neighborhood Estate, New Owerri, Imo State",
        "phone": "09030691039",
        "website": "monekluxe.com",
        "ref": "SC-AUD-2026-OWR-01",
        "date": "November 2026",
        "health_score": 22,
        "leakage_monthly": "N1.8M - N3.5M",
        "leakage_annual": "N21.6M - N42.0M",
        "risk_level": "HIGH REVENUE LEAKAGE",
        "kpis": [
            {"val": "1", "label": "Google Review", "sub": "Zero Trust Buffer", "danger": True},
            {"val": "2 / 10", "label": "Search Authority", "sub": "Invisible on Maps", "danger": True},
            {"val": "0%", "label": "Direct Capture", "sub": "No Auto Chatbot", "danger": True},
            {"val": "N2.6M", "label": "Avg Monthly Bleed", "sub": "Lost to Rivals", "danger": True},
        ],
        "strengths": [
            "Prime Geographic Setting: Located in high-demand Mount Carmel Neighborhood Estate in New Owerri, offering calm residential exclusivity for premium short-let guests.",
            "Contemporary Interior Product: Modern room styling, quality finishing, and high visual appeal suitable for corporate travelers and diaspora holiday bookings.",
            "Strong Native Market Demand: Serviced apartments in New Owerri command premium daily rates when visibility and immediate booking channels are in place."
        ],
        "leaks": [
            {
                "title": "Severe Social Proof Deficit (Single Google Review)",
                "impact": "Holding only 1 review on Google Maps destroys buyer trust. 88% of premium travelers in Owerri choose nearby competitors with 40+ positive ratings. A single negative comment would permanently drop your rating to 1.0 star.",
                "type": "REPUTATION LEAK"
            },
            {
                "title": "Unfinished Website Theme Elements",
                "impact": "Live pages display raw template labels such as 'Enter title' and generic placeholder image markers. This signals to corporate guests and search engines that the property may be unmanaged or abandoned.",
                "type": "CONVERSION BLOCK"
            },
            {
                "title": "Uncompressed Mobile Assets Slowing Load Times",
                "impact": "Heavy raw camera photo files trigger slow load speeds on mobile networks. Out-of-town guests browsing on smartphones abandon the page before seeing room rates.",
                "type": "USER DROP-OFF"
            },
            {
                "title": "Missing Search Engine Verification Data",
                "impact": "Google cannot read or display your room categories, pricing tiers, or availability on search result cards, ceding top positions to aggregator platforms.",
                "type": "SEARCH INVISIBILITY"
            },
            {
                "title": "Absence of 24/7 Instant Guest Messaging",
                "impact": "No automated WhatsApp booking concierge exists to answer availability enquiries instantly at night, losing high-intent bookings to properties that confirm immediately.",
                "type": "BOOKING LOSS"
            }
        ],
        "continuous_system": [
            {
                "title": "Review Velocity & Local Map Pack Algorithm Management",
                "desc": "A continuous operational system that systematically captures verified 5-star reviews from every departing guest, manages weekly photo uploads, and protects map rankings against New Owerri competitors."
            },
            {
                "title": "24/7 AI WhatsApp Concierge & Availability Ledger",
                "desc": "An automated booking desk that responds to guest enquiries within 3 seconds, shares room photos, and confirms direct reservations day and night without manual delay."
            },
            {
                "title": "Search Visibility & Direct Booking Protection",
                "desc": "Ongoing maintenance that updates room pricing, synchronizes local citations, and captures direct bookings so you do not surrender revenue to aggregators."
            }
        ]
    },
    {
        "id": "ola-resort-arena",
        "name": "Ola Resort Arena",
        "short_name": "Ola Resort",
        "tagline": "Hotel, Lounge, Outdoor Recreation & Event Center",
        "address": "Gidan Mangoro, along Bida Road, Minna, Niger State",
        "phone": "+234 806 350 5428",
        "website": "No Owned Website (Instagram / Facebook Only)",
        "ref": "SC-AUD-2026-MNA-02",
        "date": "November 2026",
        "health_score": 12,
        "leakage_monthly": "N1.5M - N3.2M",
        "leakage_annual": "N18.0M - N38.4M",
        "risk_level": "CRITICAL MAP PACK INVISIBILITY",
        "kpis": [
            {"val": "0", "label": "Google Map Listing", "sub": "Completely Absent", "danger": True},
            {"val": "0", "label": "Google Reviews", "sub": "Zero Search Trust", "danger": True},
            {"val": "100%", "label": "Social Media Reliance", "sub": "Manual DM Bottleneck", "danger": True},
            {"val": "N2.3M", "label": "Avg Monthly Bleed", "sub": "Lost Local Foot Traffic", "danger": True},
        ],
        "strengths": [
            "Vibrant Social Hub: Regular live music nights, guest artist performances, and strong local buzz draw steady evening and weekend crowds from Minna.",
            "Active Visual Media: Highly engaging video reels, event flyers, and lifestyle promotion on Instagram and Facebook connect with local youth and corporate revelers.",
            "Accessible Tiered Pricing: Affordable standard and executive rooms (N10,000 to N30,000) that appeal to both short-stay party guests and budget travelers."
        ],
        "leaks": [
            {
                "title": "Total Absence from Google Maps (Zero Map Listing)",
                "impact": "Ola Resort Arena has no Google Business Profile. Anyone in Minna searching 'hotels near Bida Road' or 'bars near me' is sent directly to competitors. Drivers and taxis have no GPS map pin to reach Gidan Mangoro.",
                "type": "REVENUE BLIND SPOT"
            },
            {
                "title": "Brand Name Hijacked by Distant Competitors",
                "impact": "Because your brand is unindexed, Google searches for 'Ola Resort' recommend unrelated resorts in Lagos or other local event halls, confusing out-of-town guests and diverting inquiries.",
                "type": "BRAND LOSS"
            },
            {
                "title": "Zero Owned Web Infrastructure",
                "impact": "Relying 100% on social media means corporate event organizers, visiting government officials, and travelers cannot view room rates, verify amenities, or book without waiting for manual DM replies.",
                "type": "CHANNEL RISK"
            },
            {
                "title": "Manual WhatsApp & DM Booking Bottleneck",
                "impact": "Staff cannot answer DMs instantly during peak evening event hours. Delayed responses lead guests to book with other hotels that confirm rooms in seconds.",
                "type": "BOOKING DROP-OFF"
            }
        ],
        "continuous_system": [
            {
                "title": "Review Velocity & Local Map Pack Algorithm Management",
                "desc": "Continuous setup and weekly maintenance of your Google Business presence, capturing verified guest reviews via QR checkouts, updating event photos, and locking down the Gidan Mangoro map pin."
            },
            {
                "title": "24/7 AI WhatsApp Concierge & Event Booking Desk",
                "desc": "An automated conversational assistant that instantly handles room reservations, shares pricing tiers, confirms table bookings for music nights, and tracks availability automatically."
            },
            {
                "title": "Local Search Authority & Event Syndication",
                "desc": "Ongoing management that ranks your resort for high-intent search terms across Niger State, capturing out-of-town corporate guests and weekend travelers."
            }
        ]
    },
    {
        "id": "ehi-mega-luxury",
        "name": "Ehi-Mega Luxury Hotel and Apartments",
        "short_name": "Ehi-Mega Luxury",
        "tagline": "Boutique Serviced Luxury Apartments",
        "address": "15 Dr. Collins Avenue, off Military Pension Board Road, FO1, Kubwa, Abuja FCT",
        "phone": "+234 816 448 6900 / +234 903 436 2111",
        "website": "No Owned Website (OTA Dependent)",
        "ref": "SC-AUD-2026-ABJ-03",
        "date": "November 2026",
        "health_score": 26,
        "leakage_monthly": "N2.0M - N4.5M",
        "leakage_annual": "N24.0M - N54.0M",
        "risk_level": "COMMISSION DRAIN & REVIEW RISK",
        "kpis": [
            {"val": "8", "label": "Google Reviews", "sub": "Highly Fragile Buffer", "danger": True},
            {"val": "15-20%", "label": "OTA Commission", "sub": "Lost on Every Stay", "danger": True},
            {"val": "0", "label": "Direct Web Booking", "sub": "Aggregator Controlled", "danger": True},
            {"val": "N3.2M", "label": "Avg Monthly Bleed", "sub": "OTA Cuts & Missed Directs", "danger": True},
        ],
        "strengths": [
            "Strong Baseline Satisfaction: 4.5 out of 5.0 Google rating with verified guest reviews highlighting spotless cleanliness, modern decor, and comfortable amenities.",
            "24/7 Operational Readiness: Guaranteed round-the-clock power and active front desk services in Kubwa FO1.",
            "Active Social Promotion: High-quality video showcases of apartment interiors on Instagram and TikTok targeting short-let clients."
        ],
        "leaks": [
            {
                "title": "Extremely Fragile Review Defense (Only 8 Reviews)",
                "impact": "While 4.5 stars is strong, a single malicious or upset 1-star review will instantly pull your overall rating down to 4.1, dropping you out of premium shortlet consideration.",
                "type": "REPUTATION HAZARD"
            },
            {
                "title": "Heavy OTA Commission Bleed (15% to 20% Surrendered)",
                "impact": "Without an owned booking website, Google directs interested guests to Booking.com, Bluepillow, and Agoda. You surrender hundreds of thousands of Naira in commissions each month on rooms you could book directly.",
                "type": "MARGIN LOSS"
            },
            {
                "title": "Kubwa FO1 Location Mismatch Risk",
                "impact": "Marketing as 'Abuja Luxury' without setting precise location expectations creates friction. Guests expecting central Maitama or Wuse complain about commute times unless guided properly during pre-booking.",
                "type": "GUEST FRICTION"
            },
            {
                "title": "Stagnant Checkout Review Flow",
                "impact": "Dozens of satisfied guests check out every month without being prompted to leave a Google review. Without automated post-stay follow-up, your review count remains stuck at 8.",
                "type": "GROWTH STAGNATION"
            }
        ],
        "continuous_system": [
            {
                "title": "Review Velocity & Local Map Pack Algorithm Management",
                "desc": "An automated system that requests 5-star reviews from every departing guest via WhatsApp, builds an unbreakable review buffer in Kubwa FO1, and pushes your ranking above rival apartments."
            },
            {
                "title": "Direct Booking Engine & 24/7 WhatsApp AI Concierge",
                "desc": "A streamlined direct reservation desk allowing guests to check room availability and book directly without paying 15% to 20% aggregator commissions."
            },
            {
                "title": "Abuja Satellite Search Authority Management",
                "desc": "Ongoing positioning that captures travelers specifically seeking quiet, upscale accommodation in Kubwa and FO1 while setting clear location expectations."
            }
        ]
    },
    {
        "id": "silver-suite",
        "name": "Silver Suite",
        "short_name": "Silver Suite",
        "tagline": "Executive Suites & Hospitality",
        "address": "No. 67 Zungwe Ayughtse Avenue, off George Akume Way, Makurdi, Benue State",
        "phone": "Front Desk Operations",
        "website": "No Online Footprint (Unclaimed GBP)",
        "ref": "SC-AUD-2026-MKD-04",
        "date": "November 2026",
        "health_score": 10,
        "leakage_monthly": "N1.2M - N2.8M",
        "leakage_annual": "N14.4M - N33.6M",
        "risk_level": "TOTAL SEARCH DISCONNECT",
        "kpis": [
            {"val": "0", "label": "Google Reviews", "sub": "Unclaimed Profile", "danger": True},
            {"val": "0%", "label": "Maps Visibility", "sub": "Bypassed by Travelers", "danger": True},
            {"val": "0", "label": "Digital Presence", "sub": "Zero Web Footprint", "danger": True},
            {"val": "N2.0M", "label": "Avg Monthly Bleed", "sub": "Lost Corporate Travelers", "danger": True},
        ],
        "strengths": [
            "High-Value Commercial Corridor: Positioned immediately off George Akume Way, Makurdi's primary arterial road carrying corporate, political, and transit travelers.",
            "Exclusive Street Address: Building No. 67 on Zungwe Ayughtse Avenue offers quiet executive privacy while remaining seconds away from the city's main transit vein.",
            "High Commercial Upside: Makurdi has severe shortage of verified executive suites with transparent digital booking, leaving a wide open market to capture."
        ],
        "leaks": [
            {
                "title": "Total Google Maps Blind Spot (Zero Pin on Navigation)",
                "impact": "Silver Suite is completely absent on Google Maps. Searches for 'Silver Suite Makurdi' pull up competing venues like SG Suites or Serene Suites, handing your customers directly to rivals.",
                "type": "TRAFFIC SURRENDER"
            },
            {
                "title": "Guest & Taxi GPS Navigation Failure",
                "impact": "First-time visitors, corporate travelers, and local drivers cannot navigate to No. 67 Zungwe Ayughtse Avenue using Google Maps, leading to missed bookings and guest frustration.",
                "type": "OPERATIONAL LOSS"
            },
            {
                "title": "Severe Brand Cannibalization",
                "impact": "Because your name is unregistered on Google, searches for your brand return an unrelated hotel in India or other properties in Benue State, completely erasing your digital presence.",
                "type": "IDENTITY LOSS"
            },
            {
                "title": "100% Reliance on Offline Foot Traffic",
                "impact": "Corporate bodies, NGOs, and traveling consultants visiting Benue State book their accommodation online before arriving. By remaining invisible on search engines, you lose this premium clientele.",
                "type": "REVENUE LIMITATION"
            }
        ],
        "continuous_system": [
            {
                "title": "Review Velocity & Local Map Pack Algorithm Management",
                "desc": "Establishing verified Google Business Profile credentials, locking down the exact George Akume Way coordinates, and driving consistent weekly 5-star reviews from corporate guests."
            },
            {
                "title": "24/7 AI WhatsApp Concierge & Corporate Booking Ledger",
                "desc": "An automated booking desk that provides instant quotes, accepts corporate booking requests, and confirms room reservations 24 hours a day."
            },
            {
                "title": "Makurdi Commercial Search Domination",
                "desc": "Continuous ranking management to capture high-intent searches for 'executive suites near George Akume Way' and 'shortlets in Makurdi'."
            }
        ]
    },
    {
        "id": "immaculate-service-apartments",
        "name": "Immaculate Service Apartments",
        "short_name": "Immaculate Apartments",
        "tagline": "Luxury Serviced Apartments Near Lagos Airport",
        "address": "42 Ajibulu St, Oshodi-Isolo, Mafoluku, Lagos (Near MMA2 Airport / Ikeja)",
        "phone": "+234 814 155 8153",
        "website": "immaculateserviceapts.com",
        "ref": "SC-AUD-2026-LOS-05",
        "date": "November 2026",
        "health_score": 32,
        "leakage_monthly": "N2.5M - N5.2M",
        "leakage_annual": "N30.0M - N62.4M",
        "risk_level": "BRAND CANNIBALIZATION & BLOAT",
        "kpis": [
            {"val": "1,200+", "label": "Rival Reviews", "sub": "Buried by Abuja Namesake", "danger": True},
            {"val": "N125k", "label": "Nightly Premium", "sub": "High Value at Risk", "danger": False},
            {"val": "15-20%", "label": "OTA Commission", "sub": "Lost to Booking.com", "danger": True},
            {"val": "N3.8M", "label": "Avg Monthly Bleed", "sub": "Lost Direct Bookings", "danger": True},
        ],
        "strengths": [
            "Strategic Airport Proximity: Located in Mafoluku close to Murtala Muhammed International Airport (MMA2), perfectly positioned for flight crews, business travelers, and transit guests.",
            "Strong Pricing Transparency: Openly publishes rates (N80k single, N100k studio, N125k 2-bedroom) alongside key amenities (24/7 power, Wi-Fi, equipped kitchens), establishing trust.",
            "Active OTA Presence: Successfully listed on Booking.com and aggregated by Google Travel as a 4-star comfortable shortlet option."
        ],
        "leaks": [
            {
                "title": "Crushing Brand Identity Cannibalization",
                "impact": "Searching 'Immaculate Service Apartments' on Google pulls up Immaculate Diamond Hotels in Abuja (1,200+ reviews). Your Lagos property is completely buried in search results by northern namesakes.",
                "type": "IDENTITY LOSS"
            },
            {
                "title": "Airport / Ikeja Search Disconnect",
                "impact": "The property is promoted as 'Ikeja', but the physical pin sits in Mafoluku/Oshodi. You completely miss out on high-intent searchers looking for 'shortlets in Ikeja' or 'serviced apartments near MMA2'.",
                "type": "SEARCH LEAKAGE"
            },
            {
                "title": "Backend Website Template Bloat",
                "impact": "Your live website contains unmaintained demo pages referencing foreign surfing camps and generic archive tags. This signals poor website health to Google crawlers and harms search rankings.",
                "type": "SEO DAMAGE"
            },
            {
                "title": "Lack of Live Direct Booking Ledger",
                "impact": "The website displays static prices but cannot confirm room availability in real-time. Prospective guests are forced back to Booking.com, costing you 15% to 20% in commissions on every stay.",
                "type": "MARGIN DRAIN"
            }
        ],
        "continuous_system": [
            {
                "title": "Review Velocity & Local Map Pack Algorithm Management",
                "desc": "Ongoing optimization that breaks your Lagos property away from northern namesakes, targets high-intent 'Airport Ikeja' search terms, and collects verified guest reviews continuously."
            },
            {
                "title": "24/7 AI WhatsApp Concierge & Live Room Ledger",
                "desc": "An automated booking desk that captures incoming flight travelers immediately, tracks real-time room availability, and confirms bookings without paying OTA commissions."
            },
            {
                "title": "Website Authority & Review Syndication",
                "desc": "Continuous technical maintenance that eliminates template bloat, embeds live verified OTA reviews onto your homepage, and keeps search rankings protected."
            }
        ]
    },
    {
        "id": "top7-orlando",
        "name": "Top7 Orlando Hotel & Apartment",
        "short_name": "Top7 Orlando",
        "tagline": "Luxury Boutique Hotel, Restaurant, Lounge & Live Music",
        "address": "7 Massenya Street, Wuse Zone 6, Abuja FCT",
        "phone": "Direct Hotel Operations",
        "website": "top7orlandoapartment.com",
        "ref": "SC-AUD-2026-ABJ-06",
        "date": "November 2026",
        "health_score": 24,
        "leakage_monthly": "N3.0M - N6.5M",
        "leakage_annual": "N36.0M - N78.0M",
        "risk_level": "DATA EXPOSURE & MAP INVISIBILITY",
        "kpis": [
            {"val": "0", "label": "Google Reviews", "sub": "No Map Panel", "danger": True},
            {"val": "CRITICAL", "label": "Security Risk", "sub": "Guest Data Exposure", "danger": True},
            {"val": "N170k", "label": "Nightly Suite Rate", "sub": "High Margin Inventory", "danger": False},
            {"val": "N4.7M", "label": "Avg Monthly Bleed", "sub": "Diverted Luxury Bookings", "danger": True},
        ],
        "strengths": [
            "Coveted Commercial Address: Located on Massenya Street in Wuse Zone 6, one of Abuja's most prestigious commercial, dining, and diplomatic zones.",
            "Diversified Hospitality Ecosystem: Full-service hotel rooms, serviced apartments, dedicated restaurant, cocktail bar, and popular Thursday Live Band entertainment.",
            "Reliable Infrastructure: Guaranteed 24/7 power, modern finishing, and premium room tiers commanding N100,000 to N170,000 nightly rates."
        ],
        "leaks": [
            {
                "title": "Critical Guest Data Exposure on Booking Page",
                "impact": "Your website booking code publicly displays internal guest stay timestamps and past reservation histories on the public screen. This creates severe privacy risks, regulatory liability, and reputational damage.",
                "type": "CRITICAL LIABILITY"
            },
            {
                "title": "Zero Google Knowledge Panel (0 Google Reviews)",
                "impact": "Searching for Top7 Orlando on Google fails to bring up a verified map listing. Prospective guests are redirected to competing Wuse Zone 6 hotels, losing dozens of walk-in and corporate bookings.",
                "type": "TRAFFIC DIVERSION"
            },
            {
                "title": "Informal Contact Channels Hurting Corporate Trust",
                "impact": "Contact forms and booking inquiries route to a personal Gmail address rather than a secure property management desk. Corporate clients and embassies in Abuja require verified institutional channels.",
                "type": "TRUST DEFICIT"
            },
            {
                "title": "Unmonitored Nightlife & Live Band Conversions",
                "impact": "Hundreds of patrons attend your Thursday Live Band nights, yet there is no automated system to capture contact information or convert event attendees into repeat hotel guests.",
                "type": "REVENUE LOSS"
            }
        ],
        "continuous_system": [
            {
                "title": "Review Velocity & Local Map Pack Algorithm Management",
                "desc": "Claiming and continuously optimizing the Massenya Street Google Business Profile, aggressively driving 5-star reviews from diners, hotel guests, and event attendees weekly."
            },
            {
                "title": "24/7 AI WhatsApp Concierge & Secure Booking Ledger",
                "desc": "An automated booking desk that safely handles room and event reservations, provides instant replies, and prevents private guest data leaks."
            },
            {
                "title": "Wuse Zone 6 Search & Event Authority System",
                "desc": "Ongoing search engine management ensuring Top7 Orlando dominates searches for boutique hotels, dining, and live entertainment in central Abuja."
            }
        ]
    },
    {
        "id": "sulerious-lakeside",
        "name": "Sulerious Lakeside Hotel",
        "short_name": "Sulerious Lakeside",
        "tagline": "Multi-Branch Hospitality & Lakeside Lodging",
        "address": "HQ: 28 Close 5, New Road, Igbetu, Awoyaya, Ibeju-Lekki, Lagos | Branch 2: Alof Street, by Adeniji, Lagos Island",
        "phone": "Direct Hotel Operations",
        "website": "suleriouslakesidehotel.com",
        "ref": "SC-AUD-2026-LOS-07",
        "date": "November 2026",
        "health_score": 18,
        "leakage_monthly": "N2.2M - N4.8M",
        "leakage_annual": "N26.4M - N57.6M",
        "risk_level": "REPUTATION CRISIS & MAP INVISIBILITY",
        "kpis": [
            {"val": "3.3", "label": "Google Rating", "sub": "Below 4.0 Filter Cutoff", "danger": True},
            {"val": "0", "label": "Lagos Island Map Pin", "sub": "Branch 2 Invisible", "danger": True},
            {"val": "N237k", "label": "Glitch OTA Pricing", "sub": "Scraped Placeholder Rate", "danger": True},
            {"val": "N3.5M", "label": "Avg Monthly Bleed", "sub": "Lost to Rivals & OTAs", "danger": True},
        ],
        "strengths": [
            "Multi-Unit Regional Footprint: Established operations across two high-demand Lagos commercial corridors (rapidly expanding Ibeju-Lekki axis and central Lagos Island business district).",
            "Competitive Native Room Rates: Highly affordable baseline pricing (N18,000 to N25,000 per night) that appeals strongly to business travelers, commercial traders, and extended-stay guests.",
            "Established Third-Party Syndication: Active indexing across global distribution platforms including Agoda, Traveloka, and Hotels.com."
        ],
        "leaks": [
            {
                "title": "Severe 3.3-Star Google Reputation Crisis at Awoyaya HQ",
                "impact": "Google Maps automatically filters out properties rated below 4.0 stars when travelers search for recommended hotels in Ibeju-Lekki. Toxic public reviews detailing power and water cuts actively scare away high-paying corporate guests.",
                "type": "REPUTATION EMERGENCY"
            },
            {
                "title": "Total Map Invisibility of Lagos Island Branch",
                "impact": "The Alof Street branch has zero Google Business Profile and zero map pin. Commercial traders and corporate visitors around Adeniji and Lagos Island trade districts cannot discover or navigate to this location.",
                "type": "REVENUE BLIND SPOT"
            },
            {
                "title": "Catastrophic OTA Pricing Desynchronization",
                "impact": "Due to broken backend channel management, external travel platforms are scraping false placeholder rates as high as N237,000+ per night instead of your actual N18,000 - N25,000 rate. This absurd rate shock scares bookers away instantly.",
                "type": "PRICE CONFUSION"
            },
            {
                "title": "Misleading Geographic Claims Damaging Search Trust",
                "impact": "The website claims the property is '2.4 km from Lekki Toll Gate' when Awoyaya is over 25 km away. This geographical mismatch creates immediate guest disputes, negative reviews, and search indexing penalties.",
                "type": "TRUST PENALTY"
            },
            {
                "title": "Absence of Dedicated Multi-Branch Web Architecture",
                "impact": "The website operates as if only Awoyaya exists. Out-of-town guests searching for lodging near Adeniji or Idumota never discover that Sulerious has rooms available on Lagos Island.",
                "type": "CROSS-SELL LOSS"
            }
        ],
        "continuous_system": [
            {
                "title": "Review Velocity & Local Map Pack Algorithm Management",
                "desc": "An ongoing review protection system that intercepts guests at checkout, resolves grievances privately, and systematically routes verified happy guests to Google to dilute the toxic 3.3 score and restore 4.0+ visibility."
            },
            {
                "title": "Multi-Unit Google Brand Architecture & Island Geocoding",
                "desc": "Continuous setup and maintenance of verified Google listings for both Awoyaya and Lagos Island under a single corporate umbrella, channeling high-intent corporate and trader searches directly to your rooms."
            },
            {
                "title": "24/7 AI WhatsApp Concierge & Channel Price Synchronization",
                "desc": "An automated booking desk that instantly confirms direct reservations at your true rates (N18,000 - N25,000), while ongoing channel management overrides distorted N237k aggregator glitches."
            }
        ]
    }
]

CSS = """
:root {
  --black: #090d16;
  --slate-900: #0f172a;
  --slate-800: #1e293b;
  --slate-700: #334155;
  --slate-600: #475569;
  --slate-500: #64748b;
  --slate-400: #94a3b8;
  --slate-300: #cbd5e1;
  --slate-200: #e2e8f0;
  --slate-100: #f1f5f9;
  --slate-50: #f8fafc;
  --white: #ffffff;
  --danger: #991b1b;
  --danger-bg: #fef2f2;
  --danger-border: #fecaca;
  --success: #065f46;
  --success-bg: #ecfdf5;
  --success-border: #a7f3d0;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--slate-900);
  font-family: var(--font-sans);
  color: var(--black);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  padding: 36px 16px;
  font-size: 16px; /* Increased font size */
}

/* Toolbar */
.toolbar {
  max-width: 900px;
  margin: 0 auto 24px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--black);
  padding: 14px 24px;
  border-radius: 8px;
  border: 1px solid var(--slate-800);
  color: var(--white);
}

.toolbar-brand {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--white);
}

.toolbar-doc {
  font-size: 13px;
  color: var(--slate-400);
  font-weight: 500;
}

.btn-print {
  background: var(--white);
  color: var(--black);
  border: none;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;
}

.btn-print:hover {
  background: var(--slate-100);
}

/* Main Sheet */
.sheet {
  max-width: 900px;
  margin: 0 auto;
  background: var(--white);
  border-radius: 8px;
  padding: 56px 64px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Letterhead Header */
.letterhead {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 24px;
  border-bottom: 3px solid var(--black);
  gap: 24px;
}

.agency-name {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--black);
}

.agency-div {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--slate-500);
  margin-top: 2px;
}

.agency-address {
  font-size: 13px;
  color: var(--slate-500);
  margin-top: 6px;
  line-height: 1.5;
}

.ref-box {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 13px;
}

.ref-tag {
  display: inline-block;
  background: var(--black);
  color: var(--white);
  padding: 5px 12px;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.06em;
  border-radius: 4px;
  margin-bottom: 6px;
}

.ref-meta {
  color: var(--slate-500);
  line-height: 1.6;
}

/* Client Banner */
.client-banner {
  margin-top: 32px;
  background: var(--slate-50);
  border: 1px solid var(--slate-200);
  border-radius: 8px;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.client-pre {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--slate-500);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.client-title {
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--black);
  margin-top: 2px;
  line-height: 1.2;
}

.client-sub {
  font-size: 15px;
  color: var(--slate-600);
  margin-top: 6px;
  font-weight: 500;
}

.client-badge-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  min-width: 220px;
}

.pill-status {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 4px;
  background: var(--danger-bg);
  color: var(--danger);
  border: 1px solid var(--danger-border);
  letter-spacing: 0.04em;
  text-align: right;
}

.pill-market {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 4px;
  background: var(--white);
  color: var(--slate-700);
  border: 1px solid var(--slate-300);
  text-align: right;
}

/* Section Headings */
.section-title {
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--black);
  margin-top: 38px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title::before {
  content: "";
  display: inline-block;
  width: 12px;
  height: 12px;
  background: var(--black);
  border-radius: 2px;
}

/* Score Dial Grid */
.audit-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 20px;
  background: var(--white);
  border: 1px solid var(--slate-200);
  border-radius: 8px;
  padding: 24px;
}

.score-dial-box {
  background: var(--black);
  color: var(--white);
  border-radius: 6px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.score-number {
  font-family: var(--font-mono);
  font-size: 48px;
  font-weight: 900;
  line-height: 1;
  color: var(--white);
}

.score-out-of {
  font-size: 16px;
  color: var(--slate-400);
  font-weight: 600;
}

.score-label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--slate-400);
  margin-top: 10px;
  text-transform: uppercase;
}

.score-tag {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 800;
  background: #7f1d1d;
  color: #fecaca;
  padding: 5px 10px;
  border-radius: 4px;
  margin-top: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.matrix-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 12px;
}

.matrix-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--slate-200);
}

.matrix-heading {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--slate-600);
}

.matrix-leakage {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 800;
  color: var(--danger);
}

.matrix-summary-text {
  font-size: 15px;
  color: var(--slate-700);
  line-height: 1.6;
}

/* 4 KPI Cards */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
}

.kpi-card {
  background: var(--slate-50);
  border: 1px solid var(--slate-200);
  border-radius: 6px;
  padding: 18px 16px;
}

.kpi-num {
  font-family: var(--font-mono);
  font-size: 32px;
  font-weight: 900;
  line-height: 1.1;
  color: var(--black);
}

.kpi-num.danger {
  color: var(--danger);
}

.kpi-label {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--slate-600);
  margin-top: 8px;
}

.kpi-desc {
  font-size: 13px;
  color: var(--slate-500);
  margin-top: 4px;
  line-height: 1.4;
  font-weight: 500;
}

/* Strengths Box */
.strengths-card {
  background: var(--success-bg);
  border: 1px solid var(--success-border);
  border-radius: 8px;
  padding: 22px 24px;
}

.strengths-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.strength-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: var(--slate-800);
  line-height: 1.6;
}

.strength-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: var(--success);
  color: var(--white);
  border-radius: 50%;
  font-size: 12px;
  font-weight: 900;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Leaks Grid */
.leaks-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.leak-item {
  background: var(--slate-50);
  border: 1px solid var(--slate-200);
  border-left: 5px solid var(--danger);
  border-radius: 6px;
  padding: 18px 22px;
}

.leak-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.leak-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--black);
}

.leak-badge {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--danger);
  background: var(--danger-bg);
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.leak-impact {
  font-size: 15px;
  color: var(--slate-700);
  line-height: 1.6;
}

/* Continuous Growth Section */
.growth-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.growth-card {
  background: var(--slate-50);
  border: 1px solid var(--slate-200);
  border-radius: 6px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.growth-num {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 800;
  color: var(--slate-500);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.growth-title {
  font-size: 15px;
  font-weight: 800;
  color: var(--black);
  line-height: 1.35;
}

.growth-desc {
  font-size: 14px;
  color: var(--slate-600);
  line-height: 1.55;
}

/* Protection Box */
.protect-notice {
  margin-top: 36px;
  background: var(--slate-900);
  color: var(--white);
  border-radius: 8px;
  padding: 24px 28px;
  border-left: 6px solid #eab308;
}

.protect-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--white);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.protect-body {
  font-size: 15px;
  color: var(--slate-300);
  line-height: 1.65;
}

/* Footer Action */
.action-banner {
  margin-top: 36px;
  border-top: 2px solid var(--slate-200);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.action-text {
  font-size: 15px;
  color: var(--slate-700);
  line-height: 1.5;
}

.action-contact {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--black);
}

/* Print CSS */
@media print {
  body {
    background: none;
    padding: 0;
    color: #000;
  }
  .toolbar {
    display: none !important;
  }
  .sheet {
    max-width: 100%;
    margin: 0;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
  }
  .client-banner {
    margin-top: 18px;
    padding: 16px 20px;
  }
  .section-title {
    margin-top: 22px;
    margin-bottom: 10px;
    page-break-after: avoid;
    break-after: avoid;
  }
  .audit-grid {
    padding: 16px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .kpi-row {
    margin-top: 12px;
    gap: 10px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .kpi-card {
    padding: 12px 14px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .strengths-card {
    padding: 16px 20px;
    page-break-inside: avoid;
    break-inside: avoid;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .strengths-list {
    gap: 8px;
  }
  .leaks-grid {
    gap: 10px;
  }
  .leak-item {
    padding: 12px 16px;
    page-break-inside: avoid;
    break-inside: avoid;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .growth-grid {
    gap: 12px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .growth-card {
    padding: 14px 14px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .protect-notice {
    margin-top: 20px;
    padding: 16px 20px;
    background: #0f172a !important;
    color: #fff !important;
    page-break-inside: avoid;
    break-inside: avoid;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .score-dial-box {
    background: #090d16 !important;
    color: #fff !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .action-banner {
    margin-top: 20px;
    padding-top: 14px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  @page {
    size: A4 portrait;
    margin: 8mm 10mm;
  }
}
"""

def generate_html(hotel):
    kpis_html = ""
    for k in hotel["kpis"]:
        danger_class = "danger" if k.get("danger") else ""
        kpis_html += f"""
        <div class="kpi-card">
          <div class="kpi-num {danger_class}">{k["val"]}</div>
          <div class="kpi-label">{k["label"]}</div>
          <div class="kpi-desc">{k["sub"]}</div>
        </div>
        """
        
    strengths_html = ""
    for s in hotel["strengths"]:
        strengths_html += f"""
        <li class="strength-item">
          <span class="strength-icon">&#10003;</span>
          <span>{s}</span>
        </li>
        """

    leaks_html = ""
    for l in hotel["leaks"]:
        leaks_html += f"""
        <div class="leak-item">
          <div class="leak-header">
            <span class="leak-title">{l["title"]}</span>
            <span class="leak-badge">{l["type"]}</span>
          </div>
          <div class="leak-impact">{l["impact"]}</div>
        </div>
        """

    growth_html = ""
    for i, g in enumerate(hotel["continuous_system"], 1):
        growth_html += f"""
        <div class="growth-card">
          <div class="growth-num">PILLAR 0{i}</div>
          <div class="growth-title">{g["title"]}</div>
          <div class="growth-desc">{g["desc"]}</div>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{hotel["name"]} - Digital Revenue Audit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
{CSS}
  </style>
</head>
<body>

  <!-- Screen Toolbar -->
  <div class="toolbar">
    <div style="display: flex; align-items: center; gap: 12px;">
      <span class="toolbar-brand">SALES COWBOY</span>
      <span style="color: #475569;">|</span>
      <span class="toolbar-doc">{hotel["name"]} - Executive Revenue Audit</span>
    </div>
    <button class="btn-print" onclick="window.print()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
        <path d="M6 14h12v8H6z"/>
      </svg>
      Print / Save as PDF
    </button>
  </div>

  <!-- Document Sheet -->
  <main class="sheet">

    <!-- Agency Letterhead -->
    <header class="letterhead">
      <div>
        <div class="agency-name">SALES COWBOY</div>
        <div class="agency-div">Hospitality Revenue Engineering & Growth Systems</div>
        <div class="agency-address">
          36 Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria<br>
          +234 810 493 3232 &bull; salescowboy.com.ng &bull; hello@salescowboy.com.ng
        </div>
      </div>
      <div class="ref-box">
        <div class="ref-tag">CONFIDENTIAL AUDIT</div>
        <div class="ref-meta">
          REF: {hotel["ref"]}<br>
          DATE: {hotel["date"]}<br>
          STATUS: EXECUTIVE BRIEF
        </div>
      </div>
    </header>

    <!-- Property Banner -->
    <section class="client-banner">
      <div>
        <div class="client-pre">HOSPITALITY REVENUE DIAGNOSTIC</div>
        <h1 class="client-title">{hotel["name"]}</h1>
        <div class="client-sub">
          <strong>Location:</strong> {hotel["address"]}<br>
          <strong>Contact:</strong> {hotel["phone"]} &bull; <strong>Web Asset:</strong> {hotel["website"]}
        </div>
      </div>
      <div class="client-badge-group">
        <div class="pill-status">{hotel["risk_level"]}</div>
        <div class="pill-market">EST. LOSS: {hotel["leakage_monthly"]}/MO</div>
      </div>
    </section>

    <!-- Executive Scorecard -->
    <section>
      <div class="section-title">Digital Revenue Health Scorecard</div>
      <div class="audit-grid">
        <div class="score-dial-box">
          <div class="score-number">{hotel["health_score"]}</div>
          <div class="score-out-of">OUT OF 100</div>
          <div class="score-label">HEALTH SCORE</div>
          <div class="score-tag">{hotel["risk_level"]}</div>
        </div>
        <div class="matrix-box">
          <div class="matrix-top">
            <span class="matrix-heading">Commercial Revenue Assessment</span>
            <span class="matrix-leakage">{hotel["leakage_monthly"]} / mo</span>
          </div>
          <p class="matrix-summary-text">
            Based on competitive search volume, local booking intent, and active guest inquiries in your immediate market, your property currently surrenders an estimated <strong>{hotel["leakage_monthly"]} every month</strong> ({hotel["leakage_annual"]} annually) to local competitors and third-party booking channels.
          </p>
          <div class="matrix-summary-text">
            <strong>Key Vulnerability:</strong> Guest discovery and booking conversion pipelines are severely unoptimized, preventing high-paying travelers from finding, trusting, and directly booking your property.
          </div>
        </div>
      </div>

      <!-- 4 Big Metric Cards -->
      <div class="kpi-row">
        {kpis_html}
      </div>
    </section>

    <!-- Strengths -->
    <section>
      <div class="section-title">Operational Strengths (Assets to Protect)</div>
      <div class="strengths-card">
        <ul class="strengths-list">
          {strengths_html}
        </ul>
      </div>
    </section>

    <!-- Revenue Leaks -->
    <section>
      <div class="section-title">Identified Revenue Leaks & Commercial Gaps</div>
      <div class="leaks-grid">
        {leaks_html}
      </div>
    </section>

    <!-- Continuous Growth Engine -->
    <section>
      <div class="section-title">The Solution: Continuous Revenue Engine</div>
      <p style="font-size: 15px; color: var(--slate-700); margin-bottom: 14px;">
        Digital hospitality revenue is not a one-time setup. Beating local competitors requires ongoing operational management across search algorithms, review velocity, and real-time inquiry response desks.
      </p>
      <div class="growth-grid">
        {growth_html}
      </div>
    </section>

    <!-- Protect-Us Notice -->
    <section class="protect-notice">
      <div class="protect-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2.5">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        Commercial Notice: Diagnostic Summary vs Full Implementation
      </div>
      <div class="protect-body">
        This executive brief highlights structural commercial leaks and high-impact revenue gaps discovered during our audit. To protect our proprietary methodologies, technical solution code, backend patch scripts, and exact configuration recipes are withheld from this preview. 
        <br><br>
        <strong>The complete Technical Remediation Blueprint, code patches, and step-by-step systems implementation are delivered exclusively during the Sales Cowboy implementation kickoff.</strong>
      </div>
    </section>

    <!-- Action Sign-off -->
    <footer class="action-banner">
      <div class="action-text">
        <strong>Prepared by:</strong> Sales Cowboy Hospitality Revenue Engineering Team<br>
        Ready to plug these revenue leaks and activate your direct booking pipeline?
      </div>
      <div class="action-contact">
        SCHEDULE EXECUTIVE BRIEFING<br>
        +234 810 493 3232 &bull; salescowboy.com.ng
      </div>
    </footer>

  </main>

</body>
</html>
"""
    return html

def generate_markdown(hotel):
    kpis_md = "\n".join([f"- **{k['label']}:** {k['val']} ({k['sub']})" for k in hotel["kpis"]])
    strengths_md = "\n".join([f"- {s}" for s in hotel["strengths"]])
    leaks_md = "\n".join([f"### {l['title']} [{l['type']}]\n{l['impact']}\n" for l in hotel["leaks"]])
    growth_md = "\n".join([f"### Pillar 0{i}: {g['title']}\n{g['desc']}\n" for i, g in enumerate(hotel["continuous_system"], 1)])

    md = f"""# Executive Digital Revenue Audit: {hotel["name"]}
**Document Ref:** {hotel["ref"]}  
**Date:** {hotel["date"]}  
**Classification:** Confidential Executive Briefing  
**Agency:** Sales Cowboy Hospitality Revenue Engineering (salescowboy.com.ng | +234 810 493 3232)

---

## 1. Property Overview
- **Property Name:** {hotel["name"]}
- **Address:** {hotel["address"]}
- **Contact:** {hotel["phone"]}
- **Web Presence:** {hotel["website"]}
- **Revenue Health Score:** {hotel["health_score"]} / 100
- **Current Status:** {hotel["risk_level"]}
- **Estimated Monthly Revenue Leakage:** {hotel["leakage_monthly"]} ({hotel["leakage_annual"]} / year)

---

## 2. Key Diagnostic Metrics
{kpis_md}

---

## 3. Operational Strengths (Assets to Protect)
{strengths_md}

---

## 4. Identified Revenue Leaks & Commercial Gaps
{leaks_md}

---

## 5. The Continuous Growth Engine
A one-time website or map setup fails because local search rankings and traveler choices change weekly. Sustainable direct revenue requires continuous agency management:

{growth_md}

---

## 6. Implementation & Retainer Notice
> **Important Note:** This executive brief highlights structural commercial leaks and high-impact revenue gaps discovered during our audit. To protect our proprietary methodologies, technical solution code, backend patch scripts, and exact configuration recipes are withheld from this preview.  
> 
> **The complete Technical Remediation Blueprint, code patches, and step-by-step systems implementation are delivered exclusively during the Sales Cowboy implementation kickoff.**

---

### Contact & Next Steps
To schedule an executive walkthrough or initiate implementation:
- **Phone / WhatsApp:** +234 810 493 3232
- **Website:** salescowboy.com.ng
- **Office:** 36 Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria
"""
    return md

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    public_dir = os.path.abspath(os.path.join(base_dir, "..", "..", "public"))
    os.makedirs(public_dir, exist_ok=True)
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

    print(f"Generating audits for {len(HOTELS)} hotels in {base_dir}...")

    generated_files = []

    for hotel in HOTELS:
        hid = hotel["id"]
        html_content = generate_html(hotel)
        md_content = generate_markdown(hotel)

        # Check for em dashes
        for bad_char in ["\u2014", "\u2013"]:
            if bad_char in html_content:
                raise ValueError(f"Found em dash in HTML for {hid}!")
            if bad_char in md_content:
                raise ValueError(f"Found em dash in Markdown for {hid}!")

        # File paths
        html_file = os.path.join(base_dir, f"audit-{hid}.html")
        md_file = os.path.join(base_dir, f"audit-{hid}.md")
        pdf_file = os.path.join(base_dir, f"{hotel['name'].replace(' ', '-')}-Digital-Revenue-Audit.pdf")
        public_pdf_file = os.path.join(public_dir, f"{hotel['name'].replace(' ', '-')}-Digital-Revenue-Audit.pdf")

        # Write HTML & MD
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(html_content)
        with open(md_file, "w", encoding="utf-8") as f:
            f.write(md_content)

        # Convert to PDF via Headless Chrome
        file_url = f"file:///{html_file.replace(os.sep, '/')}"
        cmd = [
            chrome_path,
            "--headless=new",
            "--disable-gpu",
            "--run-all-compositor-stages-before-draw",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_file}",
            file_url
        ]
        
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Chrome error for {hid}: {res.stderr}")
        else:
            print(f"Rendered PDF for {hotel['name']} -> {pdf_file}")

        # Copy to public
        if os.path.exists(pdf_file):
            import shutil
            shutil.copy2(pdf_file, public_pdf_file)
            
            # Verify with PyMuPDF
            doc = fitz.open(pdf_file)
            page_count = len(doc)
            full_text = ""
            for p in doc:
                full_text += p.get_text()
            doc.close()

            # Verify no em dashes in text
            for bad_char in ["\u2014", "\u2013"]:
                if bad_char in full_text:
                    print(f"WARNING: em dash found in PDF text for {hid}!")
            
            print(f"Verified PDF: {pdf_file} ({page_count} pages, {len(full_text)} chars)")
            generated_files.append((hotel["name"], html_file, pdf_file, page_count))

    print("\nSummary of Generated Audits:")
    for name, h, p, pages in generated_files:
        print(f" - {name}: {pages} pages | PDF: {os.path.basename(p)}")

if __name__ == "__main__":
    main()

