// Type definitions for @lvcabral/upng
// Based on @types/upng-js (MIT) by York Yao and Sophie Kirschner, adapted to this fork's API.

export = UPNG;
export as namespace UPNG;

declare namespace UPNG {
    interface ImageFrameRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    interface ImageFrame {
        rect: ImageFrameRect;
        /** Frame delay in milliseconds. */
        delay: number;
        dispose: number;
        blend: number;
        /** Unfiltered pixel data of the frame (APNG only). */
        data?: Uint8Array;
    }

    interface ImageTabACTL {
        num_frames: number;
        num_plays: number;
    }

    interface ImageTabText {
        [key: string]: string;
    }

    interface ImageTabs {
        acTL?: ImageTabACTL;
        pHYs?: number[];
        cHRM?: number[];
        tEXt?: ImageTabText;
        iTXt?: ImageTabText;
        PLTE?: number[];
        hIST?: number[];
        /** Depends on ctype: number[] for palette and RGB, number for grayscale. */
        tRNS?: number | number[];
        gAMA?: number;
        sRGB?: number;
        /** Depends on ctype: number for palette, number[] otherwise. */
        bKGD?: number | number[];
    }

    interface Image {
        width: number;
        height: number;
        depth: number;
        ctype: number;
        frames: ImageFrame[];
        tabs: ImageTabs;
        /** Unfiltered pixel data in the PNG's own format. Use `toRGBA8` to get RGBA pixels. */
        data: Uint8Array;
    }

    interface QuantizeResult {
        /** One quantized RGBA8 buffer per input buffer. */
        bufs: ArrayBuffer[];
        /** Palette tree leaves; each `est.rgba` is a color packed as 0xAABBGGRR. */
        plte: any[];
    }

    /**
     * Encodes RGBA8 frames as a PNG (one frame) or APNG (several frames).
     * @param imgs RGBA8 pixel buffers, one per frame.
     * @param w Image width.
     * @param h Image height.
     * @param cnum Number of colors in the result: 0 for lossless, or a palette size such as 256 for lossy.
     * @param dels Frame delays in milliseconds (APNG only).
     * @param forbidPlte Do not use a palette, even when the image has few colors.
     */
    function encode(
        imgs: ArrayBuffer[],
        w: number,
        h: number,
        cnum: number,
        dels?: number[],
        forbidPlte?: boolean,
    ): ArrayBuffer;

    /** Parses a PNG or APNG file. */
    function decode(buffer: ArrayBuffer | Uint8Array): Image;

    /** Converts a decoded image to RGBA8, returning one buffer per frame. */
    function toRGBA8(out: Image): ArrayBuffer[];

    /** Reduces the colors of RGBA8 buffers to a shared palette of `psize` colors. */
    function quantize(bufs: ArrayBuffer[], psize: number, roundAlpha?: boolean): QuantizeResult;
}
