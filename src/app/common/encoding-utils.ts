export function toHtmlString(encoded: String): String {
    if (encoded) {
        var parser = new DOMParser;
        var dom = parser.parseFromString(encoded.toString(), 'text/html');
        return dom.body.textContent;
    } else {
        return encoded;
    }
}

export function toEncodedHtml(toEncode: String): String {
    return toEncode
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}