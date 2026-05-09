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

export const passwordAnalyzer = (password = '') => {

  if (!password.trim()) {
    return {
      level: 'None',
      score: 0,
      percentage: 0,
      entropy: 0,
      isStrong: false,

      checks: {
        hasMinLength: false,
        hasGoodLength: false,
        hasLowercase: false,
        hasUppercase: false,
        hasNumbers: false,
        hasSymbols: false,
        noCommonPassword: true,
        noRepeatedChars: true,
        noSequentialChars: true
      },

      feedback: ['Enter a password']
    }
  }

  let score = 0
  const feedback = []

  const hasMinLength = password.length >= 8
  const hasGoodLength = password.length >= 12
  const hasExcellentLength = password.length >= 16

  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSymbols = /[^a-zA-Z0-9]/.test(password)

  const noCommonPassword =
    !COMMON_PASSWORDS.has(password.toLowerCase())

  const noRepeatedChars =
    !/(.)\1{2,}/.test(password)

  const noSequentialChars =
    !SEQUENTIAL_PATTERNS.some((seq) =>
      password.toLowerCase().includes(seq)
    )

  // Score
  if (hasMinLength) score += 1
  if (hasGoodLength) score += 1
  if (hasExcellentLength) score += 1

  if (hasLowercase) score += 1
  if (hasUppercase) score += 1.5
  if (hasNumbers) score += 1.5
  if (hasSymbols) score += 2

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

  // Normalize score
  score = Math.max(0, Math.min(10, score))
  score = Math.round(score * 10) / 10

  const percentage = Math.round((score / 10) * 100)

  // Password level
  let level = 'Very Weak'

  if (score > 8) {
    level = 'Very Strong'
  } else if (score > 6) {
    level = 'Strong'
  } else if (score > 4) {
    level = 'Medium'
  } else if (score > 2) {
    level = 'Weak'
  }

  const isStrong = score >= 6

  // Feedback
  if (!hasMinLength) {
    feedback.push('Use at least 8 characters')
  }

  if (!hasGoodLength) {
    feedback.push('Use 12+ characters for better security')
  }

  if (!hasLowercase) {
    feedback.push('Add lowercase letters')
  }

  if (!hasUppercase) {
    feedback.push('Add uppercase letters')
  }

  if (!hasNumbers) {
    feedback.push('Add numbers')
  }

  if (!hasSymbols) {
    feedback.push('Add special characters')
  }

  if (!noCommonPassword) {
    feedback.push('Avoid common passwords')
  }

  if (!noRepeatedChars) {
    feedback.push('Avoid repeated characters')
  }

  if (!noSequentialChars) {
    feedback.push('Avoid sequential patterns')
  }

  if (feedback.length === 0) {
    feedback.push('Great password!')
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