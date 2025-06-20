import { getWalletClient, getPublicClient, connect, injected } from '@wagmi/core'
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}
export const config = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    appName: "Nftix",
})

export const publicClient = getPublicClient(config)
export const connectAndGetWallet = async () => {
    // 1. Connect
    const { accounts, chainId } = await connect(config, {
        connector: injected(),
    });
    console.log(chainId)
    // 2. Get wallet client
    const walletClient = await getWalletClient(config, {
        chainId,
    });

    return walletClient;
};