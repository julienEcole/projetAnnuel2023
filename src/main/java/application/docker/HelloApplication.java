package application.docker;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.ButtonType;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.scene.Parent;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Optional;

public class HelloApplication extends Application {

    private static Stage stage;
    private static FXMLLoader fxmlLoader;
    @Override
    /*public void start(Stage stage) throws IOException {
        try {
            Class.forName(Credentials.getDriverClassName());
            Connection connection = DriverManager.getConnection(Credentials.getUrl(), Credentials.getUser(), Credentials.getPassword());
            FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("Login.fxml"));
            Scene scene = new Scene(fxmlLoader.load());
            stage.setTitle("Hello!");
            stage.setScene(scene);
            stage.show();
        } catch (ClassNotFoundException e) {
            System.out.println("Pilote JDBC non installé.");
        } catch (SQLException e) {
            System.out.println(e);
        }
    }*/
    public void start(Stage firstStage) throws IOException {

        stage = firstStage;
        fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("/application/docker/Login.fxml"));
        Scene scene = new Scene(fxmlLoader.load());
        stage.setTitle("Connexion!");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }

    public static void changeScene(String fxml,Object controller) {
        // Step 1
        stage.close();
        try {
            // Step 2
            fxmlLoader = new FXMLLoader(HelloApplication.class.getResource(fxml+".fxml"));
            // Step 4
            fxmlLoader.setController(controller);
            // Step 5
            Parent root = fxmlLoader.load();
            Scene scene = new Scene(root);
            stage.setScene(scene);
            stage.show();
        } catch (IOException e) {
            System.err.println(String.format("Error: %s", e.getMessage()));
        }
    }

    public static void changeScene(String fxml){
        stage.close();
        try{
            fxmlLoader = new FXMLLoader(HelloApplication.class.getResource(fxml+".fxml"));
            Parent root = fxmlLoader.load();
            Scene scene = new Scene(root);
            stage.setScene(scene);
            stage.show();
        }catch(IOException e){
            System.err.println(String.format("Error: %s", e.getMessage()));
        }
    }

    public static void newStage(String fxml, Object controller){
        Stage window = new Stage();
        FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource(fxml+".fxml"));
        fxmlLoader.setController(controller);
        Scene scene = null;
       try{
           scene = new Scene(fxmlLoader.load());
         }catch(IOException e){
            System.err.println(String.format("Error: %s", e.getMessage()));
       }
       window.setTitle("TICTACTOE");
       window.setScene(scene);
         window.show();
    }

    public static Optional<ButtonType> validationDialog(String titre, String texte) {
        Alert alert = new Alert(Alert.AlertType.CONFIRMATION, "titre alert", new ButtonType[0]);
        alert.initModality(Modality.APPLICATION_MODAL);
        alert.initOwner(stage);
        alert.getDialogPane().setContentText(texte);
        alert.getDialogPane().setHeaderText(titre);
        return alert.showAndWait();
    }

}