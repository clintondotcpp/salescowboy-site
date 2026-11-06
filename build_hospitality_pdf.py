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
    M = 32

    # =========================================================================
    # PAGE 1: BRAND HEADER, HERO, 3 LEAKS & STEP 1 INFRASTRUCTURE
    # =========================================================================
    p1 = doc.new_page(width=W, height=H)
    s1 = p1.new_shape()

    # Page background: Warm off-white
    s1.draw_rect(fitz.Rect(0, 0, W, H))
    s1.finish(fill=BG_WARM, color=None, width=0)

    # Top Right Badge
    badge_rect = fitz.Rect(W - M - 145, 26, W - M, 66)
    draw_rounded_rect(s1, badge_rect, 0.08, fill=CARD_BG, color=BORDER, width=1)

    # Divider Line
    s1.draw_line((M, 76), (W - M, 76))
    s1.finish(color=BROWN, width=2)

    # Hero Box (Clean Card with Warm Accent Border)
    hero_rect = fitz.Rect(M, 88, W - M, 194)
    draw_rounded_rect(s1, hero_rect, 0.04, fill=CARD_BG, color=BORDER, width=1.2)
    s1.draw_line((M + 18, 168), (W - M - 18, 168))
    s1.finish(color=BORDER, width=0.8)

    # 3 Leaks Shapes
    y_leak = 206
    col_w3 = (W - 2 * M - 16) / 3
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_leak, x0 + col_w3, y_leak + 74)
        draw_rounded_rect(s1, r, 0.05, fill=CARD_BG, color=BORDER, width=1)

    # Section 1 Header Line
    y_s1 = 296
    s1.draw_line((M, y_s1 + 20), (W - M, y_s1 + 20))
    s1.finish(color=BROWN, width=1.5)

    # 3 Main Package Card Shapes
    y_pkg = y_s1 + 30
    pkg_h = 335
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
        b_rect = fitz.Rect(x0 + 10, y_pkg + 10, x0 + col_w3 - 10, y_pkg + 25)
        draw_rounded_rect(s1, b_rect, 0.1, fill=(ACCENT if is_feat else SAND_BG), color=None, width=0)
        s1.draw_line((x0 + 10, y_pkg + 114), (x0 + col_w3 - 10, y_pkg + 114))
        s1.finish(color=BORDER, width=0.8)
        f_rect = fitz.Rect(x0 + 10, y_pkg + pkg_h - 52, x0 + col_w3 - 10, y_pkg + pkg_h - 10)
        draw_rounded_rect(s1, f_rect, 0.06, fill=SAND_BG, color=BORDER, width=0.8)

    # Standalone Row Shapes
    y_st = y_pkg + pkg_h + 14
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_st, x0 + col_w3, y_st + 72)
        draw_rounded_rect(s1, r, 0.05, fill=CARD_BG, color=BORDER, width=1)

    # Commit Page 1 background shapes
    s1.commit()

    # Insert Page 1 Typography
    p1.insert_text((M, 42), "SALES COWBOY", fontname="hebo", fontsize=19, color=BROWN)
    p1.insert_text((M, 55), "HOSPITALITY TECHNOLOGY & OCCUPANCY SYSTEMS", fontname="hebo", fontsize=7.5, color=TEXT_MUTED)
    p1.insert_text((M, 66), "36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria  |  WhatsApp: +234 810 493 3232", fontname="helv", fontsize=7.5, color=TEXT_MUTED)

    p1.insert_text((W - M - 135, 41), "OFFICIAL RATE CARD", fontname="cour", fontsize=7, color=TEXT_MUTED)
    p1.insert_text((W - M - 135, 55), "HOTELS & SHORTLETS", fontname="hebo", fontsize=9.5, color=BROWN)

    p1.insert_text((M + 18, 107), "FOR HOTELS, SERVICED APARTMENTS & MULTI-UNIT AIRBNB HOSTS", fontname="cour", fontsize=7.5, color=ACCENT)
    p1.insert_text((M + 18, 126), "Direct Booking, AI Automation & Occupancy Systems.", fontname="hebo", fontsize=15.5, color=TEXT_MAIN)
    p1.insert_textbox(
        fitz.Rect(M + 18, 133, W - M - 18, 166),
        "Stop losing guests to slow WhatsApp replies, empty mid-week rooms, and 20% OTA commissions. Choose your one-time software infrastructure or monthly growth engine below.",
        fontname="helv", fontsize=8.8, color=TEXT_MUTED
    )
    p1.insert_text((M + 18, 183), "[+] One-Time Software Ownership    [+] Paystack / Flutterwave Direct (0% Fee)    [+] 7-14 Day Turnaround", fontname="cour", fontsize=7.6, color=TEXT_MAIN)

    leaks = [
        ("LEAK 01", "The 9:00 PM WhatsApp Ghost", "A guest messages at 9:30 PM to book for the weekend. Staff replies hours later after the guest paid a rival hotel."),
        ("LEAK 02", "Invisible on Google Maps", "Corporate & diaspora travelers search Google Maps for hotels or shortlets. Outside the Top 3, you are invisible."),
        ("LEAK 03", "Manual Front-Desk Leaks", "Paper notebooks, Excel sheets, and fake transfer alerts cause double-bookings and staff pocketing room cash.")
    ]
    for i, (kicker, title, desc) in enumerate(leaks):
        x0 = M + i * (col_w3 + 8)
        p1.insert_text((x0 + 10, y_leak + 15), kicker, fontname="cour", fontsize=7, color=ACCENT)
        p1.insert_text((x0 + 10, y_leak + 28), title, fontname="hebo", fontsize=9.2, color=TEXT_MAIN)
        p1.insert_textbox(fitz.Rect(x0 + 10, y_leak + 33, x0 + col_w3 - 8, y_leak + 70), desc, fontname="helv", fontsize=7.6, color=TEXT_MUTED)

    p1.insert_text((M, y_s1), "STEP 1: ONE-TIME INFRASTRUCTURE SETUPS (OWN YOUR SYSTEM OUTRIGHT)", fontname="cour", fontsize=7.5, color=ACCENT)
    p1.insert_text((M, y_s1 + 14), "Website, 24/7 WhatsApp AI & Hotel Management Software", fontname="hebo", fontsize=13, color=TEXT_MAIN)
    p1.insert_text((W - M - 165, y_s1 + 14), "Zero Monthly Software Subscription", fontname="cour", fontsize=7.5, color=TEXT_MUTED)

    pkgs = [
        {
            "badge": "STARTER INFRASTRUCTURE",
            "name": "1. Direct Booking Foundation",
            "price": "N200,000",
            "sub": "ONE-TIME SETUP",
            "who": "WHO NEEDS THIS: Properties relying 100% on OTAs (15-20% fee) or taking messy DM bookings with no verified website or payment checkout.",
            "featured": False,
            "bullets": [
                "Custom Direct Booking Website (Live room/unit calendar & galleries)",
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
            "who": "WHO NEEDS THIS: Hotels & shortlets losing night/weekend bookings to slow WhatsApp replies, or bogged down repeating FAQs & manual dates.",
            "featured": True,
            "bullets": [
                "Complete Direct Booking Website + Instant Payment Checkout",
                "24/7 WhatsApp AI Booking Agent: Replies in 3 seconds flat",
                "Checks live dates, answers FAQs & sends instant payment links",
                "Real-time calendar sync (Zero double-bookings across channels)",
                "Shortlet Mode: Caution-Fee & Guest ID verification via WhatsApp"
            ],
            "footer": "INCLUDES: Full ownership license + 1 Year Cloud Hosting & SSL."
        },
        {
            "badge": "ENTERPRISE FULL STACK",
            "name": "3. Autonomous Hospitality OS",
            "price": "N800,000",
            "sub": "ONE-TIME LICENSE - NO SUBSCRIPTION",
            "who": "WHO NEEDS THIS: Established hotels (20-100+ rooms) suffering front-desk cash leaks, fake transfer receipts, and unrecorded room stays.",
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
        p1.insert_text((x0 + 15, y_pkg + 20), p["badge"], fontname="cour", fontsize=6.5, color=(WHITE if p["featured"] else TEXT_MAIN))
        p1.insert_text((x0 + 10, y_pkg + 42), p["name"], fontname="hebo", fontsize=9.8, color=TEXT_MAIN)
        p1.insert_text((x0 + 10, y_pkg + 66), p["price"], fontname="cour", fontsize=18, color=BROWN)
        p1.insert_text((x0 + 10, y_pkg + 78), p["sub"], fontname="cour", fontsize=6.5, color=TEXT_MUTED)
        p1.insert_textbox(fitz.Rect(x0 + 10, y_pkg + 84, x0 + col_w3 - 10, y_pkg + 112), p["who"], fontname="hebo", fontsize=7.2, color=TEXT_MUTED)

        by = y_pkg + 122
        for b in p["bullets"]:
            p1.insert_text((x0 + 10, by + 8), "+", fontname="hebo", fontsize=8.5, color=ACCENT)
            p1.insert_textbox(fitz.Rect(x0 + 20, by, x0 + col_w3 - 8, by + 34), b, fontname="helv", fontsize=7.6, color=TEXT_MAIN)
            by += 32

        p1.insert_textbox(fitz.Rect(x0 + 15, y_pkg + pkg_h - 48, x0 + col_w3 - 14, y_pkg + pkg_h - 12), p["footer"], fontname="hebo", fontsize=7, color=TEXT_MAIN)

    standalones = [
        ("Cloud & AI Running Cost", "$10/mo (~N15,000)", "Railway server ($5/mo) + Meta WhatsApp Cloud & GPT-4o-mini tokens ($5/mo). Pay-as-you-go or managed."),
        ("Standalone HMS / PMS App", "N500,000 (One-Time)", "WHO: Hotels with a website but paper/Excel front desk, risking cash theft. Custom Front-Desk OS & Owner Dashboard."),
        ("Basic 3-Page Corporate Site", "N85,000 (One-Time)", "WHO: New budget hotels/shortlets needing a verified Google Maps pin & clean showcase site before full booking engines.")
    ]
    for i, (st_name, st_price, st_desc) in enumerate(standalones):
        x0 = M + i * (col_w3 + 8)
        p1.insert_text((x0 + 10, y_st + 16), st_name, fontname="hebo", fontsize=8.8, color=TEXT_MAIN)
        p1.insert_text((x0 + 10, y_st + 29), st_price, fontname="cour", fontsize=8.5, color=BROWN)
        p1.insert_textbox(fitz.Rect(x0 + 10, y_st + 34, x0 + col_w3 - 8, y_st + 69), st_desc, fontname="helv", fontsize=7.3, color=TEXT_MUTED)

    p1.insert_text((M, H - 18), "SALES COWBOY HOSPITALITY RATE CARD  |  PAGE 1 OF 2", fontname="cour", fontsize=7.5, color=TEXT_MUTED)
    p1.insert_text((W - M - 175, H - 18), "WEB: salescowboy.com.ng/hospitality", fontname="cour", fontsize=7.5, color=BROWN)

    # =========================================================================
    # PAGE 2: MONTHLY RETAINERS, BUNDLES, POWER-UPS & CLIENT PORTAL
    # =========================================================================
    p2 = doc.new_page(width=W, height=H)
    s2 = p2.new_shape()

    # Page 2 Background
    s2.draw_rect(fitz.Rect(0, 0, W, H))
    s2.finish(fill=BG_WARM, color=None, width=0)

    # Section 2 Line
    s2.draw_line((M, 60), (W - M, 60))
    s2.finish(color=BROWN, width=1.5)

    y_ret = 72
    ret_h = 240
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
        s2.draw_line((x0 + 8, y_ret + 92), (x0 + col_w4 - 8, y_ret + 92))
        s2.finish(color=BORDER, width=0.8)

    # Monthly Bundles Banner Shapes
    y_bun = y_ret + ret_h + 14
    bun_rect = fitz.Rect(M, y_bun, W - M, y_bun + 96)
    draw_rounded_rect(s2, bun_rect, 0.04, fill=CARD_BG, color=BORDER, width=1.2)
    mid_x = W / 2
    s2.draw_line((mid_x, y_bun + 14), (mid_x, y_bun + 82))
    s2.finish(color=BORDER, width=1)

    # Step 3 Header Line & Shapes
    y_add = y_bun + 114
    s2.draw_line((M, y_add + 20), (W - M, y_add + 20))
    s2.finish(color=BROWN, width=1.5)

    y_ac = y_add + 30
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_ac, x0 + col_w3, y_ac + 92)
        draw_rounded_rect(s2, r, 0.05, fill=CARD_BG, color=BORDER, width=1)

    # Client Portal Shape
    y_port = y_ac + 108
    port_rect = fitz.Rect(M, y_port, W - M, y_port + 95)
    draw_rounded_rect(s2, port_rect, 0.04, fill=CARD_BG, color=BORDER, width=1.5)
    s2.draw_line((M + 14, y_port + 25), (W - M - 14, y_port + 25))
    s2.finish(color=BORDER, width=1)

    # Bottom CTA Shape
    y_cta = y_port + 110
    cta_rect = fitz.Rect(M, y_cta, W - M, y_cta + 66)
    draw_rounded_rect(s2, cta_rect, 0.05, fill=CARD_BG, color=BROWN, width=1.5)

    # Commit Page 2 background shapes
    s2.commit()

    # Page 2 Typography
    p2.insert_text((M, 38), "STEP 2: MONTHLY OCCUPANCY & GROWTH RETAINERS", fontname="cour", fontsize=7.5, color=ACCENT)
    p2.insert_text((M, 53), "Fill Your Rooms & Apartments Every Weekend", fontname="hebo", fontsize=14, color=TEXT_MAIN)
    p2.insert_text((W - M - 185, 53), "Traffic, Viral Video & Technical Care", fontname="cour", fontsize=7.5, color=TEXT_MUTED)

    retainers = [
        {
            "tier": "TIER 01",
            "name": "Website & System Care",
            "price": "N50,000",
            "best": False,
            "desc": "WHO: Owners wanting zero tech downtime, with instant rate changes & banner updates.",
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
            "best": False,
            "desc": "WHO: Hotels invisible on Google Maps, losing travelers searching 'near me' to rivals.",
            "bullets": [
                "Weekly GBP posts & special offers",
                "Geo-tagged room & facility photos",
                "Automated 5-star review generation",
                "Monthly local citation & Map push",
                "Call & direction request analytics"
            ]
        },
        {
            "tier": "TIER 03",
            "name": "Hospitality Social Engine",
            "price": "N150,000",
            "best": False,
            "desc": "WHO: Hotels with inactive social pages needing an elite, prestigious brand presence.",
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
            "best": True,
            "desc": "WHO: Properties with empty mid-week rooms needing viral video booking demand.",
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
        p2.insert_text((x0 + 8, y_ret + 15), rt["tier"], fontname="cour", fontsize=6.5, color=(ACCENT if rt["best"] else TEXT_MUTED))
        p2.insert_text((x0 + 8, y_ret + 29), rt["name"], fontname="hebo", fontsize=8.5, color=TEXT_MAIN)
        p2.insert_text((x0 + 8, y_ret + 49), rt["price"], fontname="cour", fontsize=14, color=BROWN)
        p2.insert_text((x0 + 78, y_ret + 49), "/ mo", fontname="helv", fontsize=7.5, color=TEXT_MUTED)
        p2.insert_textbox(fitz.Rect(x0 + 8, y_ret + 56, x0 + col_w4 - 6, y_ret + 90), rt["desc"], fontname="helv", fontsize=7.2, color=TEXT_MUTED)

        by = y_ret + 100
        for b in rt["bullets"]:
            p2.insert_text((x0 + 8, by + 7), "+", fontname="hebo", fontsize=7.5, color=ACCENT)
            p2.insert_textbox(fitz.Rect(x0 + 16, by, x0 + col_w4 - 5, by + 26), b, fontname="helv", fontsize=7.2, color=TEXT_MAIN)
            by += 26

    # Left Bundle Text
    p2.insert_text((M + 16, y_bun + 18), "HIGH-IMPACT OCCUPANCY BUNDLE (SAVE N20,000/MO)", fontname="cour", fontsize=7, color=ACCENT)
    p2.insert_text((M + 16, y_bun + 34), "The 'Full Occupancy' Retainer Bundle", fontname="hebo", fontsize=11, color=TEXT_MAIN)
    p2.insert_text((M + 16, y_bun + 54), "N350,000 / month", fontname="cour", fontsize=14, color=BROWN)
    p2.insert_textbox(
        fitz.Rect(M + 16, y_bun + 60, mid_x - 12, y_bun + 92),
        "WHO: Ambitious properties wanting an outsourced growth department. Combines Viral UGC Videos (N270k) + Google Maps (N100k) to fill rooms all month.",
        fontname="helv", fontsize=7.4, color=TEXT_MUTED
    )

    # Right Bundle Text
    p2.insert_text((mid_x + 16, y_bun + 18), "WEEKEND ADVERTISING & LEAD ENGINE", fontname="cour", fontsize=7, color=ACCENT)
    p2.insert_text((mid_x + 16, y_bun + 34), "Paid Ads Campaign Setup", fontname="hebo", fontsize=11, color=TEXT_MAIN)
    p2.insert_text((mid_x + 16, y_bun + 54), "N100,000 / campaign setup", fontname="cour", fontsize=13, color=BROWN)
    p2.insert_textbox(
        fitz.Rect(mid_x + 16, y_bun + 60, W - M - 12, y_bun + 92),
        "WHO: Properties with empty rooms this weekend. Meta & Google Ads setup + creative guide. Client funds daily ad budget x days directly.",
        fontname="helv", fontsize=7.4, color=TEXT_MUTED
    )

    # Step 3 Text
    p2.insert_text((M, y_add), "STEP 3: OPTIONAL PROPERTY POWER-UPS (ADD TO ANY PACKAGE)", fontname="cour", fontsize=7.5, color=ACCENT)
    p2.insert_text((M, y_add + 14), "High-Impact One-Off Revenue & Operations Add-Ons", fontname="hebo", fontsize=13, color=TEXT_MAIN)

    addons = [
        ("+ N75,000 ONE-TIME", "5-Star Review & Rebate Bot", "WHO: Hotels with <50 reviews. 2h post-checkout, bot requests a 5-star Google review & gives 10% repeat-stay code."),
        ("+ N150,000 ONE-TIME", "Bar & Room QR Menu + POS", "WHO: Hotels with bar/dining losing cash or slow service. Guests order via bedside QR; orders print at bar & HMS."),
        ("+ N120,000 ONE-OFF", "On-Site Content Shoot Day", "WHO: Properties needing fresh visual assets. Cameraman shoots 30+ vertical clips & crisp room photos for the quarter.")
    ]
    for i, (ap, at, ad) in enumerate(addons):
        x0 = M + i * (col_w3 + 8)
        p2.insert_text((x0 + 10, y_ac + 16), ap, fontname="cour", fontsize=8, color=BROWN)
        p2.insert_text((x0 + 10, y_ac + 31), at, fontname="hebo", fontsize=8.8, color=TEXT_MAIN)
        p2.insert_textbox(fitz.Rect(x0 + 10, y_ac + 37, x0 + col_w3 - 8, y_ac + 88), ad, fontname="helv", fontsize=7.5, color=TEXT_MUTED)

    # Client Portal Text
    p2.insert_text((M + 14, y_port + 18), "ZERO MICROMANAGEMENT: DEDICATED SALES COWBOY CLIENT PORTAL INCLUDED", fontname="hebo", fontsize=9.5, color=TEXT_MAIN)
    port_items = [
        ("1. 10-Min Guided Setup Manual", "Upload your room prices, photos, and logos in one organized portal with zero messy WhatsApp group chats."),
        ("2. Live Build Progress Tracker", "Watch your website, WhatsApp AI bot, and HMS deployment progress step-by-step in real time."),
        ("3. 1-Click Rate & Reel Approval", "Need to update December room rates or approve next week's Reels? Log in, click submit, and consider it done.")
    ]
    for i, (pt, pd) in enumerate(port_items):
        x0 = M + 14 + i * ((W - 2 * M - 28) / 3)
        p2.insert_text((x0, y_port + 40), pt, fontname="hebo", fontsize=8.2, color=TEXT_MAIN)
        p2.insert_textbox(fitz.Rect(x0, y_port + 45, x0 + 165, y_port + 88), pd, fontname="helv", fontsize=7.4, color=TEXT_MUTED)

    # Bottom CTA Text
    p2.insert_text((M + 16, y_cta + 22), "READY TO LOCK IN YOUR BUILD SLOT OR TEST OUR LIVE AI BOT DEMO?", fontname="hebo", fontsize=10.5, color=BROWN)
    p2.insert_text((M + 16, y_cta + 38), "1. Web: salescowboy.com.ng/hospitality   |   2. WhatsApp: +234 810 493 3232   |   3. Email: hello@salescowboy.com.ng", fontname="cour", fontsize=7.4, color=TEXT_MAIN)
    p2.insert_text((M + 16, y_cta + 53), "Office: 36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria", fontname="helv", fontsize=7.5, color=TEXT_MUTED)

    p2.insert_text((M, H - 18), "SALES COWBOY HOSPITALITY RATE CARD  |  PAGE 2 OF 2", fontname="cour", fontsize=7.5, color=TEXT_MUTED)
    p2.insert_text((W - M - 175, H - 18), "WEB: salescowboy.com.ng/hospitality", fontname="cour", fontsize=7.5, color=BROWN)

    out_public = os.path.abspath("public/Sales-Cowboy-Hospitality-Packages.pdf")
    out_root = os.path.abspath("Sales-Cowboy-Hospitality-Packages.pdf")
    doc.save(out_public)
    doc.save(out_root)
    doc.close()
    print(f"PDF generated successfully at:\n  - {out_public}\n  - {out_root}")

if __name__ == "__main__":
    build_pdf()
