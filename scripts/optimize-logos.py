import os
from PIL import Image

def optimize_logos():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(base_dir, 'public')

    # Target 1: webinoo-logo.png -> 312x116 (Retina 2x for Header: 156x58)
    logo_path = os.path.join(public_dir, 'webinoo-logo.png')
    logo_webp_path = os.path.join(public_dir, 'webinoo-logo.webp')
    
    if os.path.exists(logo_path):
        with Image.open(logo_path) as img:
            img = img.convert('RGBA')
            resized_logo = img.resize((312, 116), Image.Resampling.LANCZOS)
            
            # Save WebP (high quality)
            resized_logo.save(logo_webp_path, format='WEBP', quality=90, method=6)
            print(f"Saved {logo_webp_path} ({os.path.getsize(logo_webp_path)} bytes)")
            
            # Save compressed PNG fallback
            resized_logo.save(logo_path, format='PNG', optimize=True)
            print(f"Saved {logo_path} ({os.path.getsize(logo_path)} bytes)")

    # Target 2: webinoo-logo-white.png -> 280x104 (Retina 2x for Footer: 140x52)
    logo_white_path = os.path.join(public_dir, 'webinoo-logo-white.png')
    logo_white_webp_path = os.path.join(public_dir, 'webinoo-logo-white.webp')
    
    if os.path.exists(logo_white_path):
        with Image.open(logo_white_path) as img:
            img = img.convert('RGBA')
            resized_white = img.resize((280, 104), Image.Resampling.LANCZOS)
            
            # Save WebP (high quality)
            resized_white.save(logo_white_webp_path, format='WEBP', quality=90, method=6)
            print(f"Saved {logo_white_webp_path} ({os.path.getsize(logo_white_webp_path)} bytes)")
            
            # Save compressed PNG fallback
            resized_white.save(logo_white_path, format='PNG', optimize=True)
            print(f"Saved {logo_white_path} ({os.path.getsize(logo_white_path)} bytes)")

if __name__ == '__main__':
    optimize_logos()
