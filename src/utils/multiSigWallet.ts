// Multi-Signature Wallet Support
// Enhanced security for high-value transactions
// Author: Fasih ur rehman

export interface MultiSigConfig {
  threshold: number // Number of signatures required
  signers: string[] // List of authorized signer addresses
  timelock: number // Delay before execution (in seconds)
}

export interface PendingTransaction {
  id: string
  to: string
  value: string
  data: string
  signatures: string[]
  createdAt: number
  executableAt: number
  executed: boolean
}

class MultiSigWalletService {
  private pendingTransactions: Map<string, PendingTransaction> = new Map()
  private config: MultiSigConfig = {
    threshold: 2, // Default: require 2 signatures
    signers: [],
    timelock: 3600 // Default: 1 hour timelock
  }

  configure(config: Partial<MultiSigConfig>): void {
    this.config = { ...this.config, ...config }
  }

  getConfig(): MultiSigConfig {
    return { ...this.config }
  }

  createTransaction(to: string, value: string, data: string = '0x'): PendingTransaction {
    const id = `multisig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const transaction: PendingTransaction = {
      id,
      to,
      value,
      data,
      signatures: [],
      createdAt: Date.now(),
      executableAt: Date.now() + (this.config.timelock * 1000),
      executed: false
    }

    this.pendingTransactions.set(id, transaction)
    return transaction
  }

  signTransaction(txId: string, signerAddress: string): { success: boolean; error?: string } {
    const tx = this.pendingTransactions.get(txId)

    if (!tx) {
      return { success: false, error: 'Transaction not found' }
    }

    if (tx.executed) {
      return { success: false, error: 'Transaction already executed' }
    }

    if (!this.config.signers.includes(signerAddress)) {
      return { success: false, error: 'Unauthorized signer' }
    }

    if (tx.signatures.includes(signerAddress)) {
      return { success: false, error: 'Already signed by this address' }
    }

    tx.signatures.push(signerAddress)
    this.pendingTransactions.set(txId, tx)

    return { success: true }
  }

  canExecute(txId: string): { canExecute: boolean; reason?: string } {
    const tx = this.pendingTransactions.get(txId)

    if (!tx) {
      return { canExecute: false, reason: 'Transaction not found' }
    }

    if (tx.executed) {
      return { canExecute: false, reason: 'Already executed' }
    }

    if (tx.signatures.length < this.config.threshold) {
      return {
        canExecute: false,
        reason: `Insufficient signatures: ${tx.signatures.length}/${this.config.threshold}`
      }
    }

    const now = Date.now()
    if (now < tx.executableAt) {
      const remainingTime = Math.ceil((tx.executableAt - now) / 1000)
      return {
        canExecute: false,
        reason: `Timelock active. Executable in ${remainingTime} seconds`
      }
    }

    return { canExecute: true }
  }

  executeTransaction(txId: string): { success: boolean; error?: string } {
    const executeCheck = this.canExecute(txId)

    if (!executeCheck.canExecute) {
      return { success: false, error: executeCheck.reason }
    }

    const tx = this.pendingTransactions.get(txId)!
    tx.executed = true
    this.pendingTransactions.set(txId, tx)

    return { success: true }
  }

  getPendingTransactions(): PendingTransaction[] {
    return Array.from(this.pendingTransactions.values())
      .filter(tx => !tx.executed)
      .sort((a, b) => b.createdAt - a.createdAt)
  }

  getTransactionStatus(txId: string): PendingTransaction | null {
    return this.pendingTransactions.get(txId) || null
  }

  cancelTransaction(txId: string, signerAddress: string): { success: boolean; error?: string } {
    const tx = this.pendingTransactions.get(txId)

    if (!tx) {
      return { success: false, error: 'Transaction not found' }
    }

    if (tx.executed) {
      return { success: false, error: 'Cannot cancel executed transaction' }
    }

    if (!this.config.signers.includes(signerAddress)) {
      return { success: false, error: 'Unauthorized' }
    }

    this.pendingTransactions.delete(txId)
    return { success: true }
  }
}

export const multiSigWallet = new MultiSigWalletService()
