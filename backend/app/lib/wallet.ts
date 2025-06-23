import { createPublicClient, http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

export const wallet = createPublicClient({
    chain: sepolia,
    transport: http()
})