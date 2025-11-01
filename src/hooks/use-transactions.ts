import { useState, useEffect } from 'react'
import { useWallet } from './use-wallet'
import { getTokenConfig } from '@/config/tokens'
import { SecurityUtils, rateLimiter } from '@/config/security'
import { priceOracle } from '@/services/priceOracle'

export interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  logoURI?: string
  isCustom?: boolean
}

export interface Transaction {
  id: string
  type: 'swap'
  fromToken: Token
  toToken: Token
  fromAmount: string
  toAmount: string
  fee: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: number
  hash?: string
  gasUsed?: string
}

// Load token configuration from environment-based config
// Security: No hardcoded addresses - all configured via environment variables
const TOKENS = getTokenConfig()

const STORAGE_KEY = 'apom_transactions'

export const useTransactions = () => {
  const { address, isConnected } = useWallet()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [tokens] = useState<Token[]>(TOKENS)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load transactions from localStorage
  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${address}`)
      if (stored) {
        try {
          const parsedTransactions = JSON.parse(stored)
          setTransactions(parsedTransactions)
        } catch (error) {
          console.error('Failed to parse stored transactions:', error)
        }
      }
    }
  }, [address])

  // Save transactions to localStorage
  const saveTransactions = (newTransactions: Transaction[]) => {
    if (address) {
      localStorage.setItem(`${STORAGE_KEY}_${address}`, JSON.stringify(newTransactions))
    }
  }

  // Advanced swap rate calculation using price oracle
  const getSwapRate = async (fromToken: Token, toToken: Token, amount: string): Promise<string> => {
    if (!amount || parseFloat(amount) <= 0) return '0'

    try {
      const { expectedAmount } = await priceOracle.calculateSwapAmount(
        fromToken,
        toToken,
        amount,
        0.5 // Default 0.5% slippage tolerance
      )
      return expectedAmount
    } catch (error) {
      console.error('Failed to get swap rate:', error)
      return '0'
    }
  }

  // Calculate swap fee (0.3%)
  const calculateFee = (amount: string): string => {
    return (parseFloat(amount) * 0.003).toFixed(6)
  }

  // Enhanced token swap with comprehensive security checks
  const swapTokens = async (
    fromToken: Token,
    toToken: Token,
    fromAmount: string
  ): Promise<{ success: boolean; transaction?: Transaction; error?: string }> => {
    setError(null)
    
    // Security Check 1: Wallet connection
    if (!isConnected || !address) {
      const errorMsg = 'Wallet not connected'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    }

    // Security Check 2: Sanitize input
    const sanitizedAmount = SecurityUtils.sanitizeInput(fromAmount)
    const amount = parseFloat(sanitizedAmount)

    // Security Check 3: Validate amount
    const amountValidation = SecurityUtils.validateTransactionAmount(amount)
    if (!amountValidation.valid) {
      setError(amountValidation.reason)
      return { success: false, error: amountValidation.reason }
    }

    // Security Check 4: Rate limiting
    if (!rateLimiter.checkLimit()) {
      const timeUntilReset = Math.ceil(rateLimiter.getTimeUntilReset() / 1000)
      const errorMsg = `Rate limit exceeded. Please wait ${timeUntilReset} seconds.`
      setError(errorMsg)
      return { success: false, error: errorMsg }
    }

    // Security Check 5: Detect suspicious activity
    const suspiciousCheck = SecurityUtils.detectSuspiciousActivity(transactions)
    if (suspiciousCheck.suspicious) {
      const errorMsg = `Security Alert: ${suspiciousCheck.reason}`
      setError(errorMsg)
      console.warn(errorMsg)
      // Allow transaction to proceed but log the warning
    }

    setIsLoading(true)

    try {
      // Get swap details with slippage protection
      const swapDetails = await priceOracle.calculateSwapAmount(
        fromToken,
        toToken,
        sanitizedAmount,
        0.5
      )

      const fee = calculateFee(sanitizedAmount)

      // Security Check 6: Verify slippage is within acceptable range
      const slippageCheck = SecurityUtils.calculateSlippageProtection(
        parseFloat(swapDetails.expectedAmount),
        parseFloat(swapDetails.minimumAmount)
      )

      if (!slippageCheck.safe) {
        const errorMsg = `Slippage too high (${slippageCheck.slippage.toFixed(2)}%). Transaction rejected for your protection.`
        setError(errorMsg)
        setIsLoading(false)
        return { success: false, error: errorMsg }
      }

      // Simulate blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create secure transaction record
      const transaction: Transaction = {
        id: SecurityUtils.generateSecureTransactionId(),
        type: 'swap',
        fromToken,
        toToken,
        fromAmount: sanitizedAmount,
        toAmount: swapDetails.expectedAmount,
        fee,
        status: 'confirmed',
        timestamp: Date.now(),
        hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        gasUsed: Math.floor(Math.random() * 100000 + 50000).toString()
      }

      // Add to transactions list
      const newTransactions = [transaction, ...transactions]
      setTransactions(newTransactions)
      saveTransactions(newTransactions)

      setIsLoading(false)
      return { success: true, transaction }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Swap failed. Please try again.'
      setError(errorMsg)
      setIsLoading(false)
      return { success: false, error: errorMsg }
    }
  }

  // Get transaction history
  const getTransactionHistory = (): Transaction[] => {
    return transactions
  }

  // Clear transaction history
  const clearHistory = () => {
    setTransactions([])
    if (address) {
      localStorage.removeItem(`${STORAGE_KEY}_${address}`)
    }
  }

  // Get rate limiter status
  const getRateLimitStatus = () => {
    return {
      remaining: rateLimiter.getRemainingRequests(),
      timeUntilReset: rateLimiter.getTimeUntilReset()
    }
  }

  return {
    tokens,
    transactions,
    isLoading,
    error,
    swapTokens,
    getTransactionHistory,
    clearHistory,
    getSwapRate,
    calculateFee,
    getRateLimitStatus
  }
}
