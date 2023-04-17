module appli.user {
    requires javafx.controls;
    requires javafx.fxml;
    //requires javafx.web;
    requires javafx.base;

    requires org.controlsfx.controls;
    requires com.dlsc.formsfx;
    requires org.kordamp.bootstrapfx.core;
    requires java.sql;


    exports appli;
    opens appli to javafx.fxml;
    opens modele to javafx.base, javafx.fxml;
    opens appli.user to javafx.base, javafx.fxml;
}