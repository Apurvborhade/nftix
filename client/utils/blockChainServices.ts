import { connectAndGetWallet, config } from "@/lib/config";
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import TicketFactoryAbi from '@/lib/contract_abi/TicketFactoryAbi.json'
import EventTicket from '@/lib/contract_abi/EventTicket.json'
import { decodeEventLog, parseAbiItem, parseEther, toEventSelector } from "viem";
const TICKET_FACTORY = process.env.NEXT_PUBLIC_TICKET_FACTORY_ADDRESS;
const TICKET_FACTORY_ABI = TicketFactoryAbi.abi;
const EVENT_TICKET = EventTicket.abi;


// Compute the topic hash for your event signature
const EVENT_CREATED_TOPIC = toEventSelector('EventCreated(address)');

export const createEvent = async (eventName: string, account: `0x${string}`, eventPrice: bigint) => {
    try {
        const { request } = await simulateContract(config, {
            address: TICKET_FACTORY as `0x${string}`,
            abi: TICKET_FACTORY_ABI,
            functionName: 'createEvent',
            args: [eventName, eventName.slice(0, 2).toUpperCase(), eventPrice],
            account
        })
        const hash = await writeContract(config, request);

        console.log("✅ Claim transaction sent:", hash);

        const receipt = await waitForTransactionReceipt(config, { hash });
        console.log(receipt)
        console.log("going forward:")

        for (const log of receipt.logs) {
            if (log.topics[0] !== EVENT_CREATED_TOPIC) continue; // skip unrelated logs
            console.log(log)

            try {

                const parsedLog = decodeEventLog({
                    abi: [
                        parseAbiItem('event EventCreated(address indexed eventAddress)')],
                    data: log.data,
                    topics: log.topics
                })
                console.log("ParsedLog: ", parsedLog)
                const event = parsedLog.args.eventAddress;
                if (!event) {
                    throw new Error('EventCreated log not found');
                }
                return event
            } catch (error) {
                console.log(error)
                throw error
            }
        }
        throw new Error('EventCreated log not found');
    } catch (error) {
        throw error
    }

}
export const mintTicket = async (account: `0x${string}`, to: `0x${string}`, event: `0x${string}`, ticketPrice: string): Promise<{ TokenID: bigint, hash: `0x${string}` }> => {
    try {
        const { request } = await simulateContract(config, {
            address: event as `0x${string}`,
            abi: EVENT_TICKET,
            functionName: 'mintTicket',
            args: [to],
            account,
            value: parseEther(ticketPrice.toString())
        })
        const hash = await writeContract(config, request);

        console.log("✅ Mint transaction sent:", hash);

        const receipt = await waitForTransactionReceipt(config, { hash });

        const abi = [
            parseAbiItem('event TicketMinted(address indexed recipient, uint tokenId)'),
            parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)')
        ];
        for (const log of receipt.logs) {
            try {
                const parsedLog = decodeEventLog({
                    abi,
                    data: log.data,
                    topics: log.topics
                })
                console.log(parsedLog)
                const TokenID = parsedLog.args.tokenId;

                return { TokenID, hash }
            } catch (error) {
                console.log(error)
            }
        }


        throw new Error('TicketMinted log not found');
    } catch (error) {
        console.log(error)
        throw error
    }

}