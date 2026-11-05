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
    """Clean executive letterhead banner with no em dashes."""
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell_left = table.cell(0, 0)
    cell_left.width = Inches(4.5)
    
    p = cell_left.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(2)
    
    run_brand = p.add_run("SALES COWBOY\n")
    run_brand.font.name = "Arial"
    run_brand.font.size = Pt(16)
    run_brand.font.bold = True
    run_brand.font.color.rgb = RGBColor(9, 13, 22)
    
    run_tagline = p.add_run("Marketing Solutions • Hospitality Revenue Engineering\n")
    run_tagline.font.name = "Arial"
    run_tagline.font.size = Pt(9)
    run_tagline.font.bold = True
    run_tagline.font.color.rgb = RGBColor(51, 65, 85)
    
    run_addr = p.add_run(
        "36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria\n"
        "+234 810 493 3232 • salescowboy.com.ng • hello@salescowboy.com.ng"
    )
    run_addr.font.name = "Arial"
    run_addr.font.size = Pt(8.5)
    run_addr.font.color.rgb = RGBColor(100, 116, 139)
    
    cell_right = table.cell(0, 1)
    cell_right.width = Inches(2.3)
    set_cell_background(cell_right, "F8FAFC")
    set_cell_margins(cell_right, top=100, bottom=100, left=140, right=140)
    
    tcPr = cell_right._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:left w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
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
    r_badge.font.color.rgb = RGBColor(51, 65, 85)
    
    r_ref = p_meta.add_run(f"REF: {ref_num}\n")
    r_ref.font.name = "Consolas"
    r_ref.font.size = Pt(9)
    r_ref.font.bold = True
    r_ref.font.color.rgb = RGBColor(9, 13, 22)
    
    r_date = p_meta.add_run(f"DATE: {doc_date}\nSTATUS: CONFIDENTIAL")
    r_date.font.name = "Arial"
    r_date.font.size = Pt(8)
    r_date.font.color.rgb = RGBColor(100, 116, 139)

def format_cell(cell, text, bold=False, color=RGBColor(9, 13, 22), font_size=9, align=WD_ALIGN_PARAGRAPH.LEFT, bg_hex=None):
    if bg_hex:
        set_cell_background(cell, bg_hex)
    set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
    p = cell.paragraphs[0]
    p.alignment = align
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run(text)
    run.font.name = "Arial"
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
        sec.page_width = Inches(8.27)
        sec.page_height = Inches(11.69)
        
    # Letterhead Header
    add_header_letterhead(
        doc,
        doc_badge="DIGITAL REVENUE AUDIT",
        ref_num="AUD-CASA-2026-005",
        doc_date="November 06, 2026"
    )
    
    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_before = Pt(8)
    p_div.paragraph_format.space_after = Pt(8)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_main = p_title.add_run("DIGITAL SEARCH VISIBILITY & REVENUE AUDIT\n")
    r_main.font.name = "Arial"
    r_main.font.size = Pt(15)
    r_main.font.bold = True
    r_main.font.color.rgb = RGBColor(9, 13, 22)
    
    r_sub = p_title.add_run("Direct Booking Engine, Review Growth Flywheel, WhatsApp AI Concierge & Poolside Social Media")
    r_sub.font.name = "Arial"
    r_sub.font.size = Pt(9.5)
    r_sub.font.color.rgb = RGBColor(51, 65, 85)
    
    # Property Box
    tbl_client = doc.add_table(rows=1, cols=2)
    tbl_client.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_client.autofit = False
    
    c1 = tbl_client.cell(0, 0)
    c1.width = Inches(3.4)
    format_cell(
        c1,
        "AUDITED PROPERTY:\nCasa Urban Guest House & Suites\n12 Alhaji Amu St, off Saka Jojo by Homat B/Stop, Odogunyan, Ikorodu, Lagos\nPhone: +234 802 876 2087 • Open 24 Hours Daily",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    c2 = tbl_client.cell(0, 1)
    c2.width = Inches(3.4)
    format_cell(
        c2,
        "FACILITIES AUDITED:\nStandard, Deluxe, Luxury Rooms & Serviced Apartment Shortlets\nOutdoor Swimming Pool, Restaurant, Lounge, Kitchen & Snooker Arena\nPrimary Hub: Odogunyan Industrial Corridor (Lucky Fibres, PZ Cussons)",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    # Executive Scorecard Hero
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(8)
    p_sp.paragraph_format.space_after = Pt(0)
    
    tbl_score = doc.add_table(rows=1, cols=2)
    tbl_score.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_score.autofit = False
    
    cell_s1 = tbl_score.cell(0, 0)
    cell_s1.width = Inches(2.2)
    set_cell_background(cell_s1, "090D16")
    set_cell_margins(cell_s1, top=140, bottom=140, left=140, right=140)
    p_s1 = cell_s1.paragraphs[0]
    p_s1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    r_sc_lbl = p_s1.add_run("HEALTH SCORE\n")
    r_sc_lbl.font.name = "Arial"
    r_sc_lbl.font.size = Pt(8)
    r_sc_lbl.font.bold = True
    r_sc_lbl.font.color.rgb = RGBColor(148, 163, 184)
    
    r_sc_num = p_s1.add_run("24")
    r_sc_num.font.name = "Arial"
    r_sc_num.font.size = Pt(38)
    r_sc_num.font.bold = True
    r_sc_num.font.color.rgb = RGBColor(255, 255, 255)
    
    r_sc_den = p_s1.add_run(" / 100\n")
    r_sc_den.font.name = "Arial"
    r_sc_den.font.size = Pt(14)
    r_sc_den.font.color.rgb = RGBColor(148, 163, 184)
    
    r_sc_badge = p_s1.add_run("CRITICAL SEARCH BLIND SPOT")
    r_sc_badge.font.name = "Arial"
    r_sc_badge.font.size = Pt(8)
    r_sc_badge.font.bold = True
    r_sc_badge.font.color.rgb = RGBColor(226, 232, 240)
    
    cell_s2 = tbl_score.cell(0, 1)
    cell_s2.width = Inches(4.6)
    set_cell_background(cell_s2, "F8FAFC")
    set_cell_margins(cell_s2, top=120, bottom=120, left=140, right=140)
    p_s2 = cell_s2.paragraphs[0]
    p_s2.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    r_diag_h = p_s2.add_run("CRITICAL FINDING: HIGH VALUE PHYSICAL FACILITY, ZERO DIGITAL VISIBILITY\n")
    r_diag_h.font.name = "Arial"
    r_diag_h.font.size = Pt(9)
    r_diag_h.font.bold = True
    r_diag_h.font.color.rgb = RGBColor(9, 13, 22)
    
    r_diag_b = p_s2.add_run(
        "Casa Urban operates premium amenities rarely found together in Odogunyan: outdoor pool, snooker lounge, and serviced shortlet apartments. "
        "However, with NO website, only 12 Google reviews (3.8 rating), and 15 social posts, 92 out of 100 potential guests drop off. "
        "Estimated monthly revenue leakage is N1,200,000 to N2,800,000 across rooms, pool gate, and bar sales."
    )
    r_diag_b.font.name = "Arial"
    r_diag_b.font.size = Pt(8.5)
    r_diag_b.font.color.rgb = RGBColor(51, 65, 85)
    
    # 4 Metric Cards Table
    p_sp2 = doc.add_paragraph()
    p_sp2.paragraph_format.space_before = Pt(8)
    p_sp2.paragraph_format.space_after = Pt(0)
    
    tbl_metrics = doc.add_table(rows=1, cols=4)
    tbl_metrics.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_metrics.autofit = False
    
    metrics_data = [
        ("0", "Direct Website", "Zero direct booking or card checkout"),
        ("12", "Google Reviews", "3.8 rating creates customer doubt"),
        ("15", "Social Posts", "Dormant page; misses pool party hype"),
        ("0%", "WhatsApp Bot", "Manual replies; 75%+ lead drop-off")
    ]
    
    for i, (num, lbl, desc) in enumerate(metrics_data):
        c = tbl_metrics.cell(0, i)
        c.width = Inches(1.7)
        set_cell_background(c, "F8FAFC")
        set_cell_margins(c, top=80, bottom=80, left=80, right=80)
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        r1 = p.add_run(f"{num}\n")
        r1.font.name = "Arial"
        r1.font.size = Pt(18)
        r1.font.bold = True
        r1.font.color.rgb = RGBColor(9, 13, 22)
        
        r2 = p.add_run(f"{lbl}\n")
        r2.font.name = "Arial"
        r2.font.size = Pt(8.5)
        r2.font.bold = True
        r2.font.color.rgb = RGBColor(51, 65, 85)
        
        r3 = p.add_run(desc)
        r3.font.name = "Arial"
        r3.font.size = Pt(7.5)
        r3.font.color.rgb = RGBColor(100, 116, 139)
        
    # Section 1: Guest Drop-Off Visual Funnel
    p_sec1 = doc.add_paragraph()
    p_sec1.paragraph_format.space_before = Pt(14)
    p_sec1.paragraph_format.space_after = Pt(4)
    r_s1 = p_sec1.add_run("1. GUEST DROP-OFF VISUAL FUNNEL (100 SEARCHERS IN ODOGUNYAN)")
    r_s1.font.name = "Arial"
    r_s1.font.size = Pt(10)
    r_s1.font.bold = True
    r_s1.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_funnel = doc.add_table(rows=5, cols=3)
    tbl_funnel.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_funnel.autofit = False
    
    funnel_rows = [
        ("STAGE & GUEST ACTION", "CASA URBAN REALITY", "RESULT & DROP-OFF"),
        ("1. Google Search (100 Guests)", "Only 12 reviews (3.8 stars) and NO website link", "60 guests leave for higher-rated competitors"),
        ("2. Social Media Check (40 Guests)", "Only 15 total lifetime posts; profile looks inactive", "20 guests leave assuming hotel is closed"),
        ("3. Call / WhatsApp (20 Guests)", "Manual phone delays and unanswered messages", "12 guests abandon due to slow human replies"),
        ("4. Check-In (8 Guests)", "Surviving guests check in purely by physical chance", "92% of potential revenue is lost completely")
    ]
    
    for r_idx, row in enumerate(funnel_rows):
        is_head = (r_idx == 0)
        is_last = (r_idx == 4)
        bg = "090D16" if is_head else ("F1F5F9" if is_last else "FFFFFF")
        txt_color = RGBColor(255, 255, 255) if is_head else RGBColor(9, 13, 22)
        
        for c_idx, val in enumerate(row):
            cell = tbl_funnel.cell(r_idx, c_idx)
            widths = [Inches(2.3), Inches(2.5), Inches(2.0)]
            cell.width = widths[c_idx]
            format_cell(cell, val, bold=(is_head or is_last), color=txt_color, font_size=8, bg_hex=bg)

    # Section 2: 4-Pillar Turnaround Plan
    p_sec2 = doc.add_paragraph()
    p_sec2.paragraph_format.space_before = Pt(14)
    p_sec2.paragraph_format.space_after = Pt(4)
    r_s2 = p_sec2.add_run("2. THE 4-PILLAR REVENUE TURNAROUND PLAN")
    r_s2.font.name = "Arial"
    r_s2.font.size = Pt(10)
    r_s2.font.bold = True
    r_s2.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_pillars = doc.add_table(rows=2, cols=2)
    tbl_pillars.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_pillars.autofit = False
    
    pillars_data = [
        ("PILLAR 1: DIRECT BOOKING SITE", 
         "• Fast mobile engine built for Nigerian 4G/3G speeds\n• Dedicated galleries for Standard, Deluxe, Luxury & Shortlets\n• Showcase tabs for Pool, Snooker Lounge, and Dining\n• 0% OTA commission Paystack checkout"),
        ("PILLAR 2: 24/7 WHATSAPP AI BOT", 
         "• Responds in under 15 seconds, 24 hours daily\n• Sends room photos, pool tariffs, and menus automatically\n• Generates automated Paystack payment links in chat\n• Captures midnight arrivals from the Sagamu corridor"),
        ("PILLAR 3: SMART REVIEW FLYWHEEL", 
         "• Optimize Google profile for Odogunyan & Ikorodu searches\n• 2 custom acrylic NFC and QR stands at Reception & Pool Bar\n• Route 5-star guests to Google; catch complaints privately\n• Scale from 12 reviews to 50+ five-star ratings within 60 days"),
        ("PILLAR 4: POOLSIDE CONTENT ENGINE", 
         "• Resuscitate Instagram & Facebook with short-form video reels\n• Feature pool parties, cocktail specials, and snooker challenges\n• Consistent publishing schedule (4-5 videos and posts weekly)\n• Hyper-targeted local ads for corporate staff and youth")
    ]
    
    for idx, (head, body) in enumerate(pillars_data):
        row_idx = idx // 2
        col_idx = idx % 2
        cell = tbl_pillars.cell(row_idx, col_idx)
        cell.width = Inches(3.4)
        set_cell_background(cell, "F8FAFC")
        set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
        p = cell.paragraphs[0]
        
        r_h = p.add_run(f"{head}\n")
        r_h.font.name = "Arial"
        r_h.font.size = Pt(8.5)
        r_h.font.bold = True
        r_h.font.color.rgb = RGBColor(9, 13, 22)
        
        r_b = p.add_run(body)
        r_b.font.name = "Arial"
        r_b.font.size = Pt(8)
        r_b.font.color.rgb = RGBColor(51, 65, 85)

    # Section 3: Projected Revenue Uplift
    p_sec3 = doc.add_paragraph()
    p_sec3.paragraph_format.space_before = Pt(12)
    p_sec3.paragraph_format.space_after = Pt(4)
    
    tbl_roi = doc.add_table(rows=1, cols=2)
    tbl_roi.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_roi.autofit = False
    
    c_roi_l = tbl_roi.cell(0, 0)
    c_roi_l.width = Inches(4.5)
    set_cell_background(c_roi_l, "F8FAFC")
    set_cell_margins(c_roi_l, top=100, bottom=100, left=120, right=120)
    p_rl = c_roi_l.paragraphs[0]
    
    r_roih = p_rl.add_run("PROJECTED REVENUE ACCELERATION POTENTIAL\n")
    r_roih.font.name = "Arial"
    r_roih.font.size = Pt(8.5)
    r_roih.font.bold = True
    r_roih.font.color.rgb = RGBColor(9, 13, 22)
    
    r_roib = p_rl.add_run(
        "• Room & Shortlet Surge: +15 to +25 nights/wk (+N1,080,000 - N1,800,000/mo)\n"
        "• Poolside & Lounge Spend: +30% to +45% weekend volume (+N400,000 - N900,000/mo)\n"
        "• Commission Savings: 0% OTA fees via direct booking (+N150,000 - N300,000/mo)"
    )
    r_roib.font.name = "Arial"
    r_roib.font.size = Pt(8)
    r_roib.font.color.rgb = RGBColor(51, 65, 85)
    
    c_roi_r = tbl_roi.cell(0, 1)
    c_roi_r.width = Inches(2.3)
    set_cell_background(c_roi_r, "090D16")
    set_cell_margins(c_roi_r, top=100, bottom=100, left=100, right=100)
    p_rr = c_roi_r.paragraphs[0]
    p_rr.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    r_fig = p_rr.add_run("+N1.2M - N2.8M\n")
    r_fig.font.name = "Arial"
    r_fig.font.size = Pt(16)
    r_fig.font.bold = True
    r_fig.font.color.rgb = RGBColor(255, 255, 255)
    
    r_per = p_rr.add_run("ESTIMATED MONTHLY GAIN")
    r_per.font.name = "Arial"
    r_per.font.size = Pt(7.5)
    r_per.font.bold = True
    r_per.font.color.rgb = RGBColor(148, 163, 184)

    # 4-Week Rollout Table
    p_sec4 = doc.add_paragraph()
    p_sec4.paragraph_format.space_before = Pt(12)
    p_sec4.paragraph_format.space_after = Pt(4)
    r_s4 = p_sec4.add_run("3. 4-WEEK ROLLOUT TIMELINE")
    r_s4.font.name = "Arial"
    r_s4.font.size = Pt(10)
    r_s4.font.bold = True
    r_s4.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_sched = doc.add_table(rows=5, cols=3)
    tbl_sched.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_sched.autofit = False
    
    sched_data = [
        ("WEEK", "PHASE FOCUS", "CORE DELIVERABLES"),
        ("Week 1", "Mobile Booking Engine", "Build mobile site, upload room photos, integrate Paystack, optimize Google profile."),
        ("Week 2", "WhatsApp AI Concierge", "Connect WhatsApp Business API, ingest room/menu catalogs, test automated checkout."),
        ("Week 3", "Smart Review Stands", "Deploy 2 acrylic NFC/QR stands at Reception & Pool Bar, train staff on review incentives."),
        ("Week 4", "Content Shoot & Ads", "Shoot on-site video reels (pool, snooker, luxury rooms), relaunch socials, start local ads.")
    ]
    
    for r_idx, row in enumerate(sched_data):
        is_head = (r_idx == 0)
        bg = "090D16" if is_head else "FFFFFF"
        txt_color = RGBColor(255, 255, 255) if is_head else RGBColor(9, 13, 22)
        
        for c_idx, val in enumerate(row):
            cell = tbl_sched.cell(r_idx, c_idx)
            widths = [Inches(1.2), Inches(2.2), Inches(3.4)]
            cell.width = widths[c_idx]
            format_cell(cell, val, bold=is_head, color=txt_color, font_size=8, bg_hex=bg)

    # Footer Sign-off
    p_ft = doc.add_paragraph()
    p_ft.paragraph_format.space_before = Pt(14)
    p_ft.paragraph_format.space_after = Pt(0)
    r_ft = p_ft.add_run(
        "SALES COWBOY MARKETING SOLUTIONS • Hospitality Revenue Engineering Division\n"
        "36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria • Phone: +234 810 493 3232 • salescowboy.com.ng"
    )
    r_ft.font.name = "Arial"
    r_ft.font.size = Pt(8)
    r_ft.font.color.rgb = RGBColor(100, 116, 139)
    
    out_dir = "hotel-audits/casa-urban-guest-house"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "Casa-Urban-Digital-Revenue-Audit.docx")
    doc.save(out_path)
    print(f"Generated Docx successfully at: {os.path.abspath(out_path)}")

if __name__ == "__main__":
    create_casa_audit_docx()
