package application.docker;

import application.HelloApplication;
import javafx.collections.FXCollections;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.stage.Stage;
import modele.Tickets;
import repository.UserRepository;

import java.net.URL;
import java.util.ArrayList;
import java.util.Optional;
import java.util.ResourceBundle;


public class addTicketController implements Initializable {




    private TicketsController ticketsController; // Remplacez "TicketsController" par le nom correct de votre contrôleur principal

    @FXML
    private TextField Title;
    @FXML
    private TextField description;
    private TicketsController tickets;
    @FXML
    private ComboBox<String> comboBox;

    @FXML
    private Button btnreturn;

    public addTicketController(TicketsController ticketsController) { // Remplacez "TicketsController" par le nom correct de votre contrôleur principal
        this.ticketsController = ticketsController;
    }



    public void initialize(URL url, ResourceBundle resourceBundle) {

        UserRepository userRepository = new UserRepository();
        ArrayList<String> userNames = userRepository.getUserNames();
        comboBox.setItems(FXCollections.observableArrayList(userNames));
    }


    @FXML
    private void handleAddTicket(ActionEvent event) {
        String titre = Title.getText();
        String desc = description.getText();
        String selectedUser = comboBox.getValue(); // Récupérer la valeur sélectionnée dans le ComboBox

        // Vérifier si les champs sont vides
        if (titre.isEmpty() || desc.isEmpty()) {
            Alert alert = new Alert(Alert.AlertType.WARNING);
            alert.setTitle("Champs vides");
            alert.setHeaderText(null);
            alert.setContentText("Veuillez remplir tous les champs.");
            alert.showAndWait();
        } else {
            // Créer un nouvel objet Tickets
            Tickets ticket = new Tickets(titre, desc, "3", selectedUser); // Utiliser la valeur sélectionnée du ComboBox

            // Ajouter le ticket à la base de données ou à la liste existante
            UserRepository userRepository = new UserRepository();
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
            HelloApplication.changeScene("/application/docker/tickets", new TicketsController(this.tickets));
        }
    }




    @FXML
    private void handleCancel(ActionEvent event) {
        // Fermer la fenêtre d'ajout de ticket
        Stage stage = (Stage) Title.getScene().getWindow();
        stage.close();
        HelloApplication.changeScene("/application/docker/tickets", new TicketsController(this.tickets));

    }

}
