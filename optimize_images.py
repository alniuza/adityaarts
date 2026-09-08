import os
from PIL import Image
import glob

idols_dir = r"c:\Ganpati Booking\public\idols"
images = glob.glob(os.path.join(idols_dir, "*.*"))
print(f"Compressing {len(images)} extracted catalog images for web performance...")

total_original = 0
total_new = 0

for img_path in images:
    orig_size = os.path.getsize(img_path)
    total_original += orig_size
    
    try:
        with Image.open(img_path) as img:
            # Resize if larger than 1200px
            img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            # Save compressed JPEG quality 85
            new_path = os.path.splitext(img_path)[0] + ".jpg"
            if img_path != new_path:
                os.remove(img_path)
            img.convert("RGB").save(new_path, "JPEG", quality=85, optimize=True)
            
            new_size = os.path.getsize(new_path)
            total_new += new_size
    except Exception as e:
        print(f"Error optimizing {img_path}: {e}")

print(f"Original Total Size: {total_original / (1024*1024):.2f} MB")
print(f"Optimized Total Size: {total_new / (1024*1024):.2f} MB")
print("Image optimization complete! Website will now load lightning fast.")
