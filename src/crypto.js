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

  return {
    salt: Array.from(salt),
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  };
}

export async function decrypt(payload, masterPassword) {
  if (!payload?.salt || !payload?.iv || !payload?.data) {
    throw new Error("Invalid encrypted payload");
  }

  const key = await getKey(masterPassword, new Uint8Array(payload.salt));

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(payload.iv),
    },
    key,
    new Uint8Array(payload.data)
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
  try {
    const v = typeof value === "string" ? JSON.parse(value) : value;
    return !!(v?.iv && v?.data && v?.salt);
  } catch {
    return false;
  }
}