import os
import fitz  # PyMuPDF

def draw_rounded_rect(shape, rect, radius, fill=None, color=None, width=1):
    shape.draw_rect(rect, radius=radius)
    shape.finish(fill=fill, color=color, width=width)

def build_pdf():
    doc = fitz.open()
    
    # Colors (RGB 0..1)
    BLACK = (9/255, 13/255, 22/255)
    SLATE_900 = (15/255, 23/255, 42/255)
    SLATE_800 = (30/255, 41/255, 59/255)
    SLATE_700 = (51/255, 65/255, 85/255)
    SLATE_500 = (100/255, 116/255, 139/255)
    SLATE_300 = (203/255, 213/255, 225/255)
    SLATE_200 = (226/255, 232/255, 240/255)
    SLATE_100 = (241/255, 245/255, 249/255)
    SLATE_50  = (248/255, 250/255, 252/255)
    WHITE = (1, 1, 1)

    W, H = 595, 842
    M = 32

    # =========================================================================
    # PAGE 1: LETTERHEAD, HERO, 3 LEAKS & STEP 1 (ONE-TIME INFRASTRUCTURE)
    # =========================================================================
    p1 = doc.new_page(width=W, height=H)
    s1 = p1.new_shape()

    # Top Right Badge Shape
    badge_rect = fitz.Rect(W - M - 135, 26, W - M, 66)
    draw_rounded_rect(s1, badge_rect, 0.08, fill=SLATE_50, color=SLATE_200, width=1)

    # Divider Line
    s1.draw_line((M, 75), (W - M, 75))
    s1.finish(color=BLACK, width=2)

    # Dark Hero Box Shape
    hero_rect = fitz.Rect(M, 86, W - M, 196)
    draw_rounded_rect(s1, hero_rect, 0.04, fill=BLACK, color=BLACK, width=1)
    s1.draw_line((M + 18, 170), (W - M - 18, 170))
    s1.finish(color=SLATE_800, width=0.8)

    # 3 Leaks Shapes
    y_leak = 208
    col_w3 = (W - 2 * M - 16) / 3
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_leak, x0 + col_w3, y_leak + 74)
        draw_rounded_rect(s1, r, 0.05, fill=SLATE_50, color=SLATE_200, width=1)

    # Section 1 Header Line
    y_s1 = 298
    s1.draw_line((M, y_s1 + 20), (W - M, y_s1 + 20))
    s1.finish(color=BLACK, width=1.5)

    # 3 Main Package Card Shapes
    y_pkg = y_s1 + 30
    pkg_h = 335
    pkgs = [
        {
            "badge": "STARTER INFRASTRUCTURE",
            "name": "1. Direct Booking Foundation",
            "price": "N200,000",
            "sub": "ONE-TIME SETUP",
            "best": "Best For: Single Shortlets, Guest Houses & Boutique Hotels",
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
            "best": "Best For: Busy 10-30 Room Hotels & Multi-Unit Airbnb Hosts",
            "featured": True,
            "bullets": [
                "Complete Direct Booking Website + Instant Payment Checkout",
                "24/7 WhatsApp AI Booking Agent: Replies in 3 seconds flat",
                "Checks live dates, answers FAQs & sends instant payment links",
                "Real-time calendar sync (Zero double-bookings across channels)",
                "Shortlet Mode: Auto Caution-Fee, ID collection & Wi-Fi/gate code"
            ],
            "footer": "INCLUDES: Full ownership license + 1 Year Cloud Hosting & SSL."
        },
        {
            "badge": "ENTERPRISE FULL STACK",
            "name": "3. Autonomous Hospitality OS",
            "price": "N800,000",
            "sub": "ONE-TIME LICENSE - NO SUBSCRIPTION",
            "best": "Best For: Established Hotels (20-100+ Rooms) & Portfolios",
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
        r = fitz.Rect(x0, y_pkg, x0 + col_w3, y_pkg + pkg_h)
        draw_rounded_rect(
            s1, r, 0.03,
            fill=(SLATE_50 if p["featured"] else WHITE),
            color=(BLACK if p["featured"] else SLATE_300),
            width=(2.2 if p["featured"] else 1)
        )
        b_rect = fitz.Rect(x0 + 10, y_pkg + 10, x0 + col_w3 - 10, y_pkg + 25)
        draw_rounded_rect(s1, b_rect, 0.1, fill=(BLACK if p["featured"] else SLATE_200), color=None, width=0)
        s1.draw_line((x0 + 10, y_pkg + 114), (x0 + col_w3 - 10, y_pkg + 114))
        s1.finish(color=SLATE_200, width=0.8)
        f_rect = fitz.Rect(x0 + 10, y_pkg + pkg_h - 52, x0 + col_w3 - 10, y_pkg + pkg_h - 10)
        draw_rounded_rect(s1, f_rect, 0.06, fill=SLATE_100, color=SLATE_300, width=0.8)

    # Standalone Row Shapes
    y_st = y_pkg + pkg_h + 14
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_st, x0 + col_w3, y_st + 72)
        draw_rounded_rect(s1, r, 0.05, fill=SLATE_50, color=SLATE_200, width=1)

    # Commit all background shapes FIRST so text renders cleanly on top!
    s1.commit()

    # Now insert all Page 1 text
    p1.insert_text((M, 40), "SALES COWBOY", fontname="hebo", fontsize=18, color=BLACK)
    p1.insert_text((M, 53), "HOSPITALITY TECHNOLOGY & OCCUPANCY GROWTH DIVISION", fontname="hebo", fontsize=7.5, color=SLATE_700)
    p1.insert_text((M, 64), "36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria  |  WhatsApp: +234 808 269 7841", fontname="helv", fontsize=7.5, color=SLATE_500)

    p1.insert_text((W - M - 125, 41), "OFFICIAL RATE CARD", fontname="cour", fontsize=7, color=SLATE_500)
    p1.insert_text((W - M - 125, 55), "HOTELS & SHORTLETS", fontname="hebo", fontsize=9.5, color=BLACK)

    p1.insert_text((M + 18, 105), "FOR HOTELS, SERVICED APARTMENTS & MULTI-UNIT AIRBNB HOSTS", fontname="cour", fontsize=7.5, color=SLATE_300)
    p1.insert_text((M + 18, 125), "Direct Booking, AI Automation & Occupancy Growth Systems.", fontname="hebo", fontsize=15.5, color=WHITE)
    p1.insert_textbox(
        fitz.Rect(M + 18, 133, W - M - 18, 167),
        "Stop losing guests to slow WhatsApp replies, empty mid-week rooms, and front-desk cash leaks. Choose your one-time software infrastructure or monthly occupancy growth engine below.",
        fontname="helv", fontsize=8.8, color=SLATE_200
    )
    p1.insert_text((M + 18, 185), "[+] One-Time Software Ownership    [+] Paystack / Flutterwave Direct (0% Fee)    [+] 7-14 Day Turnaround", fontname="cour", fontsize=7.6, color=WHITE)

    leaks = [
        ("LEAK 01", "The 9:00 PM WhatsApp Ghost", "A guest messages at 9:30 PM to book for the weekend. Staff replies hours later after the guest paid a rival hotel."),
        ("LEAK 02", "Invisible on Google Maps", "Corporate & diaspora travelers search Google Maps for hotels or shortlets. Outside the Top 3, you are invisible."),
        ("LEAK 03", "Manual Front-Desk Leaks", "Paper notebooks, Excel sheets, and fake transfer alerts cause double-bookings and staff pocketing room cash.")
    ]
    for i, (kicker, title, desc) in enumerate(leaks):
        x0 = M + i * (col_w3 + 8)
        p1.insert_text((x0 + 10, y_leak + 14), kicker, fontname="cour", fontsize=7, color=SLATE_500)
        p1.insert_text((x0 + 10, y_leak + 27), title, fontname="hebo", fontsize=9.2, color=BLACK)
        p1.insert_textbox(fitz.Rect(x0 + 10, y_leak + 32, x0 + col_w3 - 8, y_leak + 70), desc, fontname="helv", fontsize=7.6, color=SLATE_700)

    p1.insert_text((M, y_s1), "STEP 1: ONE-TIME INFRASTRUCTURE SETUPS (OWN YOUR SYSTEM OUTRIGHT)", fontname="cour", fontsize=7.5, color=SLATE_500)
    p1.insert_text((M, y_s1 + 14), "Website, 24/7 WhatsApp AI & Hotel Management Software", fontname="hebo", fontsize=13, color=BLACK)
    p1.insert_text((W - M - 165, y_s1 + 14), "Zero Monthly Software Subscription", fontname="cour", fontsize=7.5, color=SLATE_700)

    for i, p in enumerate(pkgs):
        x0 = M + i * (col_w3 + 8)
        p1.insert_text((x0 + 15, y_pkg + 20), p["badge"], fontname="cour", fontsize=6.5, color=(WHITE if p["featured"] else BLACK))
        p1.insert_text((x0 + 10, y_pkg + 42), p["name"], fontname="hebo", fontsize=9.8, color=BLACK)
        p1.insert_text((x0 + 10, y_pkg + 66), p["price"], fontname="cour", fontsize=18, color=BLACK)
        p1.insert_text((x0 + 10, y_pkg + 78), p["sub"], fontname="cour", fontsize=6.5, color=SLATE_500)
        p1.insert_textbox(fitz.Rect(x0 + 10, y_pkg + 84, x0 + col_w3 - 10, y_pkg + 112), p["best"], fontname="hebo", fontsize=7.5, color=SLATE_700)

        by = y_pkg + 122
        for b in p["bullets"]:
            p1.insert_text((x0 + 10, by + 8), "+", fontname="hebo", fontsize=8.5, color=BLACK)
            p1.insert_textbox(fitz.Rect(x0 + 20, by, x0 + col_w3 - 8, by + 34), b, fontname="helv", fontsize=7.6, color=SLATE_800)
            by += 32

        p1.insert_textbox(fitz.Rect(x0 + 15, y_pkg + pkg_h - 48, x0 + col_w3 - 14, y_pkg + pkg_h - 12), p["footer"], fontname="hebo", fontsize=7, color=BLACK)

    standalones = [
        ("Shortlet Portfolio Engine", "N350,000 (One-Time)", "For 3-15+ units: Multi-apartment booking site + WhatsApp Caution-Fee & ID Bot + Smart Check-In Guide."),
        ("Standalone HMS / PMS App", "N500,000 (One-Time)", "Already have a website? Custom Front-Desk OS, Room Inventory & Owner Revenue Dashboard integrated into your site."),
        ("Basic 3-Page Corporate Site", "N85,000 (One-Time)", "Clean, fast 3-page informational hotel or apartment showcase website with direct WhatsApp enquiry routing.")
    ]
    for i, (st_name, st_price, st_desc) in enumerate(standalones):
        x0 = M + i * (col_w3 + 8)
        p1.insert_text((x0 + 10, y_st + 16), st_name, fontname="hebo", fontsize=8.8, color=BLACK)
        p1.insert_text((x0 + 10, y_st + 29), st_price, fontname="cour", fontsize=8.5, color=BLACK)
        p1.insert_textbox(fitz.Rect(x0 + 10, y_st + 34, x0 + col_w3 - 8, y_st + 69), st_desc, fontname="helv", fontsize=7.3, color=SLATE_700)

    p1.insert_text((M, H - 18), "SALES COWBOY HOSPITALITY RATE CARD  |  PAGE 1 OF 2", fontname="cour", fontsize=7.5, color=SLATE_500)
    p1.insert_text((W - M - 175, H - 18), "WEB: salescowboy.com.ng/hospitality", fontname="cour", fontsize=7.5, color=BLACK)

    # =========================================================================
    # PAGE 2: MONTHLY GROWTH RETAINERS, BUNDLES, POWER-UPS & CLIENT PORTAL
    # =========================================================================
    p2 = doc.new_page(width=W, height=H)
    s2 = p2.new_shape()

    s2.draw_line((M, 60), (W - M, 60))
    s2.finish(color=BLACK, width=1.5)

    y_ret = 72
    ret_h = 240
    col_w4 = (W - 2 * M - 21) / 4
    retainers = [
        {
            "tier": "TIER 01",
            "name": "Website & System Care",
            "price": "N50,000",
            "best": False,
            "desc": "Keep your booking site, AI bot & HMS fast, secure, and updated.",
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
            "desc": "Own the Top 3 spots when guests search Google Maps in your city.",
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
            "desc": "Look like the most prestigious property in town on IG, FB & TikTok.",
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
            "name": "Viral UGC + Social Suite",
            "price": "N270,000",
            "best": True,
            "desc": "Creator-led video walkthroughs that turn scrollers into paying guests.",
            "bullets": [
                "Everything in Social Engine (N150k)",
                "4 Custom Creator UGC Videos / Mo",
                "Showcases rooms, pool, bar & vibe",
                "Built for viral organic reach",
                "Ready-to-run Paid Ad video creatives"
            ]
        }
    ]

    for i, rt in enumerate(retainers):
        x0 = M + i * (col_w4 + 7)
        r = fitz.Rect(x0, y_ret, x0 + col_w4, y_ret + ret_h)
        draw_rounded_rect(
            s2, r, 0.04,
            fill=(SLATE_50 if rt["best"] else WHITE),
            color=(BLACK if rt["best"] else SLATE_300),
            width=(2 if rt["best"] else 1)
        )
        s2.draw_line((x0 + 8, y_ret + 92), (x0 + col_w4 - 8, y_ret + 92))
        s2.finish(color=SLATE_200, width=0.8)

    # High-Ticket Monthly Bundles Dark Banner Shape
    y_bun = y_ret + ret_h + 14
    bun_rect = fitz.Rect(M, y_bun, W - M, y_bun + 96)
    draw_rounded_rect(s2, bun_rect, 0.04, fill=BLACK, color=BLACK, width=1)
    mid_x = W / 2
    s2.draw_line((mid_x, y_bun + 14), (mid_x, y_bun + 82))
    s2.finish(color=SLATE_800, width=1)

    # Step 3 Header Line & Shapes
    y_add = y_bun + 114
    s2.draw_line((M, y_add + 20), (W - M, y_add + 20))
    s2.finish(color=BLACK, width=1.5)

    y_ac = y_add + 30
    for i in range(3):
        x0 = M + i * (col_w3 + 8)
        r = fitz.Rect(x0, y_ac, x0 + col_w3, y_ac + 92)
        draw_rounded_rect(s2, r, 0.05, fill=SLATE_50, color=SLATE_200, width=1)

    # Client Portal Shape
    y_port = y_ac + 108
    port_rect = fitz.Rect(M, y_port, W - M, y_port + 95)
    draw_rounded_rect(s2, port_rect, 0.04, fill=WHITE, color=BLACK, width=2)
    s2.draw_line((M + 14, y_port + 25), (W - M - 14, y_port + 25))
    s2.finish(color=SLATE_200, width=1)

    # Bottom CTA Shape
    y_cta = y_port + 110
    cta_rect = fitz.Rect(M, y_cta, W - M, y_cta + 66)
    draw_rounded_rect(s2, cta_rect, 0.05, fill=SLATE_900, color=BLACK, width=1)

    # Commit Page 2 shapes FIRST!
    s2.commit()

    # Now insert Page 2 text on top
    p2.insert_text((M, 38), "STEP 2: MONTHLY OCCUPANCY & GROWTH RETAINERS", fontname="cour", fontsize=7.5, color=SLATE_500)
    p2.insert_text((M, 53), "Fill Your Rooms & Apartments Every Weekend", fontname="hebo", fontsize=14, color=BLACK)
    p2.insert_text((W - M - 185, 53), "Traffic, Viral Video & Technical Care", fontname="cour", fontsize=7.5, color=SLATE_700)

    for i, rt in enumerate(retainers):
        x0 = M + i * (col_w4 + 7)
        p2.insert_text((x0 + 8, y_ret + 15), rt["tier"], fontname="cour", fontsize=6.5, color=(BLACK if rt["best"] else SLATE_500))
        p2.insert_text((x0 + 8, y_ret + 29), rt["name"], fontname="hebo", fontsize=8.5, color=BLACK)
        p2.insert_text((x0 + 8, y_ret + 49), rt["price"], fontname="cour", fontsize=14, color=BLACK)
        p2.insert_text((x0 + 78, y_ret + 49), "/ mo", fontname="helv", fontsize=7.5, color=SLATE_500)
        p2.insert_textbox(fitz.Rect(x0 + 8, y_ret + 56, x0 + col_w4 - 6, y_ret + 90), rt["desc"], fontname="helv", fontsize=7.2, color=SLATE_700)

        by = y_ret + 100
        for b in rt["bullets"]:
            p2.insert_text((x0 + 8, by + 7), "+", fontname="hebo", fontsize=7.5, color=BLACK)
            p2.insert_textbox(fitz.Rect(x0 + 16, by, x0 + col_w4 - 5, by + 26), b, fontname="helv", fontsize=7.2, color=SLATE_800)
            by += 26

    # Left Bundle Text
    p2.insert_text((M + 16, y_bun + 18), "ALL-IN-ONE MONTHLY DEPARTMENT (SAVE N40,000/MO)", fontname="cour", fontsize=7, color=SLATE_300)
    p2.insert_text((M + 16, y_bun + 34), "The 'Full Occupancy' Retainer Bundle", fontname="hebo", fontsize=11, color=WHITE)
    p2.insert_text((M + 16, y_bun + 54), "N380,000 / month", fontname="cour", fontsize=14, color=WHITE)
    p2.insert_textbox(
        fitz.Rect(M + 16, y_bun + 60, mid_x - 12, y_bun + 92),
        "Combines Viral UGC & Social Suite (N270k) + Google Maps Dominance (N100k) + Website & System Care (N50k).",
        fontname="helv", fontsize=7.6, color=SLATE_200
    )

    # Right Bundle Text
    p2.insert_text((mid_x + 16, y_bun + 18), "IMMEDIATE FRIDAY & WEEKEND BOOKINGS", fontname="cour", fontsize=7, color=SLATE_300)
    p2.insert_text((mid_x + 16, y_bun + 34), "Weekend Occupancy & Paid Ads Engine", fontname="hebo", fontsize=11, color=WHITE)
    p2.insert_text((mid_x + 16, y_bun + 54), "N200,000 / month (+ Ad Spend)", fontname="cour", fontsize=13, color=WHITE)
    p2.insert_textbox(
        fitz.Rect(mid_x + 16, y_bun + 60, W - M - 12, y_bun + 92),
        "Meta Ads (IG/WhatsApp direct-to-booking) + Google Search Ads ('Shortlet/Hotel in City') + Retargeting + Weekly ROAS report.",
        fontname="helv", fontsize=7.6, color=SLATE_200
    )

    # Step 3 Text
    p2.insert_text((M, y_add), "STEP 3: OPTIONAL PROPERTY POWER-UPS (ADD TO ANY PACKAGE)", fontname="cour", fontsize=7.5, color=SLATE_500)
    p2.insert_text((M, y_add + 14), "High-Impact One-Off Revenue & Operations Add-Ons", fontname="hebo", fontsize=13, color=BLACK)

    addons = [
        ("+ N75,000 ONE-TIME", "5-Star Review & Rebate Bot", "2 hours after checkout in your HMS, our WhatsApp bot thanks the guest, requests a 5-star Google review, and issues a 10% repeat-stay code."),
        ("+ N150,000 ONE-TIME", "Bar & Room QR Menu + POS", "Guests scan a bedside, poolside, or bar QR code to order food & drinks on their phone. Orders print at the bar and log into the HMS ledger."),
        ("+ N120,000 ONE-OFF", "On-Site Content Shoot Day", "We send a cameraman/creator to your hotel or shortlets to shoot 30+ raw vertical clips and crisp room photos for the quarter.")
    ]
    for i, (ap, at, ad) in enumerate(addons):
        x0 = M + i * (col_w3 + 8)
        p2.insert_text((x0 + 10, y_ac + 16), ap, fontname="cour", fontsize=8, color=BLACK)
        p2.insert_text((x0 + 10, y_ac + 31), at, fontname="hebo", fontsize=8.8, color=BLACK)
        p2.insert_textbox(fitz.Rect(x0 + 10, y_ac + 37, x0 + col_w3 - 8, y_ac + 88), ad, fontname="helv", fontsize=7.5, color=SLATE_700)

    # Client Portal Text
    p2.insert_text((M + 14, y_port + 18), "ZERO MICROMANAGEMENT: DEDICATED SALES COWBOY CLIENT PORTAL INCLUDED", fontname="hebo", fontsize=9.5, color=BLACK)
    port_items = [
        ("1. 10-Min Guided Setup Manual", "Upload your room prices, photos, and logos in one organized portal with zero messy WhatsApp group chats."),
        ("2. Live Build Progress Tracker", "Watch your website, WhatsApp AI bot, and HMS deployment progress step-by-step in real time."),
        ("3. 1-Click Rate & Reel Approval", "Need to update December room rates or approve next week's Reels? Log in, click submit, and consider it done.")
    ]
    for i, (pt, pd) in enumerate(port_items):
        x0 = M + 14 + i * ((W - 2 * M - 28) / 3)
        p2.insert_text((x0, y_port + 40), pt, fontname="hebo", fontsize=8.2, color=BLACK)
        p2.insert_textbox(fitz.Rect(x0, y_port + 45, x0 + 165, y_port + 88), pd, fontname="helv", fontsize=7.4, color=SLATE_700)

    # Bottom CTA Text
    p2.insert_text((M + 16, y_cta + 22), "READY TO LOCK IN YOUR BUILD SLOT OR TEST OUR LIVE AI BOT DEMO?", fontname="hebo", fontsize=10.5, color=WHITE)
    p2.insert_text((M + 16, y_cta + 38), "1. Web: salescowboy.com.ng/hospitality   |   2. WhatsApp: +234 808 269 7841   |   3. Email: hello@salescowboy.com.ng", fontname="cour", fontsize=7.4, color=SLATE_200)
    p2.insert_text((M + 16, y_cta + 53), "Office: 36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria", fontname="helv", fontsize=7.5, color=SLATE_300)

    p2.insert_text((M, H - 18), "SALES COWBOY HOSPITALITY RATE CARD  |  PAGE 2 OF 2", fontname="cour", fontsize=7.5, color=SLATE_500)
    p2.insert_text((W - M - 175, H - 18), "WEB: salescowboy.com.ng/hospitality", fontname="cour", fontsize=7.5, color=BLACK)

    out_public = os.path.abspath("public/Sales-Cowboy-Hospitality-Packages.pdf")
    out_root = os.path.abspath("Sales-Cowboy-Hospitality-Packages.pdf")
    doc.save(out_public)
    doc.save(out_root)
    doc.close()
    print(f"PDF generated successfully at:\n  - {out_public}\n  - {out_root}")

if __name__ == "__main__":
    build_pdf()
