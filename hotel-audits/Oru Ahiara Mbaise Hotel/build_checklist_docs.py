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
    
    r_date = p_meta.add_run(f"DATE: {doc_date}\nSTATUS: ADVISORY")
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

def create_mbaise_checklist_docx():
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
        doc_badge="PRE-OPENING MASTER CHECKLIST",
        ref_num="CHK-MBAISE-2026-001",
        doc_date="November 06, 2026"
    )
    add_clean_divider(doc)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(2)
    r_main_title = p_title.add_run("NEW HOTEL PRE-LAUNCH & DIGITAL REVENUE MASTER CHECKLIST\n")
    r_main_title.font.name = "Georgia"
    r_main_title.font.size = Pt(15)
    r_main_title.font.bold = True
    r_main_title.font.color.rgb = RGBColor(15, 23, 42)
    
    r_subtitle = p_title.add_run("Operational, Local Search Dominance & Zero-OTA Commission Architecture for a Clean-Slate Launch")
    r_subtitle.font.name = "Arial"
    r_subtitle.font.size = Pt(9)
    r_subtitle.font.color.rgb = RGBColor(71, 85, 105)
    
    # Target Box
    tbl_client = doc.add_table(rows=1, cols=2)
    tbl_client.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_client.autofit = False
    
    c_c1 = tbl_client.cell(0, 0)
    c_c1.width = Inches(3.4)
    format_cell(
        c_c1,
        "TARGET PROPERTY:\nNew Hotel & Suites (Pre-Opening)\nLocation: Oru, Ahiara Mbaise, Imo State, Nigeria\nCorridor: Owerri-Umuahia Expressway / Ahiara Junction Axis",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    c_c2 = tbl_client.cell(0, 1)
    c_c2.width = Inches(3.4)
    format_cell(
        c_c2,
        "PREPARED BY (CONSULTING GROUP):\nSales Cowboy Marketing Solutions (Owerri Office)\n36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria\nContact: +234 810 493 3232 • hello@salescowboy.com.ng",
        bold=False,
        font_size=8.5,
        bg_hex="F8FAFC"
    )
    
    # Strategic Preamble
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(8)
    p_sp.paragraph_format.space_after = Pt(2)
    r_pr_h = p_sp.add_run("THE 'CLEAN SLATE' ADVANTAGE IN MBAISE\n")
    r_pr_h.font.name = "Georgia"
    r_pr_h.font.size = Pt(10.5)
    r_pr_h.font.bold = True
    r_pr_h.font.color.rgb = RGBColor(15, 23, 42)
    
    r_pr_b = p_sp.add_run(
        "Opening a brand-new hotel in Oru, Ahiara Mbaise means you have zero legacy errors, bad reviews, or broken software to fix. Mbaise is one of Nigeria's wealthiest diaspora corridors with massive seasonal influxes (Iri Ji Mbaise in August, festive weddings in December, Easter, burials). By launching with this checklist, your hotel will capture 100% direct guest payments with 0% OTA commission loss, automated 24/7 WhatsApp room sales, and Day-1 5-star Google review authority."
    )
    r_pr_b.font.name = "Calibri"
    r_pr_b.font.size = Pt(8.5)
    r_pr_b.font.color.rgb = RGBColor(51, 65, 85)
    
    # Checklist Phases
    phases = [
        ("PHASE 1: BRAND IDENTITY, NAMING & STATUTORY FOUNDATION (T-minus 60 Days)",
         "[ ] Brand Naming & Domain Check: Verify name uniqueness and register .com / .com.ng domain.\n"
         "[ ] CAC Corporate Registration: Register entity with Corporate Affairs Commission for banking and tax compliance.\n"
         "[ ] Corporate Visual Identity: High-res logo suite, brand typography, signboards, staff uniform badges, and linen embroidery.\n"
         "[ ] Commercial Banking (NUBAN): Open dedicated corporate accounts with Paystack merchant settlement profiles."),
         
        ("PHASE 2: GOOGLE MAPS & LOCAL SEARCH DOMINANCE (T-minus 45 Days)",
         "[ ] Google Business Profile (GBP) Creation: Drop exact GPS pin in Oru, Ahiara Mbaise along expressway approach.\n"
         "[ ] Address Verification: Complete video/postcard verification before grand opening to ensure Day-1 search ranking.\n"
         "[ ] Core Amenities Tagging: Standby 24/7 Generator, AC Suites, Gated Security, Restaurant, Bar, Complimentary Breakfast.\n"
         "[ ] Geo-Tagged Photography: Upload 25+ high-res architectural photos tagged to Ahiara Mbaise coordinates."),
         
        ("PHASE 3: DIRECT BOOKING WEBSITE & ZERO-COMMISSION ENGINE (T-minus 30 Days)",
         "[ ] Mobile-First Direct Booking Site: High-speed 5-8 page website showcasing room types, suite tariffs, and event halls.\n"
         "[ ] Paystack / Monnify Checkout: Direct online card, USSD, and bank transfer checkout landing 100% in your corporate account.\n"
         "[ ] Eliminate 20% OTA Commission: Prevent ₦3,000 to ₦6,000 commission losses per room night to Hotels.ng & Booking.com.\n"
         "[ ] Google Analytics 4 & Search Console: Setup tracking for visitor traffic from Lagos, Abuja, Owerri, and diaspora."),
         
        ("PHASE 4: 24/7 AUTONOMOUS WHATSAPP AI CONCIERGE BOT (T-minus 25 Days)",
         "[ ] Official WhatsApp Business API: Connect dedicated hotel line with sub-15 second automated response speed.\n"
         "[ ] Autonomous Room Sales: Bot sends room photos, live tariffs, bar/kitchen menus, and check-in policies inside WhatsApp.\n"
         "[ ] Instant Payment Link Dispatch: Dispatches Paystack payment links in chat and issues instant booking vouchers.\n"
         "[ ] Late-Night Arrival Notification: Automatically alerts front-desk staff when midnight travelers are en route."),
         
        ("PHASE 5: CLOUD PROPERTY MANAGEMENT SYSTEM (PMS) & MULTI-POS (T-minus 20 Days)",
         "[ ] Visual Room Rack Calendar: Interactive cloud availability grid (Available, Occupied, Dirty, Maintenance).\n"
         "[ ] Multi-Outlet POS Billing: Direct bar and restaurant drink/meal billing charged to guest room folio.\n"
         "[ ] Multi-Channel OTA Sync: 2-way sync with Booking.com and Airbnb so direct bookings automatically block OTA calendars.\n"
         "[ ] Daily Cashier Night Audit: Automated daily revenue reports reconciling cash, POS machines, and online transfers."),
         
        ("PHASE 6: FRONT-DESK REVIEW ACCELERATION SYSTEM (T-minus 15 Days)",
         "[ ] Acrylic NFC + QR Review Stands: Custom heavy-duty branded review stands on reception desk, bar, and executive suites.\n"
         "[ ] Smart 2-Way Review Gateway: Routes 5-star guests directly to Google Maps; diverts critical feedback privately to GM.\n"
         "[ ] Automated Post-Checkout Follow-Up: WhatsApp thank-you message delivered 2 hours after checkout with review link.\n"
         "[ ] Staff Incentive Matrix: ₦500 bonus for receptionists for every verified 5-star review mentioning their service."),
         
        ("PHASE 7: PHYSICAL WAYFINDING & TRANSIT SIGNAGE (T-minus 15 Days)",
         "[ ] Ahiara Junction Approach Billboard: Clear directional signage at the major junction indicating distance and turnoff.\n"
         "[ ] Oru Feeder Road Directional Signage: Reflective markers along the access road eliminating traveler confusion.\n"
         "[ ] Perimeter Gate Illuminated Signage: Floodlit / backlit exterior corporate gate sign visible to night motorists."),
         
        ("PHASE 8: LAUNCH MARKETING & DIASPORA/WEDDING CAMPAIGN (T-minus 10 Days)",
         "[ ] 4K Facility Video Shoot: Professional video reels highlighting suites, bar ambiance, and chef delicacies.\n"
         "[ ] Event Planner Database Outreach: Connect with wedding planners and church diocesan coordinators across Mbaise.\n"
         "[ ] Targeted Meta Ad Blitz: Run Facebook/Instagram ads targeting Mbaise indigenes in Lagos, Abuja, PH, and abroad.")
    ]
    
    for title, desc in phases:
        tbl_p = doc.add_table(rows=1, cols=1)
        tbl_p.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl_p.autofit = False
        cell_p = tbl_p.cell(0, 0)
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
        
    # Summary Table
    p_h = doc.add_paragraph()
    p_h.paragraph_format.space_before = Pt(8)
    p_h.paragraph_format.space_after = Pt(2)
    r_h = p_h.add_run("SALES COWBOY TURNKEY DEPLOYMENT PACKAGES")
    r_h.font.name = "Georgia"
    r_h.font.size = Pt(10)
    r_h.font.bold = True
    r_h.font.color.rgb = RGBColor(15, 23, 42)
    
    tbl_t = doc.add_table(rows=6, cols=3)
    tbl_t.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_t.autofit = False
    
    t_widths = [Inches(2.0), Inches(3.6), Inches(1.2)]
    t_hdrs = ["COMPONENT", "DELIVERABLES", "TIMELINE"]
    
    for c_idx, h_text in enumerate(t_hdrs):
        cell = tbl_t.cell(0, c_idx)
        cell.width = t_widths[c_idx]
        format_cell(cell, h_text, bold=True, color=RGBColor(15, 23, 42), font_size=8, bg_hex="F1F5F9")
        
    t_rows = [
        ("1. Direct Booking Website", "5-8 Custom Pages, Room Catalog, Paystack/Monnify Checkout, Domain & 1 Yr Cloud Hosting", "7 Days"),
        ("2. 24/7 WhatsApp AI Bot", "Official WhatsApp API, Automated Room Photos, Rates, Payment Links & Vouchers", "7 Days"),
        ("3. Google Business Profile", "Complete GBP Setup, Map Pin Drop, Verification & Geo-Tagged Photo Curation", "5 Days"),
        ("4. Smart Review QR Stands", "2x Custom Acrylic Front-Desk Stands (NFC + Dynamic QR) & Negative Review Gatekeeper", "5 Days"),
        ("5. Cloud Hotel PMS Software", "Room Rack Calendar, Front-Desk Check-In/Out, Bar/Restaurant POS & Multi-Channel Sync", "14 Days")
    ]
    
    for r_idx, (cmp, dls, tml) in enumerate(t_rows, start=1):
        for c_idx, txt in enumerate([cmp, dls, tml]):
            cell = tbl_t.cell(r_idx, c_idx)
            cell.width = t_widths[c_idx]
            bg = "FFFFFF" if r_idx % 2 == 1 else "F8FAFC"
            format_cell(cell, txt, bold=(c_idx == 0), color=RGBColor(51, 65, 85), font_size=8, bg_hex=bg)
            
    # Footer info
    doc.add_paragraph().paragraph_format.space_before = Pt(8)
    p_close = doc.add_paragraph()
    p_close.paragraph_format.space_before = Pt(2)
    p_close.paragraph_format.space_after = Pt(2)
    r_cl = p_close.add_run(
        "SALES COWBOY MARKETING SOLUTIONS\n"
        "Hospitality Revenue Engineering & Systems Group\n"
        "36, Arochukwu Street, Uratta East, Owerri North, Imo, Nigeria\n"
        "Direct Line: +234 810 493 3232 • Email: hello@salescowboy.com.ng • salescowboy.com.ng"
    )
    r_cl.font.name = "Calibri"
    r_cl.font.size = Pt(8)
    r_cl.font.color.rgb = RGBColor(100, 116, 139)

    out_path = os.path.abspath("hotel-audits/Oru Ahiara Mbaise Hotel/New-Hotel-Pre-Launch-Master-Checklist-Ahiara-Mbaise.docx")
    doc.save(out_path)
    print(f"Generated Docx successfully at: {out_path}")

if __name__ == "__main__":
    create_mbaise_checklist_docx()

