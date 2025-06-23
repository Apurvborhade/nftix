import axiosInstance from "@/lib/axios";
import { publicClient } from "@/lib/config";
import { createEvent, mintTicket } from "@/utils/blockChainServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface Event {
    _id?: string;
    title: string;
    description: string;
    category: string;
    eventdate: string;
    location: string;
    ticketPrice: string;
    totalTickets: string;
    organizer?: string;
    contractAddress?: string;
    eventtime: string,

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

export function useGetEvents() {
    return useQuery({
        queryKey: ['get-events'],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get(`/events`);
                return data

            } catch (error) {
                const axiosErr = error as AxiosError<{ message?: string }>;
                const message =
                    axiosErr.response?.data?.message || axiosErr.message || "Upload failed";
                throw new Error(message);
            }
        }
    })
}

export function useGetEvent(contractAddress: string) {
    return useQuery({
        queryKey: ['get-event', contractAddress],
        queryFn: async (contractAddress) => {
            try {
                console.log("Event Address", contractAddress)
                const { data } = await axiosInstance.get(`/event?contractAddress=${contractAddress.queryKey[1]}`);
                return data

            } catch (error) {
                const axiosErr = error as AxiosError<{ message?: string }>;
                const message =
                    axiosErr.response?.data?.message || axiosErr.message || "Upload failed";
                throw new Error(message);
            }
        },
        enabled: !!contractAddress
    })
}

export function useMintTicket() {
    return useMutation<void, any, any>({
        mutationKey: ['mint-ticket'],
        mutationFn: async ({ account, to, event }) => {
            try {
                console.log("mint")
                const TokenID = await mintTicket(account, to, event);
                console.log("TokenID: ", TokenID)
                const res = await axiosInstance.post(`/ticket/mint`, {
                    event,
                    owner: account,
                    ticketId: Number(TokenID)
                })
                console.log("Data:", res.data)
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

export interface UserTicket {
    _id: string
    ticketId: string
    owner: string
    eventTime: string
    event: Event
}

export function useGetTickets(user: string) {
    return useQuery<any, any, UserTicket[]>({
        queryKey: ['get-tickets', user],
        queryFn: async (user) => {
            try {
                console.log("User Address", user)
                const { data } = await axiosInstance.get(`/tickets?user=${user.queryKey[1]}`);
                console.log("data", data)
                const tickets = await Promise.all(
                    data.map(async (ticket: any) => {
                        const { data } = await axiosInstance.get(`/event?contractAddress=${ticket.event}`);
                        return { ...ticket, event: data.event }
                    })
                )


                return tickets
            } catch (error) {
                const axiosErr = error as AxiosError<{ message?: string }>;
                const message =
                    axiosErr.response?.data?.message || axiosErr.message || "Upload failed";
                throw new Error(message);
            }
        },
        enabled: !!user
    })
}
