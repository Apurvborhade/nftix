import axiosInstance from "@/lib/axios";
import { publicClient } from "@/lib/config";
import { createEvent } from "@/utils/blockChainServices";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface Event {
    title: string;
    description: string;
    category: string;
    eventdate: string;
    location: string;
    ticketPrice: string;
    totalTickets: string;
    organizer?: string;
    contractAddress?: string;
    eventtime: string
}
export function useCreateEvent() {
    return useMutation<any, any, Event>({
        mutationKey: ['create-event'],
        mutationFn: async ({ title,
            description,
            category,
            eventdate,
            location,
            ticketPrice,
            totalTickets,
            organizer,
            eventtime
        }) => {
            try {
                console.log("Creating Event")
                const event = await createEvent(organizer as `0x${string}`);
                const isoString = `${eventdate}T${eventtime}:00Z`;
                console.log("New Event: ", event)
                const res = await axiosInstance.post(`/events/create`, {
                    name: title,
                    description,
                    category,
                    eventdate: isoString,
                    location,
                    ticketPrice,
                    totalTickets,
                    organizer,
                    contractAddress: event
                })
                console.log(res.data)
                return res.data
            } catch (error) {
                const axiosErr = error as AxiosError<{ message?: string }>;
                const message =
                    axiosErr.response?.data?.message || axiosErr.message || "Upload failed";
                throw new Error(message);
            }
        }
    })
}