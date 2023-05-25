package repository;

import application.docker.jdbc;
import modele.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class UserRepository {
    private jdbc coBdd;
    private String table = "Utilisateur";



    public UserRepository() {
        coBdd = new jdbc();
    }


    public User connexion(String mail, String mdp){
        User user = null;
        String sql = "SELECT * FROM " + table + " WHERE mail=? and mdp=?";
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            pstm.setString(1, mail);
            pstm.setString(2, mdp);
            ResultSet rs = pstm.executeQuery();
            if (rs.next()) {
                user = new User(rs.getInt("id"), rs.getString("mail"), rs.getString("mdp"), rs.getBoolean("est_admin"));
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println(sql);

        return user;

    }


    public ArrayList<User> getUsers() {
        ArrayList<User> users = new ArrayList<User>();
        User user;
        String sql = "SELECT * FROM "+table;
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                user = new User(rs.getInt("id"), rs.getString("mail"),  rs.getString("mdp"),  rs.getBoolean("est_admin"));
                users.add(user);
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }

        return users;
    }
}