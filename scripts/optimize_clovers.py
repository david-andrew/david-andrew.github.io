from pathlib import Path
import subprocess
import os
import pdb

images_path = Path(__file__).parent.parent / 'app' / '(images)' / 'clovers'

for jpeg_path in images_path.glob('*.jpg'):
    subprocess.run(['jpegoptim', '--size=1000', jpeg_path])
