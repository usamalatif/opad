import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { bscTestnet, bsc } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
// const projectId = '25abc7c8fe5236e0f124a4c28776d8f4' ////previous
const projectId = '08df46190d71194053d0c7fbbd3b723e'

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const shouldIncludeArbitrum = () => {
    return false;
};

// const chains = [bscTestnet];
const chains = [bsc];
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
});

createWeb3Modal({
    metadata,
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    defaultChain: bsc 
})

export function Web3ModalProvider({ children }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}