const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function getKey(masterPassword, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(text, masterPassword) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey(masterPassword, salt);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(text)
  );

  // دمج salt(16) + iv(12) + data في buffer واحد
  const combined = new Uint8Array(16 + 12 + encrypted.byteLength);
  combined.set(salt, 0);
  combined.set(iv, 16);
  combined.set(new Uint8Array(encrypted), 28);

  return btoa(String.fromCharCode(...combined));
}

export async function decrypt(payload, masterPassword) {
  if (!payload || typeof payload !== "string") {
    throw new Error("Invalid encrypted payload");
  }

  const combined = new Uint8Array(
    atob(payload).split("").map((c) => c.charCodeAt(0))
  );

  const salt = combined.slice(0, 16);
  const iv   = combined.slice(16, 28);
  const data = combined.slice(28);

  const key = await getKey(masterPassword, salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return decoder.decode(decrypted);
}

export function safeParse(value) {
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return value;
  }
}

export function isEncrypted(value) {
  if (typeof value !== "string") return false;
  try {
    atob(value);
    return value.length > 40;
  } catch {
    return false;
  }
}