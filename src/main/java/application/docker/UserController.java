package application.docker;

import application.HelloApplication;
import javafx.event.ActionEvent;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.cell.PropertyValueFactory;
import modele.User;
//import repository.TicketsRepository;
import java.net.URL;
import java.util.ResourceBundle;


public class UserController implements Initializable {

    private TableView<User> tblUser;

    private User user;

    @FXML
    private TableColumn<User, String> name;
    @FXML
    private TableColumn<User, String> firstname;
    @FXML
    private TableColumn<User, String> mail;

    @FXML
    private TableColumn<User, String> role;

    @FXML
    private Button ButtonDisco;
    @FXML
    private Button ButtonTickets;
    @FXML
    private Button ButtonProfil;
    @FXML
    private Button ButtonUser;
    private TicketsController tickets;
    private User u;

    public UserController(User u) {
        this.user= u;
    }




    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        name.setCellValueFactory(new PropertyValueFactory<>("nom"));
        firstname.setCellValueFactory(new PropertyValueFactory<>("prenom"));
        mail.setCellValueFactory(new PropertyValueFactory<>("mail"));
        role.setCellValueFactory(new PropertyValueFactory<>("role"));

        ButtonDisco.setOnAction(this::handleDisconnectButtonAction);
        ButtonTickets.setOnAction(this::handleDisconnectButtonAction);
        ButtonProfil.setOnAction(this::handleDisconnectButtonAction);
        ButtonUser.setOnAction(this::handleDisconnectButtonAction);

    }


    @FXML
    private void handleDisconnectButtonAction(ActionEvent event) {
        if (event.getSource() == ButtonDisco) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/login");
            System.out.println("test");
        } else if (event.getSource() == ButtonTickets) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/tickets", new TicketsController(this.tickets));
        } else if (event.getSource() == ButtonProfil) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/accueil",new Accueil(u));
        } else if (event.getSource() == ButtonUser) {
            // Charger la nouvelle page depuis un fichier FXML
            HelloApplication.changeScene("/application/docker/User");
        }
    }
}
