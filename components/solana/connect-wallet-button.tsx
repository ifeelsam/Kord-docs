'use client'

import { BaseWalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { cn } from '@/lib/utils'

const LABELS = {
  'change-wallet': 'Change wallet',
  connecting: 'Connecting...',
  'copy-address': 'Copy address',
  copied: 'Copied',
  disconnect: 'Disconnect',
  'has-wallet': 'Connect',
  'no-wallet': 'Connect Wallet',
} as const

export function ConnectWalletButton({ className }: { className?: string }) {
  return (
    <BaseWalletMultiButton
      labels={LABELS}
      className={cn(
        'wallet-adapter-button !px-6 !py-3 !text-sm !font-mono !bg-primary !text-primary-foreground !rounded-lg !border !border-primary hover:!opacity-90 !transition-opacity',
        className,
      )}
    />
  )
}

