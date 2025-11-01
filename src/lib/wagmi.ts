import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, polygon, polygonAmoy } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

// Get environment variables or use defaults
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, polygonAmoy],
  connectors: [
    injected(),
    walletConnect({
      projectId,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
