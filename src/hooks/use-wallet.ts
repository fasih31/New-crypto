import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { mainnet, sepolia, polygon, polygonAmoy } from 'wagmi/chains'

export const useWallet = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const connectWallet = async (connectorId?: string) => {
    try {
      // Default to injected connector (MetaMask) if no connector specified
      const connector = connectorId
        ? connectors.find(c => c.id === connectorId) || injected()
        : injected()

      await connect({ connector })
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  }

  const disconnectWallet = () => {
    disconnect()
  }

  const switchNetwork = async (targetChainId: number) => {
    try {
      await switchChain({ chainId: targetChainId })
    } catch (error) {
      console.error('Failed to switch network:', error)
      throw error
    }
  }

  // Get current network name
  const getCurrentNetwork = () => {
    const networks = {
      [mainnet.id]: 'Ethereum',
      [sepolia.id]: 'Sepolia',
      [polygon.id]: 'Polygon',
      [polygonAmoy.id]: 'Polygon Amoy',
    }
    return networks[chainId as keyof typeof networks] || 'Unknown'
  }

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return {
    address,
    isConnected,
    isConnecting,
    chainId,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    getCurrentNetwork,
    formatAddress,
    connectors,
  }
}
