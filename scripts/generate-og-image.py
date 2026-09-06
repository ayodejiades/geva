import subprocess
import time
import os
import base64

WORKSPACE = "/Users/mac/Documents/geva"
SVG_PATH = os.path.join(WORKSPACE, "src/assets/illustrations/hero-pregnancy.svg")

with open(SVG_PATH, "r", encoding="utf-8") as f:
    svg_data = f.read()

svg_b64 = base64.b64encode(svg_data.encode("utf-8")).decode("utf-8")
svg_data_uri = f"data:image/svg+xml;base64,{svg_b64}"

# Layout 1: Editorial 2-Column Split (Linear / Stripe style, high readability on social cards)
html_split = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Geva OpenGraph</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Quicksand:wght@600;700&display=swap" rel="stylesheet">
  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    body {{
      width: 1200px;
      height: 630px;
      background: #FFFFFF;
      background-image: 
        radial-gradient(circle at 82% 50%, #FFF8F7 0%, #FAF5F4 45%, #FFFFFF 85%),
        radial-gradient(circle at 10% 20%, #F5F9F4 0%, transparent 40%);
      font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #2D2424;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 72px;
      position: relative;
    }}
    .left-col {{
      width: 580px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      z-index: 2;
    }}
    .eyebrow {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(221, 165, 159, 0.18);
      border: 1px solid rgba(221, 165, 159, 0.45);
      border-radius: 9999px;
      padding: 6px 16px;
      font-family: 'Nunito', sans-serif;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #C88B85;
      margin-bottom: 20px;
    }}
    .eyebrow-dot {{
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #9CAF88;
    }}
    .brand-title {{
      font-family: 'Nunito', sans-serif;
      font-size: 82px;
      font-weight: 900;
      letter-spacing: -0.04em;
      color: #2D2424;
      line-height: 1;
      margin-bottom: 16px;
    }}
    .brand-title span {{
      color: #DDA59F;
    }}
    .tagline {{
      font-family: 'Quicksand', sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: #2D2424;
      line-height: 1.35;
      margin-bottom: 20px;
      letter-spacing: -0.01em;
    }}
    .tagline .highlight {{
      color: #DDA59F;
    }}
    .feature-list {{
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 28px;
    }}
    .feature-item {{
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Quicksand', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #6E6262;
    }}
    .feature-dot {{
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #DDA59F;
      flex-shrink: 0;
    }}
    .url-badge {{
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: #FFFFFF;
      border: 1.5px solid rgba(221, 165, 159, 0.5);
      border-radius: 9999px;
      padding: 10px 24px;
      box-shadow: 0 4px 16px rgba(45, 36, 36, 0.06);
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: #2D2424;
    }}
    .url-badge .badge-sub {{
      font-size: 13px;
      font-weight: 700;
      color: #9CAF88;
      border-left: 1px solid #E5ECE0;
      padding-left: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}
    .right-col {{
      width: 460px;
      height: 460px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }}
    .artwork-glow {{
      position: absolute;
      width: 440px;
      height: 440px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(221, 165, 159, 0.22) 0%, rgba(156, 175, 136, 0.12) 60%, transparent 80%);
      filter: blur(20px);
      z-index: 1;
    }}
    .baby-artwork {{
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 14px 32px rgba(221, 165, 159, 0.32));
      position: relative;
      z-index: 2;
    }}
  </style>
</head>
<body>
  <div class="left-col">
    <div class="eyebrow">
      <div class="eyebrow-dot"></div>
      <span>Maternal & Perinatal Sanctuary</span>
    </div>
    <h1 class="brand-title">ge<span>va</span></h1>
    <p class="tagline">Every heartbeat. Every milestone.<br><span class="highlight">Nurtured together.</span></p>
    <div class="feature-list">
      <div class="feature-item">
        <div class="feature-dot"></div>
        <span>Conception, Pregnancy & Postpartum Recovery</span>
      </div>
      <div class="feature-item">
        <div class="feature-dot"></div>
        <span>Private On-Device Sister-Midwife Voice Companion</span>
      </div>
      <div class="feature-item">
        <div class="feature-dot"></div>
        <span>Real-Time CareCircle Partner Telemetry</span>
      </div>
    </div>
    <div class="url-badge">
      <span>geva.vercel.app</span>
      <span class="badge-sub">100% Free Forever</span>
    </div>
  </div>

  <div class="right-col">
    <div class="artwork-glow"></div>
    <img src="{svg_data_uri}" class="baby-artwork" alt="Geva Sanctuary">
  </div>
</body>
</html>"""

# Layout 2: Centered Heroic (Proportioned for 1200x630)
html_centered = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Geva OpenGraph Centered</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Quicksand:wght@600;700&display=swap" rel="stylesheet">
  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    body {{
      width: 1200px;
      height: 630px;
      background: #FFFFFF;
      background-image: radial-gradient(circle at 50% 46%, #FFFFFF 0%, #FFF8F7 50%, #FAF5F4 85%, #F5EEEE 100%);
      font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #2D2424;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }}
    .container {{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: -10px;
    }}
    .baby-artwork {{
      width: 320px;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 14px 30px rgba(221, 165, 159, 0.32));
    }}
    .baby-artwork img {{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }}
    .brand-title {{
      font-family: 'Nunito', sans-serif;
      font-size: 76px;
      font-weight: 900;
      letter-spacing: -0.04em;
      color: #2D2424;
      line-height: 1;
      margin-top: -10px;
    }}
    .brand-title span {{
      color: #DDA59F;
    }}
    .brand-subtitle {{
      font-family: 'Quicksand', sans-serif;
      font-size: 22px;
      font-weight: 600;
      color: #6E6262;
      margin-top: 8px;
      letter-spacing: -0.01em;
    }}
    .url-badge {{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      border: 1.5px solid rgba(221, 165, 159, 0.45);
      border-radius: 9999px;
      padding: 8px 26px;
      margin-top: 14px;
      box-shadow: 0 4px 16px rgba(45, 36, 36, 0.05);
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #2D2424;
    }}
  </style>
</head>
<body>
  <main class="container">
    <div class="baby-artwork">
      <img src="{svg_data_uri}" alt="Geva Baby">
    </div>
    <h1 class="brand-title">ge<span>va</span></h1>
    <p class="brand-subtitle">Every heartbeat. Every milestone. Nurtured together.</p>
    <div class="url-badge">
      <span>geva.vercel.app</span>
    </div>
  </main>
</body>
</html>"""

temp_html = os.path.join(WORKSPACE, "og-temp.html")
with open(temp_html, "w", encoding="utf-8") as f:
    f.write(html_split)

def capture_og(html_file, output_png):
    cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless=new",
        "--disable-gpu",
        f"--user-data-dir={WORKSPACE}/.chrome-profile",
        "--window-size=1200,630",
        f"--screenshot={output_png}",
        "--hide-scrollbars",
        f"file://{html_file}"
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(6)
    proc.terminate()
    try:
        proc.wait(timeout=1)
    except:
        proc.kill()
    print(f"Captured {output_png}")

output_png = os.path.join(WORKSPACE, "public/og-image.png")
capture_og(temp_html, output_png)

if os.path.exists(temp_html):
    os.remove(temp_html)

# Generate aliases/formats
import shutil
shutil.copyfile(output_png, os.path.join(WORKSPACE, "public/opengraph-image.png"))
subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "92", output_png, "--out", os.path.join(WORKSPACE, "public/og-image.jpg")], check=False)
print("OpenGraph image suite successfully generated.")
