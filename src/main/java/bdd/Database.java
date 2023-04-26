package bdd;



import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {
    private String url = "jdbc:mysql://localhost:889/projetAnnuel2023?serverTimezone=UTC";
    private String user = "root";
    private String password = "root";

    public Connection getConnection() {

        try {
            Connection cnx = DriverManager.getConnection(this.url,this.user,this.password);
            //System.out.print("Etat de la connexion :");
            //System.out.print(cnx.isClosed()?"fermée":"ouverte \r\n");
            return cnx;

        } catch (SQLException e) {
            System.out.print("erreur");
            e.printStackTrace();
            return null;
        }
    }
}
