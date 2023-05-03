/*package appli.user;
import appli.StartApplication;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import modele.User;
import repository.UserRepository;

import java.util.Random;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class ResetPassword {
    @FXML
    private TextField fldMail;

    @FXML
    private PasswordField fldMotDePasse;

    @FXML
    private Label lblEnvoi;

    @FXML
    private Label lblErreur;

    private User userSelected;
    @FXML
    void backAction(ActionEvent event) {
        StartApplication.changeScene("/appli/user/login");
    }

    @FXML
    void sendEmailAction(ActionEvent event) {
        UserRepository userRepository = new UserRepository();
        userSelected = userRepository.getUserByMail(fldMail.getText());
        if (userSelected != null){
            //email
            Random rand = new Random();
            userSelected.setCode(rand.nextInt(100000,1000000));
            System.out.println(userSelected.getCode());

            final String fromEmail = ""; //requires valid gmail id
            final String password = ""; // correct password for gmail id
            final String toEmail = userSelected.getMail(); // can be any email id

            System.out.println("TLSEmail Start");
            Properties props = new Properties();
            props.put("mail.smtp.host", "smtp.gmail.com"); //SMTP Host
            props.put("mail.smtp.port", "587"); //TLS Port
            props.put("mail.smtp.auth", "true"); //enable authentication
            props.put("mail.smtp.starttls.enable", "true"); //enable STARTTLS
            //create Authenticator object to pass in Session.getInstance argument
            Authenticator auth = new Authenticator() {
                //override the getPasswordAuthentication method
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(fromEmail, password);
                }
            };
            Session session = Session.getInstance(props, auth);

            sendEmail(session, toEmail,"TLSEmail Testing Subject", "TLSEmail Testing Body with this code : "+userSelected.getCode());


        }
        lblEnvoi.setText("Un email a été envoyé si l'email existe");
    }

    @FXML
    void verifAction(ActionEvent event) {
        if (fldMotDePasse.getText().equals(String.valueOf(userSelected.getCode())))
            StartApplication.changeScene("/appli/user/password",new Password(this.userSelected,false));
        else
            lblErreur.setText("erreur");
    }

    private void sendEmail(Session session, String toEmail, String subject, String body){
        try
        {
            MimeMessage msg = new MimeMessage(session);
            //set message headers
            msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
            msg.addHeader("format", "flowed");
            msg.addHeader("Content-Transfer-Encoding", "8bit");

            msg.setFrom(new InternetAddress("lemoine.sebastien15@gmail.com", "NoReply-JD"));

            msg.setReplyTo(InternetAddress.parse("lemoine.sebastien15@gmail.com", false));

            msg.setSubject(subject, "UTF-8");

            msg.setText(body, "UTF-8");

            msg.setSentDate(new Date());

            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
            System.out.println("Message is ready");
            Transport.send(msg);

            System.out.println("EMail Sent Successfully!!");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}*/
