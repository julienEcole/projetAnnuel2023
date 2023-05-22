package application.docker;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class jdbc
{
    Connection connection;

    /*public Connection getConnection() {
        try
        {
            Class.forName(Credentials.getDriverClassName());
            connection = DriverManager.getConnection(Credentials.getUrl(), Credentials.getUser(), Credentials.getPassword());
            System.out.println("un truc");
            return connection;
        }
        catch (ClassNotFoundException e)
        {
            System.out.println("Pilote JDBC non installé.");
            return null;
        }
        catch (SQLException e)
        {
            System.out.println(e);
            return null;
        }
    }*/



    private String url = "jdbc:mysql://localhost:8889/projetAnnuel?serverTimezone=UTC";
    private String user = "root";
    private String password = "root";

    public Connection getConnection() {

        try {
            Connection cnx = DriverManager.getConnection(this.url,this.user,this.password);
            System.out.print("Etat de la connexion :");
            System.out.print(cnx.isClosed()?"fermée":"ouverte \r\n");
            return cnx;

        } catch (SQLException e) {
            System.out.print("erreur");
            e.printStackTrace();
            return null;
        }
    }
}