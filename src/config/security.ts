// Security Configuration
// Author: Enhanced by Fasih ur rehman
// This module implements advanced security features for the DApp

export interface SecurityConfig {
  maxSlippage: number // Maximum allowed slippage percentage
  transactionTimeout: number // Transaction timeout in milliseconds
  rateLimitPerMinute: number // Max transactions per minute
  minTransactionAmount: number // Minimum transaction amount (in base units)
  maxTransactionAmount: number // Maximum transaction amount without additional confirmation
}

export const securityConfig: SecurityConfig = {
  maxSlippage: parseFloat(import.meta.env.VITE_MAX_SLIPPAGE || '5.0'),
  transactionTimeout: parseInt(import.meta.env.VITE_TRANSACTION_TIMEOUT || '300000'),
  rateLimitPerMinute: parseInt(import.meta.env.VITE_RATE_LIMIT_PER_MINUTE || '10'),
  minTransactionAmount: 0.0001, // Prevent dust attacks
  maxTransactionAmount: 1000000, // Flag large transactions
}

// Rate limiting implementation
class RateLimiter {
  private timestamps: number[] = []
  private limit: number

  constructor(limit: number) {
    this.limit = limit
  }

  checkLimit(): boolean {
    const now = Date.now()
    const oneMinuteAgo = now - 60000

    // Remove timestamps older than 1 minute
    this.timestamps = this.timestamps.filter(t => t > oneMinuteAgo)

    if (this.timestamps.length >= this.limit) {
      return false // Rate limit exceeded
    }

    this.timestamps.push(now)
    return true
  }

  getRemainingRequests(): number {
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    this.timestamps = this.timestamps.filter(t => t > oneMinuteAgo)
    return Math.max(0, this.limit - this.timestamps.length)
  }

  getTimeUntilReset(): number {
    if (this.timestamps.length === 0) return 0
    const oldestTimestamp = Math.min(...this.timestamps)
    const resetTime = oldestTimestamp + 60000
    return Math.max(0, resetTime - Date.now())
  }
}

export const rateLimiter = new RateLimiter(securityConfig.rateLimitPerMinute)

// Transaction validation
export const validateTransactionAmount = (amount: number): { valid: boolean; reason?: string } => {
  if (amount < securityConfig.minTransactionAmount) {
    return {
      valid: false,
      reason: `Amount too small. Minimum: ${securityConfig.minTransactionAmount}`
    }
  }

  if (amount > securityConfig.maxTransactionAmount) {
    return {
      valid: false,
      reason: `Amount exceeds maximum limit. Please contact support for large transactions.`
    }
  }

  return { valid: true }
}

// Slippage protection
export const calculateSlippageProtection = (
  expectedAmount: number,
  actualAmount: number
): { safe: boolean; slippage: number } => {
  const slippage = Math.abs((expectedAmount - actualAmount) / expectedAmount) * 100

  return {
    safe: slippage <= securityConfig.maxSlippage,
    slippage
  }
}

// Sanitize user input
export const sanitizeInput = (input: string): string => {
  // Remove any non-numeric characters except decimal point
  return input.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')
}

// Detect suspicious patterns
export const detectSuspiciousActivity = (
  transactions: Array<{ fromAmount: string; timestamp: number }>
): { suspicious: boolean; reason?: string } => {
  if (transactions.length === 0) return { suspicious: false }

  // Check for rapid succession of identical amounts
  const recentTxs = transactions.filter(tx => Date.now() - tx.timestamp < 60000)
  
  if (recentTxs.length > 5) {
    const amounts = recentTxs.map(tx => parseFloat(tx.fromAmount))
    const uniqueAmounts = new Set(amounts)
    
    if (uniqueAmounts.size === 1) {
      return {
        suspicious: true,
        reason: 'Unusual pattern detected: Multiple identical transactions in short time'
      }
    }
  }

  return { suspicious: false }
}

// Generate secure transaction ID
export const generateSecureTransactionId = (): string => {
  const timestamp = Date.now()
  const randomPart = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
  
  return `tx_${timestamp}_${randomPart}`
}

// Export security utilities
export const SecurityUtils = {
  validateTransactionAmount,
  calculateSlippageProtection,
  sanitizeInput,
  detectSuspiciousActivity,
  generateSecureTransactionId,
  rateLimiter
}
