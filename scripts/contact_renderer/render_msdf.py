from dataclasses import dataclass
from pathlib import Path
from typing import Literal, TypedDict, cast
from json import loads

import numpy as np
from scipy.ndimage import shift
from matplotlib import pyplot as plt
from PIL import Image

from functools import cache

import pdb


FontName = Literal['Quadon'] #Could add more fonts if want


@dataclass
class Kerning:
    first: str
    second: str
    value: float

@dataclass
class Char:
    ch: str
    width: int
    height: int
    x: int
    y: int
    xoffset: float
    yoffset: float
    xadvance: float

class InfoDict(TypedDict):
    face: str
    size: int
    bold: int
    italic: int
    charset: list[str]

# e.g. {'id': 87, 'width': 51, 'height': 39, 'xoffset': 0, 'yoffset': -0.42200000000000415, 'xadvance': 42.798, 'chnl': 15, 'x': 0, 'y': 0, 'page': 0}
class CharDict(TypedDict):
    id: int
    width: int
    height: int
    xoffset: float
    yoffset: float
    xadvance: float
    chnl: int
    x: int
    y: int
    page: int

# e.g. {'lineHeight': 50.400000000000006, 'base': 33.978, 'scaleW': 512, 'scaleH': 512, 'pages': 1, 'packed': 0, 'alphaChnl': 0, 'redChnl': 0, 'greenChnl': 0, 'blueChnl': 0}
class CommonDict(TypedDict):
    lineHeight: float
    base: float
    scaleW: int
    scaleH: int
    pages: int
    packed: int
    alphaChnl: int
    redChnl: int
    greenChnl: int
    blueChnl: int

# e.g. {'first': 34, 'second': 52, 'amount': -2.1}
class KerningDict(TypedDict):
    first: int
    second: int
    amount: float


class Meta(TypedDict):
    pages: list[str] #unused
    chars: list[CharDict]
    info: InfoDict
    common: CommonDict
    kernings: list[KerningDict]


@cache
def read_meta(font: FontName):
    raw_meta = Path(f'{font}-msdf.json').read_text()
    meta = cast(Meta, loads(raw_meta))
    
    charset = meta['info']['charset']
    kernings: list[Kerning] = [
        Kerning(
            chr(kerning['first']),
            chr(kerning['second']),
            kerning['amount']
        )
        for kerning in meta['kernings']
    ]
    chars = [
        Char(
            chr(char['id']),
            char['width'],
            char['height'],
            char['x'],
            char['y'],
            char['xoffset'],
            char['yoffset'],
            char['xadvance']
        )
        for char in meta['chars']
    ]

    # create a map from each letter to the corresponding Char/Kerning object
    char_map = {char.ch: char for char in chars}
    kerning_map = {(kerning.first, kerning.second): kerning for kerning in kernings}
    
    return charset, char_map, kerning_map, meta

@cache
def load_atlas(font: FontName) -> np.ndarray:
    atlas_path = Path(f'{font}-msdf.png')
    atlas = Image.open(atlas_path)
    return np.array(atlas)


def load_from_atlas(font: FontName, ch: str) -> np.ndarray:
    charset, char_map, kerning_map, meta = read_meta(font)
    atlas = load_atlas(font)
    char = char_map[ch]
    patch = atlas[char.y:char.y+char.height, char.x:char.x+char.width]
    plt.imshow(patch); plt.show()

    return patch


def invert_canvas(canvas: np.ndarray) -> np.ndarray:
    canvas = canvas.copy()
    canvas[:, :, :3] = 255 - canvas[:, :, :3]
    return canvas

def render_sentence(font: FontName, text: str, canvas_size: tuple[int, int], origin: tuple[int, int], name:str) -> np.ndarray:
    y0, x0 = origin
    charset, char_map, kerning_map, meta = read_meta(font)
    atlas = load_atlas(font)
    patches: list[np.ndarray] = []
    chars: list[Char] = []

    for ch in text:
        char = char_map[ch]
        
        patch = atlas[char.y:char.y+char.height, char.x:char.x+char.width]
        pre_y_pad = np.ceil(max(0, -char.yoffset)).astype(int)
        post_y_pad = np.ceil(max(0, char.yoffset)).astype(int)
        pre_x_pad = np.ceil(max(0, -char.xoffset)).astype(int)
        post_x_pad = np.ceil(max(0, char.xoffset)).astype(int)
        patch = np.pad(patch, ((pre_y_pad, post_y_pad), (pre_x_pad, post_x_pad), (0, 0)), mode='constant', constant_values=255)
        # y-offset shift
        patch = shift(patch, (char.yoffset, char.xoffset, 0), mode='nearest')

        # kerning shift if any
        if len(chars) > 0 and (kerning := kerning_map.get((chars[-1].ch, ch))):
            patch = shift(patch, (0, kerning.value, 0), mode='nearest')

        patches.append(patch)
        chars.append(char)
    
    height = max(patch.shape[0] for patch in patches)
    width = sum(patch.shape[1] for patch in patches)
    canvas0 = np.ones((*canvas_size, 4), dtype=np.uint8) * 255
    canvas1 = np.ones((*canvas_size, 4), dtype=np.uint8) * 255
    x = 0
    for i, (patch, char) in enumerate(zip(patches, chars)):
        # plt.imshow(s); plt.show()
        
        canvas = canvas0 if i % 2 == 0 else canvas1
        canvas[y0:y0+patch.shape[0], x0+x:x0+x+patch.shape[1], :] = patch
        x += int(char.xadvance)

    # plt.imshow(np.concatenate((canvas0, canvas1), axis=0)); plt.show()


    # return canvas

    # padd so that both are square
    # max_dim = max(canvas0.shape[0], canvas0.shape[1], canvas1.shape[0], canvas1.shape[1])
    # c0y_pad = max_dim - canvas0.shape[0]
    # c0x_pad = max_dim - canvas0.shape[1]
    # c1y_pad = max_dim - canvas1.shape[0]
    # c1x_pad = max_dim - canvas1.shape[1]
    # canvas0 = np.pad(canvas0, ((c0y_pad//2, c0y_pad - c0y_pad//2), (c0x_pad//2, c0x_pad - c0x_pad//2), (0, 0)), mode='constant', constant_values=0)
    # canvas1 = np.pad(canvas1, ((c1y_pad//2, c1y_pad - c1y_pad//2), (c1x_pad//2, c1x_pad - c1x_pad//2), (0, 0)), mode='constant', constant_values=0)

    # save the 2 canvases
    # Image.fromarray(canvas0).save(f'{name}_0.png')
    # Image.fromarray(canvas1).save(f'{name}_1.png')


    # return np.concatenate(patches, axis=1)

    # set any fully transparent/empty sections to white
    mask0 = np.all(canvas0 == [0, 0, 0, 0], axis=-1)
    mask1 = np.all(canvas1 == [0, 0, 0, 0], axis=-1)
    canvas0[mask0] = [255, 255, 255, 255]
    canvas1[mask1] = [255, 255, 255, 255]


    return canvas0, canvas1



if __name__ == '__main__':
    charset, char_map, kerning_map, meta = read_meta('Quadon')
    
    # try to get the character Q from the atlas
    # load_from_atlas('Quadon', 'W')
    # load_from_atlas('Quadon', 'A')
    # load_from_atlas('Quadon', 'B')
    # load_from_atlas('Quadon', 'x')
    # load_from_atlas('Quadon', 'y')
    # load_from_atlas('Quadon', '4')
    # load_from_atlas('Quadon', '-')

    canvas_size = (585, 1024)

    email0, email1 = render_sentence('Quadon', 'david.andrew.engineer@gmail.com', canvas_size, (230, 220), 'email')
    linkd0, linkd1 = render_sentence('Quadon', 'https://www.linkedin.com/in/dewy', canvas_size, (333, 220), 'linkedin')
    
    # combine the email and linkedin lines to make 2 layers
    layer0 = np.minimum(email0, linkd0)
    layer1 = np.minimum(email1, linkd1)


    # debug load the icons and see if they're in the right spot
    icons = Image.open('icons.png')
    icons = np.array(icons)
    # plt.imshow(np.minimum(icons,layer0)); plt.show()
    plt.imshow(np.minimum(np.minimum(icons,layer0), layer1)); plt.show()
    
    
    # save the 2 canvases
    Image.fromarray(invert_canvas(layer0)).save('layer0.png')
    Image.fromarray(invert_canvas(layer1)).save('layer1.png')
    
    # plt.imshow(np.concatenate((layer0, layer1), axis=0)); plt.show()
    plt.imshow(layer0); plt.show()

    # pdb.set_trace()
    
    # print(meta)