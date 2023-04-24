import { TableBasic } from "../tableBasic";
import { Ticket } from "./ticket";

export interface Type extends TableBasic {
    typeId: number;
    description: string;
    titreTypeTicket: string;
    ticketId: number;
    ticket: Ticket;
}
