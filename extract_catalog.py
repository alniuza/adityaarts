import os
import pymupdf # PyMuPDF
from PIL import Image
import json

pdf_path = r"C:\Ganpati Booking\Catalog.pdf"
output_dir = r"c:\Ganpati Booking\public\idols"
os.makedirs(output_dir, exist_ok=True)

print(f"Opening PDF catalog: {pdf_path}")
doc = pymupdf.open(pdf_path)
total_pages = len(doc)
print(f"Total Pages in PDF: {total_pages}")

extracted_items = []

for page_idx in range(total_pages):
    page = doc[page_idx]
    text = page.get_text()
    
    # 1. Check embedded images on page
    image_list = page.get_images(full=True)
    saved_img_path = None
    
    if image_list:
        # Extract the largest embedded image on page
        best_img = None
        max_size = 0
        for img_info in image_list:
            xref = img_info[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            if len(image_bytes) > max_size:
                max_size = len(image_bytes)
                best_img = (image_bytes, image_ext)
                
        if best_img:
            img_bytes, img_ext = best_img
            img_filename = f"murti_page_{page_idx + 1}.{img_ext}"
            img_filepath = os.path.join(output_dir, img_filename)
            with open(img_filepath, "wb") as f:
                f.write(img_bytes)
            saved_img_path = f"/idols/{img_filename}"
            print(f"Page {page_idx + 1}/{total_pages}: Extracted embedded image {img_filename} ({len(img_bytes)//1024} KB)")

    # 2. If no embedded image found or low res, render high-res page
    if not saved_img_path:
        zoom = 2.0
        mat = pymupdf.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        img_filename = f"murti_page_{page_idx + 1}.jpg"
        img_filepath = os.path.join(output_dir, img_filename)
        pix.save(img_filepath)
        saved_img_path = f"/idols/{img_filename}"
        print(f"Page {page_idx + 1}/{total_pages}: Rendered page image {img_filename}")

    # Parse text info (looking for sizes, codes, prices)
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    cleaned_text = " | ".join(lines)
    
    extracted_items.append({
        "pageNumber": page_idx + 1,
        "imagePath": saved_img_path,
        "text": cleaned_text,
        "lines": lines
    })

print(f"\nExtracted {len(extracted_items)} catalog pages/images!")

# Save catalog JSON
with open(r"c:\Ganpati Booking\src\data\extracted_pdf_catalog.json", "w", encoding="utf-8") as f:
    json.dump(extracted_items, f, ensure_ascii=False, indent=2)

print("Saved extracted metadata to src/data/extracted_pdf_catalog.json")
