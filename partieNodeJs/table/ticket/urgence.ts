import { TableBasic } from "../tableBasic";
import { Ticket } from "./ticket";

export interface Urgence extends TableBasic {
    urgenceId: number;
    description: string;
    titreUrgenceTicket: string;
    ticketId: number;
    ticket: Ticket;
}
