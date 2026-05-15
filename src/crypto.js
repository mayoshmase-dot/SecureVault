const encoder = new TextEncoder()
const decoder = new TextDecoder()

export async function deriveAuthHash(password, saltHex, iterations = 100000) {
  const salt = hexToBytes(saltHex)
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"])
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations, hash: "SHA-256" }, keyMaterial, 256)
  return bytesToHex(new Uint8Array(bits))
}

export async function generateRecoveryKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const random = crypto.getRandomValues(new Uint8Array(24))
  const key = Array.from(random).map((b) => chars[b % chars.length]).join('')
  const formatted = key.match(/.{1,4}/g).join('-')
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(formatted))
  const recoveryKeyHash = bytesToHex(new Uint8Array(hashBuffer))
  return { recoveryKey: formatted, recoveryKeyHash }
}

export async function hashValue(value) {
  const normalized = value.trim().toUpperCase()
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(normalized))
  return bytesToHex(new Uint8Array(hashBuffer))
}

async function getKey(masterPassword, salt) {
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(masterPassword), "PBKDF2", false, ["deriveKey"])
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  )
}

export async function encrypt(text, masterPassword) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await getKey(masterPassword, salt)
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(text))
  const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength)
  combined.set(salt, 0)
  combined.set(iv, salt.length)
  combined.set(new Uint8Array(encrypted), salt.length + iv.length)
  return btoa(String.fromCharCode(...combined))
}

export async function decrypt(payload, masterPassword) {
  if (!payload || typeof payload !== "string") throw new Error("Invalid encrypted payload")
  const combined = new Uint8Array(atob(payload).split("").map((c) => c.charCodeAt(0)))
  const salt = combined.slice(0, 16)
  const iv = combined.slice(16, 28)
  const encryptedData = combined.slice(28)
  const key = await getKey(masterPassword, salt)
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedData)
  return decoder.decode(decrypted)
}

export function safeParse(value) {
  try {
    return typeof value === "string" ? JSON.parse(value) : value
  } catch {
    return value
  }
}

export function isEncrypted(value) {
  if (typeof value !== "string") return false
  try {
    atob(value)
    return value.length > 40
  } catch {
    return false
  }
}

function bytesToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes
}