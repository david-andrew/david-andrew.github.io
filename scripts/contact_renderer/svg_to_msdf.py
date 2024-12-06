"""
To use this converter, SVG must be a single path:
1. create SVG image in Inkscape
2. save as inkscape SVG (i.e. so can work on project later)
3. save a copy to work on
4. select all objects and do path > object to path
5. keeping everything selected, do path > union
6. save as plain SVG
7. run this script on the SVG file


business card dimensions are
- 3.5 x 2 inches
- 1024 x 585 pixels
- width="89.0434" height="50.8695" # in the .svg file. to get these, take pixels and divide by 11.5


To convert the simplified SVG to MSDF:
./bin/msdfgen.sh -svg path/to/raw.svg -ascale 12 12 -size 1024 585 -autoframe -o path/to/msdf.png
"""


from pathlib import Path
import xml.etree.ElementTree as ET
import sys
from subprocess import run



def simplify_svg(svg_content:str):
    # Parse the original SVG content
    root = ET.fromstring(svg_content)

    # Find the <path> element and extract the 'd' attribute
    path_element = root.find('.//{http://www.w3.org/2000/svg}path')
    path_d = path_element.get('d')

    # Create a new SVG element with simplified content
    new_svg = ET.Element('svg', width="89.0434", height="50.8695")
    new_path = ET.SubElement(new_svg, 'path', d=path_d)

    # Convert the Element back to a string
    return ET.tostring(new_svg, encoding='unicode')


def convert_to_msdf(svg_path:Path, output_path:Path=None):
    if output_path is None:
        output_path = svg_path.parent / f'{svg_path.stem}.png'
    
    # Run the msdfgen command
    run(['./bin/msdfgen.sh', '-svg', str(svg_path), '-ascale', '12', '12', '-size', '1024', '585', '-autoframe', '-o', str(output_path)])

def main():
    # use the arg provided as the file name
    try:
        path = sys.argv[1]
    except IndexError:
        print("Please provide the name of the SVG file to convert")
        return

    svg_file = Path(path)
    if not svg_file.exists():
        print(f"File '{svg_file}' not found")
        return
    
    # Read the SVG file
    svg = svg_file.read_text()

    # Simplify the SVG content
    simplified_svg = simplify_svg(svg)

    # write the simplified SVG content to a temp file
    temp_file = Path('_temp.svg')
    temp_file.write_text(simplified_svg)

    # Convert the simplified SVG to MSDF
    print(f"Converting '{svg_file}' to MSDF...")
    output_path = svg_file.parent / f'{svg_file.stem}.png'
    convert_to_msdf(temp_file, output_path)

    # Clean up the temp file
    temp_file.unlink()

    print(f"MSDF image saved as '{output_path}'")




if __name__ == '__main__':
    main()