package appli.user;

import appli.StartApplication;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import modele.User;
import repository.UserRepository;

import java.net.URL;
import java.sql.SQLException;
import java.util.Optional;
import java.util.ResourceBundle;

public class Accueil implements Initializable {

    @FXML
    private TableView<User> tbl;

    @FXML
    private Button btnAdd;

    @FXML
    private Button btnDelete;

    @FXML
    private Button btnModif;

    private User user;
    private User userSelected;

    public Accueil(User u) {
        this.user = u;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        String[][] colonnes = {
                {"Id user","idUser"},
                {"Nom","nom"},
                {"Prenom","prenom"},
                {"Mail","mail"},
                {"Admin ?","estAdmin"}
        };
        for (int i = 0 ; i < colonnes.length ; i ++){
            TableColumn<User,String> myTable= new TableColumn<>(colonnes[i][0]);
            myTable.setCellValueFactory(new PropertyValueFactory<User,String>(colonnes[i][1]));
            tbl.getColumns().add(myTable);
        }
        UserRepository userRepository = new UserRepository();

        tbl.getItems().addAll(userRepository.getUsers());

        if (!this.user.isEstAdmin()){
            btnAdd.setDisable(true);
        }
    }
    @FXML
    void AddAction(ActionEvent event) {
        StartApplication.changeScene("/appli/user/form",new Form(this.user));
    }

    @FXML
    void delAction(ActionEvent event) throws SQLException {
        Optional<ButtonType> resultat = StartApplication.validationDialog("Supression d'un utilisateur","êtes-vous sûr de vouloir supprimer l'utilisateur : "+this.userSelected);
        if (resultat.get() == ButtonType.OK){
            UserRepository userRepository = new UserRepository();
            userRepository.deleteUser(this.userSelected);
            if (this.userSelected.getIdUser() == this.user.getIdUser()){
                StartApplication.changeScene("/appli/user/login");
            }else{
                tbl.getItems().remove(this.userSelected);
            }
        }
    }

    @FXML
    void editAction(ActionEvent event) {
        StartApplication.changeScene("/appli/user/form",new Form(this.user,this.userSelected));
    }

    @FXML
    void onSelIntem(MouseEvent event) {
        System.out.println("hey ! ");
        this.userSelected = tbl.getSelectionModel().getSelectedItem();
        if (userSelected != null && user.isEstAdmin()){
            btnDelete.setDisable(false);
            btnModif.setDisable(false);
        }else{
            btnDelete.setDisable(true);
            btnModif.setDisable(true);
        }
    }

    @FXML
    void menuAction(ActionEvent event) {
        System.out.println("hey !");
    }

    @FXML
    void deconnecterAction(ActionEvent event) {
        StartApplication.changeScene("/appli/user/login");

    }
    @FXML
    void editPasswordAction(ActionEvent event) {
        StartApplication.changeScene("/appli/user/password",new Password(this.user));
    }

    @FXML
    void editUserAction(ActionEvent event) {
        StartApplication.changeScene("/appli/user/form",new Form(this.user,this.user));
    }


}
