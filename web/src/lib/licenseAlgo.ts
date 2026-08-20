export const CHARSET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
export const LICENSE_LEN = 192;
export const CHECK_POS = 160;
export const CHECK_LEN = 19;

export function calcH1(email: string): number {
  let h = 0n;
  for (let i = 0; i < email.length; i++) {
    h = (h * 43n + BigInt(email.charCodeAt(i))) & 0xFFFFFFFFn;
  }
  return Number(h);
}

export function calcH2(email: string): number {
  let h = 0n;
  for (let i = 0; i < email.length; i++) {
    h = ((h << 4n) + BigInt(email.charCodeAt(i))) & 0xFFFFFFFFn;
    const g = h & 0xF0000000n;
    if (g !== 0n) {
      h ^= (g >> 24n);
      h ^= g;
      h &= 0xFFFFFFFFn;
    }
  }
  return Number(h);
}

export function calcH3(email: string): number {
  let h = 0n;
  for (let r = 0n; r < 4n; r++) {
    for (let j = Number(r); j < email.length; j += 4) {
      const code = BigInt(email.charCodeAt(j));
      h ^= (code << (r * 8n)) & 0xFFFFFFFFn;
    }
  }
  return Number(h);
}

export function get96BitValue(email: string): bigint {
  const e = email.toLowerCase();
  const h1 = BigInt(calcH1(e));
  const h2 = BigInt(calcH2(e));
  const h3 = BigInt(calcH3(e));
  return (h1 << 64n) | (h2 << 32n) | h3;
}

export function getChecksum(email: string): string {
  const v = get96BitValue(email);
  let res = "";
  for (let i = 0n; i < 19n; i++) {
    const shift = 96n - (i + 1n) * 5n;
    const idx = Number((v >> shift) & 31n);
    res += CHARSET[idx];
  }
  return res;
}

export function generateLicense(email: string): string {
  const check = getChecksum(email);
  let prefix = "";
  for (let i = 0; i < CHECK_POS; i++) {
    prefix += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  let suffix = "";
  for (let i = 0; i < LICENSE_LEN - CHECK_POS - CHECK_LEN; i++) {
    suffix += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return prefix + check + suffix;
}

export function verifyLicense(email: string, license: string): boolean {
  if (!email || !license || license.length !== LICENSE_LEN) return false;
  const expected = getChecksum(email);
  const actual = license.slice(CHECK_POS, CHECK_POS + CHECK_LEN);
  return actual === expected;
}

const DOMAINS = ["gmail.com", "outlook.com", "qq.com", "163.com", "proton.me", "hotmail.com", "foxmail.com"];
const ALPHANUM = "abcdefghijklmnopqrstuvwxyz0123456789";

export function generateRandomEmail(): string {
  let user = "user";
  for (let i = 0; i < 8; i++) {
    user += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)];
  }
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
  return `${user}@${domain}`;
}
