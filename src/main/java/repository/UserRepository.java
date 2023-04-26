package repository;

import bdd.Database;
import modele.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;



public class UserRepository{

    private Database db;

    private String table = "utilisateur";

    public UserRepository(){
        db = new Database();
    }

    public User connexion(String mail, String mdp){

        User user = null;
        String sql ="SELECT * FROM "+this.table+" WHERE email = ? AND mdp = ?";
        PreparedStatement pstm;
        try{
            pstm = db.getConnection().prepareStatement(sql);
            pstm.setString(1,mail);
            pstm.setString(2,mdp);
            ResultSet rs = pstm.executeQuery();
            if(rs.next()){
                user = new User(rs.getInt("id"),rs.getString("nom"),rs.getString("prenom"),rs.getString("email"),rs.getString("mdp"),rs.getBoolean("role"));
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        return user;
    }
}