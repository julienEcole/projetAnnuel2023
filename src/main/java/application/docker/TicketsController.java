package application.docker;

import application.HelloApplication;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;

import javafx.scene.control.ComboBox;
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

import static application.HelloApplication.fxmlLoader;

public class TicketsController implements Initializable {

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

    @FXML
    private ComboBox<String> comboBox;
    @FXML
    private Button addti;

    public TicketsController(TicketsController t) {
        this.tickets = t;
    }

    private void loadTicketsFromDatabase() {
        UserRepository ticketsRepository = new UserRepository();
        ticketList.addAll(ticketsRepository.getTicket());
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        idColumn.setCellValueFactory(new PropertyValueFactory<>("id_ticket"));
        createByColumn.setCellValueFactory(new PropertyValueFactory<>("Titre"));
        descriptionColumn.setCellValueFactory(new PropertyValueFactory<>("description_bug"));
        statusColumn.setCellValueFactory(new PropertyValueFactory<>("etat_titre"));
        assignedToColumn.setCellValueFactory(new PropertyValueFactory<>("traite"));

        ButtonDisco.setOnAction(this::handleDisconnectButtonAction);
        ButtonTickets.setOnAction(this::handleDisconnectButtonAction);
        ButtonProfil.setOnAction(this::handleDisconnectButtonAction);
        ButtonUser.setOnAction(this::handleDisconnectButtonAction);
        addti.setOnAction(this::handleDisconnectButtonAction);

        tblTickets.setOnMouseClicked(event -> {
            if (event.getClickCount() == 2) { // Vérifier si c'est un double-clic
                Tickets selectedTicket = tblTickets.getSelectionModel().getSelectedItem();
                if (selectedTicket != null) {
                    // Ouvrir une nouvelle fenêtre ou une nouvelle vue pour afficher les informations du ticket
                    openTicketDetails(selectedTicket);
                }
            }
        });

        loadTicketsFromDatabase();
        tblTickets.setItems(ticketList);


        //comboBox.setItems(FXCollections.observableList());

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
        } else if (event.getSource() == addti) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/addTicket", new addTicketController(this.tickets));
        }
    }

    @FXML
    private void openTicketDetails(Tickets ticket) {
        HelloApplication.changeScene("/application/docker/TicketsInformation", new TicketsInformationController(this.tickets));
        FXMLLoader fxmlLoader = HelloApplication.fxmlLoader;
        TicketsInformationController controller = fxmlLoader.getController();
        controller.displayTicketInformation(ticket);
    }



}
