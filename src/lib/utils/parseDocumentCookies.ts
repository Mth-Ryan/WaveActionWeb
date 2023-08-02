export default function parseDocumentCookies(cookies: string): { [key: string]: string } {
    const cookieObj: { [key: string]: string } = {};
    const cookiesArr = cookies.split(";");
    for (let rawCookie of cookiesArr) {
        const [key, rawValue] = rawCookie.trim().split("=");
        const value = decodeURIComponent(rawValue);
        cookieObj[key] = value;
    }
    return cookieObj;
}