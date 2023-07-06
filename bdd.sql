USE vecoleo;

CREATE TABLE role_utilisateur (
    role_utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT
);

CREATE TABLE utilisateur (
    utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    mdp TEXT NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    prenom TEXT,
    nom TEXT,
    role_utilisateur_id INT NOT NULL REFERENCES role_utilisateur(role_utilisateur_id)
);
CREATE TABLE type_ticket (
    type_ticket_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT
);

CREATE TABLE urgence (
    urgence_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT
);

CREATE TABLE etat (
    etat_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT
);

CREATE TABLE ticket (
    ticket_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    etat_id INT NOT NULL REFERENCES etat(etat_id),
    urgence_id INT NOT NULL REFERENCES urgence(urgence_id),
    type_ticket_id INT NOT NULL REFERENCES type_ticket(type_ticket_id),
    description_bug TEXT
);

CREATE TABLE image (
    image_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fichier_image BLOB NOT NULL,
    `description` TEXT,
    nom VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE ticket_image (
    image_id INT NOT NULL REFERENCES image(image_id),
    ticket_id INT NOT NULL REFERENCES ticket(ticket_id),
    PRIMARY KEY(ticket_id,image_id)
);

CREATE TABLE assignation (
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
    ticket_id INT NOT NULL REFERENCES ticket(ticket_id),
    PRIMARY KEY(utilisateur_id,ticket_id)

);

/*toutes la partie java au dessus*/

CREATE TABLE probleme (
    probleme_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    adresse TEXT NOT NULL,
    `description` TEXT NOT NULL,
    utilisateur INT NOT NULL REFERENCES utilisateur(utilisateur_id)
);

CREATE TABLE ticket_image (
    image_id INT PRIMARY KEY NOT NULL REFERENCES image(image_id),
    probleme_id INT PRIMARY KEY NOT NULL REFERENCES probleme(probleme_id),
    PRIMARY KEY(image_id,probleme_id)
);

CREATE TABLE probleme_service (
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    service_id INT NOT NULL REFERENCES service(service_id),
    PRIMARY KEY(service_id,probleme_id)
);

CREATE TABLE probleme_reparation_type (
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    reparation_type_id INT NOT NULL REFERENCES reparation_type(reparation_type_id),
    
    PRIMARY KEY(reparation_type_id,probleme_id)
);

/*partie probleme au dessus*/

CREATE TABLE atelier (
    atelier_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    adresse TEXT NOT NULL,
    horaire_ouverture TIME,
    horaire_fermeture TIME,
    nomAtelier VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE utilisateur_atelier (
    utilisateur_id INT PRIMARY KEY NOT NULL REFERENCES utilisateur(utilisateur_id),
    atelier_id INT PRIMARY KEY NOT NULL REFERENCES atelier(atelier_id)
);

CREATE TABLE service (
    service_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    prix int NOT NULL,
    `description` TEXT NOT NULL,
    titreService TEXT NOT NULL,
    reparation_type_id INT PRIMARY KEY NOT NULL REFERENCES reparation_type(reparation_type_id)
);

CREATE TABLE reparation_type (
    reparation_type_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre_reparation VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT NOT NULL
);

CREATE TABLE notification (
    service_id INT NOT NULL REFERENCES `service`(service_id),
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    is_readed BOOLEAN NOT NULL,
    PRIMARY KEY(service_id,probleme_id)
);