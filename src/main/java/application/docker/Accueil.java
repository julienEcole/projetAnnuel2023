package application.docker;

import application.HelloApplication;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import modele.User;

import java.net.URL;
import java.util.ResourceBundle;

public class Accueil implements Initializable {

    private User user;
    private TicketsController tickets;

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







    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        btndiscon.setOnAction(this::handleButtonClick);
        btntick.setOnAction(this::handleButtonClick);

    }


    private void handleButtonClick(ActionEvent event) {
        if (event.getSource() == btndiscon) {
            // Charger la nouvelle page depuis un fichier FXML
           HelloApplication.changeScene("/application/docker/login");
        } else if (event.getSource() == btntick) {
            // Charger la nouvelle page depuis un fichier FXML

            HelloApplication.changeScene("/application/docker/tickets", new TicketsController(this.tickets));
        }
    }
}