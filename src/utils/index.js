export function normalize(str) {
  return str
    .split(" ")
    .map((x) => x.toLowerCase())
    .join("-");
}

export function validateFullname(fullname) {
  const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
  return regex.test(fullname);
}
