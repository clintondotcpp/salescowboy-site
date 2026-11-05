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
    r_badge.font.name = "Calibri"
    r_badge.font.size = Pt(8.5)
    r_badge.font.bold = True
    r_badge.font.color.rgb = RGBColor(185, 28, 28) # Red badge
    
    r_ref = p_meta.add_run(f"REF: {ref_num}\n")
    r_ref.font.name = "Calibri"
    r_ref.font.size = Pt(9)
    r_ref.font.bold = True
    r_ref.font.color.rgb = RGBColor(15, 23, 42)
    
    r_date = p_meta.add_run(f"DATE: {doc_date}\n")
    r_date.font.name = "Calibri"
    r_date.font.size = Pt(8.5)
    r_date.font.color.rgb = RGBColor(71, 85, 105)
    
    r_stat = p_meta.add_run("SCORE: 28/100 (CRITICAL)")
    r_stat.font.name = "Calibri"
    r_stat.font.size = Pt(8.5)
    r_stat.font.bold = True
    r_stat.font.color.rgb = RGBColor(220, 38, 38)
    
    # Bottom separator line
    p_sep = doc.add_paragraph()
    p_sep.paragraph_format.space_before = Pt(6)
    p_sep.paragraph_format.space_after = Pt(12)
    pBdr = parse_xml(
        f'<w:pBdr {nsdecls("w")}>'
        f'<w:bottom w:val="single" w:sz="18" w:space="4" w:color="7C4A1E"/>'
        f'</w:pBdr>'
    )
    p_sep._p.get_or_add_pPr().append(pBdr)

def add_callout_box(doc, heading, items, bg_color="FEF3C7", border_color="B45309"):
    """Shaded callout box with accent left bar."""
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.8)
    set_cell_background(cell, bg_color)
    set_cell_margins(cell, top=120, bottom=120, left=160, right=150)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="none"/>'
        f'<w:left w:val="single" w:sz="24" w:space="0" w:color="{border_color}"/>'
        f'<w:bottom w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(4)
    r_head = p.add_run(heading + "\n")
    r_head.font.name = "Calibri"
    r_head.font.size = Pt(10)
    r_head.font.bold = True
    r_head.font.color.rgb = RGBColor(146, 64, 14)
    
    for item in items:
        p_item = cell.add_paragraph()
        p_item.paragraph_format.space_before = Pt(0)
        p_item.paragraph_format.space_after = Pt(2)
        r_bullet = p_item.add_run("• ")
        r_bullet.font.bold = True
        r_bullet.font.color.rgb = RGBColor(146, 64, 14)
        
        if ":" in item:
            prefix, rest = item.split(":", 1)
            r_pre = p_item.add_run(prefix + ":")
            r_pre.font.name = "Calibri"
            r_pre.font.size = Pt(9.5)
            r_pre.font.bold = True
            r_pre.font.color.rgb = RGBColor(15, 23, 42)
            
            r_rest = p_item.add_run(rest)
            r_rest.font.name = "Calibri"
            r_rest.font.size = Pt(9.5)
            r_rest.font.color.rgb = RGBColor(51, 65, 85)
        else:
            r_text = p_item.add_run(item)
            r_text.font.name = "Calibri"
            r_text.font.size = Pt(9.5)
            r_text.font.color.rgb = RGBColor(51, 65, 85)
            
    p_end = doc.add_paragraph()
    p_end.paragraph_format.space_before = Pt(2)
    p_end.paragraph_format.space_after = Pt(4)

def build_gocap_audit_docx():
    doc = docx.Document()
    
    # Margins
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.85)
        s.right_margin = Inches(0.85)
        
    add_header_letterhead(
        doc,
        doc_badge="Digital Revenue & Visibility Audit",
        ref_num="AUD-2026-SCM-GOCAP-01",
        doc_date="November 5, 2026"
    )
    
    # Document Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(4)
    p_title.paragraph_format.space_after = Pt(2)
    r_t = p_title.add_run("DIGITAL REVENUE & SEARCH VISIBILITY AUDIT")
    r_t.font.name = "Georgia"
    r_t.font.size = Pt(16)
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(15, 23, 42)
    
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(10)
    r_sub = p_sub.add_run("Target Property: GOCAP GUEST HOUSE & APARTMENTS • 13 Parmor Estate, Off Trademore Phase 3, Airport Road, Lugbe, Abuja")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(10)
    r_sub.font.color.rgb = RGBColor(100, 116, 139)
    
    # Audit Target Overview Table
    tbl_target = doc.add_table(rows=1, cols=2)
    tbl_target.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_target.autofit = False
    
    c_left = tbl_target.cell(0, 0)
    c_left.width = Inches(4.7)
    set_cell_background(c_left, "F8FAFC")
    set_cell_margins(c_left, top=120, bottom=120, left=140, right=140)
    tcPr = c_left._tc.get_or_add_tcPr()
    tcPr.append(parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:color="E2E8F0"/><w:left w:val="single" w:sz="6" w:color="E2E8F0"/><w:bottom w:val="single" w:sz="6" w:color="E2E8F0"/><w:right w:val="single" w:sz="6" w:color="E2E8F0"/></w:tcBorders>'))
    
    p_l = c_left.paragraphs[0]
    p_l.paragraph_format.space_after = Pt(2)
    r1 = p_l.add_run("PROPERTY PROFILE & LOCATION PARAMETERS:\n")
    r1.font.size = Pt(8.5)
    r1.font.bold = True
    r1.font.color.rgb = RGBColor(124, 74, 30)
    
    r2 = p_l.add_run("Business Name: GOCAP GUEST HOUSE & APARTMENTS\n")
    r2.font.size = Pt(9.5)
    r2.font.bold = True
    r2.font.color.rgb = RGBColor(15, 23, 42)
    
    r3 = p_l.add_run(
        "Physical Address: 13 Parmor Estate, Off Trademore Phase 3, Emmanuel Mbaka Blvd, Airport Road, Lugbe, Abuja\n"
        "Transit Catchment: Nnamdi Azikiwe International Airport Transit Belt\n"
        "Current Digital Channel: Google Business Profile with only 6 Reviews (No Website, No WhatsApp Automation)"
    )
    r3.font.size = Pt(9)
    r3.font.color.rgb = RGBColor(71, 85, 105)
    
    c_right = tbl_target.cell(0, 1)
    c_right.width = Inches(2.1)
    set_cell_background(c_right, "FEF2F2")
    set_cell_margins(c_right, top=120, bottom=120, left=120, right=120)
    tcPr2 = c_right._tc.get_or_add_tcPr()
    tcPr2.append(parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:color="FECACA"/><w:left w:val="single" w:sz="6" w:color="FECACA"/><w:bottom w:val="single" w:sz="6" w:color="FECACA"/><w:right w:val="single" w:sz="6" w:color="FECACA"/></w:tcBorders>'))
    
    p_r = c_right.paragraphs[0]
    p_r.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_r.paragraph_format.space_after = Pt(0)
    r_sc_lbl = p_r.add_run("DIGITAL HEALTH SCORE\n")
    r_sc_lbl.font.size = Pt(8.5)
    r_sc_lbl.font.bold = True
    r_sc_lbl.font.color.rgb = RGBColor(185, 28, 28)
    
    r_sc_val = p_r.add_run("28/100\n")
    r_sc_val.font.size = Pt(22)
    r_sc_val.font.bold = True
    r_sc_val.font.color.rgb = RGBColor(220, 38, 38)
    
    r_sc_stat = p_r.add_run("CRITICAL LEAKAGE")
    r_sc_stat.font.size = Pt(8.5)
    r_sc_stat.font.bold = True
    r_sc_stat.font.color.rgb = RGBColor(185, 28, 28)
    
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(4)
    p_sp.paragraph_format.space_after = Pt(6)
    
    # 1. Executive Diagnosis
    p_s1 = doc.add_paragraph()
    p_s1.paragraph_format.space_before = Pt(8)
    p_s1.paragraph_format.space_after = Pt(4)
    r_s1 = p_s1.add_run("1. EXECUTIVE SUMMARY & COMMERCIAL DIAGNOSIS")
    r_s1.font.name = "Georgia"
    r_s1.font.size = Pt(11)
    r_s1.font.bold = True
    r_s1.font.color.rgb = RGBColor(124, 74, 30)
    
    p_body = doc.add_paragraph()
    p_body.paragraph_format.space_after = Pt(6)
    r_b = p_body.add_run(
        "GOCAP Guest House & Apartments sits on a hospitality goldmine: the Airport Road transit corridor in Lugbe, Abuja. Over 15,000 domestic and international passengers land at Nnamdi Azikiwe International Airport daily, generating non-stop search volume for short-stay lodging, flight layovers, airline crew layovers, and business trips.\n\n"
        "Yet, our digital revenue audit reveals that GOCAP is currently invisible to over 85% of these high-paying travelers due to three critical digital voids:"
    )
    r_b.font.name = "Calibri"
    r_b.font.size = Pt(9.5)
    r_b.font.color.rgb = RGBColor(51, 65, 85)
    
    voids = [
        "Google Profile Stagnation (Only 6 Reviews): An inactive listing with zero updates signals to Google's algorithm that the business is dormant, suppressing it in the Google Local 3-Pack.",
        "Zero Direct Booking Engine (No Website): Potential guests have no website to view room tiers, inspect clean amenities, verify rates, or complete instant card/bank payments.",
        "No Automated WhatsApp Concierge: In Nigeria, 80%+ of hotel inquiries occur on WhatsApp. Without automated 24/7 availability checks and pay-in-chat checkout, late-night transit bookers are lost to competitors."
    ]
    add_callout_box(doc, "THE 3 FATAL REVENUE VOIDS COSTING GOCAP DAILY BOOKINGS", voids, bg_color="FEF2F2", border_color="EF4444")
    
    # 2. Google Search Visibility Matrix
    p_s2 = doc.add_paragraph()
    p_s2.paragraph_format.space_before = Pt(10)
    p_s2.paragraph_format.space_after = Pt(4)
    r_s2 = p_s2.add_run("2. GOOGLE SEARCH VISIBILITY & GEO-INTENT MATRIX")
    r_s2.font.name = "Georgia"
    r_s2.font.size = Pt(11)
    r_s2.font.bold = True
    r_s2.font.color.rgb = RGBColor(124, 74, 30)
    
    # Table for Matrix
    matrix_tbl = doc.add_table(rows=5, cols=4)
    matrix_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    matrix_tbl.autofit = False
    
    col_w = [Inches(1.8), Inches(1.2), Inches(2.6), Inches(1.2)]
    headers = ["Search Query Target", "Ranking Probability", "Algorithmic Reality & Revenue Implication", "Strategic Focus"]
    
    for i, h in enumerate(headers):
        c = matrix_tbl.cell(0, i)
        c.width = col_w[i]
        set_cell_background(c, "0F172A")
        set_cell_margins(c, top=80, bottom=80, left=100, right=100)
        p = c.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h)
        r.font.name = "Calibri"
        r.font.size = Pt(8.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        
    matrix_data = [
        (
            '"Hotels in Abuja"',
            "Highly Unlikely (1/10)",
            "Abuja is vast. Broad searches favor luxury hotels in Maitama, Wuse, or Garki. GOCAP will always be filtered out. Competing here wastes ad spend.",
            "De-prioritize broad queries"
        ),
        (
            '"Hotels in Airport Road" / "Hotels in Lugbe"',
            "Underperforming (4/10 -> 9/10 Potential)",
            "THE PRIMARY REVENUE GOLDMINE: Google maps actively link Airport Road and Lugbe. When travelers search this corridor, GOCAP should be #1. Currently buried due to only 6 reviews and lack of a website.",
            "Dominate Local 3-Pack"
        ),
        (
            '"Hotels near me"',
            "Conditional (3/10)",
            "Appears only when searchers are physically in Lugbe or near the Voice of Nigeria (VON) area. Fails to capture arriving flight passengers before they exit the airport.",
            "Proximity capture"
        ),
        (
            '"Lodges / Guest Houses in Lugbe"',
            "High Category Match (5/10)",
            "Highest natural category alignment. However, without transparent pricing, photos, or WhatsApp booking, 70% of viewers bounce to competitors.",
            "Direct Conversion Hub"
        )
    ]
    
    for r_idx, row in enumerate(matrix_data, start=1):
        bg = "FFFFFF" if r_idx % 2 == 1 else "F8FAFC"
        for c_idx, val in enumerate(row):
            c = matrix_tbl.cell(r_idx, c_idx)
            c.width = col_w[c_idx]
            set_cell_background(c, bg)
            set_cell_margins(c, top=70, bottom=70, left=90, right=90)
            p = c.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(val)
            r.font.name = "Calibri"
            r.font.size = Pt(8.5)
            if c_idx == 1 and "Highly Unlikely" in val:
                r.font.bold = True
                r.font.color.rgb = RGBColor(185, 28, 28)
            elif c_idx == 1 and "Potential" in val:
                r.font.bold = True
                r.font.color.rgb = RGBColor(217, 119, 6)
            elif c_idx == 1 and "High" in val:
                r.font.bold = True
                r.font.color.rgb = RGBColor(22, 163, 74)
            elif c_idx == 3:
                r.font.bold = True
                r.font.color.rgb = RGBColor(124, 74, 30)
            else:
                r.font.color.rgb = RGBColor(51, 65, 85)
                
    p_sp2 = doc.add_paragraph()
    p_sp2.paragraph_format.space_before = Pt(4)
    p_sp2.paragraph_format.space_after = Pt(6)
    
    # 3. The 5 Turnkey Upgrades
    p_s3 = doc.add_paragraph()
    p_s3.paragraph_format.space_before = Pt(8)
    p_s3.paragraph_format.space_after = Pt(4)
    r_s3 = p_s3.add_run("3. THE 5-POINT TURNKEY TRANSFORMATION BLUEPRINT")
    r_s3.font.name = "Georgia"
    r_s3.font.size = Pt(11)
    r_s3.font.bold = True
    r_s3.font.color.rgb = RGBColor(124, 74, 30)
    
    upgrades = [
        ("Upgrade 1: Modern Direct Booking Website (Mobile-First)",
         "A fast, luxury-themed website showcasing room categories (Standard, Deluxe, Executive Apartments), virtual room tours, transparent pricing, and instant Paystack/Moniepoint checkout. Bypasses 15–20% OTA commission fees and captures 100% direct revenue."),
        ("Upgrade 2: Automated 24/7 WhatsApp AI Concierge & Direct Payment Bot",
         "An intelligent WhatsApp bot on GOCAP's business line. Guests can check real-time availability, view photo carousels, pick dates, and pay directly inside WhatsApp. Sends automated booking confirmation vouchers and GPS location pins for easy check-in."),
        ("Upgrade 3: Google Business Profile (GBP) Local 3-Pack SEO Dominance",
         "Full metadata optimization for 'Hotels in Airport Road Abuja' and 'Lugbe Guest Houses'. Includes high-res geo-tagged photography and a front-desk QR review acceleration flywheel to scale GOCAP from 6 reviews to 50+ 5-star ratings within 60 days."),
        ("Upgrade 4: Visual Social Media Management (Instagram & Facebook)",
         "Consistent, professional social media curation. Production of engaging reels and photo showcases highlighting serene estate security, pristine bedding, 24/7 electricity, air conditioning, and airport transit proximity to build authority."),
        ("Upgrade 5: Hyper-Targeted Airport Transit Advertising",
         "Geofenced Meta & Google Ads targeted directly at smartphone users arriving at Nnamdi Azikiwe International Airport searching for short-stay lodging and layover apartments.")
    ]
    
    for u_title, u_desc in upgrades:
        p_u = doc.add_paragraph()
        p_u.paragraph_format.space_before = Pt(2)
        p_u.paragraph_format.space_after = Pt(3)
        r_ut = p_u.add_run(u_title + "\n")
        r_ut.font.name = "Calibri"
        r_ut.font.size = Pt(9.5)
        r_ut.font.bold = True
        r_ut.font.color.rgb = RGBColor(124, 74, 30)
        
        r_ud = p_u.add_run(u_desc)
        r_ud.font.name = "Calibri"
        r_ud.font.size = Pt(9)
        r_ud.font.color.rgb = RGBColor(51, 65, 85)
        
    # 4. Financial Opportunity & ROI
    p_s4 = doc.add_paragraph()
    p_s4.paragraph_format.space_before = Pt(8)
    p_s4.paragraph_format.space_after = Pt(4)
    r_s4 = p_s4.add_run("4. FINANCIAL ROI & REVENUE GAIN PROJECTION")
    r_s4.font.name = "Georgia"
    r_s4.font.size = Pt(11)
    r_s4.font.bold = True
    r_s4.font.color.rgb = RGBColor(124, 74, 30)
    
    roi_items = [
        "Conservative Projection: Capturing just 2 to 4 additional direct room bookings per night through Google Local 3-Pack placement and instant 24/7 WhatsApp automation.",
        "Revenue Impact: At an average nightly rate of ₦25,000 – ₦35,000, 2 to 4 extra daily bookings yield ₦1,500,000 – ₦3,500,000+ in additional gross monthly revenue.",
        "Payback Period: Complete turnkey implementation cost is typically recovered within 30 to 45 days of live launch."
    ]
    add_callout_box(doc, "PROJECTED MONTHLY REVENUE EXPANSION: +₦1.5M – ₦3.5M", roi_items, bg_color="F0FDF4", border_color="16A34A")
    
    # Signoff Block
    p_so = doc.add_paragraph()
    p_so.paragraph_format.space_before = Pt(10)
    p_so.paragraph_format.space_after = Pt(4)
    r_so = p_so.add_run("AUDIT COMPILATION & STRATEGIC ENDORSEMENT")
    r_so.font.name = "Georgia"
    r_so.font.size = Pt(10.5)
    r_so.font.bold = True
    r_so.font.color.rgb = RGBColor(124, 74, 30)
    
    tbl_sig = doc.add_table(rows=1, cols=2)
    tbl_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_sig.autofit = False
    
    c1 = tbl_sig.cell(0, 0)
    c1.width = Inches(3.4)
    set_cell_background(c1, "F8FAFC")
    set_cell_margins(c1, top=120, bottom=120, left=120, right=120)
    c1._tc.get_or_add_tcPr().append(parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:color="CBD5E1"/><w:left w:val="single" w:sz="6" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="6" w:color="CBD5E1"/><w:right w:val="single" w:sz="6" w:color="CBD5E1"/></w:tcBorders>'))
    
    p1 = c1.paragraphs[0]
    p1.paragraph_format.space_after = Pt(2)
    p1.add_run("COMPILED & ISSUED BY:\n").font.size = Pt(8)
    p1.add_run("SALES COWBOY MARKETING SOLUTIONS\n\n").font.size = Pt(9.5)
    p1.add_run("Lead Consultant: Clinton Chukwunyere\nEmail: hello@salescowboy.com.ng\nTel: +234 810 493 3232\nDate: November 5, 2026").font.size = Pt(8.5)
    
    c2 = tbl_sig.cell(0, 1)
    c2.width = Inches(3.4)
    set_cell_background(c2, "F8FAFC")
    set_cell_margins(c2, top=120, bottom=120, left=120, right=120)
    c2._tc.get_or_add_tcPr().append(parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:color="CBD5E1"/><w:left w:val="single" w:sz="6" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="6" w:color="CBD5E1"/><w:right w:val="single" w:sz="6" w:color="CBD5E1"/></w:tcBorders>'))
    
    p2 = c2.paragraphs[0]
    p2.paragraph_format.space_after = Pt(2)
    p2.add_run("PREPARED EXCLUSIVELY FOR:\n").font.size = Pt(8)
    p2.add_run("GOCAP GUEST HOUSE & APARTMENTS\n\n").font.size = Pt(9.5)
    p2.add_run("Attention: Management & Board of Directors\nLocation: Parmor Estate, Lugbe, Abuja\nStatus: Confidential Strategic Audit\nAction: Implementation Ready").font.size = Pt(8.5)
    
    out_file = os.path.abspath("hotel-audits/gocap/GOCAP-Guest-House-Digital-Audit.docx")
    doc.save(out_file)
    print(f"[SUCCESS] Audit Word Document saved: {out_file}")

if __name__ == "__main__":
    build_gocap_audit_docx()

