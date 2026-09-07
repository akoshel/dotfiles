#!/usr/bin/env python3
"""Decode/encode Firefox mozlz4 files (search.json.mozlz4, bookmarks *.jsonlz4).

Firefox wraps a raw LZ4 *block* in an 8-byte magic plus a little-endian
uint32 of the decompressed size. There is no pip dependency here on purpose:
this has to run on a freshly imaged Mac with nothing but system Python.

Usage:
    mozlz4.py decode  in.mozlz4  out.json
    mozlz4.py encode  in.json    out.mozlz4
"""

from __future__ import annotations

import sys

MAGIC = b"mozLz40\0"


def lz4_decompress(src: bytes, expected_size: int) -> bytes:
    """Decompress a raw LZ4 block (sequence of literal/match pairs)."""
    dst = bytearray()
    pos, end = 0, len(src)

    while pos < end:
        token = src[pos]
        pos += 1

        literal_len = token >> 4
        if literal_len == 15:
            while True:
                literal_len += src[pos]
                if src[pos] != 255:
                    pos += 1
                    break
                pos += 1

        dst += src[pos : pos + literal_len]
        pos += literal_len

        # The final sequence is literals only — no match follows it.
        if pos >= end:
            break

        offset = src[pos] | (src[pos + 1] << 8)
        pos += 2
        if offset == 0:
            raise ValueError("corrupt LZ4 block: zero match offset")

        match_len = (token & 0x0F) + 4
        if (token & 0x0F) == 15:
            while True:
                match_len += src[pos]
                if src[pos] != 255:
                    pos += 1
                    break
                pos += 1

        # Matches may overlap the output tail, so copy byte by byte.
        start = len(dst) - offset
        for i in range(match_len):
            dst.append(dst[start + i])

    if len(dst) != expected_size:
        raise ValueError(f"size mismatch: got {len(dst)}, header said {expected_size}")
    return bytes(dst)


def lz4_compress(src: bytes) -> bytes:
    """Emit a valid, uncompressed LZ4 block: one literal-only sequence.

    Storing everything as literals is legal LZ4 and every decoder accepts it.
    These files are tens of kilobytes and Firefox reads them once at startup,
    so trading size for a dependency-free encoder is the right call.
    """
    out = bytearray()
    length = len(src)

    if length < 15:
        out.append(length << 4)
    else:
        out.append(0xF0)
        remaining = length - 15
        while remaining >= 255:
            out.append(255)
            remaining -= 255
        out.append(remaining)

    out += src
    return bytes(out)


def decode(path_in: str, path_out: str) -> None:
    raw = open(path_in, "rb").read()
    if not raw.startswith(MAGIC):
        raise SystemExit(f"{path_in}: not a mozlz4 file")
    size = int.from_bytes(raw[8:12], "little")
    open(path_out, "wb").write(lz4_decompress(raw[12:], size))


def encode(path_in: str, path_out: str) -> None:
    raw = open(path_in, "rb").read()
    blob = MAGIC + len(raw).to_bytes(4, "little") + lz4_compress(raw)
    open(path_out, "wb").write(blob)


def main() -> None:
    if len(sys.argv) != 4 or sys.argv[1] not in ("decode", "encode"):
        raise SystemExit(__doc__)
    (decode if sys.argv[1] == "decode" else encode)(sys.argv[2], sys.argv[3])


if __name__ == "__main__":
    main()
