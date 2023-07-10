package modele;

public class Tickets {


    private int id;

    private String nom;

    private String description;

    private String etat;

    private String traite;


    public Tickets(int id, String nom, String description, String etat, String traite) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.etat = etat;
        this.traite = traite;
    }

    public Tickets(String nom, String description, String etat, String traite) {
        this.nom = nom;
        this.description = description;
        this.etat = etat;
        this.traite = traite;
    }

    public Tickets() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public String getTraite() {
        return traite;
    }

    public void setTraite(String traite) {
        this.traite = traite;
    }
}