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

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
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
    
    # Left column: Brand & Logo
    cell_left = table.cell(0, 0)
    cell_left.width = Inches(4.5)
    
    p = cell_left.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(2)
    
    logo_path = os.path.abspath("public/assets/salescowboy-logo.png")
    if os.path.exists(logo_path):
        run_img = p.add_run()
        run_img.add_picture(logo_path, width=Inches(0.65))
        p.add_run("  ")
    
    run_brand = p.add_run("SALES COWBOY\n")
    run_brand.font.name = "Georgia"
    run_brand.font.size = Pt(16)
    run_brand.font.bold = True
    run_brand.font.color.rgb = RGBColor(124, 74, 30) # #7C4A1E
    
    run_tagline = p.add_run("Marketing Solutions • Hospitality Growth & Revenue Engineering\n")
    run_tagline.font.name = "Arial"
    run_tagline.font.size = Pt(8.5)
    run_tagline.font.bold = True
    run_tagline.font.color.rgb = RGBColor(204, 160, 102) # #CCA066
    
    run_addr = p.add_run(
        "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria\n"
        "hello@salescowboy.com.ng • +234 810 493 3232 • salescowboy.com.ng"
    )
    run_addr.font.name = "Calibri"
    run_addr.font.size = Pt(8.5)
    run_addr.font.color.rgb = RGBColor(100, 116, 139) # #64748B
    
    # Right column: Reference Meta Box
    cell_right = table.cell(0, 1)
    cell_right.width = Inches(2.3)
    set_cell_background(cell_right, "F8FAFC")
    set_cell_margins(cell_right, top=120, bottom=120, left=150, right=150)
    
    tcPr = cell_right._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>'
        f'<w:left w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>'
        f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>'
        f'<w:right w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p_meta = cell_right.paragraphs[0]
    p_meta.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_meta.paragraph_format.space_before = Pt(0)
    p_meta.paragraph_format.space_after = Pt(0)
    
    r_badge = p_meta.add_run(f"[{doc_badge.upper()}]\n")
    r_badge.font.name = "Arial"
    r_badge.font.size = Pt(9)
    r_badge.font.bold = True
    r_badge.font.color.rgb = RGBColor(124, 74, 30)
    
    r_ref = p_meta.add_run(f"REF: {ref_num}\n")
    r_ref.font.name = "Consolas"
    r_ref.font.size = Pt(8.5)
    r_ref.font.bold = True
    r_ref.font.color.rgb = RGBColor(15, 23, 42)
    
    r_date = p_meta.add_run(f"DATE: {doc_date}\nSTATUS: CONFIDENTIAL")
    r_date.font.name = "Calibri"
    r_date.font.size = Pt(8)
    r_date.font.color.rgb = RGBColor(100, 116, 139)

def add_gold_divider(doc):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(14)
    run = p.add_run("―" * 58)
    run.font.name = "Arial"
    run.font.size = Pt(12)
    run.font.bold = True
    run.font.color.rgb = RGBColor(204, 160, 102)

def add_callout(doc, title, text, bg_color="FFFBEB", border_color="F59E0B", title_color=RGBColor(180, 83, 9)):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell = table.cell(0, 0)
    cell.width = Inches(6.8)
    set_cell_background(cell, bg_color)
    set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:left w:val="single" w:sz="24" w:space="0" w:color="{border_color}"/>'
        f'<w:top w:val="none"/>'
        f'<w:bottom w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(2)
    run_t = p.add_run(f"● {title}\n")
    run_t.font.name = "Arial"
    run_t.font.size = Pt(10)
    run_t.font.bold = True
    run_t.font.color.rgb = title_color
    
    run_b = p.add_run(text)
    run_b.font.name = "Calibri"
    run_b.font.size = Pt(9.5)
    run_b.font.color.rgb = RGBColor(30, 41, 59)
    
    p_after = doc.add_paragraph()
    p_after.paragraph_format.space_before = Pt(0)
    p_after.paragraph_format.space_after = Pt(4)

def format_cell(cell, text, bold=False, color=RGBColor(30, 41, 59), font_size=9, align=WD_ALIGN_PARAGRAPH.LEFT, bg_hex=None):
    if bg_hex:
        set_cell_background(cell, bg_hex)
    set_cell_margins(cell, top=80, bottom=80, left=110, right=110)
    p = cell.paragraphs[0]
    p.alignment = align
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run(text)
    run.font.name = "Calibri"
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.color.rgb = color

def create_sym_audit_docx():
    doc = docx.Document()
    
    # Page setup - 0.7 inch margins
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
        doc_badge="HOSPITALITY REVENUE AUDIT",
        ref_num="AUD-SYM-2026-003",
        doc_date="November 05, 2026"
    )
    add_gold_divider(doc)
    
    # Document Title & Target Client
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_main_title = p_title.add_run("DIGITAL SEARCH VISIBILITY & REVENUE AUDIT\n")
    r_main_title.font.name = "Georgia"
    r_main_title.font.size = Pt(17)
    r_main_title.font.bold = True
    r_main_title.font.color.rgb = RGBColor(15, 23, 42)
    
    r_subtitle = p_title.add_run("Executive Growth Diagnostic, Digital Leakage Assessment & 5-Pillar Turnkey Turnaround Strategy")
    r_subtitle.font.name = "Arial"
    r_subtitle.font.size = Pt(10)
    r_subtitle.font.color.rgb = RGBColor(124, 74, 30)
    
    # Target Client Box
    tbl_client = doc.add_table(rows=1, cols=2)
    tbl_client.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_client.autofit = False
    
    c_c1 = tbl_client.cell(0, 0)
    c_c1.width = Inches(3.4)
    format_cell(
        c_c1,
        "PREPARED FOR:\nThe Executive Board & General Management\nSym Hotels and Lodge\nPrincess Adeja Road, Akaajime, Gboko, Benue State",
        bold=False,
        font_size=9,
        bg_hex="F8FAFC"
    )
    c_c1.paragraphs[0].runs[0].font.size = Pt(8.5)
    
    c_c2 = tbl_client.cell(0, 1)
    c_c2.width = Inches(3.4)
    format_cell(
        c_c2,
        "PREPARED BY:\nSales Cowboy Marketing Solutions\nHospitality Revenue Engineering Group\nAjah, Lagos • salescowboy.com.ng\nContact: +234 810 493 3232",
        bold=False,
        font_size=9,
        bg_hex="F8FAFC"
    )
    
    # Spacer
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(6)
    p_sp.paragraph_format.space_after = Pt(0)
    
    # -------------------------------------------------------------
    # 1. EXECUTIVE DIAGNOSTIC HEALTH SCORE (BIG IMPACT SHAPE)
    # -------------------------------------------------------------
    tbl_score = doc.add_table(rows=1, cols=2)
    tbl_score.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_score.autofit = False
    
    cell_s1 = tbl_score.cell(0, 0)
    cell_s1.width = Inches(2.2)
    set_cell_background(cell_s1, "0F172A") # Dark Navy
    set_cell_margins(cell_s1, top=160, bottom=160, left=160, right=160)
    p_s1 = cell_s1.paragraphs[0]
    p_s1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    r_sc_lbl = p_s1.add_run("DIGITAL HEALTH SCORE\n")
    r_sc_lbl.font.name = "Arial"
    r_sc_lbl.font.size = Pt(8)
    r_sc_lbl.font.bold = True
    r_sc_lbl.font.color.rgb = RGBColor(204, 160, 102)
    
    r_sc_num = p_s1.add_run("12")
    r_sc_num.font.name = "Georgia"
    r_sc_num.font.size = Pt(38)
    r_sc_num.font.bold = True
    r_sc_num.font.color.rgb = RGBColor(239, 68, 68) # Red
    
    r_sc_den = p_s1.add_run(" / 100\n")
    r_sc_den.font.name = "Georgia"
    r_sc_den.font.size = Pt(16)
    r_sc_den.font.bold = True
    r_sc_den.font.color.rgb = RGBColor(148, 163, 184)
    
    r_sc_badge = p_s1.add_run("VIRTUALLY INVISIBLE")
    r_sc_badge.font.name = "Arial"
    r_sc_badge.font.size = Pt(8.5)
    r_sc_badge.font.bold = True
    r_sc_badge.font.color.rgb = RGBColor(254, 202, 202)
    
    cell_s2 = tbl_score.cell(0, 1)
    cell_s2.width = Inches(4.6)
    set_cell_background(cell_s2, "FEF2F2") # Light Red
    set_cell_margins(cell_s2, top=140, bottom=140, left=160, right=160)
    p_s2 = cell_s2.paragraphs[0]
    p_s2.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    r_diag_h = p_s2.add_run("CRITICAL FINDING: COMPLETE REVENUE & SEARCH BLIND SPOT\n")
    r_diag_h.font.name = "Arial"
    r_diag_h.font.size = Pt(9.5)
    r_diag_h.font.bold = True
    r_diag_h.font.color.rgb = RGBColor(185, 28, 28)
    
    r_diag_b = p_s2.add_run(
        "Sym Hotels and Lodge operates in Gboko—the bustling commercial and cultural capital of Benue State—yet has virtually ZERO searchable footprint across Google Search, Google Maps, and Local Pack. Aside from an unoptimized Facebook profile and a third-party Hotels.ng listing, corporate travelers, wedding entourages, and diaspora visitors cannot discover or book your rooms directly. Every week, dozens of direct bookings are surrendered to nearby competitors and third-party OTAs."
    )
    r_diag_b.font.name = "Calibri"
    r_diag_b.font.size = Pt(9)
    r_diag_b.font.color.rgb = RGBColor(30, 41, 59)
    
    # 4 BIG METRIC SHAPE CARDS
    doc.add_paragraph().paragraph_format.space_before = Pt(4)
    tbl_metrics = doc.add_table(rows=1, cols=4)
    tbl_metrics.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_metrics.autofit = False
    
    metrics = [
        ("0", "Google Business Profile", "Not verified on Google Maps or local searches", "DC2626"),
        ("0", "Direct Website", "Zero owned direct booking or online payment", "DC2626"),
        ("0%", "WhatsApp Booking Bot", "Manual replies only; guest drop-off exceeds 80%", "EA580C"),
        ("15-20%", "OTA Commission Loss", "Paid to Hotels.ng per booked room night", "DC2626")
    ]
    
    for i, (val, title, desc, col_hex) in enumerate(metrics):
        cell_m = tbl_metrics.cell(0, i)
        cell_m.width = Inches(1.7)
        set_cell_background(cell_m, "F8FAFC")
        set_cell_margins(cell_m, top=100, bottom=100, left=90, right=90)
        
        tcPr = cell_m._tc.get_or_add_tcPr()
        borders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'<w:top w:val="single" w:sz="18" w:space="0" w:color="{col_hex}"/>'
            f'<w:left w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>'
            f'<w:bottom w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>'
            f'<w:right w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(borders)
        
        pm = cell_m.paragraphs[0]
        pm.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        rv = pm.add_run(f"{val}\n")
        rv.font.name = "Georgia"
        rv.font.size = Pt(17)
        rv.font.bold = True
        rv.font.color.rgb = RGBColor(15, 23, 42)
        
        rt = pm.add_run(f"{title}\n")
        rt.font.name = "Arial"
        rt.font.size = Pt(8)
        rt.font.bold = True
        rt.font.color.rgb = RGBColor(124, 74, 30)
        
        rd = pm.add_run(desc)
        rd.font.name = "Calibri"
        rd.font.size = Pt(7.5)
        rd.font.color.rgb = RGBColor(100, 116, 139)
        
    doc.add_paragraph().paragraph_format.space_before = Pt(8)
    
    # -------------------------------------------------------------
    # 2. THE GUEST BOOKING LEAK FUNNEL (VISUAL DIAGRAM TABLE)
    # -------------------------------------------------------------
    p_h2 = doc.add_paragraph()
    p_h2.paragraph_format.space_before = Pt(8)
    p_h2.paragraph_format.space_after = Pt(2)
    r_h2 = p_h2.add_run("1. THE GUEST BOOKING LEAK FUNNEL (WHERE YOU LOSE REVENUE)")
    r_h2.font.name = "Georgia"
    r_h2.font.size = Pt(11)
    r_h2.font.bold = True
    r_h2.font.color.rgb = RGBColor(124, 74, 30)
    
    p_leak_intro = doc.add_paragraph()
    p_leak_intro.paragraph_format.space_before = Pt(0)
    p_leak_intro.paragraph_format.space_after = Pt(6)
    r_li = p_leak_intro.add_run(
        "Modern travelers, civil servants, wedding guests, and NGO workers do not arrive in Gboko blindly. They query Google Search and WhatsApp. Here is what currently happens to 100 potential guests searching for accommodation:"
    )
    r_li.font.name = "Calibri"
    r_li.font.size = Pt(9)
    
    tbl_funnel = doc.add_table(rows=5, cols=4)
    tbl_funnel.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_funnel.autofit = False
    
    funnel_cols = [Inches(1.2), Inches(1.8), Inches(2.3), Inches(1.5)]
    f_headers = ["STAGE", "GUEST BEHAVIOR", "SYM HOTELS STATUS", "REVENUE IMPACT"]
    
    for c_idx, h_text in enumerate(f_headers):
        cell = tbl_funnel.cell(0, c_idx)
        cell.width = funnel_cols[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(255, 255, 255), font_size=8.5, bg_hex="0F172A")
        
    funnel_rows = [
        ("1. Google Search", "Traveler searches 'Best hotels in Gboko' or 'Princess Adeja Rd lodge'", "NO verified Google Maps card or GBP exists. Sym is invisible in the Local 3-Pack.", "70% LEAK\nGuest chooses listed competitors immediately"),
        ("2. Social Discovery", "Visitor searches Facebook for amenities, photos, restaurant & bar", "Outdated Facebook page with no booking link or live room availability rates.", "15% LEAK\nGuest doubts facility legitimacy"),
        ("3. Direct Inquiry", "Guest attempts to message on WhatsApp or call front desk", "No automated concierge. Delayed or uncoordinated response during late hours.", "10% LEAK\nSlow response kills high-intent booking"),
        ("4. OTA Booking", "Guest finally finds Sym on Hotels.ng intermediary directory", "Hotels.ng captures the transaction and deducts 15% to 20% commission on the room night.", "5% SURVIVE\nSym forfeits ~₦3,000 to ₦6,000 per room night")
    ]
    
    for r_idx, (stg, beh, stat, imp) in enumerate(funnel_rows, start=1):
        for c_idx, txt in enumerate([stg, beh, stat, imp]):
            cell = tbl_funnel.cell(r_idx, c_idx)
            cell.width = funnel_cols[c_idx]
            bg = "FEF2F2" if c_idx == 3 else ("FFFFFF" if r_idx % 2 == 1 else "F8FAFC")
            t_col = RGBColor(185, 28, 28) if c_idx == 3 else RGBColor(30, 41, 59)
            format_cell(cell, txt, bold=(c_idx in [0, 3]), color=t_col, font_size=8.5, bg_hex=bg)
            
    doc.add_paragraph().paragraph_format.space_before = Pt(8)
    
    # Callout: The Gboko Market Reality
    add_callout(
        doc,
        "THE GBOKO MARKET REALITY: THE CAPITAL OF TIV NATION",
        "Gboko is not an average rural town—it is the paramount seat of the Tor Tiv, the epicentre of Tivland cultural congresses, agricultural produce distribution, and federal/state institutional delegations. During weekends, festivals, and weddings, hotel occupancy spikes. Without an authoritative Google Business Profile and instant online booking, Sym Hotels leaves hundreds of thousands in high-margin weekend bookings on the table.",
        bg_color="FEF3C7",
        border_color="D97706",
        title_color=RGBColor(180, 83, 9)
    )
    
    # -------------------------------------------------------------
    # 3. GBOKO SEARCH VISIBILITY MATRIX
    # -------------------------------------------------------------
    p_h3 = doc.add_paragraph()
    p_h3.paragraph_format.space_before = Pt(8)
    p_h3.paragraph_format.space_after = Pt(2)
    r_h3 = p_h3.add_run("2. LOCAL SEARCH & COMPETITOR VISIBILITY MATRIX (GBOKO)")
    r_h3.font.name = "Georgia"
    r_h3.font.size = Pt(11)
    r_h3.font.bold = True
    r_h3.font.color.rgb = RGBColor(124, 74, 30)
    
    tbl_matrix = doc.add_table(rows=6, cols=5)
    tbl_matrix.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_matrix.autofit = False
    
    m_widths = [Inches(2.0), Inches(1.1), Inches(1.2), Inches(1.2), Inches(1.3)]
    m_headers = ["CRITICAL DIGITAL ASSET", "SYM HOTELS", "TOP GBOKO RIVALS", "BENCHMARK", "OPPORTUNITY GAP"]
    
    for c_idx, h_text in enumerate(m_headers):
        cell = tbl_matrix.cell(0, c_idx)
        cell.width = m_widths[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(255, 255, 255), font_size=8, bg_hex="0F172A")
        
    matrix_rows = [
        ("Google Business Profile (Maps)", "MISSING / UNVERIFIED", "Active (15-40 reviews)", "Top 3 Local Pack Rank", "Easy win: Claim #1 spot on Princess Adeja Rd"),
        ("Direct Booking Engine", "NONE (Hotels.ng only)", "Phone calls / OTA only", "Mobile Instant Booking", "Pioneer zero-commission booking in Gboko"),
        ("24/7 WhatsApp AI Reservation", "NONE (Manual only)", "None (Manual WhatsApp)", "Sub-60s automated booking", "Capture after-hours late traveler arrivals"),
        ("Guest Review Architecture", "0 Google Reviews", "10-25 mixed ratings", "4.5+ Stars / 50+ Ratings", "Deploy Smart Gateway QR at front desk"),
        ("Transit & Physical Wayfinding", "Basic Gate Board", "Standard Signage", "High-Visibility Billboards", "Capture road transit from Makurdi & Aliade")
    ]
    
    for r_idx, (asset, sym, rival, bench, opp) in enumerate(matrix_rows, start=1):
        for c_idx, txt in enumerate([asset, sym, rival, bench, opp]):
            cell = tbl_matrix.cell(r_idx, c_idx)
            cell.width = m_widths[c_idx]
            bg = "FEF2F2" if c_idx == 1 and "MISSING" in txt or "NONE" in txt or "0" in txt else ("FFFFFF" if r_idx % 2 == 1 else "F8FAFC")
            t_col = RGBColor(185, 28, 28) if (c_idx == 1 and ("MISSING" in txt or "NONE" in txt or "0" in txt)) else (RGBColor(22, 163, 74) if c_idx == 4 else RGBColor(30, 41, 59))
            format_cell(cell, txt, bold=(c_idx in [0, 1]), color=t_col, font_size=8, bg_hex=bg)
            
    doc.add_paragraph().paragraph_format.space_before = Pt(8)
    
    # -------------------------------------------------------------
    # 4. THE TURNKEY GROWTH FLYWHEEL (THE 5-PILLAR SOLUTION)
    # -------------------------------------------------------------
    p_h4 = doc.add_paragraph()
    p_h4.paragraph_format.space_before = Pt(8)
    p_h4.paragraph_format.space_after = Pt(2)
    r_h4 = p_h4.add_run("3. THE 5-PILLAR TURNKEY HOSPITALITY GROWTH SYSTEM")
    r_h4.font.name = "Georgia"
    r_h4.font.size = Pt(11)
    r_h4.font.bold = True
    r_h4.font.color.rgb = RGBColor(124, 74, 30)
    
    pillars = [
        ("PILLAR 1: DIRECT HIGH-CONVERTING BOOKING ENGINE", 
         "A bespoke, blazing-fast direct booking website. Highlights rooms, executive suites, VIP lounge, bar, conference spaces, and generator power guarantee. Direct Paystack / Monnify integration for instant card & bank transfer reservations without 20% OTA cuts."),
        
        ("PILLAR 2: 24/7 AI-POWERED WHATSAPP CONCIERGE", 
         "Automated booking bot handling guest inquiries, room photo previews, pricing, check-in instructions, and payment confirmations in under 15 seconds. Works 24 hours a day, capturing late arrivals from Gboko-Makurdi expressway."),
        
        ("PILLAR 3: GOOGLE LOCAL 3-PACK DOMINANCE & REVIEW FLYWHEEL", 
         "Establish, verify, and aggressively optimize Sym Hotels and Lodge on Google Business Profile. Deploy acrylic Smart Gateway QR stands at front-desk to scale real 5-star Google guest ratings from 0 to 50+ verified reviews within 60 days."),
        
        ("PILLAR 4: SOCIAL MEDIA ENGINE & BRAND REPUTATION", 
         "Complete visual transformation across Facebook & Instagram. High-resolution photography of guest rooms, food/drinks, VIP security, clean sanitation, and weekly targeted local ad campaigns capturing Gboko event planners and visitors."),
        
        ("PILLAR 5: TRANSIT & STRATEGIC WAYFINDING BILLBOARDS", 
         "Design and placement strategy for clear directional transit signage at critical junctions (Akaajime junction, Princess Adeja entrance, and Gboko express corridor) ensuring incoming motorists and travelers locate Sym Hotels with zero friction.")
    ]
    
    for title, desc in pillars:
        tbl_pil = doc.add_table(rows=1, cols=1)
        tbl_pil.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl_pil.autofit = False
        cell_p = tbl_pil.cell(0, 0)
        cell_p.width = Inches(6.8)
        set_cell_background(cell_p, "F8FAFC")
        set_cell_margins(cell_p, top=80, bottom=80, left=120, right=120)
        
        tcPr = cell_p._tc.get_or_add_tcPr()
        borders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'<w:left w:val="single" w:sz="18" w:space="0" w:color="7C4A1E"/>'
            f'<w:top w:val="none"/>'
            f'<w:bottom w:val="none"/>'
            f'<w:right w:val="none"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(borders)
        
        pp = cell_p.paragraphs[0]
        pp.paragraph_format.space_before = Pt(0)
        pp.paragraph_format.space_after = Pt(1)
        rt = pp.add_run(f"★ {title}\n")
        rt.font.name = "Arial"
        rt.font.size = Pt(9)
        rt.font.bold = True
        rt.font.color.rgb = RGBColor(124, 74, 30)
        
        rb = pp.add_run(desc)
        rb.font.name = "Calibri"
        rb.font.size = Pt(8.5)
        rb.font.color.rgb = RGBColor(30, 41, 59)
        
        doc.add_paragraph().paragraph_format.space_before = Pt(2)
        
    # -------------------------------------------------------------
    # 5. FINANCIAL IMPACT & REVENUE PROJECTION (BIG ROI BOX)
    # -------------------------------------------------------------
    doc.add_paragraph().paragraph_format.space_before = Pt(6)
    tbl_roi = doc.add_table(rows=1, cols=1)
    tbl_roi.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_roi.autofit = False
    
    cell_r = tbl_roi.cell(0, 0)
    cell_r.width = Inches(6.8)
    set_cell_background(cell_r, "ECFDF5") # Mint green
    set_cell_margins(cell_r, top=140, bottom=140, left=180, right=180)
    
    tcPr = cell_r._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="12" w:space="0" w:color="10B981"/>'
        f'<w:left w:val="single" w:sz="12" w:space="0" w:color="10B981"/>'
        f'<w:bottom w:val="single" w:sz="12" w:space="0" w:color="10B981"/>'
        f'<w:right w:val="single" w:sz="12" w:space="0" w:color="10B981"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    pr = cell_r.paragraphs[0]
    pr.alignment = WD_ALIGN_PARAGRAPH.CENTER
    pr.paragraph_format.space_before = Pt(0)
    pr.paragraph_format.space_after = Pt(2)
    
    r_roi_h = pr.add_run("PROJECTED REVENUE ACCELERATION\n")
    r_roi_h.font.name = "Arial"
    r_roi_h.font.size = Pt(9)
    r_roi_h.font.bold = True
    r_roi_h.font.color.rgb = RGBColor(5, 150, 105)
    
    r_roi_val = pr.add_run("+₦1,200,000 – ₦3,000,000\n")
    r_roi_val.font.name = "Georgia"
    r_roi_val.font.size = Pt(22)
    r_roi_val.font.bold = True
    r_roi_val.font.color.rgb = RGBColor(6, 95, 70)
    
    r_roi_d = pr.add_run(
        "Estimated incremental monthly direct room revenue captured through Google 3-Pack rank, 24/7 WhatsApp reservations, and 0% OTA commission savings within 90 days of system launch."
    )
    r_roi_d.font.name = "Calibri"
    r_roi_d.font.size = Pt(9)
    r_roi_d.font.color.rgb = RGBColor(4, 120, 87)
    
    # -------------------------------------------------------------
    # 6. IMPLEMENTATION ROADMAP & CALL TO ACTION
    # -------------------------------------------------------------
    p_h5 = doc.add_paragraph()
    p_h5.paragraph_format.space_before = Pt(10)
    p_h5.paragraph_format.space_after = Pt(2)
    r_h5 = p_h5.add_run("4. 4-WEEK ROLLOUT SCHEDULE & NEXT STEPS")
    r_h5.font.name = "Georgia"
    r_h5.font.size = Pt(11)
    r_h5.font.bold = True
    r_h5.font.color.rgb = RGBColor(124, 74, 30)
    
    tbl_road = doc.add_table(rows=5, cols=3)
    tbl_road.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_road.autofit = False
    
    r_widths = [Inches(1.2), Inches(2.2), Inches(3.4)]
    r_hdrs = ["TIMELINE", "CORE MILESTONE", "DELIVERABLES"]
    
    for c_idx, h_text in enumerate(r_hdrs):
        cell = tbl_road.cell(0, c_idx)
        cell.width = r_widths[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(255, 255, 255), font_size=8.5, bg_hex="0F172A")
        
    road_rows = [
        ("Week 1", "Local Search & GBP Setup", "Claim & verify GBP, professional photography brief, geo-tagging, Local 3-Pack profile completion."),
        ("Week 2", "Direct Website & Engine", "Deploy responsive web booking engine, room showcases, direct payment gateway integration."),
        ("Week 3", "WhatsApp Concierge & QR", "Configure 24/7 WhatsApp bot, deploy acrylic Smart Gateway QR review stands at front desk."),
        ("Week 4", "Transit Signage & Ads", "Install directional road transit boards, activate hyper-targeted social media campaigns, staff training.")
    ]
    
    for r_idx, (wk, mls, dels) in enumerate(road_rows, start=1):
        for c_idx, txt in enumerate([wk, mls, dels]):
            cell = tbl_road.cell(r_idx, c_idx)
            cell.width = r_widths[c_idx]
            bg = "FFFFFF" if r_idx % 2 == 1 else "F8FAFC"
            format_cell(cell, txt, bold=(c_idx in [0, 1]), color=RGBColor(30, 41, 59), font_size=8.5, bg_hex=bg)
            
    # Closing / Signature Block
    doc.add_paragraph().paragraph_format.space_before = Pt(12)
    p_close = doc.add_paragraph()
    p_close.paragraph_format.space_before = Pt(4)
    p_close.paragraph_format.space_after = Pt(2)
    r_cl = p_close.add_run(
        "Sales Cowboy Marketing Solutions is prepared to deploy this complete growth engine for Sym Hotels and Lodge immediately. Let us turn your digital presence from invisible to the #1 hospitality choice in Gboko.\n\n"
        "Respectfully submitted,\n"
        "SALES COWBOY MARKETING SOLUTIONS\n"
        "Hospitality Growth & Revenue Engineering Division\n"
        "Red Brick House, Peace Land Estate, Ogombo, Ajah, Lagos, Nigeria\n"
        "Direct: +234 810 493 3232 • Email: hello@salescowboy.com.ng"
    )
    r_cl.font.name = "Calibri"
    r_cl.font.size = Pt(8.5)
    r_cl.font.color.rgb = RGBColor(71, 85, 105)

    out_path = os.path.abspath("hotel-audits/Sym hotels and lodge/Sym-Hotels-Digital-Audit.docx")
    doc.save(out_path)
    print(f"Generated Docx successfully at: {out_path}")

if __name__ == "__main__":
    create_sym_audit_docx()

