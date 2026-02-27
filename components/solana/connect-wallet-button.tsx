"use client"

import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import Link from "next/link"

const CUSTOM_LABELS = {
  'change-wallet': 'Change wallet',
  connecting: 'Connecting ...',
  'copy-address': 'Copy address',
  copied: 'Copied',
  disconnect: 'Disconnect',
  'has-wallet': 'Connect',
  'no-wallet': 'Connect Wallet',
} as const;

interface CustomWalletButtonProps {
  className?: string;
}

export function CustomWalletButton({ className }: CustomWalletButtonProps) {
  const { connected } = useWallet();

  if (connected) {
    return (
      <div className={className || ''}>
        <Link href="/dashboard" className="wallet-adapter-button wallet-adapter-button-trigger" style={{ textDecoration: 'none' }}>
          Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className={className || ''}>
      <BaseWalletMultiButton
        labels={CUSTOM_LABELS}
      />
    </div>
  );
} 