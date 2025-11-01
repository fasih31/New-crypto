// Comprehensive Error Handling Utility
// User-friendly error messages and logging
// Author: Fasih ur rehman

export enum ErrorType {
  WALLET_CONNECTION = 'WALLET_CONNECTION',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  SLIPPAGE_EXCEEDED = 'SLIPPAGE_EXCEEDED',
  RATE_LIMIT = 'RATE_LIMIT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  CONTRACT_ERROR = 'CONTRACT_ERROR',
  UNKNOWN = 'UNKNOWN'
}

export interface AppError {
  type: ErrorType
  message: string
  userMessage: string
  technical?: string
  timestamp: number
  recoverable: boolean
  suggestedAction?: string
}

class ErrorHandlerService {
  private errorHistory: AppError[] = []
  private readonly MAX_HISTORY = 50

  createError(
    type: ErrorType,
    message: string,
    technical?: string,
    recoverable: boolean = true
  ): AppError {
    const error: AppError = {
      type,
      message,
      userMessage: this.getUserFriendlyMessage(type, message),
      technical,
      timestamp: Date.now(),
      recoverable,
      suggestedAction: this.getSuggestedAction(type)
    }

    this.addToHistory(error)
    return error
  }

  private getUserFriendlyMessage(type: ErrorType, originalMessage: string): string {
    const friendlyMessages: Record<ErrorType, string> = {
      [ErrorType.WALLET_CONNECTION]: 
        'Unable to connect to your wallet. Please make sure your wallet extension is unlocked and try again.',
      [ErrorType.TRANSACTION_FAILED]: 
        'Transaction failed. This could be due to insufficient gas or a contract error.',
      [ErrorType.INSUFFICIENT_FUNDS]: 
        'Insufficient funds in your wallet to complete this transaction.',
      [ErrorType.SLIPPAGE_EXCEEDED]: 
        'Price changed too much during transaction. Try increasing slippage tolerance or waiting for stable prices.',
      [ErrorType.RATE_LIMIT]: 
        'Too many requests. Please wait a moment before trying again.',
      [ErrorType.VALIDATION_ERROR]: 
        originalMessage || 'Invalid input. Please check your entries and try again.',
      [ErrorType.NETWORK_ERROR]: 
        'Network connection issue. Please check your internet connection and try again.',
      [ErrorType.CONTRACT_ERROR]: 
        'Smart contract error. The transaction cannot be processed at this time.',
      [ErrorType.UNKNOWN]: 
        'An unexpected error occurred. Please try again or contact support if the issue persists.'
    }

    return friendlyMessages[type] || originalMessage
  }

  private getSuggestedAction(type: ErrorType): string {
    const actions: Record<ErrorType, string> = {
      [ErrorType.WALLET_CONNECTION]: 
        'Unlock your wallet and refresh the page',
      [ErrorType.TRANSACTION_FAILED]: 
        'Check transaction details and try again with higher gas',
      [ErrorType.INSUFFICIENT_FUNDS]: 
        'Add funds to your wallet or reduce transaction amount',
      [ErrorType.SLIPPAGE_EXCEEDED]: 
        'Increase slippage tolerance in settings or try again later',
      [ErrorType.RATE_LIMIT]: 
        'Wait 60 seconds before submitting another transaction',
      [ErrorType.VALIDATION_ERROR]: 
        'Review your input and correct any errors',
      [ErrorType.NETWORK_ERROR]: 
        'Check your internet connection and try again',
      [ErrorType.CONTRACT_ERROR]: 
        'Wait a few minutes and try again',
      [ErrorType.UNKNOWN]: 
        'Refresh the page or contact support'
    }

    return actions[type] || 'Try again or contact support'
  }

  private addToHistory(error: AppError): void {
    this.errorHistory.unshift(error)
    
    if (this.errorHistory.length > this.MAX_HISTORY) {
      this.errorHistory = this.errorHistory.slice(0, this.MAX_HISTORY)
    }
  }

  getErrorHistory(): AppError[] {
    return [...this.errorHistory]
  }

  getRecentErrors(count: number = 10): AppError[] {
    return this.errorHistory.slice(0, count)
  }

  clearHistory(): void {
    this.errorHistory = []
  }

  parseWeb3Error(error: any): AppError {
    const errorMessage = error?.message || String(error)

    if (errorMessage.includes('user rejected')) {
      return this.createError(
        ErrorType.WALLET_CONNECTION,
        'Transaction rejected by user',
        errorMessage,
        true
      )
    }

    if (errorMessage.includes('insufficient funds')) {
      return this.createError(
        ErrorType.INSUFFICIENT_FUNDS,
        'Insufficient funds',
        errorMessage,
        true
      )
    }

    if (errorMessage.includes('slippage')) {
      return this.createError(
        ErrorType.SLIPPAGE_EXCEEDED,
        'Slippage tolerance exceeded',
        errorMessage,
        true
      )
    }

    if (errorMessage.includes('network')) {
      return this.createError(
        ErrorType.NETWORK_ERROR,
        'Network error',
        errorMessage,
        true
      )
    }

    return this.createError(
      ErrorType.UNKNOWN,
      'Transaction failed',
      errorMessage,
      true
    )
  }

  logError(error: AppError): void {
    console.error('[AppError]', {
      type: error.type,
      message: error.message,
      timestamp: new Date(error.timestamp).toISOString(),
      technical: error.technical
    })
  }
}

export const errorHandler = new ErrorHandlerService()
