package repository;

import application.docker.jdbc;
import modele.User;
import modele.Tickets;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class UserRepository {
    private jdbc coBdd;
    private String table = "Utilisateur";
    private String table1 = "Tickets";




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
        //System.out.println(sql);

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
                user = new User(rs.getInt("id"),
                        rs.getString("mail"),
                        rs.getString("mdp"),
                        rs.getBoolean("est_admin"));
                users.add(user);
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }

        return users;
    }


    public  ArrayList<Tickets> getTicket() {
        ArrayList<Tickets> ticketList = new ArrayList<>();
        String sql = "SELECT * FROM "+ table1;
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {

                int id = rs.getInt("id");
                String nom = rs.getString("nom");
                String description = rs.getString("description");
                String etat = rs.getString("etat");
                String traite = rs.getString("traite");

                // Créer un objet Tickets et l'ajouter à la liste
                modele.Tickets ticket = new modele.Tickets(id, nom, description, etat, traite);
                ticketList.add(ticket);
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println(ticketList);
        return ticketList;
    }






}