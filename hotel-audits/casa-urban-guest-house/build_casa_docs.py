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
    """Standardized Sales Cowboy executive letterhead banner."""
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
    run_brand.font.color.rgb = RGBColor(15, 23, 42)
    
    run_tagline = p.add_run("Marketing Solutions • Hospitality Revenue Engineering\n")
    run_tagline.font.name = "Arial"
    run_tagline.font.size = Pt(8.5)
    run_tagline.font.bold = True
    run_tagline.font.color.rgb = RGBColor(71, 85, 105)
    
    run_addr = p.add_run(
        "36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria\n"
        "hello@salescowboy.com.ng • +234 810 493 3232 • salescowboy.com.ng"
    )
    run_addr.font.name = "Calibri"
    run_addr.font.size = Pt(8.5)
    run_addr.font.color.rgb = RGBColor(100, 116, 139)
    
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

def create_casa_audit_docx():
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
        ref_num="AUD-CASA-2026-005",
        doc_date="November 06, 2026"
    )
    add_clean_divider(doc)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_main_title = p_title.add_run("DIGITAL SEARCH VISIBILITY, REVENUE & SOCIAL MANAGEMENT AUDIT\n")
    r_main_title.font.name = "Georgia"
    r_main_title.font.size = Pt(15)
    r_main_title.font.bold = True
    r_main_title.font.color.rgb = RGBColor(15, 23, 42)
    
    r_subtitle = p_title.add_run("Direct Booking Engine, Review Acceleration Flywheel, 24/7 WhatsApp AI Concierge & Viral Poolside Social Media")
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
        "PREPARED FOR (CLIENT):\nCasa Urban Guest House\n12 Alhaji Amu St, off Saka Jojo by Homat B/Stop, Odogunyan, Ikorodu, Lagos\nPhone: +234 802 876 2087 • Hours: Open 24 Hours Daily\nAmenities: Swimming Pool, Restaurant, Lounge, Kitchen, Snooker Lounge",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    c_c2 = tbl_client.cell(0, 1)
    c_c2.width = Inches(3.4)
    format_cell(
        c_c2,
        "PREPARED BY (AUDITOR):\nSales Cowboy Marketing Solutions\nHospitality Revenue Engineering Division\n36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria\nContact: +234 810 493 3232 • hello@salescowboy.com.ng",
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
    
    r_sc_num = p_s1.add_run("24")
    r_sc_num.font.name = "Georgia"
    r_sc_num.font.size = Pt(36)
    r_sc_num.font.bold = True
    r_sc_num.font.color.rgb = RGBColor(239, 68, 68) # Red
    
    r_sc_den = p_s1.add_run(" / 100\n")
    r_sc_den.font.name = "Georgia"
    r_sc_den.font.size = Pt(14)
    r_sc_den.font.color.rgb = RGBColor(148, 163, 184)
    
    r_sc_badge = p_s1.add_run("BLIND SPOT ASSET")
    r_sc_badge.font.name = "Arial"
    r_sc_badge.font.size = Pt(8)
    r_sc_badge.font.bold = True
    r_sc_badge.font.color.rgb = RGBColor(254, 202, 202)
    
    cell_s2 = tbl_score.cell(0, 1)
    cell_s2.width = Inches(4.6)
    set_cell_background(cell_s2, "F8FAFC")
    set_cell_margins(cell_s2, top=120, bottom=120, left=140, right=140)
    p_s2 = cell_s2.paragraphs[0]
    p_s2.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    r_diag_h = p_s2.add_run("CRITICAL FINDING: HIGH-VALUE RECREATIONAL ASSETS, ZERO DIGITAL VISIBILITY\n")
    r_diag_h.font.name = "Arial"
    r_diag_h.font.size = Pt(9)
    r_diag_h.font.bold = True
    r_diag_h.font.color.rgb = RGBColor(15, 23, 42)
    
    r_diag_b = p_s2.add_run(
        "Casa Urban Guest House operates an outdoor pool, lounge, restaurant, snooker area, and serviced apartments in the high-density Odogunyan industrial corridor. However, with NO website, only 12 Google reviews (3.8 stars), and a dormant social page with only 15 lifetime posts, your digital presence is virtually invisible. You are losing 90%+ of potential corporate contractors, weekend party-goers, and shortlet guests every week."
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
        ("0", "Direct Website", "Zero direct digital room booking", "0F172A"),
        ("12", "Google Reviews", "3.8/5 rating causes buyer doubt", "334155"),
        ("15", "Social Posts", "Dormant page looks inactive", "334155"),
        ("0%", "WhatsApp AI Bot", "Manual replies; 75%+ inquiry drop", "0F172A")
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
    f_headers = ["STAGE", "GUEST BEHAVIOR", "CASA URBAN STATUS", "REVENUE IMPACT"]
    
    for c_idx, h_text in enumerate(f_headers):
        cell = tbl_funnel.cell(0, c_idx)
        cell.width = funnel_cols[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(15, 23, 42), font_size=8, bg_hex="F1F5F9")
        
    funnel_rows = [
        ("1. Google Search", "Traveler searches 'Hotels in Odogunyan' or guest house near Lucky Fibres", "Only 12 reviews (3.8 stars) and NO website link appears.", "60 Guests Diverted:\nChoose rivals with websites & reviews"),
        ("2. Social Media", "Remaining 40 check Instagram/Facebook for pool photos & room rates", "Only 15 total posts; page looks dormant and abandoned.", "20 Guests Doubt Legitimacy:\nAssume facility is closed or poor"),
        ("3. Direct WhatsApp", "Remaining 20 call or message front desk for pool rates & room tariffs", "No 24/7 AI bot. Delayed manual reply or unanswered phone.", "12 Guests Abandon Inquiry:\nSlow response kills high-intent leads"),
        ("4. Walk-In Capture", "Only 8 out of 100 potential guests survive and successfully check in", "Manual cash/POS handling at the counter.", "Net Result: You lose 92 out of 100 potential revenue transactions weekly!")
    ]
    
    for r_idx, (stg, beh, stat, imp) in enumerate(funnel_rows, start=1):
        for c_idx, txt in enumerate([stg, beh, stat, imp]):
            cell = tbl_funnel.cell(r_idx, c_idx)
            cell.width = funnel_cols[c_idx]
            bg = "FFFFFF" if r_idx % 2 == 1 else "F8FAFC"
            format_cell(cell, txt, bold=(c_idx in [0, 3]), color=RGBColor(51, 65, 85), font_size=8, bg_hex=bg)
            
    # 3. THE 4-PILLAR TURNAROUND SOLUTION
    p_h3 = doc.add_paragraph()
    p_h3.paragraph_format.space_before = Pt(10)
    p_h3.paragraph_format.space_after = Pt(2)
    r_h3 = p_h3.add_run("2. THE 4-PILLAR REVENUE MONETIZATION SOLUTION")
    r_h3.font.name = "Georgia"
    r_h3.font.size = Pt(10.5)
    r_h3.font.bold = True
    r_h3.font.color.rgb = RGBColor(15, 23, 42)
    
    pillars = [
        ("PILLAR 1: DIRECT HIGH-CONVERTING BOOKING WEBSITE & SHORTLET SHOWCASE",
         "Mobile-first direct booking website showcasing Standard, Deluxe, Luxury, and Serviced Apartment rooms. Dedicated photo galleries for the swimming pool, restaurant, lounge, and snooker lounge. Integrated Paystack / Monnify card and bank transfer checkout (0% intermediary commission)."),
        
        ("PILLAR 2: 24/7 AUTONOMOUS WHATSAPP AI CONCIERGE BOT",
         "Sub-15 second automated booking assistant connected to your business WhatsApp. Automatically sends room photos, apartment tariffs, pool entry fees, and kitchen/bar menus. Dispatches instant payment links and issues digital vouchers 24/7."),
        
        ("PILLAR 3: GOOGLE 3-PACK LOCAL DOMINANCE & SMART REVIEW FLYWHEEL",
         "Complete Google Business Profile optimization for Odogunyan and Ikorodu keywords. Deployment of 2x custom acrylic NFC + dynamic QR review stands at the reception desk and pool bar, rapidly scaling verified 5-star Google ratings from 12 to 50+ in 60 days."),
        
        ("PILLAR 4: ACTIVE SOCIAL MEDIA MANAGEMENT & VIRAL POOLSIDE CONTENT ENGINE",
         "Reviving your social media handles with 4–5 weekly high-engagement video reels and TikToks highlighting weekend pool parties, cocktail lounge, snooker competitions, and chef specialties—backed by targeted Meta ad campaigns in Ikorodu, Ketu, and Sagamu.")
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
    
    r_roi_val = pr.add_run("+₦1,200,000 – ₦2,800,000 / month\n")
    r_roi_val.font.name = "Georgia"
    r_roi_val.font.size = Pt(17)
    r_roi_val.font.bold = True
    r_roi_val.font.color.rgb = RGBColor(15, 23, 42)
    
    r_roi_d = pr.add_run(
        "Estimated incremental direct room, shortlet apartment, pool entry, and bar/lounge revenue unlocked by capturing search traffic, automating WhatsApp inquiries, and launching active poolside social media campaigns within 60 days."
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
        ("Week 1", "Direct Web Engine", "Custom mobile booking website build, room & shortlet photo curation, Paystack integration, and GBP profile setup."),
        ("Week 2", "WhatsApp AI Concierge", "WhatsApp Business API setup, room catalog ingestion, pool & menu rate integration, and automated payment link testing."),
        ("Week 3", "Review QR Flywheel", "Installation of custom acrylic NFC + QR stands at reception and pool bar, staff review incentive setup, and Google 3-Pack push."),
        ("Week 4", "UGC Video & Social Blitz", "On-site video shoot (pool, lounge, snooker, rooms), social media relaunch, and hyper-targeted Meta ad campaign activation.")
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
        "36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria\n"
        "Direct: +234 810 493 3232 • Email: hello@salescowboy.com.ng"
    )
    r_cl.font.name = "Calibri"
    r_cl.font.size = Pt(8)
    r_cl.font.color.rgb = RGBColor(100, 116, 139)

    out_path = os.path.abspath("hotel-audits/casa-urban-guest-house/Casa-Urban-Digital-Revenue-Audit.docx")
    doc.save(out_path)
    print(f"Generated Docx successfully at: {out_path}")

if __name__ == "__main__":
    create_casa_audit_docx()

