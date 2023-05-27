package application.docker;

import application.docker.HelloApplication;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import modele.User;
import repository.UserRepository;

import java.io.IOException;
import java.util.Optional;


public class LoginController {
    @FXML
    private TextField tname;
    @FXML
    private PasswordField tpass;

    @FXML
    private Button btndiscon;


     @FXML
     void seConnecterAction(ActionEvent event){
         //System.out.println(tname.getText());
         //System.out.println(tpass.getText());
         UserRepository userRepository = new UserRepository();
         User u = userRepository.connexion(tname.getText(),tpass.getText());
         if(u != null){
             HelloApplication.changeScene("/application/docker/Accueil",new Accueil(u));
             System.out.println("User connecte");
    }else {
             System.out.println("erreur");

         }
         }

    @FXML
    private void handleDisconnectButtonAction(ActionEvent event) {
        Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
        alert.setTitle("Déconnexion");
        alert.setHeaderText("Confirmation de déconnexion");
        alert.setContentText("Êtes-vous sûr de vouloir vous déconnecter ?");

        Optional<ButtonType> result = alert.showAndWait();
        if (result.isPresent() && result.get() == ButtonType.OK) {
            // Si l'utilisateur confirme la déconnexion, effectuez les actions nécessaires
            // pour vous déconnecter (par exemple, réinitialisez les données de session, fermez la fenêtre, etc.)

            // Exemple : Fermer la fenêtre principale
            Stage stage = (Stage) btndiscon.getScene().getWindow();
            stage.close();

        }


    }

}