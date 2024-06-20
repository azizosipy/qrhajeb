import qrcode
from PIL import Image, ImageDraw, ImageFont

def generate_smooth_corner_qr(url, title):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    width, height = img.size

    
    # Add title
    title_font = ImageFont.truetype("arial.ttf", 20)
    draw = ImageDraw.Draw(img)
    draw.text((10, height - 30), title, fill="black", font=title_font)

    img.save("qr_code_smooth.png")

if __name__ == "__main__":
    url = "https://azizosipy.github.io/qrhajeb/"
    title = "Hajeb Riviera Menu"
    generate_smooth_corner_qr(url, title)
