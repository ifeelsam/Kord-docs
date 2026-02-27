'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { clusterApiUrl } from '@solana/web3.js'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'

function parseNetwork(): WalletAdapterNetwork {
  const raw = (process.env.NEXT_PUBLIC_SOLANA_NETWORK ?? 'devnet').toLowerCase()
  if (raw === 'mainnet' || raw === 'mainnet-beta' || raw === 'mainnetbeta') return WalletAdapterNetwork.Mainnet
  if (raw === 'testnet') return WalletAdapterNetwork.Testnet
  return WalletAdapterNetwork.Devnet
}

export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const network = useMemo(() => parseNetwork(), [])

  const endpoint = useMemo(() => {
    return process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? clusterApiUrl(network)
  }, [network])

  const wallets = useMemo(() => {
    return [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ]
  }, [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

