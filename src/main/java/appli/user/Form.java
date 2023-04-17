package appli.user;

import appli.StartApplication;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import modele.User;
import repository.UserRepository;

import java.net.URL;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class Form implements Initializable {

    @FXML
    private RadioButton a;

    @FXML
    private RadioButton b;

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
    private RadioButton rbtnAdmin;

    @FXML
    private RadioButton rbtnUser;

    @FXML
    private ToggleGroup role;

    private User user;
    private User userConnecte;

    public Form(User userConnecte){
        this.userConnecte = userConnecte;
    }
    public Form(User userConnecte, User user){
        this.user = user;
        this.userConnecte = userConnecte;

    }

    @FXML
    void SaveAction(ActionEvent event) {
        UserRepository userRepository = new UserRepository();
        if(user == null){
            if (fldConfirmer.getText().equals(fldMotDePasse.getText())){
                user = new User(fldNom.getText(),fldPrenom.getText(),fldMail.getText(),fldMotDePasse.getText(),rbtnAdmin.isSelected());
                try {
                    userRepository.sauvegarder(user);
                    StartApplication.changeScene("/appli/user/Accueil",new Accueil(this.userConnecte));

                } catch (SQLException e) {
                    lblErreur.setText(e.getMessage());
                }
            }else{
                lblErreur.setText("les mdp ne correspondent pas");
            }
        }
        else {
            this.user.setNom(fldNom.getText());
            this.user.setPrenom(fldPrenom.getText());
            this.user.setMail(fldMail.getText());
            this.user.setEstAdmin(rbtnAdmin.isSelected());
            try {
                userRepository.sauvegarder(user);
                if(user.getIdUser() == this.userConnecte.getIdUser()){
                    StartApplication.changeScene("/appli/user/Accueil",new Accueil(this.user));

                }else{
                    StartApplication.changeScene("/appli/user/Accueil",new Accueil(this.userConnecte));

                }

            } catch (SQLException e) {
                lblErreur.setText(e.getMessage());
            }
        }


    }

    @FXML
    void backAction(ActionEvent event) {
        StartApplication.changeScene("/appli/user/Accueil",new Accueil(this.userConnecte));
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        if (this.user != null){
            fldNom.setText(this.user.getNom());
            fldPrenom.setText(this.user.getPrenom());
            fldMail.setText(this.user.getMail());
            fldMotDePasse.setDisable(true);
            fldConfirmer.setDisable(true);
            if (this.user.isEstAdmin()){
                rbtnAdmin.setSelected(true);
            }
        }
    }
}
