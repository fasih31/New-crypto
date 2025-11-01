// CryptoVerse Hub Token Configuration
import { getAddress } from 'viem';

// Token addresses from environment or fallback to demo mode
const CVERSE_TOKEN_ADDRESS = import.meta.env.VITE_CVERSE_TOKEN_ADDRESS;
const USDC_TOKEN_ADDRESS = import.meta.env.VITE_USDC_TOKEN_ADDRESS;

if (!CVERSE_TOKEN_ADDRESS) {
  console.warn('⚠️  Development mode: VITE_CVERSE_TOKEN_ADDRESS not set. Using demo configuration.');
}

if (!USDC_TOKEN_ADDRESS) {
  console.warn('⚠️  Development mode: VITE_USDC_TOKEN_ADDRESS not set. Using demo configuration.');
}

export const TOKENS = {
  CVERSE: {
    address: CVERSE_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000',
    symbol: 'CVERSE',
    name: 'CryptoVerse Token',
    decimals: 18,
    icon: '🌐',
  },
  USDC: {
    address: USDC_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    icon: '💵',
  },
  ETH: {
    address: 'native',
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    icon: '⟠',
  },
} as const;

export const getTokenBySymbol = (symbol: string) => {
  return Object.values(TOKENS).find(token => token.symbol === symbol);
};

export const isValidTokenAddress = (address: string): boolean => {
  if (address === 'native') return true;
  try {
    getAddress(address);
    return address !== '0x0000000000000000000000000000000000000000';
  } catch {
    return false;
  }
};