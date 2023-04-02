package application.backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Ticket {
    protected TicketKey type;
    protected TicketKey etat;
    protected TicketKey urgence;
    protected int ticketId;
    protected String description;

    ///<summary>
    ///met dans l'objet les information du ticket dont l'id est renseigné.
    ///<\summary>



    public Connection connextionbdd(){

        Connection cnx = null;
        String url = "jdbc:mysql://localhost:8889/Tickets?serverTimezone=UTC";
        String user = "root";
        String password= "root";
        try{
            cnx = DriverManager.getConnection(url, user, password);
            System.out.println("Etat de la connexion : ");
            System.out.println(cnx.isClosed()?"fermer":"ouvert");
        }
        catch (SQLException e){
            System.out.println("Erreur de connexion");
            e.printStackTrace();
        }
        return cnx;
    }
    public void SQLVersObjet(int id){
        //TODO
    }

    ///<summary>
    ///ajoute l'objet actuel dans la bdd (attention au répétition).
    ///<\summary>
    public void AjouterObjetSurBdd(){
        String sql = "SELECT * FROM Tickets WHERE ticketId = ?";
        preparedStatement pstm = this.connextionbdd().prepareStatement(sql);
        pstm.setString(1, ticketId);
        resultset rs = pstm.executeQuery();
        if(rs.next()){
            System.out.println("Le ticket existe déjà");
        }
        else{
            sql = "INSERT INTO Tickets (ticketId, description, type, etat, urgence) VALUES (?, ?, ?, ?, ?)";
            pstm = this.connextionbdd().prepareStatement(sql);
            pstm.setString(1, ticketId);
            pstm.setString(2, description);
            pstm.setString(3, type);
            pstm.setString(4, etat);
            pstm.setString(5, urgence);
            pstm.executeUpdate();
            System.out.println("Le ticket a été ajouté");
        }

    }

    ///<summary>
    ///supprime l'objet actuel dans la bdd.
    ///<\summary>
    public void SupprimerObjetSurBdd(){
        String sql = "SELECT * FROM Tickets WHERE ticketId = ?";
        preparedStatement pstm = this.connextionbdd().prepareStatement(sql);
        pstm.setString(1, ticketId);
        pstm.execute();
        System.out.println("Le ticket a été supprimé");
    }

    ///<summary>
    ///met a jour l'objet actuel dans la bdd (attention au objet non existant).
    ///<\summary>
    public void MettreAJourObjetSurBdd(){
        String sql = "SELECT * FROM Tickets WHERE ticketId = ? LIMIT 1";
        preparedStatement pstm = this.connextionbdd().prepareStatement(sql);
        pstm.setString(1, ticketId);
        resultset rs = pstm.executeQuery();
        while (rs.next()) {
            sql = "UPDATE Tickets SET description = ?, type = ?, etat = ?, urgence = ? WHERE ticketId = ?";
            pstm = this.connextionbdd().prepareStatement(sql);
            pstm.setString(1, description);
            pstm.setString(2, type);
            pstm.setString(3, etat);
            pstm.setString(4, urgence);
            pstm.setString(5, ticketId);
            pstm.executeUpdate();
            System.out.println("Le ticket a été mis à jour");
        }

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
