import { connectAndGetWallet, config } from "@/lib/config";
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import TicketFactoryAbi from '@/lib/contract_abi/TicketFactoryAbi.json'
import { decodeEventLog, parseAbiItem } from "viem";
const TICKET_FACTORY = process.env.NEXT_PUBLIC_TICKET_FACTORY_ADDRESS;
const TICKET_FACTORY_ABI = TicketFactoryAbi.abi;


export const createEvent = async (account: `0x${string}`) => {
    const { request } = await simulateContract(config, {
        address: TICKET_FACTORY as `0x${string}`,
        abi: TICKET_FACTORY_ABI,
        functionName: 'createEvent',
        args:['event','EVE'],
        account
    })
    const hash = await writeContract(config, request);

    console.log("✅ Claim transaction sent:", hash);

    const receipt = await waitForTransactionReceipt(config, { hash });

    for (const log of receipt.logs) {
        try {
            const parsedLog = decodeEventLog({
                abi: [parseAbiItem('event EventCreated(address indexed eventAddress)')],
                data: log.data,
                topics: log.topics
            })

            const newEventAddress = parsedLog.args.eventAddress;

            return newEventAddress
        } catch (error) {
            console.log(error)
        }
    }

    throw new Error('EventCreated log not found');
}