import { TableBasic } from "../tableBasic";

export interface Ticket extends TableBasic {
    ticketId: number;
    description: string;
    typeId: number;
    etatId: number;
    urgenceId: number;
}
