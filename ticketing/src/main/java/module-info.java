module com.example.ticketing {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.ticketing to javafx.fxml;
    exports com.example.ticketing;
}