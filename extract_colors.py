import sys
try:
    from PIL import Image
    import numpy as np
    from sklearn.cluster import KMeans
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "numpy", "scikit-learn"])
    from PIL import Image
    import numpy as np
    from sklearn.cluster import KMeans

def extract_colors(image_path):
    # Open image and convert to RGBA
    img = Image.open(image_path).convert('RGBA')
    img_data = np.array(img)
    
    # Reshape the data
    pixels = img_data.reshape(-1, 4)
    
    # Filter out transparent pixels (alpha < 200)
    # Filter out white/near-white pixels (r>240 and g>240 and b>240)
    valid_pixels = []
    for p in pixels:
        r, g, b, a = p
        if a < 200:
            continue
        if r > 240 and g > 240 and b > 240:
            continue
        valid_pixels.append([r, g, b])
        
    if not valid_pixels:
        print("No valid pixels found.")
        return
        
    valid_pixels = np.array(valid_pixels)
    
    # We want to find clusters for:
    # 1. Orange/Amber (high r, high/mid g, low b)
    # 2. Green (high g, low r/b)
    # 3. Charcoal/Grey (r, g, b roughly equal and low/mid)
    
    kmeans = KMeans(n_clusters=8, random_state=42, n_init=10).fit(valid_pixels)
    colors = kmeans.cluster_centers_
    labels = kmeans.labels_
    
    counts = np.bincount(labels)
    
    # Sort by frequency
    sorted_indices = np.argsort(counts)[::-1]
    
    print(f"Total valid pixels: {len(valid_pixels)}")
    print("Extracted dominant colors:")
    for idx in sorted_indices:
        color = colors[idx]
        count = counts[idx]
        hex_color = '#{:02x}{:02x}{:02x}'.format(int(color[0]), int(color[1]), int(color[2]))
        print(f"Cluster {idx}: {hex_color} (count: {count}) RGB: {color.astype(int)}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        extract_colors(sys.argv[1])
    else:
        extract_colors("public/logo.png")
