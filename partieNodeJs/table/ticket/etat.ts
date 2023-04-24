import { TableBasic } from "../tableBasic";
import { Ticket } from "./ticket";

export interface Etat extends TableBasic {
    etatId: number;
    titreEtatTicket: string;
    description: string;
    ticketId: number;
    ticket: Ticket;
}
