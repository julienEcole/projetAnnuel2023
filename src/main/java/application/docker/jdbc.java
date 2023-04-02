package application.docker;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class jdbc
{
    Connection connection;

    public jdbc()
    {
        try
        {
            Class.forName(Credentials.getDriverClassName());
            connection = DriverManager.getConnection(Credentials.getUrl(), Credentials.getUser(), Credentials.getPassword());
            System.out.println("un truc");
        }
        catch (ClassNotFoundException e)
        {
            System.out.println("Pilote JDBC non installé.");
        }
        catch (SQLException e)
        {
            System.out.println(e);
        }
    }
}