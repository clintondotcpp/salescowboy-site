import os
import fitz  # PyMuPDF

def draw_rounded_rect(shape, rect, radius, fill=None, color=None, width=1):
    shape.draw_rect(rect, radius=radius)
    shape.finish(fill=fill, color=color, width=width)

def build_pdf():
    doc = fitz.open()
    
    # Theme Colors matching the website HSL design system:
    # Background: Warm off-white / parchment (40 28% 97%) -> RGB(249, 247, 242)
    # Foreground: Espresso / charcoal (28 35% 12%) -> RGB(38, 28, 20)
    # Accent: Warm Gold (36 90% 45%) -> RGB(218, 126, 12)
    # Primary: Cowboy Brown (25 65% 26%) -> RGB(110, 48, 23)
    # Card: Pure White (1, 1, 1)
    # Border: Warm Sand (35 22% 86%) -> RGB(225, 219, 209)
    # Secondary: Soft Sand -> RGB(242, 238, 231)

    BG_WARM   = (249/255, 247/255, 242/255)
    TEXT_MAIN = (38/255, 28/255, 20/255)
    TEXT_MUTED= (108/255, 96/255, 84/255)
    ACCENT    = (205/255, 115/255, 10/255) # Warm Gold
    BROWN     = (110/255, 48/255, 23/255)  # Cowboy Brown
    BORDER    = (222/255, 215/255, 204/255)
    CARD_BG   = (1, 1, 1)
    SAND_BG   = (242/255, 238/255, 231/255)
    WHITE     = (1, 1, 1)

    W, H = 595, 842
    M = 30

    # =========================================================================
    # PAGE 1: BRAND HEADER, HERO, 3 LEAKS & STEP 1 INFRASTRUCTURE
    # =========================================================================
    p1 = doc.new_page(width=W, height=H)
    s1 = p1.new_shape()

    # Page background: Warm off-white
    s1.draw_rect(fitz.Rect(0, 0, W, H))
    s1.finish(fill=BG_WARM, color=None, width=0)

    # Top Right Badge
    badge_rect = fitz.Rect(W - M - 145, 22, W - M, 60)
    draw_rounded_rect(s1, badge_rect, 0.08, fill=CARD_BG, color=BORDER, width=1)

    # Divider Line
    s1.draw_line((M, 68), (W - M, 68))
    s1.finish(color=BROWN, width=2)

    # Hero Box (Clean Card with Warm Accent Border)
    hero_rect = fitz.Rect(M, 76, W - M, 146)
    draw_rounded_rect(s1, hero_rect, 0.04, fill=CARD_BG, color=BORDER, width=1.2)
    s1.draw_line((M + 16, 126), (W - M - 16, 126))
    s1.finish(color=BORDER, width=0.8)

    # 3 Leaks Shapes
    y_leak = 154
    col_w3 = (W - 2 * M - 16) / 3
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_leak, x0 + col_w3, y_leak + 60)
        draw_rounded_rect(s1, r, 0.05, fill=CARD_BG, color=BORDER, width=1)

    # Section 1 Header Line
    y_s1 = 222
    s1.draw_line((M, y_s1 + 18), (W - M, y_s1 + 18))
    s1.finish(color=BROWN, width=1.5)

    # 3 Main Package Card Shapes
    y_pkg = y_s1 + 26
    pkg_h = 378
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_pkg, x0 + col_w3, y_pkg + pkg_h)
        is_feat = (i == 1)
        draw_rounded_rect(
            s1, r, 0.03,
            fill=CARD_BG,
            color=(ACCENT if is_feat else BORDER),
            width=(2.2 if is_feat else 1)
        )
        # Top pill badge
        b_rect = fitz.Rect(x0 + 8, y_pkg + 8, x0 + col_w3 - 8, y_pkg + 22)
        draw_rounded_rect(s1, b_rect, 0.1, fill=(ACCENT if is_feat else SAND_BG), color=None, width=0)

        # Dedicated "WHO NEEDS THIS" rounded container box
        who_box = fitz.Rect(x0 + 8, y_pkg + 62, x0 + col_w3 - 8, y_pkg + 138)
        draw_rounded_rect(s1, who_box, 0.05, fill=SAND_BG, color=BORDER, width=0.8)

        # Separator line before bullets
        s1.draw_line((x0 + 10, y_pkg + 144), (x0 + col_w3 - 10, y_pkg + 144))
        s1.finish(color=BORDER, width=0.8)

        # Footer badge
        f_rect = fitz.Rect(x0 + 8, y_pkg + pkg_h - 40, x0 + col_w3 - 8, y_pkg + pkg_h - 8)
        draw_rounded_rect(s1, f_rect, 0.06, fill=SAND_BG, color=BORDER, width=0.8)

    # Standalone Row Shapes
    y_st = y_pkg + pkg_h + 10
    st_h = 82
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_st, x0 + col_w3, y_st + st_h)
        draw_rounded_rect(s1, r, 0.05, fill=CARD_BG, color=BORDER, width=1)

    # Commit Page 1 background shapes
    s1.commit()

    # Insert Page 1 Typography
    p1.insert_text((M, 38), "SALES COWBOY", fontname="hebo", fontsize=18, color=BROWN)
    p1.insert_text((M, 50), "HOSPITALITY TECHNOLOGY & OCCUPANCY SYSTEMS", fontname="hebo", fontsize=7.2, color=TEXT_MUTED)
    p1.insert_text((M, 60), "36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria  |  WhatsApp: +234 810 493 3232", fontname="helv", fontsize=7.2, color=TEXT_MUTED)

    p1.insert_text((W - M - 135, 36), "OFFICIAL RATE CARD", fontname="cour", fontsize=7, color=TEXT_MUTED)
    p1.insert_text((W - M - 135, 49), "HOTELS & SHORTLETS", fontname="hebo", fontsize=9.2, color=BROWN)

    p1.insert_text((M + 16, 92), "FOR HOTELS, SERVICED APARTMENTS & MULTI-UNIT AIRBNB HOSTS", fontname="cour", fontsize=7.2, color=ACCENT)
    p1.insert_text((M + 16, 108), "Direct Booking, AI Automation & Occupancy Systems", fontname="hebo", fontsize=14, color=TEXT_MAIN)
    p1.insert_text((M + 16, 120), "Stop losing guests to slow WhatsApp replies, empty mid-week rooms, and 20% OTA commissions.", fontname="helv", fontsize=8, color=TEXT_MUTED)
    p1.insert_text((M + 16, 138), "[+] One-Time Software Ownership    [+] Paystack / Flutterwave Direct (0% Fee)    [+] 7-14 Day Turnaround", fontname="cour", fontsize=7.2, color=TEXT_MAIN)

    leaks = [
        ("LEAK 01", "The 9:00 PM WhatsApp Ghost", "Guest messages at 9:30 PM to book. Staff replies hours later after guest paid a rival hotel."),
        ("LEAK 02", "Invisible on Google Maps", "Travelers search Google Maps for hotels. Outside the Top 3 map pack, you are invisible."),
        ("LEAK 03", "Manual Front-Desk Leaks", "Paper notebooks and fake bank alerts cause double-bookings and unrecorded room cash.")
    ]
    for i, (kicker, title, desc) in enumerate(leaks):
        x0 = M + i * (col_w3 + 8)
        p1.insert_text((x0 + 8, y_leak + 13), kicker, fontname="cour", fontsize=6.8, color=ACCENT)
        p1.insert_text((x0 + 8, y_leak + 25), title, fontname="hebo", fontsize=8.5, color=TEXT_MAIN)
        p1.insert_textbox(fitz.Rect(x0 + 8, y_leak + 29, x0 + col_w3 - 8, y_leak + 58), desc, fontname="helv", fontsize=7.2, color=TEXT_MUTED)

    p1.insert_text((M, y_s1), "STEP 1: ONE-TIME INFRASTRUCTURE SETUPS (OWN YOUR SYSTEM OUTRIGHT)", fontname="cour", fontsize=7.2, color=ACCENT)
    p1.insert_text((M, y_s1 + 13), "Website, 24/7 WhatsApp AI & Hotel Management Software", fontname="hebo", fontsize=12, color=TEXT_MAIN)
    p1.insert_text((W - M - 165, y_s1 + 13), "Zero Monthly Software Subscription", fontname="cour", fontsize=7.2, color=TEXT_MUTED)

    pkgs = [
        {
            "badge": "STARTER INFRASTRUCTURE",
            "name": "1. Direct Booking Foundation",
            "price": "N200,000",
            "sub": "ONE-TIME SETUP",
            "who_title": "WHO NEEDS THIS PACKAGE:",
            "who_desc": "Hotels, guest houses, and shortlet hosts currently relying 100% on OTAs (15-20% commissions) or taking informal DM bookings with no verified website or payment checkout.",
            "featured": False,
            "bullets": [
                "Custom Direct Booking Website (Live room availability & galleries)",
                "Instant Paystack / Flutterwave card & transfer checkout (0% fee)",
                "Google Business Profile (GBP) complete verification & setup",
                "Local SEO setup to rank for 'Hotels / Shortlets near me'",
                "1 Year Cloud Hosting & Custom Domain included"
            ],
            "footer": "UPGRADE: 'Launch & Rank' Bundle (N250,000) adds 1 Full Month of active GBP & Local SEO push."
        },
        {
            "badge": "MOST POPULAR - HOTELS & SHORTLETS",
            "name": "2. 24/7 AI Concierge Suite",
            "price": "N420,000",
            "sub": "ONE-TIME LICENSE - NO SUBSCRIPTION",
            "who_title": "WHO NEEDS THIS PACKAGE:",
            "who_desc": "Properties losing bookings after hours (8:00 PM - 8:00 AM) due to delayed WhatsApp replies, or staff wasting hours answering repetitive FAQs & checking dates manually.",
            "featured": True,
            "bullets": [
                "Complete Direct Booking Website + Instant Payment Checkout",
                "24/7 WhatsApp AI Booking Agent: Replies in 3 seconds flat",
                "Checks live dates, answers FAQs & sends instant payment links",
                "Real-time calendar sync (Zero double-bookings across channels)",
                "Shortlet Mode: Automated Caution-Fee & ID verification"
            ],
            "footer": "INCLUDES: Full ownership license + 1 Year Cloud Hosting & SSL."
        },
        {
            "badge": "ENTERPRISE FULL STACK",
            "name": "3. Autonomous Hospitality OS",
            "price": "N800,000",
            "sub": "ONE-TIME LICENSE - NO SUBSCRIPTION",
            "who_title": "WHO NEEDS THIS PACKAGE:",
            "who_desc": "Established hotels (20-100+ rooms) suffering front-desk cash leakage, fake transfer receipts, unrecorded stays, and owners needing a live phone revenue dashboard.",
            "featured": False,
            "bullets": [
                "Custom Direct Booking Website with integrated payment gateway",
                "Full Hotel / Property Management Software (HMS):",
                "Front-desk check-in/out, room status & housekeeping tracker",
                "Staff role permissions & live Owner Revenue Dashboard on phone",
                "24/7 WhatsApp AI Chatbot wired directly into your HMS ledger"
            ],
            "footer": "ANTI-THEFT LEDGER: 100% license ownership with zero per-room SaaS tax."
        }
    ]

    for i, p in enumerate(pkgs):
        x0 = M + i * (col_w3 + 8)
        p1.insert_text((x0 + 12, y_pkg + 18), p["badge"], fontname="cour", fontsize=6.2, color=(WHITE if p["featured"] else TEXT_MAIN))
        p1.insert_text((x0 + 8, y_pkg + 36), p["name"], fontname="hebo", fontsize=9.2, color=TEXT_MAIN)
        p1.insert_text((x0 + 8, y_pkg + 53), p["price"], fontname="cour", fontsize=15, color=BROWN)
        p1.insert_text((x0 + 95, y_pkg + 53), p["sub"], fontname="cour", fontsize=6, color=TEXT_MUTED)

        # Dedicated "WHO NEEDS THIS" container rendering
        p1.insert_text((x0 + 12, y_pkg + 74), p["who_title"], fontname="hebo", fontsize=7.2, color=ACCENT)
        p1.insert_textbox(
            fitz.Rect(x0 + 12, y_pkg + 78, x0 + col_w3 - 12, y_pkg + 135),
            p["who_desc"],
            fontname="helv", fontsize=7.0, color=TEXT_MAIN
        )

        # Bullets
        p1.insert_text((x0 + 8, y_pkg + 154), "WHAT IS INCLUDED:", fontname="cour", fontsize=6.5, color=TEXT_MUTED)
        by = y_pkg + 165
        for b in p["bullets"]:
            p1.insert_text((x0 + 8, by + 6), "+", fontname="hebo", fontsize=8, color=ACCENT)
            p1.insert_textbox(fitz.Rect(x0 + 17, by, x0 + col_w3 - 8, by + 30), b, fontname="helv", fontsize=7.2, color=TEXT_MAIN)
            by += 28

        p1.insert_textbox(fitz.Rect(x0 + 12, y_pkg + pkg_h - 36, x0 + col_w3 - 12, y_pkg + pkg_h - 10), p["footer"], fontname="hebo", fontsize=6.8, color=TEXT_MAIN)

    standalones = [
        ("Cloud & AI Running Cost", "$10/mo (~N15,000)", "WHO: Properties running the 24/7 AI WhatsApp bot. Railway webhook ($5/mo) + Meta WhatsApp Cloud & GPT-4o-mini tokens ($5/mo). Pay-as-you-go or managed."),
        ("Standalone HMS / PMS App", "N500,000 (One-Time)", "WHO: Hotels with an existing website but paper/Excel front desk, risking unrecorded stays and cash theft. Custom Front-Desk OS & Owner Dashboard."),
        ("Basic 3-Page Corporate Site", "N85,000 (One-Time)", "WHO: New budget hotels or shortlets needing a verified Google Maps pin, photo showcase & direct WhatsApp routing before full booking engines.")
    ]
    for i, (st_name, st_price, st_desc) in enumerate(standalones):
        x0 = M + i * (col_w3 + 8)
        p1.insert_text((x0 + 8, y_st + 15), st_name, fontname="hebo", fontsize=8.5, color=TEXT_MAIN)
        p1.insert_text((x0 + 8, y_st + 27), st_price, fontname="cour", fontsize=8.2, color=BROWN)
        p1.insert_textbox(fitz.Rect(x0 + 8, y_st + 31, x0 + col_w3 - 8, y_st + 78), st_desc, fontname="helv", fontsize=7.0, color=TEXT_MUTED)

    p1.insert_text((M, H - 16), "SALES COWBOY HOSPITALITY RATE CARD  |  PAGE 1 OF 2", fontname="cour", fontsize=7.2, color=TEXT_MUTED)
    p1.insert_text((W - M - 175, H - 16), "WEB: salescowboy.com.ng/hospitality", fontname="cour", fontsize=7.2, color=BROWN)

    # =========================================================================
    # PAGE 2: MONTHLY RETAINERS, BUNDLES, POWER-UPS & CLIENT PORTAL
    # =========================================================================
    p2 = doc.new_page(width=W, height=H)
    s2 = p2.new_shape()

    # Page 2 Background
    s2.draw_rect(fitz.Rect(0, 0, W, H))
    s2.finish(fill=BG_WARM, color=None, width=0)

    # Section 2 Line
    s2.draw_line((M, 54), (W - M, 54))
    s2.finish(color=BROWN, width=1.5)

    y_ret = 62
    ret_h = 274
    col_w4 = (W - 2 * M - 21) / 4
    for i in range(4):
        x0 = M + i * (col_w4 + 7)
        r = fitz.Rect(x0, y_ret, x0 + col_w4, y_ret + ret_h)
        is_best = (i == 3)
        draw_rounded_rect(
            s2, r, 0.04,
            fill=CARD_BG,
            color=(ACCENT if is_best else BORDER),
            width=(2 if is_best else 1)
        )
        # Dedicated WHO NEEDS THIS box in retainers
        who_ret_box = fitz.Rect(x0 + 6, y_ret + 48, x0 + col_w4 - 6, y_ret + 116)
        draw_rounded_rect(s2, who_ret_box, 0.05, fill=SAND_BG, color=BORDER, width=0.8)

        s2.draw_line((x0 + 6, y_ret + 122), (x0 + col_w4 - 6, y_ret + 122))
        s2.finish(color=BORDER, width=0.8)

    # Monthly Bundles Banner Shapes
    y_bun = y_ret + ret_h + 10
    bun_h = 96
    bun_rect = fitz.Rect(M, y_bun, W - M, y_bun + bun_h)
    draw_rounded_rect(s2, bun_rect, 0.04, fill=CARD_BG, color=BORDER, width=1.2)
    mid_x = W / 2
    s2.draw_line((mid_x, y_bun + 12), (mid_x, y_bun + bun_h - 12))
    s2.finish(color=BORDER, width=1)

    # Step 3 Header Line & Shapes
    y_add = y_bun + bun_h + 12
    s2.draw_line((M, y_add + 18), (W - M, y_add + 18))
    s2.finish(color=BROWN, width=1.5)

    y_ac = y_add + 26
    ac_h = 82
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_ac, x0 + col_w3, y_ac + ac_h)
        draw_rounded_rect(s2, r, 0.05, fill=CARD_BG, color=BORDER, width=1)

    # Client Portal Shape
    y_port = y_ac + ac_h + 10
    port_h = 78
    port_rect = fitz.Rect(M, y_port, W - M, y_port + port_h)
    draw_rounded_rect(s2, port_rect, 0.04, fill=CARD_BG, color=BORDER, width=1.5)
    s2.draw_line((M + 14, y_port + 22), (W - M - 14, y_port + 22))
    s2.finish(color=BORDER, width=1)

    # Bottom CTA Shape
    y_cta = y_port + port_h + 10
    cta_h = 60
    cta_rect = fitz.Rect(M, y_cta, W - M, y_cta + cta_h)
    draw_rounded_rect(s2, cta_rect, 0.05, fill=CARD_BG, color=BROWN, width=1.5)

    # Commit Page 2 background shapes
    s2.commit()

    # Page 2 Typography
    p2.insert_text((M, 34), "STEP 2: MONTHLY OCCUPANCY & GROWTH RETAINERS", fontname="cour", fontsize=7.2, color=ACCENT)
    p2.insert_text((M, 48), "Fill Your Rooms & Apartments Every Weekend", fontname="hebo", fontsize=13, color=TEXT_MAIN)
    p2.insert_text((W - M - 185, 48), "Traffic, Viral Video & Technical Care", fontname="cour", fontsize=7.2, color=TEXT_MUTED)

    retainers = [
        {
            "tier": "TIER 01",
            "name": "Website & System Care",
            "price": "N50,000",
            "sub": "/ mo",
            "best": False,
            "who_title": "WHO NEEDS THIS:",
            "who_desc": "Owners wanting zero tech downtime, with instant rate changes, seasonal promo banners & API health monitoring.",
            "bullets": [
                "Unlimited room rate & text updates",
                "Seasonal promo banner swaps",
                "Cloud hosting, SSL & daily backups",
                "WhatsApp & AI API health monitoring",
                "Priority support via Client Portal"
            ]
        },
        {
            "tier": "TIER 02",
            "name": "Google Maps Dominance",
            "price": "N100,000",
            "sub": "/ mo",
            "best": False,
            "who_title": "WHO NEEDS THIS:",
            "who_desc": "Hotels invisible on Google Maps, losing travelers searching 'near me' or diaspora visitors to local competitors.",
            "bullets": [
                "Weekly GBP posts & special offers",
                "Geo-tagged room & facility photos",
                "Website SEO & Local Search optimization",
                "Monthly local citation & Map push",
                "Call & direction request analytics"
            ]
        },
        {
            "tier": "TIER 03",
            "name": "Hospitality Social Engine",
            "price": "N150,000",
            "sub": "/ mo",
            "best": False,
            "who_title": "WHO NEEDS THIS:",
            "who_desc": "Properties with inactive or low-quality social pages needing an elite, prestigious brand presence that drives bookings.",
            "bullets": [
                "Full IG, FB & TikTok Management",
                "Monthly calendar & graphic design",
                "Pro editing of raw clips into Reels",
                "Daily captions & DM routing",
                "1-Click approval in Client Portal"
            ]
        },
        {
            "tier": "TIER 04 - BEST SELLER",
            "name": "Viral UGC Video Suite",
            "price": "N270,000",
            "sub": "/ mo",
            "best": True,
            "who_title": "WHO NEEDS THIS:",
            "who_desc": "Properties with great aesthetics or suites that struggle with empty mid-week rooms and need viral video reach.",
            "bullets": [
                "4 Custom Creator UGC Videos / Month",
                "Scripted, shot & edited to sell rooms & vibe",
                "Hook testing for high TikTok & IG virality",
                "Showcases rooms, pool, bar & facilities",
                "Ready-to-run Paid Ad video creatives"
            ]
        }
    ]

    for i, rt in enumerate(retainers):
        x0 = M + i * (col_w4 + 7)
        p2.insert_text((x0 + 8, y_ret + 14), rt["tier"], fontname="cour", fontsize=6.2, color=(ACCENT if rt["best"] else TEXT_MUTED))
        p2.insert_text((x0 + 8, y_ret + 26), rt["name"], fontname="hebo", fontsize=8.2, color=TEXT_MAIN)
        p2.insert_text((x0 + 8, y_ret + 42), rt["price"], fontname="cour", fontsize=13, color=BROWN)
        p2.insert_text((x0 + 72, y_ret + 42), rt["sub"], fontname="helv", fontsize=7, color=TEXT_MUTED)

        # Retainer WHO NEEDS THIS block
        p2.insert_text((x0 + 10, y_ret + 58), rt["who_title"], fontname="hebo", fontsize=6.5, color=ACCENT)
        p2.insert_textbox(
            fitz.Rect(x0 + 10, y_ret + 62, x0 + col_w4 - 10, y_ret + 114),
            rt["who_desc"],
            fontname="helv", fontsize=6.7, color=TEXT_MAIN
        )

        by = y_ret + 128
        for b in rt["bullets"]:
            p2.insert_text((x0 + 8, by + 6), "+", fontname="hebo", fontsize=7.2, color=ACCENT)
            p2.insert_textbox(fitz.Rect(x0 + 15, by, x0 + col_w4 - 5, by + 24), b, fontname="helv", fontsize=6.9, color=TEXT_MAIN)
            by += 24

    # Left Bundle Text
    p2.insert_text((M + 14, y_bun + 16), "HIGH-IMPACT OCCUPANCY BUNDLE (SAVE N20,000/MO)", fontname="cour", fontsize=6.8, color=ACCENT)
    p2.insert_text((M + 14, y_bun + 30), "The 'Full Occupancy' Retainer Bundle", fontname="hebo", fontsize=10.5, color=TEXT_MAIN)
    p2.insert_text((M + 14, y_bun + 46), "N350,000 / month", fontname="cour", fontsize=13, color=BROWN)
    p2.insert_textbox(
        fitz.Rect(M + 14, y_bun + 52, mid_x - 14, y_bun + 92),
        "WHO NEEDS THIS: Ambitious properties wanting an outsourced growth department. Combines Viral UGC Videos (N270k) + Google Maps (N100k) to fill rooms all month.",
        fontname="helv", fontsize=7.2, color=TEXT_MUTED
    )

    # Right Bundle Text
    p2.insert_text((mid_x + 14, y_bun + 16), "WEEKEND ADVERTISING & LEAD ENGINE", fontname="cour", fontsize=6.8, color=ACCENT)
    p2.insert_text((mid_x + 14, y_bun + 30), "Paid Ads Campaign Setup", fontname="hebo", fontsize=10.5, color=TEXT_MAIN)
    p2.insert_text((mid_x + 14, y_bun + 46), "N100,000 / campaign setup", fontname="cour", fontsize=12.5, color=BROWN)
    p2.insert_textbox(
        fitz.Rect(mid_x + 14, y_bun + 52, W - M - 14, y_bun + 92),
        "WHO NEEDS THIS: Hotels or shortlets with empty rooms this weekend needing immediate booking inquiries fast. Full Meta & Google Ads setup + creative guide.",
        fontname="helv", fontsize=7.2, color=TEXT_MUTED
    )

    # Step 3 Text
    p2.insert_text((M, y_add), "STEP 3: OPTIONAL PROPERTY POWER-UPS (ADD TO ANY PACKAGE)", fontname="cour", fontsize=7.2, color=ACCENT)
    p2.insert_text((M, y_add + 13), "High-Impact One-Off Revenue & Operations Add-Ons", fontname="hebo", fontsize=12, color=TEXT_MAIN)

    addons = [
        ("+ N75,000 ONE-TIME", "5-Star Review & Rebate Bot", "WHO: Hotels with <50 reviews wanting hands-free review triggers (Needs Site + AI Bot). 2h post-stay, bot requests 5-star review & gives 10% repeat code."),
        ("+ N150,000 ONE-TIME", "Bar & Room QR Menu + POS", "WHO NEEDS THIS: Hotels with bar/dining losing cash or slow service. Guests order via bedside QR; orders print at bar & log into HMS ledger."),
        ("+ N120,000 ONE-OFF", "On-Site Content Shoot Day", "WHO NEEDS THIS: Properties needing fresh visual assets without hiring an expensive crew. Cameraman shoots 30+ vertical clips & crisp room photos.")
    ]
    for i, (ap, at, ad) in enumerate(addons):
        x0 = M + i * (col_w3 + 8)
        p2.insert_text((x0 + 8, y_ac + 14), ap, fontname="cour", fontsize=7.5, color=BROWN)
        p2.insert_text((x0 + 8, y_ac + 27), at, fontname="hebo", fontsize=8.2, color=TEXT_MAIN)
        p2.insert_textbox(fitz.Rect(x0 + 8, y_ac + 31, x0 + col_w3 - 8, y_ac + 78), ad, fontname="helv", fontsize=6.8, color=TEXT_MUTED)

    # Client Portal Text
    p2.insert_text((M + 14, y_port + 16), "ZERO MICROMANAGEMENT: DEDICATED SALES COWBOY CLIENT PORTAL INCLUDED", fontname="hebo", fontsize=8.8, color=TEXT_MAIN)
    port_items = [
        ("1. 10-Min Setup Dashboard", "Upload your room prices, photos & logos in one organized portal with zero messy chats."),
        ("2. Live Build Tracker", "Watch your booking site, WhatsApp AI bot & HMS deployment progress in real time."),
        ("3. 1-Click Rate & Reel Approvals", "Update room rates or approve next week's Reels inside the portal in one click.")
    ]
    for i, (pt, pd) in enumerate(port_items):
        x0 = M + 14 + i * ((W - 2 * M - 28) / 3)
        p2.insert_text((x0, y_port + 36), pt, fontname="hebo", fontsize=7.8, color=TEXT_MAIN)
        p2.insert_textbox(fitz.Rect(x0, y_port + 40, x0 + 165, y_port + 75), pd, fontname="helv", fontsize=7.0, color=TEXT_MUTED)

    # Bottom CTA Text
    p2.insert_text((M + 14, y_cta + 18), "READY TO LOCK IN YOUR BUILD SLOT OR GET STARTED?", fontname="hebo", fontsize=9.8, color=BROWN)
    p2.insert_text((M + 14, y_cta + 33), "1. Web: salescowboy.com.ng/hospitality   |   2. WhatsApp: +234 810 493 3232   |   3. Email: hello@salescowboy.com.ng", fontname="cour", fontsize=7.0, color=TEXT_MAIN)
    p2.insert_text((M + 14, y_cta + 47), "Office: 36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria", fontname="helv", fontsize=7.0, color=TEXT_MUTED)

    p2.insert_text((M, H - 16), "SALES COWBOY HOSPITALITY RATE CARD  |  PAGE 2 OF 2", fontname="cour", fontsize=7.2, color=TEXT_MUTED)
    p2.insert_text((W - M - 175, H - 16), "WEB: salescowboy.com.ng/hospitality", fontname="cour", fontsize=7.2, color=BROWN)

    out_public = os.path.abspath("public/Sales-Cowboy-Hospitality-Packages.pdf")
    out_root = os.path.abspath("Sales-Cowboy-Hospitality-Packages.pdf")
    doc.save(out_public)
    doc.save(out_root)
    doc.close()
    print(f"PDF generated successfully at:\n  - {out_public}\n  - {out_root}")

if __name__ == "__main__":
    build_pdf()
