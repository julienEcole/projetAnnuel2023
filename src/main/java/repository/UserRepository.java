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
        String sql = "SELECT u.utilisateur_id, u.nom, u.prenom, u.mail, r.titre AS role\n" +
                "FROM utilisateur u\n" +
                "JOIN role_utilisateur r ON u.role_utilisateur_id = r.role_utilisateur_id";
        try {
            PreparedStatement pstm = coBdd.getConnection().prepareStatement(sql);
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                int userId = rs.getInt("utilisateur_id");
                String nom = rs.getString("nom");
                String prenom = rs.getString("prenom");
                String mail = rs.getString("mail");
                String role = rs.getString("role");

                User user = new User(userId, nom, prenom, mail, role);
                users.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return users;
    }



    public ArrayList<Tickets> getTicket() {
        ArrayList<Tickets> ticketList = new ArrayList<>();
        String sql = "SELECT t.ticket_id, t.Titre, t.description_bug, e.titre AS etat, u.nom AS nom_traitant\n" +
                "FROM ticket t\n" +
                "JOIN etat e ON t.etat_id = e.etat_id\n" +
                "LEFT JOIN utilisateur u ON t.traite = u.utilisateur_id\n";

        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                int id_ticket = rs.getInt("ticket_id");
                String Titre = rs.getString("Titre");
                String description = rs.getString("description_bug");
                String etat = rs.getString("etat");
                String traite = rs.getString("nom_traitant");

                // Créer un objet Tickets et l'ajouter à la liste
                modele.Tickets ticket = new modele.Tickets(id_ticket, Titre, description, etat, traite);
                ticketList.add(ticket);
            }
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
       // System.out.println(ticketList);
        return ticketList;
    }

    public void addTicket(Tickets ticket) {
        String sql = "INSERT INTO ticket (etat_id, Titre, traite, description_bug) VALUES (1, ?, (SELECT utilisateur_id FROM utilisateur WHERE nom = ?), ?);";

        try {
            PreparedStatement pstm = coBdd.getConnection().prepareStatement(sql);
            pstm.setString(1, ticket.getTitre());
            pstm.setString(2, ticket.getTraite()); // Utiliser la valeur de 'traite' de l'objet Tickets
            pstm.setString(3, ticket.getDescription_bug());

            int rowsAffected = pstm.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Le ticket a été ajouté avec succès.");
            } else {
                System.out.println("Échec de l'ajout du ticket.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }




    public ArrayList<String> getUserNames() {
        ArrayList<String> userNames = new ArrayList<>();
        String sql = "SELECT * FROM " + table;
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                String userName = rs.getString("nom");
                userNames.add(userName);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userNames;
    }











}