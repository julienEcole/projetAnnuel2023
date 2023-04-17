package repository;

import bdd.Database;
import modele.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class UserRepository {
    private Database coBdd;
    private String table = "User";

    public UserRepository() {
        coBdd = new Database();
    }

    public User sauvegarder(User user) throws SQLException {
        String sql;
        PreparedStatement pstm;
//Update
        if(user.getIdUser()>0) {
            sql = "UPDATE `"+table+"` SET `nom`=?,`prenom`=?,`mail`=?,`est_admin`=? WHERE id_user=?";
            pstm = coBdd.getConnection().prepareStatement(sql);
            pstm.setString(1, user.getNom());
            pstm.setString(2, user.getPrenom());
            pstm.setString(3, user.getMail());
            pstm.setBoolean(4, user.isEstAdmin());
            pstm.setInt(5, user.getIdUser());
            pstm.executeUpdate();

        }
//insert
        else {
            sql = "INSERT INTO `"+table+"`( `nom`, `prenom`, `mail`,`mdp`,`est_admin`) VALUES (?,?,?,md5(?),?)";

            pstm = coBdd.getConnection().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstm.setString(1, user.getNom());
            pstm.setString(2, user.getPrenom());
            pstm.setString(3, user.getMail());
            pstm.setString(4, user.getMdp());
            pstm.setBoolean(5, user.isEstAdmin());
            pstm.executeUpdate();
            ResultSet rs = pstm.getGeneratedKeys();
            if(rs.next())
            {
                int last_inserted_id = rs.getInt(1);
                user.setIdUser(last_inserted_id);
            }

        }

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
                user = new User(rs.getInt("id_user"), rs.getString("nom"), rs.getString("prenom"), rs.getString("mail"),  rs.getString("mdp"),  rs.getBoolean("est_admin"));
                users.add(user);
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }

        return users;
    }
    public User getUser(int idUser) {
        User user = null;
        String sql = "SELECT * FROM "+table+ " WHERE id_user=?";
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            pstm.setInt(1, idUser);
            ResultSet rs = pstm.executeQuery();
            if (rs.next()) {

                user = new User(rs.getInt("id_user"), rs.getString("nom"), rs.getString("prenom"), rs.getString("mail"),  rs.getString("mdp"),  rs.getBoolean("est_admin"));
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }

        return user;
    }
    public User getUserByMail(String email) {
        User user = null;
        String sql = "SELECT * FROM "+table+ " WHERE mail=?";
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            pstm.setString(1, email);
            ResultSet rs = pstm.executeQuery();
            if (rs.next()) {

                user = new User(rs.getInt("id_user"), rs.getString("nom"), rs.getString("prenom"), rs.getString("mail"),  rs.getString("mdp"),  rs.getBoolean("est_admin"));
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }

        return user;
    }
    public User connexion(String mail, String motDePasse) {
        User user = null;
        String sql = "SELECT * FROM "+table+ " WHERE mail=? and mdp=md5(?)";
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            pstm.setString(1, mail);
            pstm.setString(2, motDePasse);
            ResultSet rs = pstm.executeQuery();
            if (rs.next()) {
                user = new User(rs.getInt("id_user"), rs.getString("nom"), rs.getString("prenom"), rs.getString("mail"),  rs.getString("mdp"),  rs.getBoolean("est_admin"));
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }

        return user;

    }
    public void deleteUser(User user) throws SQLException {
        if (user.getIdUser() >0){
            String sql = "DELETE FROM "+table+" where id_user=?;";
            PreparedStatement pstm = coBdd.getConnection().prepareStatement(sql);
            pstm.setInt(1, user.getIdUser());
            pstm.executeUpdate();
        }
    }
    public void changePassword(User user) throws SQLException {
        String sql;
        PreparedStatement pstm;
        sql = "UPDATE `"+table+"` SET `mdp`=md5(?) WHERE id_user=?";
        pstm = coBdd.getConnection().prepareStatement(sql);
        pstm.setString(1, user.getMdp());
        pstm.setInt(2, user.getIdUser());
        pstm.executeUpdate();
    }
}
