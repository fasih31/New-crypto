import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useWallet } from '@/hooks/use-wallet'
import { Wallet, ExternalLink } from 'lucide-react'

interface WalletConnectModalProps {
  children: React.ReactNode
}

const WalletConnectModal = ({ children }: WalletConnectModalProps) => {
  const [open, setOpen] = useState(false)
  const { connectWallet, isConnecting, connectors } = useWallet()

  const handleConnect = async (connectorId: string) => {
    try {
      await connectWallet(connectorId)
      setOpen(false)
    } catch (error) {
      console.error('Connection failed:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Connect your wallet to access DeFi features, NFT marketplace, and gaming rewards.
          </p>

          <div className="space-y-2">
            {connectors.map((connector) => (
              <Button
                key={connector.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleConnect(connector.id)}
                disabled={isConnecting}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {connector.name}
                {isConnecting && <span className="ml-auto">Connecting...</span>}
              </Button>
            ))}

            {/* MetaMask specific button if not in connectors list */}
            {!connectors.some(c => c.name.toLowerCase().includes('metamask')) && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleConnect('injected')}
                disabled={isConnecting}
              >
                <Wallet className="w-4 h-4 mr-2" />
                MetaMask
                {isConnecting && <span className="ml-auto">Connecting...</span>}
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Don't have a wallet?</p>
            <Button variant="link" size="sm" className="h-auto p-0" asChild>
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                Get MetaMask <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WalletConnectModal
