from svg.path import parse_path
from xml.dom import minidom
from math import inf, ceil, floor
from pathlib import Path
from os.path import join
from glob import glob

import pdb


def main():
    base = Path(__file__).parent.parent
    for svg_filepath in glob(join(base, 'app', '(images)', 'icons', '*.svg')):
        print(f'Processing {svg_filepath}')
        with open(svg_filepath, 'r') as f:
            svg_content = f.read()
        viewbox = compute_viewbox_from_svg(svg_content)
        
        updated_svg_content = modify_svg_content(svg_content, viewbox, fill="#ffffff")
        
        with open(svg_filepath, 'w') as f:
            f.write(updated_svg_content)


def modify_svg_content(svg_content, viewbox, fill):
    dom = minidom.parseString(svg_content)
    
    # Update the viewBox attribute
    svg_elements = dom.getElementsByTagName('svg')
    if svg_elements:
        svg_element = svg_elements[0]
        svg_element.setAttribute('viewBox', f"{viewbox[0]} {viewbox[1]} {viewbox[2]} {viewbox[3]}")
    
    # Update the fill attribute for path
    paths = dom.getElementsByTagName('path')
    if paths:
        for path in paths:  # Update fill for all paths in the SVG
            path.setAttribute('fill', fill)
    
    # Serialize the DOM structure to string
    return dom.toxml()



def compute_viewbox_from_svg(svg_content):
    # Parse the SVG
    dom = minidom.parseString(svg_content)
    paths = dom.getElementsByTagName('path')
    
    if not paths:
        raise ValueError("No paths found in SVG")

    path_data = paths[0].getAttribute('d')
    path_obj = parse_path(path_data)

    # Calculate the bounding box
    min_x = inf
    min_y = inf
    max_x = -inf
    max_y = -inf

    for segment in path_obj:
        start, end = segment.start, segment.end
        min_x = min(min_x, start.real, end.real)
        min_y = min(min_y, start.imag, end.imag)
        max_x = max(max_x, start.real, end.real)
        max_y = max(max_y, start.imag, end.imag)

    # Round to the nearest integer
    min_x = floor(min_x)
    min_y = floor(min_y)
    max_x = ceil(max_x)
    max_y = ceil(max_y)

    width = max_x - min_x
    height = max_y - min_y
    
    return min_x, min_y, width, height



if __name__ == '__main__':
    main()