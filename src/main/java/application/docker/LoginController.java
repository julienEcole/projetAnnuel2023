package application.docker;

import application.docker.HelloApplication;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import modele.User;
import repository.UserRepository;


public class LoginController {
    @FXML
    private TextField tname;
    @FXML
    private PasswordField tpass;


     @FXML
     void seConnecterAction(ActionEvent event){
         System.out.println(tname.getText());
         System.out.println(tpass.getText());
         UserRepository userRepository = new UserRepository();
         User u = userRepository.connexion(tname.getText(),tpass.getText());
         if(u != null){
             HelloApplication.changeScene("/application/docker/accueil",new Accueil(u));
             System.out.println("User connecte");
    }else {
             System.out.println("erreur");

         }
         }
}