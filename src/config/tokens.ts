// Token Configuration
// Security Note: All token addresses MUST be verified before production use
// This file uses environment variables to prevent hardcoding sensitive addresses

import { Token } from '@/hooks/use-transactions'

// Native token addresses (standard across networks)
const NATIVE_ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
const NATIVE_MATIC_ADDRESS = '0x0000000000000000000000000000000000001010'

// Get token addresses from environment variables with strict validation
export const getTokenConfig = (): Token[] => {
  // CRITICAL: Validate and enforce environment configuration
  const APOM_ADDRESS = import.meta.env.VITE_APOM_TOKEN_ADDRESS
  const USDC_ADDRESS = import.meta.env.VITE_USDC_TOKEN_ADDRESS
  
  // Strict validation for production-critical addresses
  if (APOM_ADDRESS && !isValidTokenAddress(APOM_ADDRESS)) {
    console.error(`❌ Invalid APOM token address format: ${APOM_ADDRESS}`)
    throw new Error('VITE_APOM_TOKEN_ADDRESS must be a valid Ethereum address (0x followed by 40 hex characters)')
  }
  
  if (USDC_ADDRESS && !isValidTokenAddress(USDC_ADDRESS)) {
    console.error(`❌ Invalid USDC token address format: ${USDC_ADDRESS}`)
    throw new Error('VITE_USDC_TOKEN_ADDRESS must be a valid Ethereum address (0x followed by 40 hex characters)')
  }
  
  // Development mode: Allow demo tokens with clear warnings
  // Production mode: Require proper configuration
  const isDevelopment = import.meta.env.DEV
  
  if (!APOM_ADDRESS && !isDevelopment) {
    console.error('❌ VITE_APOM_TOKEN_ADDRESS is required for production')
    throw new Error('Missing required environment variable: VITE_APOM_TOKEN_ADDRESS. See .env.example for configuration')
  }
  
  if (!USDC_ADDRESS && !isDevelopment) {
    console.error('❌ VITE_USDC_TOKEN_ADDRESS is required for production')
    throw new Error('Missing required environment variable: VITE_USDC_TOKEN_ADDRESS. See .env.example for configuration')
  }
  
  // Use provided addresses or native tokens for development demo
  const apomAddress = APOM_ADDRESS || NATIVE_ETH_ADDRESS
  const usdcAddress = USDC_ADDRESS || NATIVE_ETH_ADDRESS
  
  // Development mode warnings
  if (isDevelopment) {
    if (!APOM_ADDRESS) {
      console.warn('⚠️  Development mode: VITE_APOM_TOKEN_ADDRESS not set. Using demo configuration.')
    }
    if (!USDC_ADDRESS) {
      console.warn('⚠️  Development mode: VITE_USDC_TOKEN_ADDRESS not set. Using demo configuration.')
    }
  }
  
  return [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      address: NATIVE_ETH_ADDRESS,
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: usdcAddress,
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png'
    },
    {
      symbol: 'APOM',
      name: 'APOM Token',
      address: apomAddress,
      decimals: 18,
      logoURI: '/logo.png',
      isCustom: true // Flag for custom token
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      address: NATIVE_MATIC_ADDRESS,
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png'
    }
  ]
}

// Validate token address format
export const isValidTokenAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// Get treasury address from environment with strict validation
export const getTreasuryAddress = (): string => {
  const address = import.meta.env.VITE_TREASURY_ADDRESS
  const isDevelopment = import.meta.env.DEV
  
  // Validate address format if provided
  if (address && !isValidTokenAddress(address)) {
    console.error(`❌ Invalid treasury address format: ${address}`)
    throw new Error('VITE_TREASURY_ADDRESS must be a valid Ethereum address (0x followed by 40 hex characters)')
  }
  
  // Production: Require treasury address
  if (!address && !isDevelopment) {
    console.error('❌ VITE_TREASURY_ADDRESS is required for production')
    throw new Error('Missing required environment variable: VITE_TREASURY_ADDRESS. See .env.example for configuration')
  }
  
  // Development: Allow demo with warning
  if (!address && isDevelopment) {
    console.warn('⚠️  Development mode: VITE_TREASURY_ADDRESS not set. Using demo address.')
    return NATIVE_ETH_ADDRESS
  }
  
  return address
}

// Export configuration flags
export const featureFlags = {
  enableGovernance: import.meta.env.VITE_ENABLE_GOVERNANCE === 'true',
  enableNFTMarketplace: import.meta.env.VITE_ENABLE_NFT_MARKETPLACE === 'true',
  enableGaming: import.meta.env.VITE_ENABLE_GAMING === 'true',
  enableLaunchpad: import.meta.env.VITE_ENABLE_LAUNCHPAD === 'true',
}
