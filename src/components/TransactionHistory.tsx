import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { History, ExternalLink, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react'
import { useTransactions, Transaction } from '@/hooks/use-transactions'
import { useToast } from '@/hooks/use-toast'

const TransactionHistory = () => {
  const { transactions, clearHistory } = useTransactions()
  const { toast } = useToast()
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const formatAmount = (amount: string, symbol: string) => {
    return `${parseFloat(amount).toFixed(4)} ${symbol}`
  }

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Confirmed</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const handleClearHistory = () => {
    clearHistory()
    toast({
      title: "History Cleared",
      description: "Transaction history has been cleared successfully.",
    })
  }

  const openTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Transaction History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your swap transactions will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <History className="w-5 h-5" />
              <span>Transaction History</span>
              <Badge variant="secondary">{transactions.length}</Badge>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearHistory}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear History
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => openTransactionDetails(transaction)}
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(transaction.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {transaction.fromToken.symbol} → {transaction.toToken.symbol}
                        </span>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatAmount(transaction.fromAmount, transaction.fromToken.symbol)} for {formatAmount(transaction.toAmount, transaction.toToken.symbol)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatTime(transaction.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      -{transaction.fee} {transaction.fromToken.symbol} fee
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedTransaction.status)}
                  {getStatusBadge(selectedTransaction.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">From</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <img
                      src={selectedTransaction.fromToken.logoURI}
                      alt={selectedTransaction.fromToken.symbol}
                      className="w-5 h-5 rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/20x20?text=?';
                      }}
                    />
                    <span className="font-medium">
                      {formatAmount(selectedTransaction.fromAmount, selectedTransaction.fromToken.symbol)}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">To</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <img
                      src={selectedTransaction.toToken.logoURI}
                      alt={selectedTransaction.toToken.symbol}
                      className="w-5 h-5 rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/20x20?text=?';
                      }}
                    />
                    <span className="font-medium">
                      {formatAmount(selectedTransaction.toAmount, selectedTransaction.toToken.symbol)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transaction Fee</span>
                  <span>{selectedTransaction.fee} {selectedTransaction.fromToken.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gas Used</span>
                  <span>{selectedTransaction.gasUsed} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Timestamp</span>
                  <span>{formatTime(selectedTransaction.timestamp)}</span>
                </div>
              </div>

              {selectedTransaction.hash && (
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Transaction Hash</span>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`https://etherscan.io/tx/${selectedTransaction.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1"
                      >
                        <span className="text-xs">
                          {selectedTransaction.hash.slice(0, 6)}...{selectedTransaction.hash.slice(-4)}
                        </span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TransactionHistory
