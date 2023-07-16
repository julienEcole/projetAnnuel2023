/*package repository;

import application.docker.jdbc;
import modele.Tickets;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Statement;

public class TicketsRepository {

    private jdbc coBdd;
    private String table = "Tickets";



    public TicketsRepository() {
        coBdd = new jdbc();
    }




    public  ArrayList<Tickets> getTicket() {
        ArrayList<Tickets> ticket = new ArrayList<Tickets>();
        Tickets tickets;
        String sql = "SELECT * FROM "+table;
        PreparedStatement pstm;
        try {
            pstm = coBdd.getConnection().prepareStatement(sql);
            ResultSet rs = pstm.executeQuery();
            while (rs.next()) {
                tickets = new Tickets(rs.getInt("id"), rs.getString("nom"),  rs.getString("description"),  rs.getString("etat"), rs.getString("traite"));
                ticket.add(tickets);
            }
        } catch (SQLException e) {
// TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println(ticket);
        return ticket;
    }
}*/
