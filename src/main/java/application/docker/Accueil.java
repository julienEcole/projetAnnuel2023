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
            try {
                // Charger la nouvelle page depuis un fichier FXML
                FXMLLoader loader = new FXMLLoader(getClass().getResource("/application/docker/login.fxml"));
                Node nouvellePage = loader.load();

                // Remplacer le contenu de la scène actuelle par la nouvelle page
                rootPane.getChildren().setAll(nouvellePage);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
