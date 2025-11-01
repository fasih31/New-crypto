// Price Oracle Service
// Real-time price fetching with caching and fallback mechanisms
// Author: Enhanced by Fasih ur rehman

import { Token } from '@/hooks/use-transactions'

interface PriceData {
  price: number
  timestamp: number
  source: 'api' | 'cache' | 'fallback'
}

class PriceOracleService {
  private cache: Map<string, PriceData> = new Map()
  private readonly CACHE_DURATION = 30000 // 30 seconds
  private readonly API_ENDPOINT = import.meta.env.VITE_PRICE_ORACLE_API || 'https://api.coingecko.com/api/v3'

  // Mock exchange rates as fallback
  private fallbackRates: Record<string, Record<string, number>> = {
    'ETH': { 'USDC': 2500, 'APOM': 1000, 'MATIC': 1562.5 },
    'USDC': { 'ETH': 0.0004, 'APOM': 0.4, 'MATIC': 0.625 },
    'APOM': { 'ETH': 0.001, 'USDC': 2.5, 'MATIC': 1.5625 },
    'MATIC': { 'ETH': 0.00064, 'USDC': 1.6, 'APOM': 0.64 }
  }

  private getCacheKey(fromSymbol: string, toSymbol: string): string {
    return `${fromSymbol}_${toSymbol}`
  }

  private isCacheValid(cacheKey: string): boolean {
    const cached = this.cache.get(cacheKey)
    if (!cached) return false
    
    const age = Date.now() - cached.timestamp
    return age < this.CACHE_DURATION
  }

  async getPrice(fromToken: Token, toToken: Token): Promise<number> {
    const cacheKey = this.getCacheKey(fromToken.symbol, toToken.symbol)

    // Check cache first
    if (this.isCacheValid(cacheKey)) {
      const cached = this.cache.get(cacheKey)!
      return cached.price
    }

    try {
      // Try to fetch from API (simulated for now)
      const price = await this.fetchPriceFromAPI(fromToken, toToken)
      
      this.cache.set(cacheKey, {
        price,
        timestamp: Date.now(),
        source: 'api'
      })
      
      return price
    } catch (error) {
      console.warn('Price API failed, using fallback rates:', error)
      return this.getFallbackPrice(fromToken, toToken)
    }
  }

  private async fetchPriceFromAPI(fromToken: Token, toToken: Token): Promise<number> {
    // In production, this would call a real price oracle API
    // For now, we'll use the fallback with simulated network delay
    
    await new Promise(resolve => setTimeout(resolve, 100)) // Simulate API delay
    
    // Use fallback rates
    return this.getFallbackPrice(fromToken, toToken)
  }

  private getFallbackPrice(fromToken: Token, toToken: Token): number {
    const rate = this.fallbackRates[fromToken.symbol]?.[toToken.symbol]
    
    if (!rate) {
      console.warn(`No rate found for ${fromToken.symbol} -> ${toToken.symbol}`)
      return 1 // Default 1:1 rate
    }
    
    return rate
  }

  async calculateSwapAmount(
    fromToken: Token,
    toToken: Token,
    fromAmount: string,
    slippageTolerance: number = 0.5
  ): Promise<{ expectedAmount: string; minimumAmount: string; priceImpact: number }> {
    const amount = parseFloat(fromAmount)
    if (amount <= 0) {
      return {
        expectedAmount: '0',
        minimumAmount: '0',
        priceImpact: 0
      }
    }

    const rate = await this.getPrice(fromToken, toToken)
    const expectedAmount = amount * rate

    // Calculate price impact (simplified - in production, use AMM formula)
    const priceImpact = Math.min((amount / 1000000) * 100, 5) // Max 5% impact

    // Apply slippage tolerance
    const slippageMultiplier = 1 - (slippageTolerance / 100)
    const minimumAmount = expectedAmount * slippageMultiplier

    return {
      expectedAmount: expectedAmount.toFixed(toToken.decimals),
      minimumAmount: minimumAmount.toFixed(toToken.decimals),
      priceImpact
    }
  }

  clearCache(): void {
    this.cache.clear()
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

export const priceOracle = new PriceOracleService()
