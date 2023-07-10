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
import modele.Tickets;
import repository.UserRepository;
//import repository.TicketsRepository;
import java.net.URL;
import java.util.ResourceBundle;


public class TicketsController implements Initializable{


    private ObservableList<Tickets> ticketList = FXCollections.observableArrayList();
    @FXML
    private TableView<Tickets> tblTickets;

    @FXML
    private Button btnAdd;

    private TicketsController tickets;


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

    @FXML
    private Button ButtonDisco;
    @FXML
    private Button ButtonTickets;
    @FXML
    private Button ButtonProfil;
    @FXML
    private Button ButtonUser;






    public TicketsController(TicketsController t){
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

        ButtonDisco.setOnAction(this::handleDisconnectButtonAction);
        ButtonTickets.setOnAction(this::handleDisconnectButtonAction);
        ButtonProfil.setOnAction(this::handleDisconnectButtonAction);
        ButtonUser.setOnAction(this::handleDisconnectButtonAction);

        loadTicketsFromDatabase();
        tblTickets.setItems(ticketList);

    }



@FXML
    private void handleDisconnectButtonAction(ActionEvent event) {

         if (event.getSource() == ButtonDisco) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/login");
            System.out.println("test");
        } else if (event.getSource() == ButtonTickets) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/tickets");
        } else if (event.getSource() == ButtonProfil) {
             // Charger la nouvelle page depuis un fichier FXML
             HelloApplication.changeScene("/application/docker/accueil");
         } else if (event.getSource() == ButtonUser) {
             // Charger la nouvelle page depuis un fichier FXML
             HelloApplication.changeScene("/application/docker/User");
         }
    }
}

