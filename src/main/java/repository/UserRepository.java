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
    private String table = "utilisateur";



    public UserRepository() {
        coBdd = new jdbc();
    }


    public User connexion(String mail, String mdp){
        User user = null;
        String sql = "SELECT * FROM " + table + " WHERE mail=? and mdp=md5(?)";
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            pstm.setString(1, mail);
            pstm.setString(2, mdp);
            ResultSet rs = pstm.executeQuery();
            if (rs.next()) {
                user = new User(rs.getInt("utilisateur_id"), rs.getString("mail"), rs.getString("mdp"), rs.getInt("1"));
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }

        return user;

    }
}