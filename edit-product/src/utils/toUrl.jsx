export default function toUrl(x) {
    return x?.toString()?.replaceAll("http:", "https:")
}