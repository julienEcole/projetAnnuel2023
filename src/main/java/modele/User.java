package modele;


public class User{

    private int id;
    private String mail;
    private String mdp;
    private String nom;
    private String prenom;
    private int role;

    private String etat;

    public User(int id, String nom, String prenom, int role) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.mdp = mdp;
        this.role = role;
        this.etat = etat;
    }

    public User(String mail, String mdp, int role) {
        this.mail = mail;
        this.mdp = mdp;
        this.role = role;
    }

    public User() {}

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public int getUser() {
        return id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getMdp() {
        return mdp;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public int role() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }
}