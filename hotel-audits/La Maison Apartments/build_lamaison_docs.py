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

def create_lamaison_audit_docx():
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
        ref_num="AUD-LMA-2026-006",
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
    
    r_main = p_title.add_run("LA MAISON APARTMENTS (MAITAMA, ABUJA)\n")
    r_main.font.name = "Arial"
    r_main.font.size = Pt(18)
    r_main.font.bold = True
    r_main.font.color.rgb = RGBColor(9, 13, 22)
    
    r_sub = p_title.add_run("Tennessee Crescent, Maitama, Abuja • Direct Line: 0814 199 6466 • Tier: Luxury Serviced Apartments")
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
    
    r_sc_num = p_s1.add_run("18")
    r_sc_num.font.name = "Arial"
    r_sc_num.font.size = Pt(42)
    r_sc_num.font.bold = True
    r_sc_num.font.color.rgb = RGBColor(255, 255, 255)
    
    r_sc_den = p_s1.add_run(" / 100\n")
    r_sc_den.font.name = "Arial"
    r_sc_den.font.size = Pt(14)
    r_sc_den.font.color.rgb = RGBColor(148, 163, 184)
    
    r_sc_badge = p_s1.add_run("CRITICAL BLIND SPOT")
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
        "1. Direct Booking Website:    [░░░░░░░░░░░░░░░]   0 / 100 (Non-Existent)\n"
        "2. Google Business Profile:   [██░░░░░░░░░░░░░]  10 / 100 (0 Reviews / Ghost)\n"
        "3. OTA Syndication Health:    [███░░░░░░░░░░░░]  15 / 100 ('No Longer Bookable')\n"
        "4. Brand Name Protection:     [████░░░░░░░░░░░]  20 / 100 (Hijacked by Rivals)\n"
        "5. Booking Response Speed:    [█████░░░░░░░░░░]  25 / 100 (Manual IG DM / Phone)\n"
        "ESTIMATED MONTHLY REVENUE LEAKAGE: N2,400,000 - N4,800,000 / MONTH"
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
        ("0", "OWNED WEBSITE", "No domain or online checkout"),
        ("0", "GOOGLE REVIEWS", "Ghost Maps profile in Maitama"),
        ("2", "NAME HIJACKERS", "EEVA Maison & de Jay steal traffic"),
        ("92%", "GUEST DROP-OFF", "Lost to dead links & slow DMs")
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
        rn.font.size = Pt(20)
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

    # Visual Diagnostic 1: Live Google Search Hijacking
    p_sec1 = doc.add_paragraph()
    p_sec1.paragraph_format.space_before = Pt(12)
    p_sec1.paragraph_format.space_after = Pt(4)
    r_s1 = p_sec1.add_run("VISUAL 01: LIVE GOOGLE SEARCH HIJACKING SIMULATION ('LA MAISON MAITAMA')")
    r_s1.font.name = "Arial"
    r_s1.font.size = Pt(10)
    r_s1.font.bold = True
    r_s1.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_serp = doc.add_table(rows=4, cols=3)
    tbl_serp.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_serp.autofit = False
    
    serp_rows = [
        ("GOOGLE SEARCH RESULT", "LIVE DIGITAL STATUS", "COMMERCIAL IMPACT"),
        ("1. EEVA Maison Apartments\n(28 Tennessee Crescent, Maitama)", "4.7 Stars (Verified) • Active Photos • Instant Booking", "STEALING YOUR MAITAMA TRAFFIC"),
        ("2. La Maison de Jay\n(Katampe, Abuja)", "4.5 Stars (Verified) • Direct Links • Active Reviews", "HIJACKING YOUR BRAND NAME"),
        ("3. La Maison Apartments\n(Your Listing - Maitama)", "0 Reviews • No Website • OTA Warning: 'No longer bookable'", "GUEST ASSUMES YOU ARE CLOSED")
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
    r_s2 = p_sec2.add_run("VISUAL 02: WHERE 92 OUT OF 100 MAITAMA GUESTS DROP OFF")
    r_s2.font.name = "Arial"
    r_s2.font.size = Pt(10)
    r_s2.font.bold = True
    r_s2.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_fun = doc.add_table(rows=5, cols=3)
    tbl_fun.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_fun.autofit = False
    
    fun_rows = [
        ("FUNNEL VOLUME", "VISUAL RETENTION BAR & STAGE", "ATTRITION CAUSE"),
        ("100 Searchers", "[████████████████████] Stage 1: Google Search & Maps", "-55 lost to EEVA Maison & rivals"),
        ("45 Remaining",  "[█████████░░░░░░░░░░░] Stage 2: Third-Party OTA Check", "-20 lost ('No longer bookable' tag)"),
        ("25 Remaining",  "[█████░░░░░░░░░░░░░░░] Stage 3: Instagram DM / WhatsApp", "-17 lost to slow manual reply friction"),
        ("8 Check-Ins",   "[██░░░░░░░░░░░░░░░░░░] Stage 4: Confirmed Arrival", "92% OF POTENTIAL REVENUE LOST")
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

    # Section 3: 4-Pillar Turnaround Plan
    p_sec3 = doc.add_paragraph()
    p_sec3.paragraph_format.space_before = Pt(12)
    p_sec3.paragraph_format.space_after = Pt(4)
    r_s3 = p_sec3.add_run("THE SOLUTION: 4-PILLAR COMMERCIAL TURNAROUND ARCHITECTURE")
    r_s3.font.name = "Arial"
    r_s3.font.size = Pt(10)
    r_s3.font.bold = True
    r_s3.font.color.rgb = RGBColor(9, 13, 22)
    
    tbl_pil = doc.add_table(rows=2, cols=2)
    tbl_pil.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_pil.autofit = False
    
    pillars = [
        ("01. DIRECT LUXURY BOOKING WEBSITE",
         "• Launch lamaisonapartments.com for diplomats & executives\n• Suite galleries, floor plans & live availability calendar\n• Paystack card & bank transfer checkout at 0% commission"),
        ("02. GOOGLE 3-PACK & BRAND DEFENSE",
         "• Verify & optimize GBP to rank #1 for 'shortlet Maitama'\n• Stop brand hijacking by EEVA Maison & La Maison de Jay\n• In-suite Smart Review QR stands (0 to 45+ reviews in 60 days)"),
        ("03. 24/7 WHATSAPP & IG AI CONCIERGE",
         "• Connect AI Reservation Desk to 0814 199 6466 & IG DMs\n• Replies in under 10 seconds 24/7 with video tours & rates\n• Sends instant Paystack payment links to lock in bookings"),
        ("04. OTA CLEAN-UP & CHANNEL SYNC",
         "• Purge dead 'no longer bookable' warnings on aggregators\n• Build high-converting profiles on Airbnb & Booking.com\n• Sync calendars centrally to prevent double bookings")
    ]
    for idx, (h, b) in enumerate(pillars):
        cell = tbl_pil.cell(idx // 2, idx % 2)
        cell.width = Inches(3.45)
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
    r_rh = prl.add_run("PROJECTED MONTHLY REVENUE RECOVERY (MAITAMA BENCHMARK)\n")
    r_rh.font.name = "Arial"
    r_rh.font.size = Pt(8.5)
    r_rh.font.bold = True
    r_rh.font.color.rgb = RGBColor(9, 13, 22)
    r_rb = prl.add_run(
        "• Current Capture (IG DMs Only): [████░░░░░░░░░░░░] ~25% Digital Potential\n"
        "• Upgraded Direct Ecosystem:     [██████████████░░] 85%+ Digital Potential\n"
        "• Recapturing just 20-35 apartment nights/mo in Maitama yields +N2.4M to N4.8M/mo"
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
    r_fig = prr.add_run("+N2.4M - N4.8M\n")
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
        ("WEEK 01", "Brand Defense & GBP", "Verify Google profile, Maitama SEO schema, reclaim traffic."),
        ("WEEK 02", "Direct Booking Site", "Launch luxury web portal with live calendar & Paystack."),
        ("WEEK 03", "WhatsApp & IG AI Bot", "Deploy 24/7 AI Concierge on 0814 199 6466 & IG DMs."),
        ("WEEK 04", "OTA Sync & QR Stands", "Fix broken OTA tags, sync Airbnb, place review QR stands.")
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

    out_dir = "hotel-audits/La Maison Apartments"
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "La-Maison-Apartments-Digital-Audit.docx")
    doc.save(out_path)
    print(f"Generated Docx successfully at: {os.path.abspath(out_path)}")

if __name__ == "__main__":
    create_lamaison_audit_docx()

