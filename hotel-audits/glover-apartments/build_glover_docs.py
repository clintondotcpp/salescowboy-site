import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=140, right=140):
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
    run_brand.font.size = Pt(17)
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
    r_ref.font.size = Pt(9.5)
    r_ref.font.bold = True
    r_ref.font.color.rgb = RGBColor(9, 13, 22)
    
    r_date = p_meta.add_run(f"DATE: {doc_date}\nSTATUS: EXECUTIVE BRIEF")
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

def create_glover_audit_docx():
    doc = docx.Document()
    
    for sec in doc.sections:
        sec.top_margin = Inches(0.65)
        sec.bottom_margin = Inches(0.65)
        sec.left_margin = Inches(0.65)
        sec.right_margin = Inches(0.65)
        sec.page_width = Inches(8.27)
        sec.page_height = Inches(11.69)
        
    add_header_letterhead(
        doc,
        doc_badge="EXECUTIVE REVENUE AUDIT",
        ref_num="AUD-GLV-2026-008",
        doc_date="November 06, 2026"
    )
    
    p_sp0 = doc.add_paragraph()
    p_sp0.paragraph_format.space_before = Pt(6)
    p_sp0.paragraph_format.space_after = Pt(4)
    
    # Client Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(4)
    r_kicker = p_title.add_run("PREPARED FOR MANAGEMENT & OWNERSHIP\n")
    r_kicker.font.name = "Arial"
    r_kicker.font.size = Pt(8.5)
    r_kicker.font.bold = True
    r_kicker.font.color.rgb = RGBColor(100, 116, 139)
    
    r_main = p_title.add_run("GLOVER APARTMENTS (OGUDU, LAGOS MAINLAND)\n")
    r_main.font.name = "Arial"
    r_main.font.size = Pt(18)
    r_main.font.bold = True
    r_main.font.color.rgb = RGBColor(9, 13, 22)
    
    r_sub = p_title.add_run("Ogudu, Lagos Mainland, Nigeria • Tier: Serviced Apartments • Subject: Direct Booking Engine & Local Dominance")
    r_sub.font.name = "Arial"
    r_sub.font.size = Pt(9.5)
    r_sub.font.color.rgb = RGBColor(51, 65, 85)
    
    # Executive Scorecard & 5-Axis Matrix
    tbl_score = doc.add_table(rows=1, cols=2)
    tbl_score.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_score.autofit = False
    
    cell_s1 = tbl_score.cell(0, 0)
    cell_s1.width = Inches(2.2)
    set_cell_background(cell_s1, "090D16")
    set_cell_margins(cell_s1, top=140, bottom=140, left=140, right=140)
    p_s1 = cell_s1.paragraphs[0]
    p_s1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    r_sc_lbl = p_s1.add_run("OVERALL HEALTH SCORE\n")
    r_sc_lbl.font.name = "Arial"
    r_sc_lbl.font.size = Pt(8)
    r_sc_lbl.font.bold = True
    r_sc_lbl.font.color.rgb = RGBColor(148, 163, 184)
    
    r_sc_num = p_s1.add_run("28")
    r_sc_num.font.name = "Arial"
    r_sc_num.font.size = Pt(42)
    r_sc_num.font.bold = True
    r_sc_num.font.color.rgb = RGBColor(255, 255, 255)
    
    r_sc_den = p_s1.add_run(" / 100\n")
    r_sc_den.font.name = "Arial"
    r_sc_den.font.size = Pt(14)
    r_sc_den.font.color.rgb = RGBColor(148, 163, 184)
    
    r_sc_badge = p_s1.add_run("SEVERE REVENUE LEAK")
    r_sc_badge.font.name = "Consolas"
    r_sc_badge.font.size = Pt(8.5)
    r_sc_badge.font.bold = True
    r_sc_badge.font.color.rgb = RGBColor(255, 255, 255)
    
    cell_s2 = tbl_score.cell(0, 1)
    cell_s2.width = Inches(4.7)
    set_cell_background(cell_s2, "F8FAFC")
    set_cell_margins(cell_s2, top=120, bottom=120, left=140, right=140)
    p_s2 = cell_s2.paragraphs[0]
    
    r_mh = p_s2.add_run("5-PILLAR DIGITAL INFRASTRUCTURE SCORECARD\n")
    r_mh.font.name = "Arial"
    r_mh.font.size = Pt(9.5)
    r_mh.font.bold = True
    r_mh.font.color.rgb = RGBColor(9, 13, 22)
    
    r_mb = p_s2.add_run(
        "1. Direct Booking Website:    [█████░░░░░░░░░░░░░░░]  25 / 100 (Exhausting Form)\n"
        "2. Live Room Calendar Sync:   [░░░░░░░░░░░░░░░░░░░░]   0 / 100 (No Availability Tracker)\n"
        "3. Google Business Profile:   [███░░░░░░░░░░░░░░░░░]  15 / 100 (1 Review / Ghost Status)\n"
        "4. Local Pack SEO (Ogudu):    [████░░░░░░░░░░░░░░░░]  20 / 100 (Cannibalized by Ikoyi)\n"
        "5. Post-Stay Review System:   [░░░░░░░░░░░░░░░░░░░░]   0 / 100 (Zero Automation)\n"
        "ESTIMATED MONTHLY REVENUE LEAKAGE: N1,800,000 - N3,600,000 / MONTH"
    )
    r_mb.font.name = "Consolas"
    r_mb.font.size = Pt(8.5)
    r_mb.font.bold = True
    r_mb.font.color.rgb = RGBColor(51, 65, 85)
    
    # 4 Big KPI Cards
    p_sp1 = doc.add_paragraph()
    p_sp1.paragraph_format.space_before = Pt(6)
    p_sp1.paragraph_format.space_after = Pt(0)
    
    tbl_kpi = doc.add_table(rows=1, cols=4)
    tbl_kpi.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_kpi.autofit = False
    
    kpis = [
        ("Multi-Step", "WEBSITE FRICTION", "Too many forms cause 70% drop-off"),
        ("0 Days", "AVAILABILITY TRACK", "No calendar forces manual phone calls"),
        ("1 Review", "MAPS TRUST TRAP", "Single review looks unverified to guests"),
        ("Ikoyi Bleed", "NAME HIJACKING", "Glover Rd Ikoyi captures Ogudu queries")
    ]
    for i, (num, title, sub) in enumerate(kpis):
        c = tbl_kpi.cell(0, i)
        c.width = Inches(1.72)
        set_cell_background(c, "F8FAFC")
        set_cell_margins(c, top=80, bottom=80, left=80, right=80)
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        rn = p.add_run(f"{num}\n")
        rn.font.name = "Arial"
        rn.font.size = Pt(17)
        rn.font.bold = True
        rn.font.color.rgb = RGBColor(9, 13, 22)
        
        rt = p.add_run(f"{title}\n")
        rt.font.name = "Arial"
        rt.font.size = Pt(8)
        rt.font.bold = True
        rt.font.color.rgb = RGBColor(9, 13, 22)
        
        rs = p.add_run(sub)
        rs.font.name = "Arial"
        rs.font.size = Pt(7.5)
        rs.font.color.rgb = RGBColor(100, 116, 139)

    # Section: Genuine Strengths vs Operational Mistakes
    p_sec_vs = doc.add_paragraph()
    p_sec_vs.paragraph_format.space_before = Pt(12)
    p_sec_vs.paragraph_format.space_after = Pt(4)
    r_sv = p_sec_vs.add_run("DIAGNOSTIC MATRIX: GENUINE STRENGTHS VS. WHAT YOU ARE DOING WRONG")
    r_sv.font.name = "Arial"
    r_sv.font.size = Pt(10)
    r_sv.font.bold = True
    r_sv.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_vs = doc.add_table(rows=1, cols=2)
    tbl_vs.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_vs.autofit = False
    
    c_str = tbl_vs.cell(0, 0)
    c_str.width = Inches(3.45)
    set_cell_background(c_str, "F8FAFC")
    set_cell_margins(c_str, top=100, bottom=100, left=120, right=120)
    p_str = c_str.paragraphs[0]
    r_str_h = p_str.add_run("YOUR GENUINE STRENGTHS\n")
    r_str_h.font.name = "Arial"
    r_str_h.font.size = Pt(9)
    r_str_h.font.bold = True
    r_str_h.font.color.rgb = RGBColor(9, 13, 22)
    r_str_b = p_str.add_run(
        "• High-Quality Professional Imagery: Beautiful interior and exterior photography already shot and ready.\n"
        "• Strategic Mainland Location: Prime position in Ogudu with fast connectivity to Ikeja, Maryland, and 3rd MB.\n"
        "• Multi-Channel OTA Indexing: Active listings on Agoda, Trip.com, and Skyscanner showing baseline appeal.\n"
        "• Established Brand & Web Domain: Owned URL gives you an existing launchpad for direct bookings."
    )
    r_str_b.font.name = "Arial"
    r_str_b.font.size = Pt(8)
    r_str_b.font.color.rgb = RGBColor(51, 65, 85)
    
    c_wrg = tbl_vs.cell(0, 1)
    c_wrg.width = Inches(3.45)
    set_cell_background(c_wrg, "FFF5F5")
    set_cell_margins(c_wrg, top=100, bottom=100, left=120, right=120)
    p_wrg = c_wrg.paragraphs[0]
    r_wrg_h = p_wrg.add_run("WHAT YOU ARE DOING WRONG\n")
    r_wrg_h.font.name = "Arial"
    r_wrg_h.font.size = Pt(9)
    r_wrg_h.font.bold = True
    r_wrg_h.font.color.rgb = RGBColor(153, 27, 27)
    r_wrg_b = p_wrg.add_run(
        "• Exhausting Website Booking: Too many form steps and screens tire visitors, leading to 70%+ checkout bounce.\n"
        "• Blind Availability: No real-time room availability calendar; guests cannot see open dates and must call.\n"
        "• Single-Review Ghost Trap: 1 solitary review on Google Maps triggers suspicion and blocks the local 3-pack.\n"
        "• Ikoyi Traffic Cannibalisation: Searches for Glover Apartments surface Ikoyi listings instead of Ogudu.\n"
        "• Zero Post-Stay Review Triggers: Staff never follow up after checkout to capture 5-star reviews."
    )
    r_wrg_b.font.name = "Arial"
    r_wrg_b.font.size = Pt(8)
    r_wrg_b.font.color.rgb = RGBColor(153, 27, 27)

    # Visual Diagnostic 1: Live Search Cannibalisation
    p_sec1 = doc.add_paragraph()
    p_sec1.paragraph_format.space_before = Pt(12)
    p_sec1.paragraph_format.space_after = Pt(4)
    r_s1 = p_sec1.add_run("VISUAL 01: LIVE GOOGLE SEARCH HIJACKING SIMULATION ('GLOVER APARTMENTS OGUDU')")
    r_s1.font.name = "Arial"
    r_s1.font.size = Pt(10)
    r_s1.font.bold = True
    r_s1.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_serp = doc.add_table(rows=4, cols=3)
    tbl_serp.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_serp.autofit = False
    
    serp_rows = [
        ("GOOGLE SEARCH RESULT", "LIVE DIGITAL STATUS", "COMMERCIAL IMPACT"),
        ("1. Glover Road Luxury Apartments\n(Ikoyi, Lagos)", "4.8 Stars (42 Reviews) • High Search Domain Authority", "CANNIBALIZING OGUDU TRAFFIC"),
        ("2. Top Ogudu / Maryland Serviced Apartments\n(Local 3-Pack Listings)", "4.6 Stars (48 Reviews) • Direct Links • High Map Visibility", "STEALING LOCAL MAINLAND GUESTS"),
        ("3. Glover Apartments\n(Your Listing - Ogudu)", "1 Review Only • No Local Schema • Zero Review Velocity", "BURIED BELOW LOCAL COMPETITION")
    ]
    for r_i, row in enumerate(serp_rows):
        is_h = (r_i == 0)
        is_last = (r_i == 3)
        bg = "090D16" if is_h else ("F1F5F9" if is_last else "FFFFFF")
        tc = RGBColor(255, 255, 255) if is_h else RGBColor(9, 13, 22)
        for c_i, val in enumerate(row):
            cell = tbl_serp.cell(r_i, c_i)
            widths = [Inches(2.3), Inches(2.7), Inches(1.9)]
            cell.width = widths[c_i]
            format_cell(cell, val, bold=(is_h or is_last or c_i == 2), color=tc, font_size=8, bg_hex=bg)

    # Visual Diagnostic 2: Guest Drop-off Funnel
    p_sec2 = doc.add_paragraph()
    p_sec2.paragraph_format.space_before = Pt(12)
    p_sec2.paragraph_format.space_after = Pt(4)
    r_s2 = p_sec2.add_run("VISUAL 02: WHERE 92 OUT OF 100 MAINLAND GUESTS DROP OFF")
    r_s2.font.name = "Arial"
    r_s2.font.size = Pt(10)
    r_s2.font.bold = True
    r_s2.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_fun = doc.add_table(rows=5, cols=3)
    tbl_fun.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_fun.autofit = False
    
    fun_rows = [
        ("FUNNEL VOLUME", "VISUAL RETENTION BAR & STAGE", "ATTRITION CAUSE"),
        ("100 Searchers", "[████████████████████] Stage 1: Google Search & Maps", "-52 lost to Ikoyi results & rival map packs"),
        ("48 Visitors",   "[██████████░░░░░░░░░░] Stage 2: Website Booking Flow", "-26 lost to exhausting forms & no live calendar"),
        ("22 Inquiries",  "[█████░░░░░░░░░░░░░░░] Stage 3: Phone Calls / WhatsApp", "-14 lost to manual confirmation delays"),
        ("8 Check-Ins",   "[██░░░░░░░░░░░░░░░░░░] Stage 4: Confirmed Stays", "92% OF POTENTIAL REVENUE LOST")
    ]
    for r_i, row in enumerate(fun_rows):
        is_h = (r_i == 0)
        is_last = (r_i == 4)
        bg = "090D16" if is_h else ("F1F5F9" if is_last else "FFFFFF")
        tc = RGBColor(255, 255, 255) if is_h else RGBColor(9, 13, 22)
        for c_i, val in enumerate(row):
            cell = tbl_fun.cell(r_i, c_i)
            widths = [Inches(1.4), Inches(3.4), Inches(2.1)]
            cell.width = widths[c_i]
            format_cell(cell, val, bold=(is_h or is_last), color=tc, font_size=8, bg_hex=bg)

    # Section 3: Proprietary 3-Pillar Turnaround Plan
    p_sec3 = doc.add_paragraph()
    p_sec3.paragraph_format.space_before = Pt(12)
    p_sec3.paragraph_format.space_after = Pt(4)
    r_s3 = p_sec3.add_run("THE SOLUTION: PROPRIETARY SALES COWBOY REVENUE ARCHITECTURE")
    r_s3.font.name = "Arial"
    r_s3.font.size = Pt(10)
    r_s3.font.bold = True
    r_s3.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_pil = doc.add_table(rows=3, cols=1)
    tbl_pil.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_pil.autofit = False
    
    pillars = [
        ("01. STREAMLINED DIRECT BOOKING SITE + REAL-TIME ROOM CALENDAR",
         "• Eliminates the exhausting multi-page forms with a high-converting 2-step mobile checkout.\n"
         "• Real-time room availability engine shows open vs booked dates instantly with zero guessing.\n"
         "• Direct Paystack & bank transfer settlement at 0% commission straight into your account."),
        ("02. 24/7 WHATSAPP AI CHATBOT WITH AUTOMATED REVIEW REMINDERS",
         "• Automatic post-checkout WhatsApp trigger sends a polite 1-click Google 5-star review link 2 hours after departure.\n"
         "• Rewards reviewers with a 10% repeat-stay incentive, driving 15 to 30 verified Google reviews monthly.\n"
         "• Answers midnight guest questions, shares photos, and delivers Paystack payment links in 3 seconds flat."),
        ("03. GOOGLE BUSINESS PROFILE (GBP) MANAGEMENT & MAINLAND PACK PUSH",
         "• Geo-tagged photo optimization and weekly Google updates targeting Ogudu and Maryland keywords.\n"
         "• High-authority local citations isolate your brand and permanently end Ikoyi keyword cannibalisation.\n"
         "• Propels Glover Apartments straight into the local Google 3-Pack for high-intent Mainland shortlet searches.")
    ]
    for idx, (h, b) in enumerate(pillars):
        cell = tbl_pil.cell(idx, 0)
        cell.width = Inches(6.9)
        set_cell_background(cell, "F8FAFC")
        set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
        p = cell.paragraphs[0]
        rh = p.add_run(f"{h}\n")
        rh.font.name = "Arial"
        rh.font.size = Pt(8.5)
        rh.font.bold = True
        rh.font.color.rgb = RGBColor(9, 13, 22)
        rb = p.add_run(b)
        rb.font.name = "Arial"
        rb.font.size = Pt(8)
        rb.font.color.rgb = RGBColor(51, 65, 85)

    # Projected Financial Recovery Box
    p_sp3 = doc.add_paragraph()
    p_sp3.paragraph_format.space_before = Pt(10)
    p_sp3.paragraph_format.space_after = Pt(0)
    
    tbl_roi = doc.add_table(rows=1, cols=2)
    tbl_roi.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_roi.autofit = False
    
    c_rl = tbl_roi.cell(0, 0)
    c_rl.width = Inches(4.5)
    set_cell_background(c_rl, "F8FAFC")
    set_cell_margins(c_rl, top=100, bottom=100, left=120, right=120)
    prl = c_rl.paragraphs[0]
    r_rh = prl.add_run("PROJECTED MONTHLY REVENUE RECOVERY (OGUDU MAINLAND BENCHMARK)\n")
    r_rh.font.name = "Arial"
    r_rh.font.size = Pt(8.5)
    r_rh.font.bold = True
    r_rh.font.color.rgb = RGBColor(9, 13, 22)
    r_rb = prl.add_run(
        "• Current Capture (Exhausting Flow): [█████░░░░░░░░░░░░░░░] ~25% Direct Potential\n"
        "• Upgraded Direct Ecosystem:         [█████████████████░░░] 85%+ Direct Potential\n"
        "• Recapturing just 15-30 uncaptured room nights monthly yields +N1.8M to N3.6M/mo"
    )
    r_rb.font.name = "Consolas"
    r_rb.font.size = Pt(8)
    r_rb.font.color.rgb = RGBColor(51, 65, 85)
    
    c_rr = tbl_roi.cell(0, 1)
    c_rr.width = Inches(2.4)
    set_cell_background(c_rr, "090D16")
    set_cell_margins(c_rr, top=100, bottom=100, left=100, right=100)
    prr = c_rr.paragraphs[0]
    prr.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_fig = prr.add_run("+N1.8M - N3.6M\n")
    r_fig.font.name = "Arial"
    r_fig.font.size = Pt(16)
    r_fig.font.bold = True
    r_fig.font.color.rgb = RGBColor(255, 255, 255)
    r_per = prr.add_run("ESTIMATED MONTHLY UPLIFT")
    r_per.font.name = "Arial"
    r_per.font.size = Pt(7.5)
    r_per.font.bold = True
    r_per.font.color.rgb = RGBColor(148, 163, 184)

    # 4-Week Execution Roadmap
    p_sec4 = doc.add_paragraph()
    p_sec4.paragraph_format.space_before = Pt(10)
    p_sec4.paragraph_format.space_after = Pt(4)
    r_s4 = p_sec4.add_run("4-WEEK TURNKEY EXECUTION ROADMAP")
    r_s4.font.name = "Arial"
    r_s4.font.size = Pt(9.5)
    r_s4.font.bold = True
    r_s4.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_wk = doc.add_table(rows=1, cols=4)
    tbl_wk.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_wk.autofit = False
    wks = [
        ("WEEK 01", "Streamlined Web Engine", "Launch 2-step checkout with live room availability tracking."),
        ("WEEK 02", "WhatsApp AI Chatbot", "Deploy bot with automated post-stay Google review triggers."),
        ("WEEK 03", "Google Profile & SEO", "Geo-tag photos, isolate Ogudu keywords, halt Ikoyi bleed."),
        ("WEEK 04", "Reviews & Direct Push", "Activate automated guest review cycle and local 3-pack rank.")
    ]
    for i, (w, n, d) in enumerate(wks):
        c = tbl_wk.cell(0, i)
        c.width = Inches(1.72)
        set_cell_background(c, "F8FAFC")
        set_cell_margins(c, top=70, bottom=70, left=80, right=80)
        p = c.paragraphs[0]
        rw = p.add_run(f"{w}\n")
        rw.font.name = "Consolas"
        rw.font.size = Pt(7.5)
        rw.font.bold = True
        rw.font.color.rgb = RGBColor(100, 116, 139)
        rn = p.add_run(f"{n}\n")
        rn.font.name = "Arial"
        rn.font.size = Pt(8)
        rn.font.bold = True
        rn.font.color.rgb = RGBColor(9, 13, 22)
        rd = p.add_run(d)
        rd.font.name = "Arial"
        rd.font.size = Pt(7.5)
        rd.font.color.rgb = RGBColor(51, 65, 85)

    out_dir = "hotel-audits/glover-apartments"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "Glover-Apartments-Digital-Revenue-Audit.docx")
    doc.save(out_path)
    print(f"Generated Docx successfully at: {os.path.abspath(out_path)}")

if __name__ == "__main__":
    create_glover_audit_docx()

