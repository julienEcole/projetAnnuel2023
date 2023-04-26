package appli.user;

import appli.StartApplication;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;
import modele.User;
import repository.UserRepository;

import java.net.URL;
import java.util.ResourceBundle;
import java.sql.SQLException;
import java.util.Optional;


public class Accueil implements Initializable{

    private TableView<User> table;

    @FXML
    private Button btnAdd;

    private Button btnDelete;

    private Button btnModif;

    private User user;

    private User userSelected;

    public Accueil(User u){
        user = u;
    }

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
            table.getColumns().add(myTable);
        }
        UserRepository userRepository = new UserRepository();

       // table.getItems().addAll(userRepository.getUsers());

      //  if (!this.user.isEstAdmin()){
        //    btnAdd.setDisable(true);
        //}
    }


}