# Changelog

All notable changes to `@lvcabral/upng` are listed here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows [Semantic Versioning](https://semver.org/).

This package is a fork of [UPNG.js](https://github.com/photopea/UPNG.js) by Photopea. It starts from the code published on npm as [`upng-js` 2.1.0](https://www.npmjs.com/package/upng-js/v/2.1.0), not from the latest source on GitHub, so features added there later (such as `UPNG.encodeLL`) are not included.

## [2.4.0] - 2026-11-24

### Added

- TypeScript definitions (`index.d.ts`) ship with the package and match this fork's API: `encode` takes `forbidPlte`, `decode` accepts a `Uint8Array`, and `quantize` takes an array of buffers and returns `{ bufs, plte }`. `@types/upng-js` is no longer needed.

### Changed

- TypeScript code that compiled against `@types/upng-js` may need updates: `encodeLL` is not declared (it never existed in this package), `quantize` has the signature above instead of `(data, psize)` returning `{ abuf, inds, plte }`, and `decode(...).data` is a `Uint8Array` instead of an `ArrayBuffer`. Remove `@types/upng-js` from your dependencies.
- The published package contains only `UPNG.js`, `index.d.ts`, `CHANGELOG.md`, `README.md`, `LICENSE` and `package.json`.

### Fixed

- The encoder wrote the image data as raw deflate instead of the zlib stream PNG requires, so libpng, pngjs and other standard decoders rejected the files ([brs-engine#1339](https://github.com/lvcabral/brs-engine/issues/1339)). UPNG's own decoder read them, so the problem was not visible in round trips. Files saved by 2.3.0 still decode with UPNG.
- The output buffer could be too small for very small or poorly compressible images, which cut off the end of the file (for example, the IEND checksum of a 1x1 image). The encoder now computes the exact size of the file.
- `main` now matches the file name `UPNG.js`, so the package loads on case-sensitive file systems.

## [2.3.0] - 2025-03-11

First release of the fork, as `@lvcabral/upng`.

### Changed

- Replaced `pako` with [`fflate`](https://github.com/101arrowz/fflate) for compression and decompression, which is smaller and faster.
- `UPNG.decode` throws an `Error` object instead of a string when the input is not a PNG file.
- `types` pointed to the definitions in `@types/upng-js`, which had to be installed separately.

### Removed

- The fallback to a global `window.pako` when `require` is not available. The package needs Node.js or a bundler to load `fflate`.

[2.4.0]: https://github.com/lvcabral/upng.js/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/lvcabral/upng.js/releases/tag/v2.3.0
