package repository;

import application.docker.jdbc;
import modele.User;
import modele.Tickets;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class UserRepository {
    private jdbc coBdd;
    private String table = "Utilisateur";
    private String table1 = "Ticket";
    private String table_etat = "Etat";




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
                user = new User(rs.getInt("utilisateur_id"), rs.getString("nom"),rs.getString("prenom"), rs.getInt("role_utilisateur_id"));
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
                user = new User(rs.getInt("utilisateur_id"),
                        rs.getString("mail"),
                        rs.getString("mdp"),
                        rs.getInt("role_utilisateur_id"));
                users.add(user);
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }

        return users;
    }


    public ArrayList<Tickets> getTicket() {
        ArrayList<Tickets> ticketList = new ArrayList<>();
        String sql = "SELECT t.*, e.titre AS etat_titre\n" +
                "FROM ticket AS t\n" +
                "JOIN etat AS e ON t.etat_id = e.etat_id;\n";
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("ticket_id");
                String Titre = rs.getString("Titre");
                String description = rs.getString("description_bug");
                String etat = rs.getString("etat_titre");
                String traite = rs.getString("traite");

                // Créer un objet Tickets et l'ajouter à la liste
                modele.Tickets ticket = new modele.Tickets(id, Titre, description,etat,traite);
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