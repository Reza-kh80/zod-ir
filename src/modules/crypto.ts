const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const ALPHABET_MAP: Record<string, number> = {};
for (let i = 0; i < ALPHABET.length; i++) ALPHABET_MAP[ALPHABET.charAt(i)] = i;

function fromBase58(string: string): Uint8Array | null {
  if (string.length === 0) return new Uint8Array(0);
  let bytes = [0];
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (!(char in ALPHABET_MAP)) return null;
    const value = ALPHABET_MAP[char];
    for (let j = 0; j < bytes.length; j++) {
      bytes[j] *= 58;
    }
    bytes[0] += value;
    let carry = 0;
    for (let j = 0; j < bytes.length; j++) {
      bytes[j] += carry;
      carry = bytes[j] >> 8;
      bytes[j] &= 0xff;
    }
    while (carry) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }
  for (let i = 0; i < string.length && string[i] === "1"; i++) {
    bytes.push(0);
  }
  return new Uint8Array(bytes.reverse());
}

export type CryptoInfo = {
  ticker: "TRX" | "ETH" | "BTC" | "UNKNOWN";
  network: "TRC20" | "ERC20" | "BITCOIN" | "UNKNOWN";
  isValid: boolean;
  warning?: string;
} | null;

export function getCryptoInfo(address: string): CryptoInfo {
  if (!address || typeof address !== "string") return null;

  if (address.startsWith("T") && address.length === 34) {
    const decoded = fromBase58(address);
    if (decoded && decoded.length === 25) {
      return { ticker: "TRX", network: "TRC20", isValid: true };
    }
  }

  if (address.startsWith("0x") && address.length === 42) {
    if (/^0x[0-9a-fA-F]{40}$/.test(address)) {
      const isLowercase = /^0x[0-9a-f]{40}$/.test(address);
      const isUppercase = /^0x[0-9A-F]{40}$/.test(address);
      return {
        ticker: "ETH",
        network: "ERC20",
        isValid: true,
        warning: isLowercase || isUppercase ? undefined : "Checksummed",
      };
    }
  }

  if (/^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address)) {
    const decoded = fromBase58(address);
    if (decoded && decoded.length === 25) {
      return { ticker: "BTC", network: "BITCOIN", isValid: true };
    }
  }
  if (address.startsWith("bc1") && /^[a-z0-9]{39,59}$/.test(address)) {
    return { ticker: "BTC", network: "BITCOIN", isValid: true };
  }

  return { ticker: "UNKNOWN", network: "UNKNOWN", isValid: false };
}

export function isCryptoAddress(
  address: string,
  ticker?: "TRX" | "ETH" | "BTC"
): boolean {
  const info = getCryptoInfo(address);
  if (!info || !info.isValid) return false;
  if (ticker && info.ticker !== ticker) return false;
  return true;
}
