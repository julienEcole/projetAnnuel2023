package modele;

public class User {
    private int idUser;
    private String nom;
    private String prenom;
    private String mail;
    private String mdp;
    private boolean estAdmin;
    private int code; // pas dans BDD

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public User(int idUser, String nom, String prenom, String mail, String mdp, boolean estAdmin) {
        this.idUser = idUser;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.mdp = mdp;
        this.estAdmin = estAdmin;
    }
    public User(String nom, String prenom, String mail, String mdp, boolean estAdmin) {
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.mdp = mdp;
        this.estAdmin = estAdmin;
    }
    public User() {}

    public int getIdUser() {
        return idUser;
    }
    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }
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
    public String getMail() {
        return mail;
    }
    public void setMail(String mail) {
        this.mail = mail;
    }
    public String getMdp() {
        return mdp;
    }
    public void setMdp(String mdp) {
        this.mdp = mdp;
    }
    public boolean isEstAdmin() { return estAdmin;}

    public void setEstAdmin(boolean estAdmin) { this.estAdmin = estAdmin; }
    @Override
    public String toString() {
        return this.nom+" "+this.prenom;
    }

}
