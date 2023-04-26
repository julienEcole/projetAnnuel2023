package appli;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.scene.control.ButtonType;
import javafx.scene.control.Alert;
import javafx.stage.Modality;

import java.io.IOException;
import java.util.Optional;

public class StartApplication extends Application {

    private static Stage stage;

    private static FXMLLoader fxmlLoader;

    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(StartApplication.class.getResource("Login.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 320, 240);
        stage.setTitle("Login");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }

    public static void changeScene(String fxml, Object controller) {
        stage.close();

        try{
            fxmlLoader = new FXMLLoader(StartApplication.class.getResource(fxml));
            fxmlLoader.setController(controller);
            Parent root = fxmlLoader.load();
            Scene scene = new Scene(root);
            stage.setScene(scene);
            stage.show();
        } catch (IOException e) {
            System.out.println("Error: %s" + e.getMessage());
        }
    }


    public static void changeScene(String fxml) {
        stage.close();

        try{
            fxmlLoader = new FXMLLoader(StartApplication.class.getResource(fxml));
            Parent root = fxmlLoader.load();
            Scene scene = new Scene(root);
            stage.setScene(scene);
            stage.show();
        } catch (IOException e) {
            System.out.println("Error: %s" + e.getMessage());
        }
    }

    public static void newStage(String fxml, Object controller){
        Stage window = new Stage();
        FXMLLoader fxmlLoader = new FXMLLoader(StartApplication.class.getResource(fxml+".fxml"));
        fxmlLoader.setController(controller);
        Scene scene = null;
        try{
            scene = new Scene(fxmlLoader.load());
        } catch (IOException e) {
            e.printStackTrace();
        }
        window.setTitle("test");
        window.setScene(scene);
        window.show();
    }


    public static Optional<ButtonType> validationDialog(String titre, String texte){
        Alert alert = new Alert(Alert.AlertType.CONFIRMATION,"titre alert");
        alert.initModality(Modality.APPLICATION_MODAL);
        alert.initOwner(stage);
        alert.getDialogPane().setContentText(texte);
        alert.getDialogPane().setHeaderText(titre);
        return alert.showAndWait();
    }


}