package application.docker;

import application.HelloApplication;
import javafx.scene.control.Button;

import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import javafx.scene.control.cell.PropertyValueFactory;
import repository.UserRepository;
//import repository.TicketsRepository;
import java.net.URL;
import java.util.ResourceBundle;


public class Tickets implements Initializable{


    private ObservableList<modele.Tickets> ticketList = FXCollections.observableArrayList();
    @FXML
    private TableView<modele.Tickets> tblTickets;

    @FXML
    private Button btnAdd;

    private Tickets tickets;


    @FXML
    private TableColumn<Tickets, Integer> idColumn;
    @FXML
    private TableColumn<Tickets, String> createByColumn;
    @FXML
    private TableColumn<Tickets, String> statusColumn;
    @FXML
    private TableColumn<Tickets, String> descriptionColumn;
    @FXML
    private TableColumn<Tickets, String> assignedToColumn;




    public Tickets(Tickets t){
        this.tickets = t;
    }

    private void loadTicketsFromDatabase() {

        UserRepository ticketsRepository = new UserRepository();
        ticketList.addAll(ticketsRepository.getTicket());

    }

    @FXML
    public void initialize(URL url, ResourceBundle resourceBundle) {

        idColumn.setCellValueFactory(new PropertyValueFactory<>("id"));
        createByColumn.setCellValueFactory(new PropertyValueFactory<>("nom"));
        descriptionColumn.setCellValueFactory(new PropertyValueFactory<>("description"));
        statusColumn.setCellValueFactory(new PropertyValueFactory<>("etat"));
        assignedToColumn.setCellValueFactory(new PropertyValueFactory<>("traite"));

        //btndiscon2.setOnAction(this::handleButtonClick);
       // btntick2.setOnAction(this::handleButtonClick);

        loadTicketsFromDatabase();
        tblTickets.setItems(ticketList);

    }



@FXML
    private void handleDisconnectButtonAction(ActionEvent event) {
        HelloApplication.changeScene("/application/docker/login");

        /* if (event.getSource() == btndiscon2) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/login");
            System.out.println("test");
        } else if (event.getSource() == btntick2) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/tickets");
        }else {
            System.out.println("test");
        }*/
    }
}

