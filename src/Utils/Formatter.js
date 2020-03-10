class Formatter {
    static toArrayBuffer(buf) {
        const arrayBuffer = new ArrayBuffer(buf.length);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return arrayBuffer;
    }
}

module.exports = Formatter;