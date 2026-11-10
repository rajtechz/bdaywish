const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Minimal PNG generator using Node built-in zlib
function createPNG(width, height, colorGen) {
  // RGBA buffer
  const rowSize = width * 4 + 1; // +1 for filter type 0
  const buffer = Buffer.alloc(height * rowSize);

  let offset = 0;
  for (let y = 0; y < height; y++) {
    buffer[offset++] = 0; // Filter byte 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = colorGen(x, y, width, height);
      buffer[offset++] = r;
      buffer[offset++] = g;
      buffer[offset++] = b;
      buffer[offset++] = a;
    }
  }

  const deflated = zlib.deflateSync(buffer);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);

    const typeBuf = Buffer.from(type, 'ascii');
    const crc = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);

    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // PNG Header
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 implementation
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

// Generate luxury gradient palettes for Megha's memories
const palettes = [
  // 1: Rose Pink & Champagne Gold
  (x, y, w, h) => {
    const t = (x + y) / (w + h);
    return [Math.floor(238 - t * 60), Math.floor(130 + t * 50), Math.floor(160 + t * 40), 255];
  },
  // 2: Lavender & Velvet Violet
  (x, y, w, h) => {
    const t = y / h;
    return [Math.floor(138 + t * 40), Math.floor(80 + t * 20), Math.floor(190 + t * 30), 255];
  },
  // 3: Champagne Gold Glow
  (x, y, w, h) => {
    const t = x / w;
    return [Math.floor(217 + t * 20), Math.floor(179 + t * 15), Math.floor(95 + t * 20), 255];
  },
  // 4: Soft Blush & Coral
  (x, y, w, h) => {
    const t = (w - x + y) / (w + h);
    return [Math.floor(247 - t * 40), Math.floor(140 + t * 40), Math.floor(160 + t * 30), 255];
  },
  // 5: Royal Midnight Amethyst
  (x, y, w, h) => {
    const t = (x * y) / (w * h);
    return [Math.floor(80 + t * 90), Math.floor(30 + t * 50), Math.floor(110 + t * 80), 255];
  },
];

const imgDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Create 5 placeholder images (800x1000)
for (let i = 1; i <= 5; i++) {
  const pngData = createPNG(400, 500, palettes[i - 1]);
  const filePath = path.join(imgDir, `megha-${i}.jpg`);
  fs.writeFileSync(filePath, pngData);
  console.log(`Generated ${filePath}`);
}

// Create OG Preview Image for WhatsApp preview (1200x630)
const ogPalette = (x, y, w, h) => {
  const cx = w / 2;
  const cy = h / 2;
  const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) / Math.sqrt(cx ** 2 + cy ** 2);
  // Rich midnight purple with glowing gold/rose center
  const r = Math.floor(24 * dist + 180 * (1 - dist));
  const g = Math.floor(10 * dist + 90 * (1 - dist));
  const b = Math.floor(45 * dist + 140 * (1 - dist));
  return [r, g, b, 255];
};

const ogData = createPNG(600, 315, ogPalette);
fs.writeFileSync(path.join(imgDir, 'og-preview.png'), ogData);
console.log('Generated og-preview.png');
