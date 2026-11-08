import base64
import os
import re
import subprocess

base_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(base_dir, "..", ".."))

logo_path = os.path.join(root_dir, "public", "assets", "salescowboy-logo.png")
with open(logo_path, "rb") as f:
    b64 = base64.b64encode(f.read()).decode("utf-8")

data_uri = f"data:image/png;base64,{b64}"

# 1. Update invoice-letterhead.html
inv_path = os.path.join(base_dir, "invoice-letterhead.html")
with open(inv_path, "r", encoding="utf-8") as f:
    inv_html = f.read()

inv_html = re.sub(
    r'<img\s+src="[^"]*salescowboy-logo[^"]*"[^>]*>',
    f'<img src="{data_uri}" alt="Sales Cowboy Logo" class="brand-logo" style="height: 54px; width: auto; object-fit: contain; display: block;">',
    inv_html
)

with open(inv_path, "w", encoding="utf-8") as f:
    f.write(inv_html)
print("[OK] Updated invoice-letterhead.html with base64 logo")

# 2. Update agreement-letterhead.html
agr_path = os.path.join(base_dir, "agreement-letterhead.html")
with open(agr_path, "r", encoding="utf-8") as f:
    agr_html = f.read()

agr_html = re.sub(
    r'<img\s+[\s\S]*?alt="Sales Cowboy Logo"[\s\S]*?>',
    f'<img src="{data_uri}" alt="Sales Cowboy Logo" style="height: 54px; width: auto; object-fit: contain; display: block;">',
    agr_html
)

with open(agr_path, "w", encoding="utf-8") as f:
    f.write(agr_html)
print("[OK] Updated agreement-letterhead.html with base64 logo")

# 3. Update proposal-letterhead.html
prop_path = os.path.join(base_dir, "proposal-letterhead.html")
with open(prop_path, "r", encoding="utf-8") as f:
    prop_html = f.read()

prop_html = re.sub(
    r'<img\s+[\s\S]*?alt="Sales Cowboy Logo"[\s\S]*?>',
    f'<img src="{data_uri}" alt="Sales Cowboy Logo" style="height: 54px; width: auto; object-fit: contain; display: block;">',
    prop_html
)

with open(prop_path, "w", encoding="utf-8") as f:
    f.write(prop_html)
print("[OK] Updated proposal-letterhead.html with base64 logo")

# 4. Render PDFs using Chrome
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
pdf_dir = os.path.join(base_dir, "pdf")
public_dir = os.path.join(root_dir, "public")
out_dir = os.path.join(root_dir, "out")
os.makedirs(pdf_dir, exist_ok=True)

docs = [
    ("invoice-letterhead.html", "PROJECT54-Logistics-Commercial-Invoice.pdf"),
    ("agreement-letterhead.html", "PROJECT54-Logistics-Software-Development-Agreement.pdf"),
    ("proposal-letterhead.html", "PROJECT54-Logistics-Commercial-Technical-Proposal.pdf")
]

import shutil

for html_name, pdf_name in docs:
    hp = os.path.join(base_dir, html_name)
    pp = os.path.join(pdf_dir, pdf_name)
    file_url = "file:///" + hp.replace("\\", "/")
    cmd = [
        chrome,
        "--headless=new",
        "--disable-gpu",
        "--run-all-compositor-stages-before-draw",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pp}",
        file_url
    ]
    subprocess.run(cmd, check=True)
    print(f"[OK] Rendered PDF: {pdf_name}")
    
    # Copy to public and out
    shutil.copy2(pp, os.path.join(public_dir, pdf_name))
    if os.path.exists(out_dir):
        shutil.copy2(pp, os.path.join(out_dir, pdf_name))
    print(f"[OK] Copied {pdf_name} to public and out")

print("All done!")
