package modele;

public class Tickets {


    private int id_ticket;

    private String nom;

    private String description_bug;

    private String etat_titre;

    private String traite;
    private int etat;


    public Tickets(int id_ticket, String nom, String description_bug, String etat_titre, String traite) {
        this.id_ticket = id_ticket;
        this.nom = nom;
        this.description_bug = description_bug;
        this.etat_titre = etat_titre;
        this.traite = traite;
        this.etat=etat;
    }

    public Tickets(String nom, String description_bug, String etat_titre, String traite){
        this.nom = nom;
        this.description_bug = description_bug;
        this.etat_titre = etat_titre;
        this.traite = traite;
        this.etat=etat;
    }


    public Tickets() {}

    public int getId_ticket() {
        return id_ticket;
    }

    public void setId_ticket(int id_ticket) {
        this.id_ticket = id_ticket;
    }


    public String getTitre() {
        return nom;
    }

    public void setTitre(String nom) {
        this.nom = nom;
    }

    public String getDescription_bug() {
        return description_bug;
    }

    public void setDescription_bug(String description_bug) {
        this.description_bug = description_bug;
    }


    public String getEtat_titre() {
        return etat_titre;
    }

    public void setEtat_titre(String etat_titre) {
        this.etat_titre = etat_titre;
    }

    public int getEtat() {
        return etat;
    }

    public void setEtat(int etat) {
        this.etat = etat;
    }

    public String getTraite() {
        return traite;
    }

    public void setTraite(String traite) {
        this.traite = traite;
    }
}
