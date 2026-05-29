const SEQUENTIAL_PATTERNS = [
  '123',
  '234',
  '345',
  '456',
  '567',
  '678',
  '789',
  'abc',
  'bcd',
  'cde',
  'qwerty',
  'abcd'
]

const COMMON_PASSWORDS = new Set([
  'password',
  '123456',
  '12345678',
  'qwerty',
  'abc123',
  'password123',
  'admin',
  'admin123',
  'welcome',
  'letmein',
  '111111',
  '123123',
  'qwerty123',
  'iloveyou',
  '000000',
  'pass123'
])

const getCharacterPoolSize = (password) => {
  let poolSize = 0

  if (/[a-z]/.test(password)) poolSize += 26
  if (/[A-Z]/.test(password)) poolSize += 26
  if (/[0-9]/.test(password)) poolSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32

  return poolSize
}

const calculateEntropy = (password) => {
  const poolSize = getCharacterPoolSize(password)

  if (!poolSize) return 0

  return Math.floor(password.length * Math.log2(poolSize))
}

export const passwordAnalyzer = (password = '', t) => {

  if (!password.trim()) {
    return {
      level: t('None'),
      score: 0,
      percentage: 0,
      entropy: 0,
      isStrong: false,

      checks: {
        hasMinLength: false,
        hasGoodLength: false,
        hasExcellentLength: false,
        hasLowercase: false,
        hasUppercase: false,
        hasNumbers: false,
        hasSymbols: false,
        noCommonPassword: true,
        noRepeatedChars: true,
        noSequentialChars: true
      },

      feedback: [t('Enter a password')]
    }
  }

  let score = 0
  const feedback = []

  // Length checks
  const hasMinLength = password.length >= 8
  const hasGoodLength = password.length >= 12
  const hasExcellentLength = password.length >= 16

  // Character type checks
  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSymbols = /[^a-zA-Z0-9]/.test(password)

  // Security checks
  const noCommonPassword =
    !COMMON_PASSWORDS.has(password.toLowerCase())

  // Detects aaa, 111, $$$, etc.
  const noRepeatedChars =
    !/(.)\1{2,}/.test(password)

  // Detects abc, 123, qwerty, etc.
  const noSequentialChars =
    !SEQUENTIAL_PATTERNS.some((seq) =>
      password.toLowerCase().includes(seq)
    )

  // Base score
  if (hasMinLength) score += 1
  if (hasGoodLength) score += 1
  if (hasExcellentLength) score += 1

  if (hasLowercase) score += 1
  if (hasUppercase) score += 1.5
  if (hasNumbers) score += 1.5
  if (hasSymbols) score += 2

  // Penalties
  if (!noRepeatedChars) score -= 1
  if (!noSequentialChars) score -= 0.5

  // Common passwords penalty
  if (!noCommonPassword) {
    score = Math.min(score, 1)
  }

  // Entropy bonus
  const entropy = calculateEntropy(password)

  if (entropy >= 80) {
    score += 1
  } else if (entropy >= 60) {
    score += 0.5
  }

  // Clamp score
  score = Math.max(0, Math.min(10, score))
  score = Math.round(score * 10) / 10

  const percentage = Math.round((score / 10) * 100)

  // Password level
  let level = t('Very Weak')

  if (score > 8) {
    level = t('Very Strong')
  } else if (score > 6) {
    level = t('Strong')
  } else if (score > 4) {
    level = t('Medium')
  } else if (score > 2) {
    level = t('Weak')
  }

  const isStrong = score >= 6

  // Feedback
  if (!hasMinLength) {
    feedback.push(t('Use at least 8 characters'))
  }

  if (!hasGoodLength) {
    feedback.push(t('Use 12+ characters for better security'))
  }

  if (!hasLowercase) {
    feedback.push(t('Add lowercase letters'))
  }

  if (!hasUppercase) {
    feedback.push(t('Add uppercase letters'))
  }

  if (!hasNumbers) {
    feedback.push(t('Add numbers'))
  }

  if (!hasSymbols) {
    feedback.push(t('Add special characters'))
  }

  if (!noCommonPassword) {
    feedback.push(t('Avoid common passwords'))
  }

  if (!noRepeatedChars) {
    feedback.push(t('Avoid repeated characters'))
  }

  if (!noSequentialChars) {
    feedback.push(t('Avoid sequential patterns'))
  }

  if (feedback.length === 0) {
    feedback.push(t('Great password!'))
  }

  return {
    level,
    score,
    percentage,
    entropy,
    isStrong,

    checks: {
      hasMinLength,
      hasGoodLength,
      hasExcellentLength,
      hasLowercase,
      hasUppercase,
      hasNumbers,
      hasSymbols,
      noCommonPassword,
      noRepeatedChars,
      noSequentialChars
    },

    feedback
  }
}
