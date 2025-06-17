import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const wallet = createPublicClient({
    chain: mainnet,
    transport: http()
})