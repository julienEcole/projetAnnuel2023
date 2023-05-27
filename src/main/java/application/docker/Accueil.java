package application.docker;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import modele.User;

import java.io.IOException;
import java.net.URL;
import java.util.Optional;
import java.util.ResourceBundle;

public class Accueil implements Initializable {

    private User user;

    @FXML
    private Button btnprof;

    @FXML
    private Button btnuse;

    @FXML
    private Button btntick;

    @FXML
    private Button btndiscon;


    public Accueil(User u) {
        this.user = u;
    }


    @FXML
    private void handleProfButtonAction(ActionEvent event) {
        // Logique de gestion du clic sur le bouton Profil
    }

    @FXML
    private void handleUsersButtonAction(ActionEvent event) {
        // Logique de gestion du clic sur le bouton Users
    }

    @FXML
    private void handleTicketsButtonAction(ActionEvent event) {
        // Logique de gestion du clic sur le bouton Tickets
    }



    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

    }
}