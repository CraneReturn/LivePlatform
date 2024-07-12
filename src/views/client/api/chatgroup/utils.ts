const fromCodePointMehod = (codes: number[]) => {
    if (!String.fromCodePoint) {
        // String.fromCodePoint方法是有兼容性问题
        String.fromCodePoint = function fromCodePoint() {
            var chars = [],
                point,
                offset,
                units,
                i;
            for (i = 0; i < arguments.length; ++i) {
                point = arguments[i];
                offset = point - 0x10000;
                units =
                    point > 0xffff
                        ? [0xd800 + (offset >> 10), 0xdc00 + (offset & 0x3ff)]
                        : [point];
                chars.push(String.fromCharCode.apply(null, units));
            }
            return chars.join("");
        };
    }
    return String.fromCodePoint.apply(null, codes);
};
const unicodeChange = (str: String) => {
    const emojiDecodeRegex = /\[\<U+(.*?)\>\]/g;
    return str.replace(emojiDecodeRegex, (p) => {
        const filterP = p.replace(/\[\<U\+|>]/g, "");
        var codes = filterP.split("-").map(function (value, index) {
            return parseInt(value, 16);
        });
        return fromCodePointMehod(codes);
    });
};
export default {
    fromCodePointMehod,
    unicodeChange
}