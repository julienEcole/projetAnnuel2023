module application.docker {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.controlsfx.controls;
    requires com.dlsc.formsfx;
    requires org.kordamp.bootstrapfx.core;
    requires java.sql;

    opens application.docker to javafx.fxml;
    opens modele to javafx.base; // Ajout de cette ligne

    exports application.docker;
    exports application;
    opens application to javafx.fxml;
}