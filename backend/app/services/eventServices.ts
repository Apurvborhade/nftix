import { Request, Response } from "express";
import { EVENTFACTORY_ABI, EVENTFACTORY_ADDRESS } from "../config/config";
import { wallet } from "../lib/wallet";
import { EventModel } from "../model/EventModel";
import { CustomError } from "../middleware/errorHandler";

export const getEvents = async (req: Request, res: Response) => {
    const eventsAddress: string[] = await wallet.readContract({
        address: EVENTFACTORY_ADDRESS,
        abi: EVENTFACTORY_ABI,
        functionName: 'getAllEvents'
    })

    if (!Array.isArray(eventsAddress)) {
        throw new Error("eventAddresses must be an array") as CustomError
    }

    const events = await Promise.all(
        eventsAddress.map(address => EventModel.findOne({ contractAddress: address }))
    );

    return events
}