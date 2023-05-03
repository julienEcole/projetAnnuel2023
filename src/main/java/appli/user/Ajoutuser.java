/*package appli.user;

import appli.StartApplication;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import modele.User;
import repository.UserRepository;

import java.sql.SQLException;

public class ajoutuser{
    @FXML
    private PasswordField fldConfirmer;

    @FXML
    private TextField fldMail;

    @FXML
    private PasswordField fldMotDePasse;

    @FXML
    private TextField fldNom;

    @FXML
    private TextField fldPrenom;
    @FXML
    private Label lblErreur;

    @FXML
    void loginAction(ActionEvent event) {
        StartApplication.changeScene("/appli/user/login");
    }

    @FXML
    void registerAction(ActionEvent event) {
        UserRepository userRepository = new UserRepository();
        if (fldConfirmer.getText().equals(fldMotDePasse.getText())){
            User u = new User(fldNom.getText(),fldPrenom.getText(),fldMail.getText(),fldMotDePasse.getText(),false);
            try {
                u = userRepository.sauvegarder(u);
                StartApplication.changeScene("/appli/user/login");

            } catch (SQLException e) {
                lblErreur.setText(e.getMessage());
            }
        }else{
            lblErreur.setText("les mdp ne correspondent pas");
        }

    }

}*/
