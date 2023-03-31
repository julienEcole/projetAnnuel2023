package com.backendClass;
public class Ticket {   //cette classe ne gère qu'un seul et unique ticket
    protected TicketKey type;
    protected TicketKey etat;
    protected TicketKey urgence;
    protected int ticketId;
    protected String description;

    public void SQLVersObjet(){
        //TODO
    }

    public void AjouterObjetSurBdd(){
        //TODO
    }

    public void SupprimerObjetSurBdd(){
        //TODO
    }

    public void MettreAJourObjetSurBdd(){
        //TODO
    }

    public TicketKey getType() {
        return type;
    }

    public void setType(TicketKey type) {
        this.type = type;
    }

    public TicketKey getEtat() {
        return etat;
    }

    public void setEtat(TicketKey etat) {
        this.etat = etat;
    }

    public TicketKey getUrgence() {
        return urgence;
    }

    public void setUrgence(TicketKey urgence) {
        this.urgence = urgence;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
