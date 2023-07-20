package app;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class FXmain extends Application {

    @Override
    public void start(Stage primaryStage) {
        // Création d'un label
        Label label = new Label("Hello JavaFX!");

        // Création d'une StackPane pour le label
        StackPane root = new StackPane();
        root.getChildren().add(label);

        // Création d'une scène avec la StackPane
        Scene scene = new Scene(root, 300, 250);

        // Configuration de la scène dans la fenêtre principale
        primaryStage.setTitle("Ma première application JavaFX");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}

