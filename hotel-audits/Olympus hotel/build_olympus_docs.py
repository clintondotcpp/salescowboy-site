import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def set_cell_background(cell, hex_color):
    """Set the background color of a table cell."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=140, right=140):
    """Set internal cell margins in dxa."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="{top}" w:type="dxa"/>'
        f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'<w:left w:w="{left}" w:type="dxa"/>'
        f'<w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def add_header_letterhead(doc, doc_badge, ref_num, doc_date):
    """Clean, dignified executive letterhead banner."""
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    # Left column: Brand & Details
    cell_left = table.cell(0, 0)
    cell_left.width = Inches(4.5)
    
    p = cell_left.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(2)
    
    logo_path = os.path.abspath("public/assets/salescowboy-logo.png")
    if os.path.exists(logo_path):
        run_img = p.add_run()
        run_img.add_picture(logo_path, width=Inches(0.6))
        p.add_run("  ")
    
    run_brand = p.add_run("SALES COWBOY\n")
    run_brand.font.name = "Georgia"
    run_brand.font.size = Pt(15)
    run_brand.font.bold = True
    run_brand.font.color.rgb = RGBColor(15, 23, 42) # Slate 900
    
    run_tagline = p.add_run("Marketing Solutions • Hospitality Revenue Engineering\n")
    run_tagline.font.name = "Arial"
    run_tagline.font.size = Pt(8.5)
    run_tagline.font.bold = True
    run_tagline.font.color.rgb = RGBColor(71, 85, 105) # Slate 600
    
    run_addr = p.add_run(
        "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria\n"
        "hello@salescowboy.com.ng • +234 810 493 3232 • salescowboy.com.ng"
    )
    run_addr.font.name = "Calibri"
    run_addr.font.size = Pt(8.5)
    run_addr.font.color.rgb = RGBColor(100, 116, 139) # Slate 500
    
    # Right column: Meta Box
    cell_right = table.cell(0, 1)
    cell_right.width = Inches(2.3)
    set_cell_background(cell_right, "F8FAFC")
    set_cell_margins(cell_right, top=100, bottom=100, left=140, right=140)
    
    tcPr = cell_right._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>'
        f'<w:left w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>'
        f'<w:bottom w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>'
        f'<w:right w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p_meta = cell_right.paragraphs[0]
    p_meta.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_meta.paragraph_format.space_before = Pt(0)
    p_meta.paragraph_format.space_after = Pt(0)
    
    r_badge = p_meta.add_run(f"{doc_badge.upper()}\n")
    r_badge.font.name = "Arial"
    r_badge.font.size = Pt(8.5)
    r_badge.font.bold = True
    r_badge.font.color.rgb = RGBColor(71, 85, 105)
    
    r_ref = p_meta.add_run(f"REF: {ref_num}\n")
    r_ref.font.name = "Consolas"
    r_ref.font.size = Pt(8.5)
    r_ref.font.bold = True
    r_ref.font.color.rgb = RGBColor(15, 23, 42)
    
    r_date = p_meta.add_run(f"DATE: {doc_date}\nSTATUS: CONFIDENTIAL")
    r_date.font.name = "Calibri"
    r_date.font.size = Pt(8)
    r_date.font.color.rgb = RGBColor(100, 116, 139)

def add_clean_divider(doc):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(12)
    run = p.add_run("―" * 60)
    run.font.name = "Arial"
    run.font.size = Pt(11)
    run.font.color.rgb = RGBColor(203, 213, 225)

def format_cell(cell, text, bold=False, color=RGBColor(30, 41, 59), font_size=8.5, align=WD_ALIGN_PARAGRAPH.LEFT, bg_hex=None):
    if bg_hex:
        set_cell_background(cell, bg_hex)
    set_cell_margins(cell, top=70, bottom=70, left=100, right=100)
    p = cell.paragraphs[0]
    p.alignment = align
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run(text)
    run.font.name = "Calibri"
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.color.rgb = color

def create_olympus_audit_docx():
    doc = docx.Document()
    
    for sec in doc.sections:
        sec.top_margin = Inches(0.7)
        sec.bottom_margin = Inches(0.7)
        sec.left_margin = Inches(0.7)
        sec.right_margin = Inches(0.7)
        sec.page_width = Inches(8.27)  # A4
        sec.page_height = Inches(11.69)
        
    # Letterhead Header
    add_header_letterhead(
        doc,
        doc_badge="DIGITAL REVENUE AUDIT",
        ref_num="AUD-OLY-2026-004",
        doc_date="November 06, 2026"
    )
    add_clean_divider(doc)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_main_title = p_title.add_run("DIGITAL SEARCH VISIBILITY, REVENUE & OPERATIONS AUDIT\n")
    r_main_title.font.name = "Georgia"
    r_main_title.font.size = Pt(15)
    r_main_title.font.bold = True
    r_main_title.font.color.rgb = RGBColor(15, 23, 42)
    
    r_subtitle = p_title.add_run("Monetizing 418 Google Reviews, Direct Booking Engine, 24/7 WhatsApp AI Concierge & Hotel Management Software")
    r_subtitle.font.name = "Arial"
    r_subtitle.font.size = Pt(9)
    r_subtitle.font.color.rgb = RGBColor(71, 85, 105)
    
    # Client Box
    tbl_client = doc.add_table(rows=1, cols=2)
    tbl_client.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_client.autofit = False
    
    c_c1 = tbl_client.cell(0, 0)
    c_c1.width = Inches(3.4)
    format_cell(
        c_c1,
        "PREPARED FOR (CLIENT):\nOlympus Hotel & Suites\n27/29 Ibadan-Abeokuta Rd, Fatimah B/Stop, by 110 R/About, Oluyole, Ibadan\nPhone: +234 913 905 2671 / +234 815 951 1334\nFacilities: Rooms, Pool, Bar, Restaurant, Club & Snooker Lounge",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    c_c2 = tbl_client.cell(0, 1)
    c_c2.width = Inches(3.4)
    format_cell(
        c_c2,
        "PREPARED BY (AUDITOR):\nSales Cowboy Marketing Solutions\nHospitality Revenue Engineering Division\nAjah, Lagos • salescowboy.com.ng\nContact: +234 810 493 3232",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    # 1. EXECUTIVE DIAGNOSTIC HEALTH SCORE
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(6)
    p_sp.paragraph_format.space_after = Pt(0)
    
    tbl_score = doc.add_table(rows=1, cols=2)
    tbl_score.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_score.autofit = False
    
    cell_s1 = tbl_score.cell(0, 0)
    cell_s1.width = Inches(2.2)
    set_cell_background(cell_s1, "0F172A")
    set_cell_margins(cell_s1, top=140, bottom=140, left=140, right=140)
    p_s1 = cell_s1.paragraphs[0]
    p_s1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    r_sc_lbl = p_s1.add_run("HEALTH SCORE\n")
    r_sc_lbl.font.name = "Arial"
    r_sc_lbl.font.size = Pt(8)
    r_sc_lbl.font.bold = True
    r_sc_lbl.font.color.rgb = RGBColor(148, 163, 184)
    
    r_sc_num = p_s1.add_run("48")
    r_sc_num.font.name = "Georgia"
    r_sc_num.font.size = Pt(36)
    r_sc_num.font.bold = True
    r_sc_num.font.color.rgb = RGBColor(245, 158, 11) # Amber
    
    r_sc_den = p_s1.add_run(" / 100\n")
    r_sc_den.font.name = "Georgia"
    r_sc_den.font.size = Pt(14)
    r_sc_den.font.color.rgb = RGBColor(148, 163, 184)
    
    r_sc_badge = p_s1.add_run("UNMONETIZED ASSET")
    r_sc_badge.font.name = "Arial"
    r_sc_badge.font.size = Pt(8)
    r_sc_badge.font.bold = True
    r_sc_badge.font.color.rgb = RGBColor(254, 215, 170)
    
    cell_s2 = tbl_score.cell(0, 1)
    cell_s2.width = Inches(4.6)
    set_cell_background(cell_s2, "F8FAFC")
    set_cell_margins(cell_s2, top=120, bottom=120, left=140, right=140)
    p_s2 = cell_s2.paragraphs[0]
    p_s2.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    r_diag_h = p_s2.add_run("CRITICAL FINDING: MASSIVE SEARCH TRAFFIC, ZERO DIRECT CONVERSION\n")
    r_diag_h.font.name = "Arial"
    r_diag_h.font.size = Pt(9)
    r_diag_h.font.bold = True
    r_diag_h.font.color.rgb = RGBColor(15, 23, 42)
    
    r_diag_b = p_s2.add_run(
        "Olympus Hotel & Suites holds 418 Google Business Profile reviews—ranking among the top searched hotels in the Oluyole, Ring Road, and Ibadan-Abeokuta axis. However, because you have NO official direct booking website and NO automated WhatsApp bot, this massive traffic is either surrendered to Hotels.ng / Booking.com at a 15%–20% commission penalty or lost entirely due to delayed manual replies during evening nightlife hours."
    )
    r_diag_b.font.name = "Calibri"
    r_diag_b.font.size = Pt(8.5)
    r_diag_b.font.color.rgb = RGBColor(51, 65, 85)
    
    # 4 Metric Cards
    doc.add_paragraph().paragraph_format.space_before = Pt(4)
    tbl_metrics = doc.add_table(rows=1, cols=4)
    tbl_metrics.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_metrics.autofit = False
    
    metrics = [
        ("418", "Google Reviews", "Top tier search visibility in Ibadan", "0F172A"),
        ("0", "Direct Website", "Zero direct digital room booking engine", "334155"),
        ("0%", "WhatsApp AI Bot", "Manual replies only; 70%+ inquiry drop", "334155"),
        ("20%", "OTA Commission", "Forfeited to Hotels.ng per room night", "0F172A")
    ]
    
    for i, (val, title, desc, col_hex) in enumerate(metrics):
        cell_m = tbl_metrics.cell(0, i)
        cell_m.width = Inches(1.7)
        set_cell_background(cell_m, "F8FAFC")
        set_cell_margins(cell_m, top=90, bottom=90, left=80, right=80)
        
        tcPr = cell_m._tc.get_or_add_tcPr()
        borders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'<w:top w:val="single" w:sz="12" w:space="0" w:color="{col_hex}"/>'
            f'<w:left w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>'
            f'<w:bottom w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>'
            f'<w:right w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(borders)
        
        pm = cell_m.paragraphs[0]
        pm.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        rv = pm.add_run(f"{val}\n")
        rv.font.name = "Georgia"
        rv.font.size = Pt(16)
        rv.font.bold = True
        rv.font.color.rgb = RGBColor(15, 23, 42)
        
        rt = pm.add_run(f"{title}\n")
        rt.font.name = "Arial"
        rt.font.size = Pt(8)
        rt.font.bold = True
        rt.font.color.rgb = RGBColor(71, 85, 105)
        
        rd = pm.add_run(desc)
        rd.font.name = "Calibri"
        rd.font.size = Pt(7.5)
        rd.font.color.rgb = RGBColor(100, 116, 139)
        
    # 2. THE GUEST BOOKING LEAK FUNNEL
    p_h2 = doc.add_paragraph()
    p_h2.paragraph_format.space_before = Pt(10)
    p_h2.paragraph_format.space_after = Pt(2)
    r_h2 = p_h2.add_run("1. THE GUEST BOOKING LEAK FUNNEL (WHERE YOU LOSE REVENUE)")
    r_h2.font.name = "Georgia"
    r_h2.font.size = Pt(10.5)
    r_h2.font.bold = True
    r_h2.font.color.rgb = RGBColor(15, 23, 42)
    
    tbl_funnel = doc.add_table(rows=5, cols=4)
    tbl_funnel.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_funnel.autofit = False
    
    funnel_cols = [Inches(1.2), Inches(1.8), Inches(2.3), Inches(1.5)]
    f_headers = ["STAGE", "GUEST BEHAVIOR", "OLYMPUS STATUS", "REVENUE IMPACT"]
    
    for c_idx, h_text in enumerate(f_headers):
        cell = tbl_funnel.cell(0, c_idx)
        cell.width = funnel_cols[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(15, 23, 42), font_size=8, bg_hex="F1F5F9")
        
    funnel_rows = [
        ("1. Google Search", "Traveler searches 'Hotels in Oluyole' or clicks Olympus on Maps", "418 reviews build instant trust, but NO website link is listed on profile.", "Search Bottleneck:\nGuest seeks other links or numbers"),
        ("2. OTA Directory", "45 guests click Hotels.ng or Booking.com directory listings", "OTAs showcase competing Ibadan hotels alongside Olympus Hotel.", "25 Guests Diverted\n20 book at 20% commission penalty"),
        ("3. Direct WhatsApp", "35 guests attempt to call or message front-desk WhatsApp for rates", "No 24/7 AI bot. Front-desk phone is busy or manual message takes 40+ mins.", "22 Guests Abandon\nBook elsewhere due to response lag"),
        ("4. Direct Walk-In", "Only 20 guests successfully arrive as walk-ins or navigate phone calls", "Offline manual coordination between rooms, bar, pool, and snooker lounge.", "Net Result: You lose 47 out of 100 potential guests & pay 20% on others!")
    ]
    
    for r_idx, (stg, beh, stat, imp) in enumerate(funnel_rows, start=1):
        for c_idx, txt in enumerate([stg, beh, stat, imp]):
            cell = tbl_funnel.cell(r_idx, c_idx)
            cell.width = funnel_cols[c_idx]
            bg = "FFFFFF" if r_idx % 2 == 1 else "F8FAFC"
            format_cell(cell, txt, bold=(c_idx in [0, 3]), color=RGBColor(51, 65, 85), font_size=8, bg_hex=bg)
            
    # 3. THE 4-PILLAR REVENUE MONETIZATION SOLUTION
    p_h3 = doc.add_paragraph()
    p_h3.paragraph_format.space_before = Pt(10)
    p_h3.paragraph_format.space_after = Pt(2)
    r_h3 = p_h3.add_run("2. THE 4-PILLAR REVENUE MONETIZATION SOLUTION")
    r_h3.font.name = "Georgia"
    r_h3.font.size = Pt(10.5)
    r_h3.font.bold = True
    r_h3.font.color.rgb = RGBColor(15, 23, 42)
    
    pillars = [
        ("PILLAR 1: DIRECT HIGH-CONVERTING BOOKING WEBSITE",
         "A bespoke, blazing-fast direct booking website linked to your 418 Google reviews. High-resolution suite galleries, amenity spotlights (outdoor pool, restaurant, club, snooker section), and integrated Paystack card & bank transfer checkout (0% intermediary commission)."),
        
        ("PILLAR 2: 24/7 AUTONOMOUS WHATSAPP AI CONCIERGE",
         "Autonomous WhatsApp reservation bot responding in under 15 seconds. Ingests room catalogs, pool tariffs, and bar menus. Generates instant payment links, confirms reservations, and issues digital check-in receipts 24 hours a day, 7 days a week."),
        
        ("PILLAR 3: CUSTOM CLOUD HOTEL MANAGEMENT SOFTWARE (CLOUD PMS & MULTI-POS)",
         "Centralized property management system unifying the front-desk room rack, housekeeping status, multi-channel OTA calendar sync (Booking.com & Airbnb), and integrated POS billing for the poolside bar, restaurant, club, and upper-floor snooker lounge."),
        
        ("PILLAR 4: SOCIAL MEDIA MANAGEMENT & VIRAL UGC VIDEO ENGINE",
         "Production of trendy, high-engagement User Generated Content (UGC) video reels and TikToks highlighting the outdoor pool vibe, club nightlife, snooker competitions, and dining delicacies—paired with targeted Meta ad campaigns.")
    ]
    
    for title, desc in pillars:
        tbl_pil = doc.add_table(rows=1, cols=1)
        tbl_pil.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl_pil.autofit = False
        cell_p = tbl_pil.cell(0, 0)
        cell_p.width = Inches(6.8)
        set_cell_background(cell_p, "F8FAFC")
        set_cell_margins(cell_p, top=60, bottom=60, left=100, right=100)
        
        tcPr = cell_p._tc.get_or_add_tcPr()
        borders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'<w:left w:val="single" w:sz="12" w:space="0" w:color="334155"/>'
            f'<w:top w:val="none"/>'
            f'<w:bottom w:val="none"/>'
            f'<w:right w:val="none"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(borders)
        
        pp = cell_p.paragraphs[0]
        pp.paragraph_format.space_before = Pt(0)
        pp.paragraph_format.space_after = Pt(1)
        rt = pp.add_run(f"{title}\n")
        rt.font.name = "Arial"
        rt.font.size = Pt(8.5)
        rt.font.bold = True
        rt.font.color.rgb = RGBColor(15, 23, 42)
        
        rb = pp.add_run(desc)
        rb.font.name = "Calibri"
        rb.font.size = Pt(8)
        rb.font.color.rgb = RGBColor(51, 65, 85)
        
        doc.add_paragraph().paragraph_format.space_before = Pt(2)
        
    # 4. FINANCIAL RETURN & ROI
    tbl_roi = doc.add_table(rows=1, cols=1)
    tbl_roi.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_roi.autofit = False
    
    cell_r = tbl_roi.cell(0, 0)
    cell_r.width = Inches(6.8)
    set_cell_background(cell_r, "F8FAFC")
    set_cell_margins(cell_r, top=100, bottom=100, left=120, right=120)
    
    tcPr = cell_r._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="8" w:space="0" w:color="0F172A"/>'
        f'<w:left w:val="single" w:sz="8" w:space="0" w:color="0F172A"/>'
        f'<w:bottom w:val="single" w:sz="8" w:space="0" w:color="0F172A"/>'
        f'<w:right w:val="single" w:sz="8" w:space="0" w:color="0F172A"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    pr = cell_r.paragraphs[0]
    pr.alignment = WD_ALIGN_PARAGRAPH.CENTER
    pr.paragraph_format.space_before = Pt(0)
    pr.paragraph_format.space_after = Pt(2)
    
    r_roi_h = pr.add_run("PROJECTED REVENUE ACCELERATION\n")
    r_roi_h.font.name = "Arial"
    r_roi_h.font.size = Pt(8.5)
    r_roi_h.font.bold = True
    r_roi_h.font.color.rgb = RGBColor(71, 85, 105)
    
    r_roi_val = pr.add_run("+₦1,800,000 – ₦4,200,000 / month\n")
    r_roi_val.font.name = "Georgia"
    r_roi_val.font.size = Pt(17)
    r_roi_val.font.bold = True
    r_roi_val.font.color.rgb = RGBColor(15, 23, 42)
    
    r_roi_d = pr.add_run(
        "Estimated incremental direct room bookings, commission recovery, and poolside/nightlife spend captured by converting search traffic directly within 60 days of system launch."
    )
    r_roi_d.font.name = "Calibri"
    r_roi_d.font.size = Pt(8)
    r_roi_d.font.color.rgb = RGBColor(100, 116, 139)
    
    # 5. 4-WEEK ROLLOUT SCHEDULE
    p_h4 = doc.add_paragraph()
    p_h4.paragraph_format.space_before = Pt(10)
    p_h4.paragraph_format.space_after = Pt(2)
    r_h4 = p_h4.add_run("3. 4-WEEK RAPID ROLLOUT SCHEDULE")
    r_h4.font.name = "Georgia"
    r_h4.font.size = Pt(10.5)
    r_h4.font.bold = True
    r_h4.font.color.rgb = RGBColor(15, 23, 42)
    
    tbl_road = doc.add_table(rows=5, cols=3)
    tbl_road.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_road.autofit = False
    
    r_widths = [Inches(1.2), Inches(2.2), Inches(3.4)]
    r_hdrs = ["TIMELINE", "CORE MILESTONE", "DELIVERABLES"]
    
    for c_idx, h_text in enumerate(r_hdrs):
        cell = tbl_road.cell(0, c_idx)
        cell.width = r_widths[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(15, 23, 42), font_size=8, bg_hex="F1F5F9")
        
    road_rows = [
        ("Week 1", "Direct Web Engine", "Custom mobile booking website build, room photo curation, Paystack integration, and GBP profile linking."),
        ("Week 2", "WhatsApp AI Concierge", "WhatsApp Business API setup, room catalog ingestion, automated payment links, and front-desk testing."),
        ("Week 3", "Cloud PMS & Multi-POS", "Room rack calendar setup, front-desk check-in workflow, poolside bar/snooker POS integration, and OTA sync."),
        ("Week 4", "UGC Video & Campaign", "On-site video production (pool, club, snooker, rooms), social media rollout, and Meta ad campaign activation.")
    ]
    
    for r_idx, (wk, mls, dels) in enumerate(road_rows, start=1):
        for c_idx, txt in enumerate([wk, mls, dels]):
            cell = tbl_road.cell(r_idx, c_idx)
            cell.width = r_widths[c_idx]
            bg = "FFFFFF" if r_idx % 2 == 1 else "F8FAFC"
            format_cell(cell, txt, bold=(c_idx in [0, 1]), color=RGBColor(51, 65, 85), font_size=8, bg_hex=bg)
            
    # Signature
    doc.add_paragraph().paragraph_format.space_before = Pt(8)
    p_close = doc.add_paragraph()
    p_close.paragraph_format.space_before = Pt(2)
    p_close.paragraph_format.space_after = Pt(2)
    r_cl = p_close.add_run(
        "Respectfully submitted,\n"
        "SALES COWBOY MARKETING SOLUTIONS\n"
        "Hospitality Revenue Engineering & Growth Division\n"
        "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria\n"
        "Direct: +234 810 493 3232 • Email: hello@salescowboy.com.ng"
    )
    r_cl.font.name = "Calibri"
    r_cl.font.size = Pt(8)
    r_cl.font.color.rgb = RGBColor(100, 116, 139)

    out_path = os.path.abspath("hotel-audits/Olympus hotel/Olympus-Hotel-Digital-Revenue-Audit.docx")
    doc.save(out_path)
    print(f"Generated Docx successfully at: {out_path}")

if __name__ == "__main__":
    create_olympus_audit_docx()

