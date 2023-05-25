package application.docker;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.layout.AnchorPane;
import modele.User;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class Accueil implements Initializable {

    private User user;

    @FXML
    private Button btndiscon;

    @FXML
    private AnchorPane rootPane;

    public Accueil(User u) {
        this.user = u;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        // Ajouter un gestionnaire d'événements pour le bouton btndiscon
        btndiscon.setOnAction(this::handleButtonClick);
    }

    private void handleButtonClick(ActionEvent event) {
        if (event.getSource() == btndiscon) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/login");
        }else {
            System.out.println("erreur");
        }
    }
}
