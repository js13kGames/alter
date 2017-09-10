import { ctx } from 'pura/canvas/tuple';
import { viewWidth, viewHeight } from 'dom';

const atariPalette = [
  [
    0,
    0,
    0
  ],
  [
    68,
    68,
    0
  ],
  [
    112,
    40,
    0
  ],
  [
    132,
    24,
    0
  ],
  [
    136,
    0,
    0
  ],
  [
    120,
    0,
    92
  ],
  [
    72,
    0,
    120
  ],
  [
    20,
    0,
    132
  ],
  [
    0,
    0,
    136
  ],
  [
    0,
    24,
    124
  ],
  [
    0,
    44,
    92
  ],
  [
    0,
    60,
    44
  ],
  [
    0,
    60,
    0
  ],
  [
    20,
    56,
    0
  ],
  [
    44,
    48,
    0
  ],
  [
    68,
    40,
    0
  ],
  [
    64,
    64,
    64
  ],
  [
    100,
    100,
    16
  ],
  [
    132,
    68,
    20
  ],
  [
    152,
    52,
    24
  ],
  [
    156,
    32,
    32
  ],
  [
    140,
    32,
    116
  ],
  [
    96,
    32,
    144
  ],
  [
    48,
    32,
    152
  ],
  [
    28,
    32,
    156
  ],
  [
    28,
    56,
    144
  ],
  [
    28,
    76,
    120
  ],
  [
    28,
    92,
    72
  ],
  [
    32,
    92,
    32
  ],
  [
    52,
    92,
    28
  ],
  [
    76,
    80,
    28
  ],
  [
    100,
    72,
    24
  ],
  [
    108,
    108,
    108
  ],
  [
    132,
    132,
    36
  ],
  [
    152,
    92,
    40
  ],
  [
    172,
    80,
    48
  ],
  [
    176,
    60,
    60
  ],
  [
    160,
    60,
    136
  ],
  [
    120,
    60,
    164
  ],
  [
    76,
    60,
    172
  ],
  [
    56,
    64,
    176
  ],
  [
    56,
    84,
    168
  ],
  [
    56,
    104,
    144
  ],
  [
    56,
    124,
    100
  ],
  [
    64,
    124,
    64
  ],
  [
    80,
    124,
    56
  ],
  [
    104,
    112,
    52
  ],
  [
    132,
    104,
    48
  ],
  [
    144,
    144,
    144
  ],
  [
    160,
    160,
    52
  ],
  [
    172,
    120,
    60
  ],
  [
    192,
    104,
    72
  ],
  [
    192,
    88,
    88
  ],
  [
    176,
    88,
    156
  ],
  [
    140,
    88,
    184
  ],
  [
    104,
    88,
    192
  ],
  [
    80,
    92,
    192
  ],
  [
    80,
    112,
    188
  ],
  [
    80,
    132,
    172
  ],
  [
    80,
    156,
    128
  ],
  [
    92,
    156,
    92
  ],
  [
    108,
    152,
    80
  ],
  [
    132,
    140,
    76
  ],
  [
    160,
    132,
    68
  ],
  [
    176,
    176,
    176
  ],
  [
    184,
    184,
    64
  ],
  [
    188,
    140,
    76
  ],
  [
    208,
    128,
    92
  ],
  [
    208,
    112,
    112
  ],
  [
    192,
    112,
    176
  ],
  [
    160,
    112,
    204
  ],
  [
    124,
    112,
    208
  ],
  [
    104,
    116,
    208
  ],
  [
    104,
    136,
    204
  ],
  [
    104,
    156,
    192
  ],
  [
    104,
    180,
    148
  ],
  [
    116,
    180,
    116
  ],
  [
    132,
    180,
    104
  ],
  [
    156,
    168,
    100
  ],
  [
    184,
    156,
    88
  ],
  [
    200,
    200,
    200
  ],
  [
    208,
    208,
    80
  ],
  [
    204,
    160,
    92
  ],
  [
    224,
    148,
    112
  ],
  [
    224,
    136,
    136
  ],
  [
    208,
    132,
    192
  ],
  [
    180,
    132,
    220
  ],
  [
    148,
    136,
    224
  ],
  [
    124,
    140,
    224
  ],
  [
    124,
    156,
    220
  ],
  [
    124,
    180,
    212
  ],
  [
    124,
    208,
    172
  ],
  [
    140,
    208,
    140
  ],
  [
    156,
    204,
    124
  ],
  [
    180,
    192,
    120
  ],
  [
    208,
    180,
    108
  ],
  [
    220,
    220,
    220
  ],
  [
    232,
    232,
    92
  ],
  [
    220,
    180,
    104
  ],
  [
    236,
    168,
    128
  ],
  [
    236,
    160,
    160
  ],
  [
    220,
    156,
    208
  ],
  [
    196,
    156,
    236
  ],
  [
    168,
    160,
    236
  ],
  [
    144,
    164,
    236
  ],
  [
    144,
    180,
    236
  ],
  [
    144,
    204,
    232
  ],
  [
    144,
    228,
    192
  ],
  [
    164,
    228,
    164
  ],
  [
    180,
    228,
    144
  ],
  [
    204,
    212,
    136
  ],
  [
    232,
    204,
    124
  ],
  [
    236,
    236,
    236
  ],
  [
    252,
    252,
    104
  ],
  [
    236,
    200,
    120
  ],
  [
    252,
    188,
    148
  ],
  [
    252,
    180,
    180
  ],
  [
    236,
    176,
    224
  ],
  [
    212,
    176,
    252
  ],
  [
    188,
    180,
    252
  ],
  [
    164,
    184,
    252
  ],
  [
    164,
    200,
    252
  ],
  [
    164,
    224,
    252
  ],
  [
    164,
    252,
    212
  ],
  [
    184,
    252,
    184
  ],
  [
    200,
    252,
    164
  ],
  [
    224,
    236,
    156
  ],
  [
    252,
    224,
    140
  ]
];

const paLen = atariPalette.length;

const computedStorage = {};

const colorDiff = (r, g, b)=> {
  const colorKey = `${r/100+0.5|0},${g/100+0.5|0},${b/100+0.5|0}`;

  let closestColor = computedStorage[colorKey];

  if(!closestColor) {
    let minDistance = Infinity;

    for(let i = 0; i < paLen; ++i) {
      const color = atariPalette[i];
      const [cR, cG, cB] = color;

      const distance =
            ((r - cR) * (r - cR)) +
            ((g - cG) * (g - cG)) +
            ((b - cB) * (b - cB));

      if(distance < minDistance) {
        minDistance = distance;
        closestColor = color;
      }
    }

    computedStorage[colorKey] = closestColor;
  }

  return closestColor;
};

for(const [r, g, b] of atariPalette) {
  colorDiff(r, g, b);
}

const Atarify = ()=> {
  const img = ctx.getImageData(0, 0, viewWidth, viewHeight);
  const data = img.data;
  const dataLen = data.length;

  for(let i = 0; i < dataLen; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const [ aR, aG, aB ] = colorDiff(r, g, b);

    data[i] = aR;
    data[i + 1] = aG;
    data[i + 2] = aB;
  }

  // overwrite original image
  ctx.putImageData(img, 0, 0);
};

export default Atarify;
