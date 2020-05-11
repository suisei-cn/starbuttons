const encoder = require("audio-encoder");

async function encoderWrapper(buf: AudioBuffer): Promise<Blob> {
    return new Promise((resolve, reject) => {
        encoder(buf, 128, null, function onComplete(blob: Blob) {
            resolve(blob);
        });
    })
}

/**
 * ハッピーシンセサイザ (Happy Synthesizer)
 * This is the module used by EditorView to export the edits.
 */
export async function mergeAudio(srcs: SynthItem[]): Promise<any> {
    const ctx = new OfflineAudioContext(2, 44100 * 5, 44100);
    for (const i of srcs) {
        console.log(`Fetching ${i.musicurl}`);
        const arrayBuf = await fetch(i.musicurl).then(x => x.blob()).then(x => x.arrayBuffer());
        const audioBufSrc = ctx.createBufferSource();
        const audioBuf = await ctx.decodeAudioData(arrayBuf).catch(err => {
            console.log(`Error when decoding ${i.musicurl}:`, err)
        });
        if (!audioBuf) continue;
        console.log(`Decoded ${i.musicurl} delaying`, audioBuf, i.delay);
        audioBufSrc.buffer = audioBuf;
        audioBufSrc.connect(ctx.destination);
        audioBufSrc.start(i.delay);
    }
    console.log("Rendering...");
    const mergedAudioBuf = await ctx.startRendering();
    const finalBlob = await encoderWrapper(mergedAudioBuf);
    const url = URL.createObjectURL(finalBlob);
    return url;
}

export interface SynthItem {
    musicurl: string,
    delay: number
};