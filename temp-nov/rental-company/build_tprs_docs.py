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
    
    run_tagline = p.add_run("Marketing Solutions • Enterprise Software Engineering\n")
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
    
    r_date = p_meta.add_run(f"DATE: {doc_date}")
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
    run.font.color.rgb = RGBColor(203, 213, 225) # Slate 300

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

def create_tprs_proposal_docx():
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
        doc_badge="COMMERCIAL PROPOSAL",
        ref_num="PROP-TPRS-2026-008",
        doc_date="November 05, 2026"
    )
    add_clean_divider(doc)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_main_title = p_title.add_run("CENTRALIZED OPERATIONS, FLEET & INVENTORY ERP SYSTEM\n")
    r_main_title.font.name = "Georgia"
    r_main_title.font.size = Pt(15)
    r_main_title.font.bold = True
    r_main_title.font.color.rgb = RGBColor(15, 23, 42)
    
    r_subtitle = p_title.add_run("Standard Operating Procedure (SOP) Digitization, Time-Windowed Equipment Vault & Gatehouse Loss Shield")
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
        "PREPARED FOR (CLIENT):\nThe Party Rental Station (TPRS)\nAttention: Executive Operations Directorate & Board\nCommercial Event Infrastructure & High-Capacity Cooling Rentals",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    c_c2 = tbl_client.cell(0, 1)
    c_c2.width = Inches(3.4)
    format_cell(
        c_c2,
        "PREPARED BY (DEVELOPER):\nSales Cowboy Marketing Solutions\nRed Brick House, Peace Land Estate, Ogombo, Ajah, Lagos\nContact: +234 810 493 3232 • hello@salescowboy.com.ng\nWeb: salescowboy.com.ng",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    # 1. PROJECT BACKGROUND
    p_h1 = doc.add_paragraph()
    p_h1.paragraph_format.space_before = Pt(12)
    p_h1.paragraph_format.space_after = Pt(2)
    r_h1 = p_h1.add_run("1. PROJECT BACKGROUND & OPERATIONAL OBJECTIVE")
    r_h1.font.name = "Georgia"
    r_h1.font.size = Pt(10.5)
    r_h1.font.bold = True
    r_h1.font.color.rgb = RGBColor(15, 23, 42)
    
    p_bg = doc.add_paragraph()
    p_bg.paragraph_format.space_before = Pt(0)
    p_bg.paragraph_format.space_after = Pt(6)
    r_bg = p_bg.add_run(
        "The Party Rental Station (TPRS) manages high-value commercial event assets across Nigeria—including 5-ton to 10-ton mobile cooling units, heavy generators, marquee structures, chillers, and luxury banqueting equipment. In rapid, event-driven environments, manual coordination through paper slips, phone calls, and informal chat groups introduces critical operational friction: asset double-bookings, untracked cable and accessory theft, fleet maintenance blind spots, and customer-contested damage claims.\n\n"
        "Sales Cowboy Marketing Solutions will engineer and deploy a centralized Operations, Fleet & Inventory ERP System. This platform digitizes and enforces TPRS's Standard Operating Procedures (SOP) across all operational departments—unifying Sales, Warehouse, Fleet Logistics, Field Technicians, Gatehouse Security, and Executive Management into a single source of truth."
    )
    r_bg.font.name = "Calibri"
    r_bg.font.size = Pt(8.5)
    
    # 2. CORE SYSTEM MODULES
    p_h2 = doc.add_paragraph()
    p_h2.paragraph_format.space_before = Pt(10)
    p_h2.paragraph_format.space_after = Pt(2)
    r_h2 = p_h2.add_run("2. CORE SYSTEM MODULES & SOP ARCHITECTURE")
    r_h2.font.name = "Georgia"
    r_h2.font.size = Pt(10.5)
    r_h2.font.bold = True
    r_h2.font.color.rgb = RGBColor(15, 23, 42)
    
    modules = [
        ("MODULE 1: TIME-WINDOWED ASSET & INVENTORY VAULT",
         "• Conflict-Free Reservation Engine: Calculates real-time asset availability factoring in event dates, transit buffers, teardown windows, and maintenance intervals to eliminate double-bookings.\n"
         "• Categorized Asset Registry: Live condition state tracking (AVAILABLE, BOOKED, IN_TRANSIT, ON_SITE, MAINTENANCE, QUARANTINE) for high-capacity cooling systems, ACs, generators, tents, and accessories.\n"
         "• Digital Issue & Return Notes: Barcode/QR-ready digital dispatch scanning, post-event return checklists, and automatic variance calculation to pinpoint missing cables or damaged items before restocking."),
        
        ("MODULE 2: FLEET MANAGEMENT & LOGISTICS DESK",
         "• Vehicle Master Register: Centralized digital profiles tracking delivery trucks and vans (roadworthiness, insurance, hackney permits) with automated 30-day and 7-day expiration alerts.\n"
         "• Trip Sheets & Dispatch Control: Assigns vehicles to approved delivery manifests with pre-trip odometer and fuel-level logging, tracking live status from depot to venue.\n"
         "• Maintenance & Repair Authorization: Structured driver incident logging, digital vendor quote uploads, and multi-tier management sign-offs before repair payouts."),
         
        ("MODULE 3: EVENT OPERATIONS & SITE DELIVERY ENGINE",
         "• Digital Job Cards: Mobile manifests linking venue constraints, power specifications, and assigned field crew rosters to every booking.\n"
         "• Pre-Dispatch & Setup Checklists: Enforces mandatory pre-loading functional testing protocols for high-capacity ACs (compressor drawdown, airflow temperature, oil levels).\n"
         "• Mobile Customer Handover: On-site digital signature capture on smartphone/tablet upon delivery and post-event collection, generating instant legal handover receipts."),
         
        ("MODULE 4: INCIDENT, LOSS & SECURITY AUDIT VAULT",
         "• Gatehouse Control Desk: Tablet portal for perimeter security; no truck or equipment can exit the compound without a digitally verified Job Card.\n"
         "• Damage & Missing Items Registry: Mandatory high-resolution photo evidence capture directly within the mobile app with automatic repair cost estimates and liability tagging.\n"
         "• Segregated Approval Matrix: Granular digital approval thresholds: Supervisor (≤₦20k), Operations Manager (≤₦100k), Executive Management (>₦100k)."),
         
        ("MODULE 5: COO EXECUTIVE INTELLIGENCE & KPI REPORTING",
         "• Real-Time Operations Dashboard: Live KPI rollups tracking Fleet Availability (≥95%), Inventory Accuracy (≥98%), and On-Time Setup Rates.\n"
         "• Cost-Center Analytics: Aggregates fuel spend, maintenance overhead, and asset utilization rates per cooling unit against monthly budgets.\n"
         "• One-Click Reporting: Instant export of PDF and Excel operational audit reports for executive board meetings.")
    ]
    
    for mod_title, mod_body in modules:
        tbl_m = doc.add_table(rows=1, cols=1)
        tbl_m.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl_m.autofit = False
        cell_m = tbl_m.cell(0, 0)
        cell_m.width = Inches(6.8)
        set_cell_background(cell_m, "F8FAFC")
        set_cell_margins(cell_m, top=60, bottom=60, left=100, right=100)
        
        tcPr = cell_m._tc.get_or_add_tcPr()
        borders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'<w:left w:val="single" w:sz="12" w:space="0" w:color="334155"/>'
            f'<w:top w:val="none"/>'
            f'<w:bottom w:val="none"/>'
            f'<w:right w:val="none"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(borders)
        
        pm = cell_m.paragraphs[0]
        pm.paragraph_format.space_before = Pt(0)
        pm.paragraph_format.space_after = Pt(1)
        rt = pm.add_run(f"{mod_title}\n")
        rt.font.name = "Arial"
        rt.font.size = Pt(8.5)
        rt.font.bold = True
        rt.font.color.rgb = RGBColor(15, 23, 42)
        
        rb = pm.add_run(mod_body)
        rb.font.name = "Calibri"
        rb.font.size = Pt(8)
        rb.font.color.rgb = RGBColor(51, 65, 85)
        
        doc.add_paragraph().paragraph_format.space_before = Pt(2)
        
    # 3. PROPOSED TECH STACK
    p_h3 = doc.add_paragraph()
    p_h3.paragraph_format.space_before = Pt(8)
    p_h3.paragraph_format.space_after = Pt(2)
    r_h3 = p_h3.add_run("3. PROPOSED TECH STACK & ARCHITECTURE")
    r_h3.font.name = "Georgia"
    r_h3.font.size = Pt(10.5)
    r_h3.font.bold = True
    r_h3.font.color.rgb = RGBColor(15, 23, 42)
    
    tbl_tech = doc.add_table(rows=6, cols=3)
    tbl_tech.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_tech.autofit = False
    
    t_widths = [Inches(1.8), Inches(1.8), Inches(3.2)]
    t_hdrs = ["LAYER", "TECHNOLOGY", "ENTERPRISE FUNCTION"]
    
    for c_idx, h_text in enumerate(t_hdrs):
        cell = tbl_tech.cell(0, c_idx)
        cell.width = t_widths[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(15, 23, 42), font_size=8, bg_hex="F1F5F9")
        
    tech_rows = [
        ("Frontend Application", "Next.js 15 (React 19, Tailwind CSS)", "Mobile-responsive PWA for field supervisors, drivers, and warehouse staff."),
        ("Backend API & Workflows", "Node.js (NestJS Architecture)", "Modular backend with strict transaction isolation and structured audit logging."),
        ("Database Engine", "PostgreSQL (ACID Compliant)", "Relational integrity ensuring zero double-bookings and immutable inventory ledgers."),
        ("Media & Evidence Vault", "Cloudflare R2 Object Storage", "Zero-egress cloud storage for damage photos, gatehouse proofs, and signed PDFs."),
        ("Automated SMS & Alerts", "Termii API Gateway", "High-delivery transactional SMS for dispatch alerts, gatehouse OTPs, and receipts.")
    ]
    
    for r_idx, (lyr, tch, fnc) in enumerate(tech_rows, start=1):
        for c_idx, txt in enumerate([lyr, tch, fnc]):
            cell = tbl_tech.cell(r_idx, c_idx)
            cell.width = t_widths[c_idx]
            bg = "FFFFFF" if r_idx % 2 == 1 else "F8FAFC"
            format_cell(cell, txt, bold=(c_idx == 0), color=RGBColor(51, 65, 85), font_size=8, bg_hex=bg)
            
    # 4. THIRD-PARTY INFRASTRUCTURE COSTS
    p_h4 = doc.add_paragraph()
    p_h4.paragraph_format.space_before = Pt(8)
    p_h4.paragraph_format.space_after = Pt(2)
    r_h4 = p_h4.add_run("4. ESTIMATED THIRD-PARTY INFRASTRUCTURE COSTS")
    r_h4.font.name = "Georgia"
    r_h4.font.size = Pt(10.5)
    r_h4.font.bold = True
    r_h4.font.color.rgb = RGBColor(15, 23, 42)
    
    p_infra_note = doc.add_paragraph()
    p_infra_note.paragraph_format.space_before = Pt(0)
    p_infra_note.paragraph_format.space_after = Pt(3)
    r_in = p_infra_note.add_run("(Paid directly by TPRS to infrastructure providers; zero agency markup added)")
    r_in.font.name = "Calibri"
    r_in.font.size = Pt(8)
    r_in.font.italic = True
    r_in.font.color.rgb = RGBColor(100, 116, 139)
    
    tbl_infra = doc.add_table(rows=5, cols=4)
    tbl_infra.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_infra.autofit = False
    
    i_widths = [Inches(2.2), Inches(1.3), Inches(1.5), Inches(1.8)]
    i_hdrs = ["COMPONENT", "PROVIDER", "ESTIMATED COST", "COVERAGE / ROLE"]
    
    for c_idx, h_text in enumerate(i_hdrs):
        cell = tbl_infra.cell(0, c_idx)
        cell.width = i_widths[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(15, 23, 42), font_size=8, bg_hex="F1F5F9")
        
    infra_rows = [
        ("Railway Cloud App & Database Server", "Railway.app", "$10 / month", "Next.js/Node.js app container, managed PostgreSQL DB, Redis cache & cron workers."),
        ("Cloudflare R2 Object Storage", "Cloudflare", "$0 – $5 / month", "Zero-egress photo vault for damage records, gatehouse proofs & signed PDFs."),
        ("Automated SMS & OTP Dispatch", "Termii", "Pay-As-You-Go (~₦5/SMS)", "SMS alerts for job assignments, gate-pass OTPs & client booking receipts."),
        ("Total Estimated Monthly Cloud Infrastructure", "All Providers", "~$10 / mo + pay-as-you-go SMS", "Lean cloud footprint.")
    ]
    
    for r_idx, (cmp, prv, cst, rol) in enumerate(infra_rows, start=1):
        for c_idx, txt in enumerate([cmp, prv, cst, rol]):
            cell = tbl_infra.cell(r_idx, c_idx)
            cell.width = i_widths[c_idx]
            bg = "F8FAFC" if r_idx == 4 else ("FFFFFF" if r_idx % 2 == 1 else "F8FAFC")
            col = RGBColor(15, 23, 42) if r_idx == 4 else RGBColor(51, 65, 85)
            format_cell(cell, txt, bold=(r_idx == 4 or c_idx in [0, 2]), color=col, font_size=8, bg_hex=bg)
            
    # 5. COMMERCIAL INVESTMENT & TIMELINE OPTIONS
    p_h5 = doc.add_paragraph()
    p_h5.paragraph_format.space_before = Pt(8)
    p_h5.paragraph_format.space_after = Pt(2)
    r_h5 = p_h5.add_run("5. COMMERCIAL INVESTMENT & DEPLOYMENT OPTIONS")
    r_h5.font.name = "Georgia"
    r_h5.font.size = Pt(10.5)
    r_h5.font.bold = True
    r_h5.font.color.rgb = RGBColor(15, 23, 42)
    
    tbl_opt = doc.add_table(rows=1, cols=2)
    tbl_opt.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_opt.autofit = False
    
    # Option A
    c_oa = tbl_opt.cell(0, 0)
    c_oa.width = Inches(3.4)
    set_cell_background(c_oa, "FFFFFF")
    set_cell_margins(c_oa, top=100, bottom=100, left=120, right=120)
    
    tcPr_a = c_oa._tc.get_or_add_tcPr()
    borders_a = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="12" w:space="0" w:color="0F172A"/>'
        f'<w:left w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'</w:tcBorders>'
    )
    tcPr_a.append(borders_a)
    
    poa = c_oa.paragraphs[0]
    ro1 = poa.add_run("OPTION A: COMPLETE SOP ENTERPRISE SUITE\n")
    ro1.font.name = "Arial"
    ro1.font.size = Pt(8.5)
    ro1.font.bold = True
    ro1.font.color.rgb = RGBColor(15, 23, 42)
    
    ro2 = poa.add_run("₦3,200,000\n")
    ro2.font.name = "Georgia"
    ro2.font.size = Pt(16)
    ro2.font.bold = True
    ro2.font.color.rgb = RGBColor(15, 23, 42)
    
    ro3 = poa.add_run("Timeline: 7 Weeks (49 Calendar Days)\n\n"
                    "Full implementation of Modules 1–5: Time-Windowed Equipment Vault, Fleet Logistics Desk, Mobile Digital Signatures, Gatehouse Tablet Security Desk, Photo Damage Vault, and COO Executive KPI Analytics.")
    ro3.font.name = "Calibri"
    ro3.font.size = Pt(8)
    ro3.font.color.rgb = RGBColor(51, 65, 85)
    
    # Option B
    c_ob = tbl_opt.cell(0, 1)
    c_ob.width = Inches(3.4)
    set_cell_background(c_ob, "F8FAFC")
    set_cell_margins(c_ob, top=100, bottom=100, left=120, right=120)
    
    tcPr_b = c_ob._tc.get_or_add_tcPr()
    borders_b = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:left w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'<w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>'
        f'</w:tcBorders>'
    )
    tcPr_b.append(borders_b)
    
    pob = c_ob.paragraphs[0]
    rb1 = pob.add_run("OPTION B: CORE OPERATIONS & INVENTORY ERP\n")
    rb1.font.name = "Arial"
    rb1.font.size = Pt(8.5)
    rb1.font.bold = True
    rb1.font.color.rgb = RGBColor(71, 85, 105)
    
    rb2 = pob.add_run("₦2,000,000\n")
    rb2.font.name = "Georgia"
    rb2.font.size = Pt(16)
    rb2.font.bold = True
    rb2.font.color.rgb = RGBColor(15, 23, 42)
    
    rb3 = pob.add_run("Timeline: 4 Weeks (28 Calendar Days)\n\n"
                    "Deployment of core asset reservation engine, booking calendar, warehouse issue/returns, basic fleet logging, and damage incident reporting. (Excludes digital customer signatures and gatehouse tablet portal).")
    rb3.font.name = "Calibri"
    rb3.font.size = Pt(8)
    rb3.font.color.rgb = RGBColor(51, 65, 85)
    
    doc.add_paragraph().paragraph_format.space_before = Pt(4)
    
    # Milestone Table
    tbl_ms = doc.add_table(rows=4, cols=5)
    tbl_ms.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_ms.autofit = False
    
    ms_widths = [Inches(1.8), Inches(0.8), Inches(1.1), Inches(1.1), Inches(2.0)]
    ms_hdrs = ["MILESTONE", "SPLIT", "OPTION A", "OPTION B", "DELIVERABLE / TRIGGER"]
    
    for c_idx, h_text in enumerate(ms_hdrs):
        cell = tbl_ms.cell(0, c_idx)
        cell.width = ms_widths[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(15, 23, 42), font_size=8, bg_hex="F1F5F9")
        
    ms_rows = [
        ("1. Mobilization Deposit", "50%", "₦1,600,000", "₦1,000,000", "Contract signing, database architecture, schema setup, UX wireframes & server provisioning."),
        ("2. Beta Staging Milestone", "30%", "₦960,000", "₦600,000", "Deployment to private staging server for departmental testing by operations and warehouse heads."),
        ("3. Final Handover & Training", "20%", "₦640,000", "₦400,000", "Production deployment, mobile PWA rollout, staff onboarding training, and documentation handover.")
    ]
    
    for r_idx, (mls, spl, oa, ob, trg) in enumerate(ms_rows, start=1):
        for c_idx, txt in enumerate([mls, spl, oa, ob, trg]):
            cell = tbl_ms.cell(r_idx, c_idx)
            cell.width = ms_widths[c_idx]
            bg = "FFFFFF" if r_idx % 2 == 1 else "F8FAFC"
            format_cell(cell, txt, bold=(c_idx in [0, 2, 3]), color=RGBColor(51, 65, 85), font_size=8, bg_hex=bg)
            
    # 6. CONTRACTUAL GUARANTEES
    p_h6 = doc.add_paragraph()
    p_h6.paragraph_format.space_before = Pt(8)
    p_h6.paragraph_format.space_after = Pt(2)
    r_h6 = p_h6.add_run("6. CONTRACTUAL GUARANTEES & IP OWNERSHIP")
    r_h6.font.name = "Georgia"
    r_h6.font.size = Pt(10.5)
    r_h6.font.bold = True
    r_h6.font.color.rgb = RGBColor(15, 23, 42)
    
    p_terms = doc.add_paragraph()
    p_terms.paragraph_format.space_before = Pt(0)
    p_terms.paragraph_format.space_after = Pt(6)
    r_tms = p_terms.add_run(
        "• 100% Client Intellectual Property Ownership: Upon receipt of final contractual settlement, 100% complete and unencumbered IP ownership of all source code, database schemas, and administrator credentials vests exclusively in The Party Rental Station (TPRS). Zero developer retention or ongoing royalties.\n"
        "• 12 Months Complimentary Technical Support: Includes 12 consecutive months of complimentary post-launch support strictly dedicated to server uptime surveillance, Railway infrastructure monitoring, and bug-fix maintenance for all agreed features."
    )
    r_tms.font.name = "Calibri"
    r_tms.font.size = Pt(8.5)
    
    # 7. BANK DETAILS
    tbl_bank = doc.add_table(rows=1, cols=2)
    tbl_bank.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_bank.autofit = False
    
    cb1 = tbl_bank.cell(0, 0)
    cb1.width = Inches(3.4)
    format_cell(
        cb1,
        "OFFICIAL BANK REMITTANCE:\nBank Name: Guaranty Trust Bank (GTBank)\nAccount Name: Sales Cowboy Marketing Solutions",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    cb2 = tbl_bank.cell(0, 1)
    cb2.width = Inches(3.4)
    format_cell(
        cb2,
        "NUBAN ACCOUNT NUMBER:\n3006086291\nCurrency: Nigerian Naira (NGN)",
        bold=True,
        color=RGBColor(15, 23, 42),
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    # 8. SIGNATURES
    doc.add_paragraph().paragraph_format.space_before = Pt(6)
    tbl_sig = doc.add_table(rows=1, cols=2)
    tbl_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_sig.autofit = False
    
    s_c1 = tbl_sig.cell(0, 0)
    s_c1.width = Inches(3.4)
    set_cell_background(s_c1, "FFFFFF")
    set_cell_margins(s_c1, top=80, bottom=80, left=80, right=80)
    p_s1 = s_c1.paragraphs[0]
    p_s1.add_run(
        "ISSUED FOR AND ON BEHALF OF:\n"
        "SALES COWBOY MARKETING SOLUTIONS\n\n\n"
        "_________________________________________\n"
        "Clinton Chukwunyere\n"
        "Lead Developer / Technical Director\n"
        "November 05, 2026"
    )
    p_s1.runs[0].font.name = "Calibri"
    p_s1.runs[0].font.size = Pt(8)
    
    s_c2 = tbl_sig.cell(0, 1)
    s_c2.width = Inches(3.4)
    set_cell_background(s_c2, "FFFFFF")
    set_cell_margins(s_c2, top=80, bottom=80, left=80, right=80)
    p_s2 = s_c2.paragraphs[0]
    p_s2.add_run(
        "ACCEPTED AND CONFIRMED (CLIENT):\n"
        "THE PARTY RENTAL STATION (TPRS)\n"
        "Selected Option: [ ] Option A    [ ] Option B\n\n"
        "_________________________________________\n"
        "Authorized Representative\n"
        "Designation: _____________________________\n"
        "Date: ___________________________________"
    )
    p_s2.runs[0].font.name = "Calibri"
    p_s2.runs[0].font.size = Pt(8)

    out_path = os.path.abspath("temp-nov/rental-company/TPRS-Centralized-Operations-ERP-Proposal.docx")
    doc.save(out_path)
    print(f"Generated Docx successfully at: {out_path}")

if __name__ == "__main__":
    create_tprs_proposal_docx()
