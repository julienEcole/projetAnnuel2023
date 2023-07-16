package application.docker;

import application.HelloApplication;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.stage.Stage;
import modele.Tickets;
import repository.UserRepository;

import java.util.Optional;

public class addTicketController {

    private TicketsController ticketsController; // Remplacez "TicketsController" par le nom correct de votre contrôleur principal

    @FXML
    private TextField Title;
    @FXML
    private TextField description;

    public addTicketController(TicketsController ticketsController) { // Remplacez "TicketsController" par le nom correct de votre contrôleur principal
        this.ticketsController = ticketsController;
    }

    @FXML
    private void handleAddTicket(ActionEvent event) {
        String titre = Title.getText();
        String desc = description.getText();

        // Vérifier si les champs sont vides
        if (titre.isEmpty() || desc.isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("Champs vides");
            alert.setHeaderText(null);
            alert.setContentText("Veuillez remplir tous les champs.");
            alert.showAndWait();
        } else {
            // Créer un nouvel objet Tickets
            Tickets ticket = new Tickets(titre, desc, "3", null); // Vérifiez les valeurs par défaut pour etat_titre et traite

            // Ajouter le ticket à la base de données ou à la liste existante
            UserRepository userRepository = new UserRepository(); // Remplacez "UserRepository" par votre classe de gestion de base de données
            userRepository.addTicket(ticket);

            // Afficher un message de succès
            Alert alert = new Alert(Alert.AlertType.INFORMATION);
            alert.setTitle("Ticket ajouté");
            alert.setHeaderText(null);
            alert.setContentText("Le ticket a été ajouté avec succès.");
            alert.showAndWait();

            // Réinitialiser les champs de texte
            Title.setText("");
            description.setText("");

            // Fermer la fenêtre d'ajout de ticket
            Stage stage = (Stage) Title.getScene().getWindow();
            stage.close();
        }
    }

    @FXML
    private void handleCancel(ActionEvent event) {
        // Fermer la fenêtre d'ajout de ticket
        Stage stage = (Stage) Title.getScene().getWindow();
        stage.close();
    }
}
