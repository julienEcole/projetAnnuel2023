package application.docker;

public class Credentials
{
    private static String driver = "mysql";
    private static String driverClassName = "com.mysql.cj.jdbc.Driver";
    private static String host = "localhost";
    private static String port = "3308";
    private static String database = "mydb";
    private static String user = "root";
    private static String password = "root";

    static String getUrl()
    {
        return "jdbc:" + driver + "://" + host + ":" + port + "/" + database ;
    }

    static String getDriverClassName()
    {
        return driverClassName;
    }

    static String getUser()
    {
        return user;
    }

    static String getPassword()
    {
        return password;
    }
}