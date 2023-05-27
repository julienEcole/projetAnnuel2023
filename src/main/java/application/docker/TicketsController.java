package application.docker;

import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.cell.PropertyValueFactory;
import modele.Tickets;

import javafx.scene.control.TableView;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.layout.AnchorPane;
import modele.User;
//import repository.TicketsRepository;
import repository.UserRepository;
import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;


public class TicketsController implements Initializable{

    @FXML
    private TableView<Tickets> tblTickets;

    @FXML
    private Button btnAdd;

    private Tickets tickets;


    public TicketsController(Tickets t){
        this.tickets = t;
    }


    public void initialize(URL url, ResourceBundle resourceBundle) {



        TableColumn<Tickets, Integer> idColumn = new TableColumn<>("ID");
        idColumn.setCellValueFactory(new PropertyValueFactory<>("id"));

        TableColumn<Tickets, String> createdByColumn = new TableColumn<>("Créé par");
        createdByColumn.setCellValueFactory(new PropertyValueFactory<>("createdBy"));

        TableColumn<Tickets, String> descriptionColumn = new TableColumn<>("Description");
        descriptionColumn.setCellValueFactory(new PropertyValueFactory<>("description"));

        TableColumn<Tickets, String> stateColumn = new TableColumn<>("État");
        stateColumn.setCellValueFactory(new PropertyValueFactory<>("state"));



        TableColumn<Tickets, String> assignedToColumn = new TableColumn<>("Attribué à");
        assignedToColumn.setCellValueFactory(new PropertyValueFactory<>("assignedTo"));

        tblTickets.getColumns().addAll(idColumn, createdByColumn, stateColumn, descriptionColumn, assignedToColumn);



        UserRepository ticketsRepository = new UserRepository();
        List<Tickets> tickets = ticketsRepository.getTicket();
        tblTickets.getItems().addAll(tickets);


    }
}

