package application.docker;

import application.HelloApplication;
import javafx.event.ActionEvent;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import modele.Tickets;
import modele.User;

import java.net.URL;
import java.util.ResourceBundle;

public class TicketsInformationController implements Initializable {

    private TicketsController ticketsController;

    public TicketsInformationController(TicketsController t) {
        this.ticketsController = t;
    }

    @FXML
    private Label idLabel;

    @FXML
    private Label titleLabel;

    @FXML
    private Label descriptionLabel;

    @FXML
    private Label statusLabel;

    @FXML
    private Label assignedToLabel;
    @FXML
    private Button assignButton;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        // Logique d'initialisation de la vue TicketInformation.fxml
    }


@FXML
    public void displayTicketInformation(Tickets ticket) {
        // Afficher les informations du ticket dans les libellés correspondants
        titleLabel.setText(ticket.getTitre());
        descriptionLabel.setText(ticket.getDescription_bug());
        statusLabel.setText(ticket.getEtat_titre());
        assignedToLabel.setText(ticket.getTraite());
    }



}
