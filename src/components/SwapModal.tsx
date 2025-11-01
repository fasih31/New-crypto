import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown, Settings, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useTransactions, Token, Transaction } from '@/hooks/use-transactions'
import { useToast } from '@/hooks/use-toast'

interface SwapModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SwapModal = ({ open, onOpenChange }: SwapModalProps) => {
  const [fromToken, setFromToken] = useState<Token | null>(null)
  const [toToken, setToToken] = useState<Token | null>(null)
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isSwapping, setIsSwapping] = useState(false)
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null)

  const { tokens, swapTokens, getSwapRate, calculateFee, isLoading } = useTransactions()
  const { toast } = useToast()

  // Set default tokens on mount
  useEffect(() => {
    if (tokens.length > 0 && !fromToken && !toToken) {
      setFromToken(tokens[0]) // ETH
      setToToken(tokens[1]) // USDC
    }
  }, [tokens, fromToken, toToken])

  // Calculate swap amount when inputs change
  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      const calculatedAmount = getSwapRate(fromToken, toToken, fromAmount)
      setToAmount(calculatedAmount)
    } else {
      setToAmount('')
    }
  }, [fromToken, toToken, fromAmount, getSwapRate])

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount) return

    setIsSwapping(true)
    try {
      const result = await swapTokens(fromToken, toToken, fromAmount)

      if (result.success && result.transaction) {
        setLastTransaction(result.transaction)
        toast({
          title: "Swap Successful! 🎉",
          description: `Swapped ${fromAmount} ${fromToken.symbol} for ${result.transaction.toAmount} ${toToken.symbol}`,
        })

        // Reset form
        setFromAmount('')
        setToAmount('')
      } else {
        toast({
          title: "Swap Failed",
          description: result.error || "Something went wrong",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Swap Failed",
        description: "Network error occurred",
        variant: "destructive",
      })
    }
    setIsSwapping(false)
  }

  const switchTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount('')
    setToAmount('')
  }

  const selectToken = (token: Token, isFrom: boolean) => {
    if (isFrom) {
      if (toToken?.symbol === token.symbol) {
        setToToken(fromToken)
      }
      setFromToken(token)
    } else {
      if (fromToken?.symbol === token.symbol) {
        setFromToken(toToken)
      }
      setToToken(token)
    }
  }

  const fee = fromAmount ? calculateFee(fromAmount) : '0'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Swap Tokens</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* From Token */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="text-sm text-muted-foreground">Balance: 0.00</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="text-lg border-none p-0 h-auto focus-visible:ring-0"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {/* Token selector would go here */}}
                  className="flex items-center space-x-2"
                >
                  {fromToken && (
                    <>
                      <img
                        src={fromToken.logoURI}
                        alt={fromToken.symbol}
                        className="w-5 h-5 rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/20x20?text=?';
                        }}
                      />
                      <span>{fromToken.symbol}</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Switch Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={switchTokens}
              className="rounded-full"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          {/* To Token */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">To</span>
                <span className="text-sm text-muted-foreground">Balance: 0.00</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={toAmount}
                    readOnly
                    className="text-lg border-none p-0 h-auto bg-transparent"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {/* Token selector would go here */}}
                  className="flex items-center space-x-2"
                >
                  {toToken && (
                    <>
                      <img
                        src={toToken.logoURI}
                        alt={toToken.symbol}
                        className="w-5 h-5 rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/20x20?text=?';
                        }}
                      />
                      <span>{toToken.symbol}</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Swap Info */}
          {fromAmount && toAmount && (
            <Card className="bg-secondary/20">
              <CardContent className="p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span>1 {fromToken?.symbol} ≈ {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken?.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fee (0.3%)</span>
                  <span>{fee} {fromToken?.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minimum Received</span>
                  <span>{(parseFloat(toAmount) * 0.995).toFixed(6)} {toToken?.symbol}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Token List for Selection */}
          <div className="grid grid-cols-2 gap-2">
            {tokens.map((token) => (
              <Button
                key={token.symbol}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!fromToken || fromToken.symbol !== token.symbol) {
                    selectToken(token, true)
                  }
                }}
                className={`flex items-center space-x-2 ${
                  fromToken?.symbol === token.symbol ? 'bg-primary/10 border-primary' : ''
                }`}
              >
                <img
                  src={token.logoURI}
                  alt={token.symbol}
                  className="w-4 h-4 rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/16x16?text=?';
                  }}
                />
                <span className="text-xs">{token.symbol}</span>
              </Button>
            ))}
          </div>

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!fromAmount || !toAmount || isLoading || isSwapping}
            className="w-full"
            size="lg"
          >
            {isSwapping ? 'Swapping...' : 'Swap Tokens'}
          </Button>

          {/* Transaction Status */}
          {lastTransaction && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Transaction Confirmed</p>
                <p className="text-xs text-muted-foreground">
                  {lastTransaction.hash?.slice(0, 10)}...{lastTransaction.hash?.slice(-8)}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SwapModal
