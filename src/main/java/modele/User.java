package modele;


public class User{

    private int id;
    private String mail;
    private String mdp;
    private boolean estadmin;

    public User(int id, String mail, String mdp, boolean role) {
        this.id = id;
        this.mail = mail;
        this.mdp = mdp;
        this.estadmin = estadmin;
    }

    public User(String mail, String mdp, String role) {
        this.mail = mail;
        this.mdp = mdp;
        this.estadmin = estadmin;
    }

    public User() {}

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

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public boolean isEstadmin() {
        return estadmin;
    }

    public void setEstadmin(boolean estadmin) {
        this.estadmin = estadmin;
    }
}