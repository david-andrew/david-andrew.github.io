from dataclasses import dataclass
from pathlib import Path
from typing import Literal, TypedDict, cast
from json import loads

import numpy as np
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


def render_sentence(font: FontName, text: str) -> np.ndarray:
    charset, char_map, kerning_map, meta = read_meta(font)
    atlas = load_atlas(font)
    patches = []
    x = 0
    y = 0
    for ch in text:
        char = char_map[ch]
        patch = atlas[char.y:char.y+char.height, char.x:char.x+char.width]
        patches.append(patch)
        x += char.xadvance
        y += char.yoffset
    
    height = max(patch.shape[0] for patch in patches)
    width = sum(patch.shape[1] for patch in patches)
    canvas = np.zeros((height, width, 4), dtype=np.uint8)
    x = 0
    for patch in patches:
        canvas[:patch.shape[0], x:x+patch.shape[1], :] = patch
        x += patch.shape[1]

    plt.imshow(canvas); plt.show()

    return canvas


    # return np.concatenate(patches, axis=1)



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
    render_sentence('Quadon', 'david.andrew.engineer@gmail.com')
    render_sentence('Quadon', 'https://www.linkedin.com/in/dewy')
    pdb.set_trace()
    
    # print(meta)