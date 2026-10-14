"""Convert retained AI portfolio originals to responsive WebP assets (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
for name in ("smartfinance", "smartpos", "omnisphere", "helpdesk", "world-cup", "black-ninja"):
    with Image.open(ROOT / "docs/assets/originals" / f"{name}.png") as original:
        for width, height, suffix in ((960, 600, ""), (480, 300, "-480")):
            if original.width < width or original.height < height:
                raise ValueError(f"Source too small: {name}")
            image = ImageOps.fit(original.convert("RGB"), (width, height), method=Image.Resampling.LANCZOS)
            image.save(ROOT / "public/images" / f"{name}{suffix}.webp", "WEBP", quality=88, method=6)
