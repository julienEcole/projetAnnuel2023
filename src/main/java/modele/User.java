package modele;


public class User{

    private int idUser;
    private String mail;
    private String mdp;
    private int roleuser;

    public User(int idUser, String mail, String mdp, int roleuser) {
        this.idUser = idUser;
        this.mail = mail;
        this.mdp = mdp;
        this.roleuser = roleuser;
    }

    public User(String mail, String mdp, int roleuser) {
        this.mail = mail;
        this.mdp = mdp;
        this.roleuser = roleuser;
    }

    public User() {}

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
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

    public int getRoleuser() {
        return roleuser;
    }

    public void setRoleuser(int roleuser) {
        this.roleuser = roleuser;
    }
}