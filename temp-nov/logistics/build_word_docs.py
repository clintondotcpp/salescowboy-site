import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def set_cell_background(cell, hex_color):
    """Set the background color of a table cell."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Set internal cell margins (padding) in dxa (1 pt = 20 dxa)."""
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

def add_header_letterhead(doc, doc_badge, ref_num, doc_date, contract_total):
    """Create a standardized executive letterhead banner matching the site template."""
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
    
    run_tagline = p.add_run("Marketing Solutions • Enterprise Web & Mobile Engineering\n")
    run_tagline.font.name = "Arial"
    run_tagline.font.size = Pt(8.5)
    run_tagline.font.bold = True
    run_tagline.font.color.rgb = RGBColor(204, 160, 102) # #CCA066
    
    run_addr = p.add_run(
        "Ama-wire Ishi-Uzo, Roadsafety Junction, Egbu Road, Owerri, Imo state\n"
        "hello@salescowboy.com.ng • +234 810 493 3232 / +234 912 309 6853"
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
    r_badge.font.color.rgb = RGBColor(180, 83, 9)
    
    r_ref = p_meta.add_run(f"REF: {ref_num}\n")
    r_ref.font.name = "Calibri"
    r_ref.font.size = Pt(9)
    r_ref.font.bold = True
    r_ref.font.color.rgb = RGBColor(15, 23, 42)
    
    r_date = p_meta.add_run(f"DATE: {doc_date}\n")
    r_date.font.name = "Calibri"
    r_date.font.size = Pt(8.5)
    r_date.font.color.rgb = RGBColor(71, 85, 105)
    
    r_tot = p_meta.add_run(f"TOTAL: {contract_total}")
    r_tot.font.name = "Calibri"
    r_tot.font.size = Pt(9)
    r_tot.font.bold = True
    r_tot.font.color.rgb = RGBColor(124, 74, 30)
    
    # Separator rule
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
    """Add a shaded callout note box with a left accent bar."""
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

def add_parties_grid(doc, client_name, client_rep, client_loc, dev_name, dev_rep, dev_loc):
    """Add side-by-side Prepared By / Prepared For boxes."""
    tbl = doc.add_table(rows=1, cols=2)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    # Developer
    c_dev = tbl.cell(0, 0)
    c_dev.width = Inches(3.35)
    set_cell_background(c_dev, "F8FAFC")
    set_cell_margins(c_dev, top=120, bottom=120, left=140, right=140)
    
    tcPr = c_dev._tc.get_or_add_tcPr()
    tcPr.append(parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:color="E2E8F0"/><w:left w:val="single" w:sz="6" w:color="E2E8F0"/><w:bottom w:val="single" w:sz="6" w:color="E2E8F0"/><w:right w:val="single" w:sz="6" w:color="E2E8F0"/></w:tcBorders>'))
    
    p_dev = c_dev.paragraphs[0]
    p_dev.paragraph_format.space_after = Pt(2)
    r1 = p_dev.add_run("PREPARED BY (DEVELOPER)\n")
    r1.font.size = Pt(8.5)
    r1.font.bold = True
    r1.font.color.rgb = RGBColor(124, 74, 30)
    
    r2 = p_dev.add_run(f"{dev_name}\n")
    r2.font.size = Pt(10)
    r2.font.bold = True
    r2.font.color.rgb = RGBColor(15, 23, 42)
    
    r3 = p_dev.add_run(f"Representative: {dev_rep}\nPrincipal Office: {dev_loc}\nAccount: GTBank 3006086291")
    r3.font.size = Pt(8.5)
    r3.font.color.rgb = RGBColor(71, 85, 105)
    
    # Client
    c_cli = tbl.cell(0, 1)
    c_cli.width = Inches(3.35)
    set_cell_background(c_cli, "F8FAFC")
    set_cell_margins(c_cli, top=120, bottom=120, left=140, right=140)
    
    tcPr2 = c_cli._tc.get_or_add_tcPr()
    tcPr2.append(parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:color="E2E8F0"/><w:left w:val="single" w:sz="6" w:color="E2E8F0"/><w:bottom w:val="single" w:sz="6" w:color="E2E8F0"/><w:right w:val="single" w:sz="6" w:color="E2E8F0"/></w:tcBorders>'))
    
    p_cli = c_cli.paragraphs[0]
    p_cli.paragraph_format.space_after = Pt(2)
    r4 = p_cli.add_run("PREPARED FOR (CLIENT)\n")
    r4.font.size = Pt(8.5)
    r4.font.bold = True
    r4.font.color.rgb = RGBColor(180, 83, 9)
    
    r5 = p_cli.add_run(f"{client_name}\n")
    r5.font.size = Pt(10)
    r5.font.bold = True
    r5.font.color.rgb = RGBColor(15, 23, 42)
    
    r6 = p_cli.add_run(f"Attention: {client_rep}\nOperational Base: {client_loc}\nProject Role: Platform Owner & Principal")
    r6.font.size = Pt(8.5)
    r6.font.color.rgb = RGBColor(71, 85, 105)
    
    p_spacer = doc.add_paragraph()
    p_spacer.paragraph_format.space_before = Pt(4)
    p_spacer.paragraph_format.space_after = Pt(6)

def add_signature_block(doc, client_company, client_rep, client_title, client_date, dev_company, dev_rep, dev_title, dev_date):
    """Add formal side-by-side execution signature boxes."""
    p_head = doc.add_paragraph()
    p_head.paragraph_format.space_before = Pt(14)
    p_head.paragraph_format.space_after = Pt(6)
    r = p_head.add_run("FORMAL EXECUTION & CONTRACTUAL ACKNOWLEDGEMENT")
    r.font.name = "Calibri"
    r.font.size = Pt(10)
    r.font.bold = True
    r.font.color.rgb = RGBColor(124, 74, 30)
    
    tbl = doc.add_table(rows=1, cols=2)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    # Client block
    c1 = tbl.cell(0, 0)
    c1.width = Inches(3.35)
    set_cell_background(c1, "F8FAFC")
    set_cell_margins(c1, top=140, bottom=140, left=140, right=140)
    tcPr1 = c1._tc.get_or_add_tcPr()
    tcPr1.append(parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:color="CBD5E1"/><w:left w:val="single" w:sz="6" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="6" w:color="CBD5E1"/><w:right w:val="single" w:sz="6" w:color="CBD5E1"/></w:tcBorders>'))
    
    p1 = c1.paragraphs[0]
    p1.paragraph_format.space_after = Pt(2)
    r_lbl1 = p1.add_run("ACCEPTED & CONFIRMED (CLIENT):\n")
    r_lbl1.font.size = Pt(8.5)
    r_lbl1.font.bold = True
    r_lbl1.font.color.rgb = RGBColor(100, 116, 139)
    
    r_comp1 = p1.add_run(f"{client_company}\n\n")
    r_comp1.font.size = Pt(10)
    r_comp1.font.bold = True
    r_comp1.font.color.rgb = RGBColor(15, 23, 42)
    
    p1_sig = c1.add_paragraph()
    p1_sig.paragraph_format.space_after = Pt(2)
    p1_sig.add_run("Signature: _____________________________________\n\n")
    p1_sig.add_run(f"Name: {client_rep}\nTitle: {client_title}\nDate: {client_date}")
    for run in p1_sig.runs:
        run.font.name = "Calibri"
        run.font.size = Pt(9)
        run.font.color.rgb = RGBColor(71, 85, 105)
        
    # Developer block
    c2 = tbl.cell(0, 1)
    c2.width = Inches(3.35)
    set_cell_background(c2, "F8FAFC")
    set_cell_margins(c2, top=140, bottom=140, left=140, right=140)
    tcPr2 = c2._tc.get_or_add_tcPr()
    tcPr2.append(parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:color="CBD5E1"/><w:left w:val="single" w:sz="6" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="6" w:color="CBD5E1"/><w:right w:val="single" w:sz="6" w:color="CBD5E1"/></w:tcBorders>'))
    
    p2 = c2.paragraphs[0]
    p2.paragraph_format.space_after = Pt(2)
    r_lbl2 = p2.add_run("ISSUED BY & ON BEHALF OF (DEVELOPER):\n")
    r_lbl2.font.size = Pt(8.5)
    r_lbl2.font.bold = True
    r_lbl2.font.color.rgb = RGBColor(100, 116, 139)
    
    r_comp2 = p2.add_run(f"{dev_company}\n\n")
    r_comp2.font.size = Pt(10)
    r_comp2.font.bold = True
    r_comp2.font.color.rgb = RGBColor(15, 23, 42)
    
    p2_sig = c2.add_paragraph()
    p2_sig.paragraph_format.space_after = Pt(2)
    p2_sig.add_run("Signature: _____________________________________\n\n")
    p2_sig.add_run(f"Name: {dev_rep}\nTitle: {dev_title}\nDate: {dev_date}")
    for run in p2_sig.runs:
        run.font.name = "Calibri"
        run.font.size = Pt(9)
        run.font.color.rgb = RGBColor(71, 85, 105)


def generate_agreement_docx():
    """Build PROJECT54 Software Development Agreement Word Document."""
    doc = docx.Document()
    
    # Page setup - 1 inch margins
    sections = doc.sections
    for s in sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.85)
        s.right_margin = Inches(0.85)
        
    add_header_letterhead(
        doc,
        doc_badge="Bilateral Contractual Instrument",
        ref_num="SCM-AGR-2026-P54-1.5M",
        doc_date="November 2, 2026",
        contract_total="₦1,500,000 NGN"
    )
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(4)
    p_title.paragraph_format.space_after = Pt(2)
    r_t = p_title.add_run("SOFTWARE DEVELOPMENT AGREEMENT")
    r_t.font.name = "Georgia"
    r_t.font.size = Pt(16)
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(15, 23, 42)
    
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(10)
    r_sub = p_sub.add_run("Unified Logistics, Bank-Factored Haulage Transaction Engine, Accredited GIT Insurance Desk, In-App Disintermediation Chat, Consultant Licensing & Fleet Equipment Ecosystem")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(10.5)
    r_sub.font.color.rgb = RGBColor(100, 116, 139)
    
    # Preamble & Parties
    p_pre = doc.add_paragraph()
    p_pre.paragraph_format.space_after = Pt(6)
    r_pre = p_pre.add_run("THIS SOFTWARE DEVELOPMENT AGREEMENT is made and entered into on this 2nd day of November, 2026 (\"Effective Date\"), by and between:")
    r_pre.font.name = "Calibri"
    r_pre.font.size = Pt(10)
    r_pre.font.bold = True
    
    # Parties Callout
    parties_text = [
        "1. CLIENT: PROJECT54 ENTREPRENEURS, a corporate entity registered under the laws of the Federal Republic of Nigeria, having its principal operational base in Lagos, Nigeria, represented herein by its Lead Executive / Managing Director, Mr Lawson Israel (hereinafter referred to as the \"Client\", which expression shall where the context so admits include its successors-in-title, subsidiaries, and assigns) of the first part; and",
        "2. DEVELOPER: SALES COWBOY MARKETING SOLUTIONS, having its principal office at Ama-wire Ishi-Uzo, Roadsafety Junction, Egbu Road, Owerri, Imo state, represented herein by its Lead Technical Director, Clinton Chukwunyere (hereinafter referred to as the \"Developer\", which expression shall where the context so admits include its successors-in-title and assigns) of the second part."
    ]
    add_callout_box(doc, "CONTRACTUAL PARTIES", parties_text, bg_color="F8FAFC", border_color="7C4A1E")
    
    # Recitals
    p_rec = doc.add_paragraph()
    p_rec.paragraph_format.space_after = Pt(6)
    r_rec_head = p_rec.add_run("RECITALS:\n")
    r_rec_head.font.bold = True
    r_rec_head.font.size = Pt(10.5)
    r_rec_head.font.color.rgb = RGBColor(124, 74, 30)
    
    r_rec_body = p_rec.add_run(
        "A. The Developer is an enterprise digital engineering firm specializing in high-concurrency transactional portals, logistics dispatch architectures, escrow financial ledgers, and automated state-machine countdown engines.\n"
        "B. The Client desires to retain the Developer to design, engineer, test, and deploy an enterprise Unified Logistics, Bank-Factored Haulage Transaction Engine, Accredited GIT Insurance Desk, In-App Disintermediation Chat, Consultant Licensing & Fleet Equipment Ecosystem (the \"Platform\"), comprising specialized Contractor, Transporter, Consultant, Insurer, Financier (Bank), and Master Administrative web and mobile interfaces, pursuant to the terms and specifications set forth herein and in Schedule A.\n\n"
        "NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows:"
    )
    r_rec_body.font.name = "Calibri"
    r_rec_body.font.size = Pt(10)
    r_rec_body.font.color.rgb = RGBColor(51, 65, 85)
    
    # Articles
    articles = [
        (
            "ARTICLE 1: SCOPE OF WORK & SYSTEM MODULES",
            [
                ("1.1 System Modules:", "The Client hereby engages the Developer to design, develop, test, and deploy the Platform across the following eight (8) core functional modules as detailed in Schedule A (Technical & Commercial Proposal):"),
                ("• Module 1: Consultant Onboarding & Quota Desk:", "Paid consultant licensing engine with Paystack/Moniepoint activation checkout, closed-loop referral system (contractors and transporters register exclusively via unique consultant invite links), dynamic admin-configured active client quota caps, and automated commission routing on trips, leases, and vehicle sales into consultant wallets."),
                ("• Module 2: Contractor & Job Dispatch Hub:", "Structured haulage manifests with geofenced loading/offloading coordinates, vehicle specifications, tonnage, and GIT insurance verification; real-time capacity decrementing countdown logic as transporters commit trucks; and automated 24-hour Expression of Interest (EOI) expiration timers."),
                ("• Module 3: Transporter Fleet Vault & 48-Hour Gate-In Clock:", "Comprehensive vehicle profiling with mandatory 360-degree truck walk-around video proof uploads, driver commercial licenses, proofs of ownership, and verified bank accounts (NUBAN). Upon contractor acceptance of a truck commitment, an immutable 48-Hour Depletion Clock state machine triggers with automated notifications (T-24h, T-12h, T-2h). If the allocated vehicle fails to arrive at the depot and verify gate-in (via GPS geofencing within 150m, depot security QR scan, or digital check-in) before the 48-hour clock hits zero (00:00:00), the system automatically revokes the allocation without penalty to the contractor, returns the capacity to the open dispatch marketplace, and logs a strike against the defaulting transporter. Incorporates Dual-Stage Waybill Verification (Stage 1 Loading Waybill with weighbridge receipt triggering initial advance; Stage 2 Proof of Offloading / e-POD triggering multi-way balance payout)."),
                ("• Module 4: Secure In-App Chat & Anti-Circumvention Engine (Disintermediation Shield):", "Real-time in-app messaging between contractors and assigned truckers scoped strictly to active manifests for dock status, ETA, and directions. Fortified with an automated regex filter that proactively detects, redacts, or blocks personal phone numbers (including Nigerian prefixes: 080, 081, 070, 090, 091, +234, spelled-out digits), personal emails, WhatsApp links, bank account numbers (NUBAN), and external URLs to prevent platform disintermediation and preserve 100% platform retention."),
                ("• Module 5: Accredited GIT Insurance Underwriting & Claims Desk:", "Direct institutional onboarding for licensed Goods-in-Transit (GIT) insurance companies to issue instant digital trip policies and certificates bound to each manifest before dispatch. Dynamic risk premium matrix based on cargo category, distance, and goods valuation with automated at-source premium deduction via the split settlement engine, plus digital claims vault for rapid claim reconciliation."),
                ("• Module 6: Bank & Institutional Financing (Factoring) Desk:", "Contractor-to-Bank financing invitations governed by an automated 5-day expiry state machine (strictly capped at one resend); secure financier underwriting desk granting accredited banks direct audit access to verified waybills; and automated multi-way split deductions."),
                ("• Module 7: Heavy Equipment Leasing Engine:", "Full 14-step industrial machinery charter workflow (cranes, excavators, forklifts, lowbeds, barges) with mandatory 360-degree video inspection archives, lease contracts, and caution deposit escrow."),
                ("• Module 8: Automobile & Heavy-Duty E-Commerce Marketplace:", "B2B classified catalog for prime movers, flatbeds, tippers, and genuine components backed by inspection-based escrow settlement."),
                ("1.2 Scope Modifications:", "Any major new feature requested after the execution of this Agreement that falls outside Schedule A shall be governed by a formal written Change Request (CR).")
            ]
        ),
        (
            "ARTICLE 2: TOTAL DEVELOPMENT INVESTMENT & PAYMENT SCHEDULE",
            [
                ("2.1 Total Investment:", "The total all-inclusive development fee for the complete design, engineering, testing, and deployment of the Platform is One Million, Five Hundred Thousand Naira Only (₦1,500,000)."),
                ("2.2 Milestone Schedule:", "The Client shall remit payment across two (2) contractual milestones:\n• Fifty Percent (50% / ₦750,000) initial mobilization deposit upon execution of this Agreement to commence systems architecture, database schema design, consultant licensing engine, geofencing logic, and UI/UX designs across all portals (Weeks 1 – 2);\n• Fifty Percent (50% / ₦750,000) final settlement payable after two (2) months of verified functional operational use following successful mobile app upload and live deployment on Google Play and Apple App Store (post-launch operational validation)."),
                ("2.3 Rapid 4-Week Delivery Roadmap:", "The total project delivery timeline is four (4) weeks (twenty-eight [28] calendar days) from the Effective Date, contingent upon timely client feedback, document approvals, and milestone settlements. Invoices unpaid seven (7) business days past their due date shall entitle the Developer to pause active development until settled."),
                ("2.4 Bank Remittance Details:", "Guaranty Trust Bank (GTBank) • Account Name: Sales Cowboy Marketing Solutions • Account Number: 3006086291")
            ]
        ),
        (
            "ARTICLE 3: APP RUNNING FEES & THIRD-PARTY INFRASTRUCTURE",
            [
                ("3.1 Direct Third-Party Funding:", "The Client is solely responsible for funding recurring third-party cloud infrastructure and operational expenses required to operate the Platform, estimated at:"),
                ("• Railway Cloud Infrastructure:", "~$10 – $20 / month (handles backend API, Redis queues, managed PostgreSQL database, and high-volume video proof & document storage bucket);"),
                ("• Automated SMS & OTP Dispatch (Termii):", "Pay-as-you-go (~₦5 per notification / SMS);"),
                ("• Payment Processing (Paystack / Moniepoint):", "Standard 1.5% fee capped at ₦2,000 per local transaction;"),
                ("• App Store Submissions:", "Google Play Console ($25 one-time), Apple Developer Program ($99/year).")
            ]
        ),
        (
            "ARTICLE 4: COMPLETE INTELLECTUAL PROPERTY OWNERSHIP",
            [
                ("4.1 100% Client Ownership:", "The Client shall own 100% complete, exclusive, and unencumbered Intellectual Property (IP) rights in the Platform. Upon receipt of full and final payment (₦1,500,000), all right, title, and interest in and to the Platform—including all custom source code, frontend and backend architectures, database schemas, API interfaces, state-machine timer algorithms, UI/UX designs, visual assets, documentation, and technical deliverables—shall vest completely and exclusively in PROJECT54 ENTREPRENEURS."),
                ("4.2 Absolute Transfer & Waiver:", "The Developer waives and transfers all claims, proprietary rights, and title therein to the Client. Upon final milestone settlement, the Developer shall execute complete handover of all Git source code repositories, master administrative credentials, server deployment scripts, and database access keys directly to the Client, free of any ongoing licensing restrictions, royalties, or developer encumbrances.")
            ]
        ),
        (
            "ARTICLE 5: OPERATIONAL, FACTORING & REGULATORY DISCLAIMERS",
            [
                ("5.1 Bank Factoring & Credit Underwriting:", "The Platform provides technical software infrastructure (invitation state machines, document viewer desks, and automated multi-way split payment calculations) to facilitate freight financing. The Developer is not a financial institution, credit broker, or lending entity. All underwriting decisions, interest rates, factoring agreements, and credit recovery risks remain exclusively between participating financial institutions and the Client/Contractors."),
                ("5.2 Goods-in-Transit (GIT) Insurance:", "The Platform provides digital API integration and split settlement capabilities for accredited third-party insurance underwriters to issue policies and review claims documentation. The Developer is not an insurance underwriter or insurance broker. Policy terms, risk assessment, insurable interest validation, premium schedules, and actual claim payouts remain exclusively between underwriters and insured parties."),
                ("5.3 Transporter Verification & Roadworthiness:", "The Platform enforces digital compliance requirements (upload of driver licenses, hackney permits, GIT certificates, and truck video proofs). The Client remains solely responsible for the physical inspection, mechanical roadworthiness, cargo security, and transit safety of contracted vehicles."),
                ("5.4 In-App Messaging & Circumvention Enforcement:", "The Platform incorporates automated algorithmic keyword and regex filtering to obfuscate personal contact details and prevent disintermediation between truckers and contractors. While the Developer engineers robust anti-circumvention filters, the Client is responsible for enforcing platform terms of service and executing merchant compliance sanctions."),
                ("5.5 Statutory Tax Accounting:", "The Platform automates calculation of Value Added Tax (VAT at 7.5%) and Withholding Tax (WHT at 5%) on brokerage and consultant fees. The Client remains solely responsible for corporate haulage permits and timely filing of tax returns with government authorities (FIRS/NRS, SCUML).")
            ]
        ),
        (
            "ARTICLE 6: ACCEPTANCE TESTING, WARRANTY & TECHNICAL SUPPORT",
            [
                ("6.1 Inspection Window:", "Upon staging milestone delivery, the Client shall have seven (7) business days to inspect deliverables and report any reproducible software bugs deviating from Schedule A."),
                ("6.2 12-Month Complimentary Support & Bug-Fix Maintenance:", "The Developer shall provide twelve (12) months of complimentary post-launch technical support and maintenance commencing from live production launch. This support is strictly confined to system monitoring, server uptime surveillance, database integrity checks, background worker queue health, and resolving existing bugs within Schedule A. It expressly excludes the design or deployment of new features, which shall be governed by separate written Change Requests (CRs)."),
                ("6.3 Post-Warranty Annual Support Retainer (₦800,000 / Year):", "Following the expiration of the initial twelve (12) months of complimentary support, the Client may retain the Developer for ongoing annual enterprise technical support, system surveillance, background job queue monitoring, database maintenance, and bug-fix warranty at an agreed retainer fee of Eight Hundred Thousand Naira Only (₦800,000 / year), payable annually in advance by the Client.")
            ]
        ),
        (
            "ARTICLE 7: LIMITATION OF LIABILITY & GOVERNING LAW",
            [
                ("7.1 Liability Cap:", "The Developer's maximum aggregate liability under this Agreement, whether in contract, tort, or otherwise, shall not exceed the total fees actually paid by the Client under this Agreement."),
                ("7.2 Governing Law & Dispute Resolution:", "This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising under or in connection with this Agreement not resolved amicably within fourteen (14) days shall be referred to mediation or arbitration in accordance with the Arbitration and Mediation Act, 2023.")
            ]
        )
    ]
    
    for art_title, clauses in articles:
        p_art = doc.add_paragraph()
        p_art.paragraph_format.space_before = Pt(12)
        p_art.paragraph_format.space_after = Pt(4)
        r_art = p_art.add_run(art_title)
        r_art.font.name = "Georgia"
        r_art.font.size = Pt(11)
        r_art.font.bold = True
        r_art.font.color.rgb = RGBColor(124, 74, 30)
        
        for c_title, c_body in clauses:
            p_c = doc.add_paragraph()
            p_c.paragraph_format.space_before = Pt(2)
            p_c.paragraph_format.space_after = Pt(4)
            r_ct = p_c.add_run(c_title + " ")
            r_ct.font.name = "Calibri"
            r_ct.font.size = Pt(9.5)
            r_ct.font.bold = True
            r_ct.font.color.rgb = RGBColor(15, 23, 42)
            
            r_cb = p_c.add_run(c_body)
            r_cb.font.name = "Calibri"
            r_cb.font.size = Pt(9.5)
            r_cb.font.color.rgb = RGBColor(51, 65, 85)
            
    # Formal Signoff Block
    add_signature_block(
        doc,
        client_company="PROJECT54 ENTREPRENEURS",
        client_rep="Mr Lawson Israel",
        client_title="Lead Executive / Managing Director",
        client_date="November 2, 2026",
        dev_company="SALES COWBOY MARKETING SOLUTIONS",
        dev_rep="Clinton Chukwunyere",
        dev_title="Lead Technical Director",
        dev_date="November 2, 2026"
    )
    
    out_path = os.path.abspath("temp-nov/logistics/PROJECT54-Logistics-Software-Development-Agreement.docx")
    doc.save(out_path)
    print(f"[SUCCESS] Agreement Word Doc saved: {out_path}")


def generate_proposal_docx():
    """Build PROJECT54 Technical & Commercial Proposal Word Document."""
    doc = docx.Document()
    
    # Page setup - 1 inch margins
    sections = doc.sections
    for s in sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.85)
        s.right_margin = Inches(0.85)
        
    add_header_letterhead(
        doc,
        doc_badge="Commercial & Technical Proposal",
        ref_num="SCM-PROP-2026-P54-1.5M",
        doc_date="November 2, 2026",
        contract_total="₦1,500,000 NGN"
    )
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(4)
    p_title.paragraph_format.space_after = Pt(2)
    r_t = p_title.add_run("TECHNICAL & COMMERCIAL PROPOSAL")
    r_t.font.name = "Georgia"
    r_t.font.size = Pt(16)
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(15, 23, 42)
    
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(8)
    r_sub = p_sub.add_run("Unified Logistics, Bank-Factored Haulage Transaction Engine, Accredited GIT Insurance Underwriting Desk, In-App Anti-Circumvention Chat & Fleet Equipment Ecosystem")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(10.5)
    r_sub.font.color.rgb = RGBColor(100, 116, 139)
    
    # Parties Grid
    add_parties_grid(
        doc,
        client_name="PROJECT54 ENTREPRENEURS",
        client_rep="Mr Lawson Israel (Lead Executive / Managing Director)",
        client_loc="Lagos, Nigeria",
        dev_name="SALES COWBOY MARKETING SOLUTIONS",
        dev_rep="Clinton Chukwunyere (Lead Technical Director)",
        dev_loc="Ama-wire Ishi-Uzo, Roadsafety Junction, Egbu Road, Owerri, Imo state"
    )
    
    # Section 1: Executive Summary
    p_s1 = doc.add_paragraph()
    p_s1.paragraph_format.space_before = Pt(10)
    p_s1.paragraph_format.space_after = Pt(4)
    r_s1 = p_s1.add_run("1. EXECUTIVE SUMMARY & MULTI-TIER ARCHITECTURE")
    r_s1.font.name = "Georgia"
    r_s1.font.size = Pt(11)
    r_s1.font.bold = True
    r_s1.font.color.rgb = RGBColor(124, 74, 30)
    
    p_s1_body = doc.add_paragraph()
    p_s1_body.paragraph_format.space_after = Pt(6)
    r_s1_body = p_s1_body.add_run(
        "To modernize commercial haulage in Nigeria, eliminate freight capital gridlock, integrate statutory risk mitigation, and structure protected broker/consultant networks, this platform is engineered as an enterprise-grade multi-tier digital ecosystem purpose-built for PROJECT54 ENTREPRENEURS:"
    )
    r_s1_body.font.name = "Calibri"
    r_s1_body.font.size = Pt(9.5)
    r_s1_body.font.color.rgb = RGBColor(51, 65, 85)
    
    tiers = [
        ("The Contractor & Freight Dispatch Hub (Web & Mobile):", "Enables verified cargo owners (Contractors) to post structured freight manifests with live capacity countdown decrementing logic, automated 24-hour Expression of Interest (EOI) expiration timers, and integrated Goods-in-Transit (GIT) policy procurement."),
        ("The Transporter Fleet Vault & Gate-In Countdown Engine (Mobile & Web):", "Comprehensive transporter vehicle profiling with mandatory truck walk-around video verification proofs, and a strict 48-Hour Depletion Clock that revokes job allocations if trucks fail to gate-in at loading depots on time."),
        ("The Secure In-App Chat & Anti-Circumvention Engine (Disintermediation Shield):", "Real-time in-app communication between truckers and contractors for operational coordination (dock loading status, ETA, directions) fortified with an automated contact-redaction filter that blocks phone numbers, emails, bank accounts, and off-platform dealing to guarantee 100% platform retention."),
        ("The Accredited GIT Insurance Underwriters Desk:", "Direct integration of licensed Goods-in-Transit (GIT) insurance companies into the freight lifecycle, enabling instant digital policy underwriting, automated per-trip premium deductions, and streamlined electronic claims verification."),
        ("The Bank & Institutional Financing (Factoring) Desk:", "A secure financial underwriting portal where accredited banks review verified loading and offloading waybills directly to disburse milestone freight financing and execute automated 4-way split deductions."),
        ("The Consultant Onboarding & Quota Desk:", "A closed-loop referral and licensing engine where authorized freight consultants pay an onboarding fee, operate under dynamic client quota caps, and earn automated commission splits on every completed trip, equipment lease, and automobile sale."),
        ("The Heavy Equipment Leasing Engine:", "A full 14-step industrial machinery charter workflow (cranes, excavators, forklifts, lowbeds, barges) with inspection video archives, lease agreements, and caution deposit escrow."),
        ("The Automobile & Heavy-Duty Spare Parts Marketplace:", "A dedicated B2B e-commerce catalog for prime movers, flatbeds, tippers, and genuine truck components backed by inspection-based escrow settlement.")
    ]
    
    for t_head, t_body in tiers:
        p_t = doc.add_paragraph()
        p_t.paragraph_format.space_before = Pt(1)
        p_t.paragraph_format.space_after = Pt(3)
        r_num = p_t.add_run("• ")
        r_num.font.bold = True
        r_num.font.color.rgb = RGBColor(124, 74, 30)
        
        r_th = p_t.add_run(t_head + " ")
        r_th.font.name = "Calibri"
        r_th.font.size = Pt(9.5)
        r_th.font.bold = True
        r_th.font.color.rgb = RGBColor(15, 23, 42)
        
        r_tb = p_t.add_run(t_body)
        r_tb.font.name = "Calibri"
        r_tb.font.size = Pt(9.5)
        r_tb.font.color.rgb = RGBColor(51, 65, 85)
        
    # Section 2: Detailed Modules
    p_s2 = doc.add_paragraph()
    p_s2.paragraph_format.space_before = Pt(12)
    p_s2.paragraph_format.space_after = Pt(4)
    r_s2 = p_s2.add_run("2. DETAILED MODULE BREAKDOWN")
    r_s2.font.name = "Georgia"
    r_s2.font.size = Pt(11)
    r_s2.font.bold = True
    r_s2.font.color.rgb = RGBColor(124, 74, 30)
    
    modules = [
        ("Module 1: Consultant Onboarding & Quota Desk", [
            "Paid Consultant Licensing: Consultants pay a mandatory activation fee via Paystack/Moniepoint to unlock their profile, generate branded referral assets, and access their real-time referral ledger.",
            "Closed-Loop Referral Engine: Contractors and Transporters can register only via an authorized Consultant's unique cryptographic invitation link or referral code.",
            "Account Cap Enforcement: Dynamic admin-configured quotas limiting how many active Contractors and Transporters a single consultant can manage concurrently, preserving network quality."
        ]),
        ("Module 2: Contractor & Job Dispatch Hub", [
            "Structured Haulage Manifests: Contractors enter pick-up and drop-off coordinates with interactive Mapbox route previews, vehicle specifications (flatbed, lowbed, box truck, tipper), tonnage, and cargo category.",
            "Capacity Countdown Engine: As multiple transporters commit individual trucks against bulk freight, the platform automatically decrements available capacity in real time.",
            "Automated 24-Hour EOI Timer: Contractors receive a 24-hour countdown window to accept or reject transporter vehicle submissions; unapproved commitments auto-release back to the market."
        ]),
        ("Module 3: Transporter Fleet Vault & 48-Hour Gate-In Clock", [
            "Fleet Asset Onboarding: Transporters profile individual vehicles with mandatory 360-degree truck walk-around video proof uploads, driver commercial licenses, and verified bank accounts.",
            "Strict 48-Hour Gate-In Clock: Upon job allocation, an automated 48-hour countdown state machine activates. If the allocated truck fails to verify depot gate-in (via GPS geofenced coordinates within 150m, depot security QR scan, or digital check-in) before the clock reaches 00:00:00, the system automatically revokes the allocation without penalty to the contractor, returns capacity to the open market, and logs a strike against the defaulting transporter.",
            "Dual-Stage Waybill Verification: Stage 1 (Loading Waybill with weighbridge receipt) releases loading advance; Stage 2 (Proof of Offloading / e-POD with receiver stamp) triggers automated final balance release."
        ]),
        ("Module 4: Secure In-App Chat & Anti-Circumvention Engine (Disintermediation Shield)", [
            "Dedicated Manifest Scoping: In-app chat threads are strictly confined to active job assignments, providing a permanent operational audit trail for ETA, loading docks, and road updates.",
            "Proactive Disintermediation Shield: Built-in regex engine redacts or blocks personal phone numbers (including Nigerian prefixes: 080, 081, 070, 090, 091, +234), personal emails, bank accounts (NUBAN), and external URLs, preventing off-platform bypassing.",
            "Compliance Alert Desk: Offending messages trigger immediate audit flags on the Master Administrative console for merchant sanctioning."
        ]),
        ("Module 5: Accredited Goods-in-Transit (GIT) Insurance Underwriting Desk", [
            "Direct Underwriter Integration: Onboards accredited insurance companies into the freight lifecycle to issue instant digital trip policies bound to each manifest before dispatch.",
            "Automated At-Source Deductions: Calculates premiums based on goods valuation, distance, and cargo risk category, deducting premiums at source via the platform's multi-way split engine.",
            "Digital Claims Vault: Grants underwriters direct access to pre-trip inspection videos, weighbridge receipts, and offloading waybills for rapid, tamper-proof claim reconciliation."
        ]),
        ("Module 6: Bank & Institutional Financing (Factoring) Desk", [
            "Financier Invitation Flow: Contractors submit factoring requests to accredited banking partners governed by a strict 5-day expiry state machine (strictly capped at 1 resend).",
            "Financier Document Audit Desk: Secure portal where banks review verified waybills and inspect weighbridge certificates directly to approve financing.",
            "Automated Split Disbursements: The platform splits freight payouts automatically: Transporter Advance/Balance, Bank Factoring Settlement, Platform Commission, GIT Insurance Premium, and Consultant Commission."
        ]),
        ("Module 7: Heavy Equipment Leasing Engine", [
            "Full 14-Step Workflow: Dedicated machinery charter portal for cranes, excavators, forklifts, lowbeds, and barges.",
            "Video Inspection Archives & Escrow: Includes 360-degree mechanical walk-around videos, digital lease agreements, and automated caution deposit escrow holding."
        ]),
        ("Module 8: Automobile & Heavy-Duty Spare Parts Marketplace", [
            "B2B Curated Catalog: Classified directory for prime movers, flatbeds, tippers, and genuine components.",
            "Escrow Release: Buyer payments are held in secure escrow and released to the merchant only upon confirmed physical inspection and delivery sign-off."
        ])
    ]
    
    for m_title, m_bullets in modules:
        p_mt = doc.add_paragraph()
        p_mt.paragraph_format.space_before = Pt(6)
        p_mt.paragraph_format.space_after = Pt(2)
        r_mt = p_mt.add_run(m_title)
        r_mt.font.name = "Calibri"
        r_mt.font.size = Pt(10)
        r_mt.font.bold = True
        r_mt.font.color.rgb = RGBColor(124, 74, 30)
        
        for b in m_bullets:
            p_b = doc.add_paragraph()
            p_b.paragraph_format.space_before = Pt(1)
            p_b.paragraph_format.space_after = Pt(2)
            r_dot = p_b.add_run("• ")
            r_dot.font.bold = True
            r_dot.font.color.rgb = RGBColor(124, 74, 30)
            
            if ":" in b:
                b_pre, b_rest = b.split(":", 1)
                r_bp = p_b.add_run(b_pre + ":")
                r_bp.font.name = "Calibri"
                r_bp.font.size = Pt(9.5)
                r_bp.font.bold = True
                r_bp.font.color.rgb = RGBColor(15, 23, 42)
                
                r_br = p_b.add_run(b_rest)
                r_br.font.name = "Calibri"
                r_br.font.size = Pt(9.5)
                r_br.font.color.rgb = RGBColor(51, 65, 85)
            else:
                r_b = p_b.add_run(b)
                r_b.font.name = "Calibri"
                r_b.font.size = Pt(9.5)
                r_b.font.color.rgb = RGBColor(51, 65, 85)
                
    # Section 3: Statutory Tax Architecture
    p_s3 = doc.add_paragraph()
    p_s3.paragraph_format.space_before = Pt(12)
    p_s3.paragraph_format.space_after = Pt(4)
    r_s3 = p_s3.add_run("3. STATUTORY FINANCIAL SYSTEM ARCHITECTURE (VAT & WHT)")
    r_s3.font.name = "Georgia"
    r_s3.font.size = Pt(11)
    r_s3.font.bold = True
    r_s3.font.color.rgb = RGBColor(124, 74, 30)
    
    tax_rules = [
        "VAT (7.5%): Paid by 1 entity (The Contractor) on the platform service brokerage fee.",
        "Withholding Tax (WHT - 5% or 10%): Deducted at source from 2 entities (The Transporter & The Consultant). 5% WHT on haulage trip payouts & consultant commission; 10% WHT on equipment leases.",
        "PROJECT54 ENTREPRENEURS Role: Acts as the official withholding agent, accumulating statutory tax reserves in an administrative holding sub-ledger for monthly FIRS / SIRS remittance.",
        "Automated Sub-Ledger & Credit Advices: Beneficiaries automatically receive electronic credit notes reflecting WHT withheld for their corporate tax credits.",
        "One-Click Tax Filing Schedules: Dedicated export generating CSV/Excel schedules formatted specifically for FIRS and State Revenue Services filing."
    ]
    add_callout_box(doc, "STATUTORY TAX LIABILITY RULES (PER TRANSACTION)", tax_rules, bg_color="FEF3C7", border_color="B45309")
    
    # Section 4: Running Costs Table
    p_s4 = doc.add_paragraph()
    p_s4.paragraph_format.space_before = Pt(10)
    p_s4.paragraph_format.space_after = Pt(4)
    r_s4 = p_s4.add_run("4. ESTIMATED MONTHLY RUNNING & INFRASTRUCTURE COSTS")
    r_s4.font.name = "Georgia"
    r_s4.font.size = Pt(11)
    r_s4.font.bold = True
    r_s4.font.color.rgb = RGBColor(124, 74, 30)
    
    p_s4_sub = doc.add_paragraph()
    p_s4_sub.paragraph_format.space_after = Pt(6)
    r_s4_sub = p_s4_sub.add_run("(Paid directly by the Client to third-party providers at cost; no agency markup added)")
    r_s4_sub.font.name = "Calibri"
    r_s4_sub.font.size = Pt(9)
    r_s4_sub.font.italic = True
    r_s4_sub.font.color.rgb = RGBColor(100, 116, 139)
    
    # Table for costs
    cost_tbl = doc.add_table(rows=5, cols=3)
    cost_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cost_tbl.autofit = False
    
    col_widths = [Inches(3.2), Inches(1.8), Inches(1.8)]
    headers = ["Service Component & Scope", "Provider", "Estimated Running Cost"]
    
    for i, h in enumerate(headers):
        c = cost_tbl.cell(0, i)
        c.width = col_widths[i]
        set_cell_background(c, "0F172A")
        set_cell_margins(c, top=100, bottom=100, left=120, right=120)
        p = c.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h)
        r.font.name = "Calibri"
        r.font.size = Pt(9.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        
    cost_rows = [
        ("Cloud Infrastructure (API, Workers, PostgreSQL DB & Storage Bucket)", "Railway.app", "$10 – $20 / month"),
        ("Automated SMS & OTP Dispatch Engine", "Termii", "Pay-as-you-go (~₦5/SMS)"),
        ("Payment Gateway & Split Settlement Processing", "Paystack / Moniepoint", "1.5% capped at ₦2,000/tx"),
        ("Total Estimated Monthly Infrastructure", "Third-Party Direct", "~$10 – $20 / mo + usage")
    ]
    
    for r_idx, row_data in enumerate(cost_rows, start=1):
        bg = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row_data):
            c = cost_tbl.cell(r_idx, c_idx)
            c.width = col_widths[c_idx]
            set_cell_background(c, bg)
            set_cell_margins(c, top=80, bottom=80, left=120, right=120)
            p = c.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(val)
            r.font.name = "Calibri"
            r.font.size = Pt(9)
            if r_idx == 4:
                r.font.bold = True
                r.font.color.rgb = RGBColor(124, 74, 30)
            else:
                r.font.color.rgb = RGBColor(51, 65, 85)
                
    p_cost_note = doc.add_paragraph()
    p_cost_note.paragraph_format.space_before = Pt(4)
    p_cost_note.paragraph_format.space_after = Pt(8)
    r_cn = p_cost_note.add_run("*App Store Submissions: Google Play Console ($25 one-time), Apple Developer Program ($99/year).")
    r_cn.font.name = "Calibri"
    r_cn.font.size = Pt(8.5)
    r_cn.font.color.rgb = RGBColor(100, 116, 139)
    
    # Section 5: Commercial Investment
    p_s5 = doc.add_paragraph()
    p_s5.paragraph_format.space_before = Pt(12)
    p_s5.paragraph_format.space_after = Pt(4)
    r_s5 = p_s5.add_run("5. COMMERCIAL INVESTMENT & RAPID 4-WEEKS TIMELINE")
    r_s5.font.name = "Georgia"
    r_s5.font.size = Pt(11)
    r_s5.font.bold = True
    r_s5.font.color.rgb = RGBColor(124, 74, 30)
    
    comm_terms = [
        "Total All-Inclusive Contract Fee: One Million, Five Hundred Thousand Naira Only (₦1,500,000).",
        "Stage 1: 50% Mobilization Deposit (₦750,000): Paid upon contract execution to initiate systems engineering, PostgreSQL schemas, consultant licensing desk, geofenced dispatch hub, and UI/UX builds across all portals (Weeks 1 – 2).",
        "Stage 2: 50% Final Settlement (₦750,000): Paid strictly after two (2) months of verified functional operational use following successful mobile app upload and deployment on Google Play and Apple App Store (post-launch operational validation).",
        "Rapid 4-Week Delivery Roadmap: 4 weeks (28 calendar days) structured across Core Architecture (Week 1), Booking, Chat & GIT Engine (Week 2), 48h Gate-In Depletion Clock & Factoring (Week 3), and QA, Stress Testing & App Store Submissions (Week 4).",
        "100% Client Intellectual Property (IP) Ownership: Upon final contractual settlement (₦1,500,000), 100% complete, unencumbered ownership of all custom source code, mobile app codebases, backend APIs, database schemas, and master credentials vests exclusively in PROJECT54 ENTREPRENEURS.",
        "12-Month Complimentary Technical Support: 12 months ongoing technical support strictly dedicated to server uptime surveillance, background worker queues, database maintenance, and bug-fix warranty within agreed scope.",
        "Post-Warranty Annual Support Retainer (Year 2+): Renewable at an agreed retainer fee of ₦800,000 / year (Eight Hundred Thousand Naira per year), payable annually in advance by the Client."
    ]
    add_callout_box(doc, "COMMERCIAL & CONTRACTUAL TERMS SUMMARY", comm_terms, bg_color="F8FAFC", border_color="7C4A1E")
    
    # Bank Remittance
    p_bank = doc.add_paragraph()
    p_bank.paragraph_format.space_before = Pt(4)
    p_bank.paragraph_format.space_after = Pt(8)
    r_bk1 = p_bank.add_run("OFFICIAL BANK REMITTANCE DETAILS:\n")
    r_bk1.font.bold = True
    r_bk1.font.size = Pt(10)
    r_bk1.font.color.rgb = RGBColor(124, 74, 30)
    r_bk2 = p_bank.add_run(
        "Bank Name: GUARANTY TRUST BANK (GTBank)\n"
        "Account Name: SALES COWBOY MARKETING SOLUTIONS\n"
        "Account Number: 3006086291\n"
        "Payment Reference: SCM-PROP-2026-P54-1.5M / PROJECT54"
    )
    r_bk2.font.name = "Calibri"
    r_bk2.font.size = Pt(9.5)
    r_bk2.font.color.rgb = RGBColor(51, 65, 85)
    
    # Signature Block
    add_signature_block(
        doc,
        client_company="PROJECT54 ENTREPRENEURS",
        client_rep="Mr Lawson Israel",
        client_title="Lead Executive / Managing Director",
        client_date="November 2, 2026",
        dev_company="SALES COWBOY MARKETING SOLUTIONS",
        dev_rep="Clinton Chukwunyere",
        dev_title="Lead Technical Director",
        dev_date="November 2, 2026"
    )
    
    out_path = os.path.abspath("temp-nov/logistics/PROJECT54-Logistics-Commercial-Technical-Proposal.docx")
    doc.save(out_path)
    print(f"[SUCCESS] Proposal Word Doc saved: {out_path}")


def generate_invoice_docx():
    """Build PROJECT54 Commercial Invoice Word Document."""
    doc = docx.Document()
    
    sections = doc.sections
    for s in sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.85)
        s.right_margin = Inches(0.85)
        
    add_header_letterhead(
        doc,
        doc_badge="Commercial Invoice",
        ref_num="INV-2026-SCM-P54-1.5M",
        doc_date="November 4, 2026",
        contract_total="₦1,500,000 NGN"
    )
    
    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(4)
    p_title.paragraph_format.space_after = Pt(2)
    r_t = p_title.add_run("COMMERCIAL INVOICE")
    r_t.font.name = "Georgia"
    r_t.font.size = Pt(16)
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(15, 23, 42)
    
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(8)
    r_sub = p_sub.add_run("Payment Due Date: November 11, 2026 (Due upon Contract Execution)")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(10)
    r_sub.font.bold = True
    r_sub.font.color.rgb = RGBColor(180, 83, 9)
    
    # Parties Grid
    add_parties_grid(
        doc,
        client_name="PROJECT54 ENTREPRENEURS",
        client_rep="Mr Lawson Israel (Lead Executive / Managing Director)",
        client_loc="Lagos, Nigeria",
        dev_name="SALES COWBOY MARKETING SOLUTIONS",
        dev_rep="Clinton Chukwunyere (Lead Technical Director)",
        dev_loc="Ama-wire Ishi-Uzo, Roadsafety Junction, Egbu Road, Owerri, Imo state"
    )
    
    # Project Strip Callout
    proj_info = [
        "Project Scope: Unified Logistics, Bank Factoring, GIT Insurance Desk, In-App Anti-Circumvention Chat & Fleet Equipment Ecosystem",
        "Proposal Ref: SCM-PROP-2026-P54-1.5M | Agreement Ref: SCM-AGR-2026-P54-1.5M",
        "Total Contract Value: ₦1,500,000 (One Million, Five Hundred Thousand Naira Only)",
        "Delivery Timeline: Accelerated 4 Weeks (28 Calendar Days) from contract execution",
        "Warranty & Support: 12 Months complimentary post-launch support included (renewable at ₦800,000/year thereafter)"
    ]
    add_callout_box(doc, "PROJECT ENGAGEMENT SUMMARY", proj_info, bg_color="F8FAFC", border_color="7C4A1E")
    
    # Billing Table
    p_tbl_head = doc.add_paragraph()
    p_tbl_head.paragraph_format.space_before = Pt(8)
    p_tbl_head.paragraph_format.space_after = Pt(4)
    r_th = p_tbl_head.add_run("CONTRACT MILESTONE BREAKDOWN & BILLING SCHEDULE")
    r_th.font.name = "Georgia"
    r_th.font.size = Pt(11)
    r_th.font.bold = True
    r_th.font.color.rgb = RGBColor(124, 74, 30)
    
    table = doc.add_table(rows=3, cols=6)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    widths = [Inches(0.5), Inches(2.9), Inches(0.8), Inches(0.9), Inches(0.8), Inches(0.9)]
    th_labels = ["Item", "Description & Deliverables", "Alloc.", "Total", "Status", "Due Now"]
    
    for i, lbl in enumerate(th_labels):
        c = table.cell(0, i)
        c.width = widths[i]
        set_cell_background(c, "0F172A")
        set_cell_margins(c, top=80, bottom=80, left=80, right=80)
        p = c.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(lbl)
        r.font.name = "Calibri"
        r.font.size = Pt(8.5)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        
    rows_data = [
        (
            "01",
            "Stage 1: 50% Project Mobilization Deposit\n• Core Architecture & PostgreSQL Schemas\n• Module 1: Consultant Licensing Desk\n• Module 2: Cargo Dispatch & Haulage Hub\n• Module 3: Transporter Vault & 48h Gate-In Depletion Clock\n• Module 4: In-App Chat Anti-Circumvention Engine\n• Module 5: Accredited GIT Insurance Underwriting Desk\n(Execution of Agreement through Sprint 2 / Days 1–14)",
            "50%",
            "₦750,000",
            "DUE NOW",
            "₦750,000"
        ),
        (
            "02",
            "Stage 2: 50% Final Settlement (Post-Deployment Operational Verification)\n• Google Play Store & Apple App Store deployment\n• Bank Factoring Liquidity Integration & waybill audit\n• Heavy Equipment Leasing & Automobile Marketplace\n• Handover of Master Production Admin Credentials & Source Code\n(Payable strictly after 2 months of verified functional operational use post-upload)",
            "50%",
            "₦750,000",
            "PENDING",
            "₦0.00"
        )
    ]
    
    for r_idx, r_data in enumerate(rows_data, start=1):
        bg = "FFFFFF" if r_idx == 1 else "F8FAFC"
        for c_idx, val in enumerate(r_data):
            c = table.cell(r_idx, c_idx)
            c.width = widths[c_idx]
            set_cell_background(c, bg)
            set_cell_margins(c, top=80, bottom=80, left=80, right=80)
            p = c.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(val)
            r.font.name = "Calibri"
            r.font.size = Pt(8.5)
            if c_idx == 4 and val == "DUE NOW":
                r.font.bold = True
                r.font.color.rgb = RGBColor(185, 28, 28)
            elif c_idx == 5 and val == "₦750,000":
                r.font.bold = True
                r.font.color.rgb = RGBColor(15, 23, 42)
            else:
                r.font.color.rgb = RGBColor(51, 65, 85)
                
    # Financial Summary
    fin_lines = [
        "Total Project Contract Value: ₦1,500,000",
        "Subsequent Milestones (Pending 2-Month Post-Upload Validation): -₦750,000",
        "TOTAL AMOUNT DUE NOW (STAGE 1 MOBILIZATION): ₦750,000 (Seven Hundred and Fifty Thousand Naira Only)"
    ]
    add_callout_box(doc, "PAYMENT RECONCILIATION SUMMARY", fin_lines, bg_color="FEF3C7", border_color="B45309")
    
    # Bank Remittance
    p_bank = doc.add_paragraph()
    p_bank.paragraph_format.space_before = Pt(4)
    p_bank.paragraph_format.space_after = Pt(8)
    r_bk1 = p_bank.add_run("OFFICIAL BANK REMITTANCE DETAILS:\n")
    r_bk1.font.bold = True
    r_bk1.font.size = Pt(10)
    r_bk1.font.color.rgb = RGBColor(124, 74, 30)
    r_bk2 = p_bank.add_run(
        "Bank Name: GUARANTY TRUST BANK (GTBank)\n"
        "Account Name: SALES COWBOY MARKETING SOLUTIONS\n"
        "Account Number: 3006086291\n"
        "Payment Reference: INV-2026-SCM-P54-1.5M / PROJECT54"
    )
    r_bk2.font.name = "Calibri"
    r_bk2.font.size = Pt(9.5)
    r_bk2.font.color.rgb = RGBColor(51, 65, 85)
    
    # Signature Block
    add_signature_block(
        doc,
        client_company="PROJECT54 ENTREPRENEURS",
        client_rep="Mr Lawson Israel",
        client_title="Lead Executive / Managing Director",
        client_date="November 4, 2026",
        dev_company="SALES COWBOY MARKETING SOLUTIONS",
        dev_rep="Clinton Chukwunyere",
        dev_title="Lead Technical Director",
        dev_date="November 4, 2026"
    )
    
    out_path = os.path.abspath("temp-nov/logistics/PROJECT54-Logistics-Commercial-Invoice.docx")
    doc.save(out_path)
    print(f"[SUCCESS] Invoice Word Doc saved: {out_path}")


if __name__ == "__main__":
    generate_agreement_docx()
    generate_proposal_docx()
    generate_invoice_docx()

