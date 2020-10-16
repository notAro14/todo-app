export function normalize(str) {
  return str
    .split(" ")
    .map((x) => x.toLowerCase())
    .join("-");
}
