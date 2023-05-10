package application.docker;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import modele.User;
import repository.UserRepository;
import application.docker.HelloApplication;


public class LoginController {
    @FXML
    private TextField tname;
    @FXML
    private TextField tpassword;


     void seConnecterAction(ActionEvent event){
         System.out.println(tname.getText());
         System.out.println(tpassword.getText());
         UserRepository userRepository = new UserRepository();
         User u = userRepository.connexion(tname.getText(),tpassword.getText());
         if(u != null){
             HelloApplication.changeScene("/appli/user/accueil",new Accueil(u));
             System.out.println("User connecte");
    }else {
             System.out.println("erreur");
         }
         }
}