import dotenv from 'dotenv'

dotenv.config()
import eventfactoryAbi from './abi/TicketFactory.json'

export const EVENTFACTORY_ADDRESS = process.env.EVENTFACTORY_ADDRESS;
export const EVENTFACTORY_ABI = eventfactoryAbi