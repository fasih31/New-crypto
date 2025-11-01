import { useState, useEffect } from 'react'
import { useWallet } from './use-wallet'

export interface Token {
  symbol: string
  name: string
  address: string
  decimals: number
  logoURI?: string
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

const MOCK_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6441b4b8bA4d8cC5E8E8E8E8E8E8E8E',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png'
  },
  {
    symbol: 'APOM',
    name: 'APOM Token',
    address: '0x1234567890123456789012345678901234567890',
    decimals: 18,
    logoURI: '/logo.png'
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    address: '0x0000000000000000000000000000000000001010',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png'
  }
]

const STORAGE_KEY = 'apom_transactions'

export const useTransactions = () => {
  const { address, isConnected } = useWallet()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [tokens] = useState<Token[]>(MOCK_TOKENS)
  const [isLoading, setIsLoading] = useState(false)

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

  // Mock swap rate calculation (simulating DEX pricing)
  const getSwapRate = (fromToken: Token, toToken: Token, amount: string): string => {
    if (!amount || parseFloat(amount) <= 0) return '0'

    // Mock exchange rates (simplified)
    const rates: Record<string, Record<string, number>> = {
      'ETH': { 'USDC': 2500, 'APOM': 1000, 'MATIC': 0.8 },
      'USDC': { 'ETH': 0.0004, 'APOM': 0.4, 'MATIC': 0.00032 },
      'APOM': { 'ETH': 0.001, 'USDC': 2.5, 'MATIC': 0.0008 },
      'MATIC': { 'ETH': 1.25, 'USDC': 3125, 'APOM': 1250 }
    }

    const rate = rates[fromToken.symbol]?.[toToken.symbol] || 1
    const result = parseFloat(amount) * rate

    // Add some slippage (0.5-2%)
    const slippage = 0.005 + Math.random() * 0.015
    return (result * (1 - slippage)).toFixed(toToken.decimals)
  }

  // Calculate swap fee (0.3%)
  const calculateFee = (amount: string): string => {
    return (parseFloat(amount) * 0.003).toFixed(6)
  }

  // Perform token swap
  const swapTokens = async (
    fromToken: Token,
    toToken: Token,
    fromAmount: string
  ): Promise<{ success: boolean; transaction?: Transaction; error?: string }> => {
    if (!isConnected || !address) {
      return { success: false, error: 'Wallet not connected' }
    }

    if (parseFloat(fromAmount) <= 0) {
      return { success: false, error: 'Invalid amount' }
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      const toAmount = getSwapRate(fromToken, toToken, fromAmount)
      const fee = calculateFee(fromAmount)

      // Create transaction record
      const transaction: Transaction = {
        id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'swap',
        fromToken,
        toToken,
        fromAmount,
        toAmount,
        fee,
        status: 'confirmed', // Mock as confirmed
        timestamp: Date.now(),
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        gasUsed: Math.floor(Math.random() * 100000 + 50000).toString()
      }

      // Add to transactions list
      const newTransactions = [transaction, ...transactions]
      setTransactions(newTransactions)
      saveTransactions(newTransactions)

      setIsLoading(false)
      return { success: true, transaction }
    } catch (error) {
      setIsLoading(false)
      return { success: false, error: 'Swap failed. Please try again.' }
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

  return {
    tokens,
    transactions,
    isLoading,
    swapTokens,
    getTransactionHistory,
    clearHistory,
    getSwapRate,
    calculateFee
  }
}
