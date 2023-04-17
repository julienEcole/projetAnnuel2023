package appli.user;

import appli.StartApplication;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import modele.User;
import repository.UserRepository;

import java.sql.SQLException;

public class Password {

    @FXML
    private PasswordField fldConfirmer;

    @FXML
    private PasswordField fldMotDePasse;

    @FXML
    private Label lblErreur;

    private User userConnecte;
    private boolean estConnecte;

    public Password(User userConnecte){
        this.userConnecte = userConnecte;
        estConnecte = true;
    }
    public Password(User userConnecte, boolean estConnecte){
        this.userConnecte = userConnecte;
        this.estConnecte = estConnecte;
    }

    @FXML
    void SaveAction(ActionEvent event) throws SQLException {
        UserRepository userRepository = new UserRepository();
        if (fldConfirmer.getText().equals(fldMotDePasse.getText())){
            this.userConnecte.setMdp(fldMotDePasse.getText());
            System.out.println(fldMotDePasse.getText());
            System.out.println(this.userConnecte);
            userRepository.changePassword(this.userConnecte);
            if (this.estConnecte)
                StartApplication.changeScene("/appli/user/Accueil",new Accueil(this.userConnecte));
            else
                StartApplication.changeScene("/appli/user/login");
        }else{
            lblErreur.setText("les mdp ne correspondent pas");
        }
    }

    @FXML
    void backAction(ActionEvent event) {
        if (this.estConnecte)
            StartApplication.changeScene("/appli/user/Accueil",new Accueil(this.userConnecte));
        else
            StartApplication.changeScene("/appli/user/login");

    }
}
