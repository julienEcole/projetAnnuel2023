use vecoleo;

CREATE TABLE IF NOT EXISTS role_utilisateur (
    role_utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT
);

CREATE TABLE IF NOT EXISTS utilisateur (
    utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    mdp TEXT NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    pseudo VARCHAR(255) NOT NULL UNIQUE,
    prenom TEXT,
    nom TEXT,
    telephone TEXT,
    date_de_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role_utilisateur_id INT NOT NULL REFERENCES role_utilisateur(role_utilisateur_id),
    icon_image_id INT REFERENCES [image](image_id)
);

CREATE TABLE IF NOT EXISTS type_ticket (
    type_ticket_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS urgence (
    urgence_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS etat (
    etat_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT
);

CREATE TABLE IF NOT EXISTS ticket (
    ticket_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    etat_id INT NOT NULL REFERENCES etat(etat_id),
    urgence_id INT NOT NULL REFERENCES urgence(urgence_id),
    type_ticket_id INT NOT NULL REFERENCES type_ticket(type_ticket_id),
    date_de_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description_bug TEXT
);

CREATE TABLE IF NOT EXISTS image (
    image_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    url_image TEXT NOT NULL,
    nom VARCHAR(255) NOT NULL UNIQUE,
    `taille` int(11) NOT NULL,
    `description` TEXT,
    `type` varchar(20) NOT NULL,
    `bin` longblob NOT NULL  
);

CREATE TABLE IF NOT EXISTS ticket_image (
    image_id INT NOT NULL REFERENCES image(image_id),
    ticket_id INT NOT NULL REFERENCES ticket(ticket_id),
    PRIMARY KEY(ticket_id, image_id)
);

CREATE TABLE IF NOT EXISTS assignation (
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
    ticket_id INT NOT NULL REFERENCES ticket(ticket_id),
    date_de_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(utilisateur_id, ticket_id)
);

CREATE TABLE IF NOT EXISTS commentaire (
    commentaire_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    `description` TEXT,
    resume TEXT,
    date_de_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(utilisateur_id, probleme_id)
);

CREATE TABLE IF NOT EXISTS probleme (
    probleme_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    adresse INT NOT NULL,   --code postale du probleme
    `object` TEXT NOT NULL,
    `description` TEXT,
    date_de_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id)
    `bin` longblob NOT NULL  
);

CREATE TABLE IF NOT EXISTS probleme_image (
    image_id INT NOT NULL REFERENCES image(image_id),
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    PRIMARY KEY(image_id, probleme_id)
);

CREATE TABLE IF NOT EXISTS probleme_service (
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    service_id INT NOT NULL REFERENCES service(service_id),
    PRIMARY KEY(service_id, probleme_id)
);

CREATE TABLE IF NOT EXISTS probleme_reparation_type (
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    reparation_type_id INT NOT NULL REFERENCES reparation_type(reparation_type_id),
    PRIMARY KEY(reparation_type_id, probleme_id)
);

/*partie probleme au dessus*/

CREATE TABLE IF NOT EXISTS atelier (
    atelier_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    adresse TEXT NOT NULL,
    longitude DECIMAL(9, 6),
    latitude DECIMAL(9, 6),
    telephone TEXT,
    horaire_ouverture TIME,
    horaire_fermeture TIME,
    nomAtelier VARCHAR(255) NOT NULL UNIQUE,
    date_ouverture DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS utilisateur_atelier (
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
    atelier_id INT NOT NULL REFERENCES atelier(atelier_id),
    PRIMARY KEY(utilisateur_id, atelier_id)
);

CREATE TABLE IF NOT EXISTS service (
    service_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    prix int NOT NULL,
    `description` TEXT NOT NULL,
    titreService TEXT NOT NULL,
    date_de_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    reparation_type_id INT NOT NULL REFERENCES reparation_type(reparation_type_id)
);

CREATE TABLE IF NOT EXISTS reparation_type (
    reparation_type_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre_reparation VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notification (
    service_id INT NOT NULL REFERENCES service(service_id),
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    is_readed BOOLEAN NOT NULL,
    date_de_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(service_id, probleme_id)
);

CREATE TABLE IF NOT EXISTS critique (
    critique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    date_de_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    note INT
);

CREATE TABLE IF NOT EXISTS critique_utilisateur (
    critique_id INT NOT NULL REFERENCES critique(critique_id),
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
    PRIMARY KEY(critique_id, utilisateur_id)
);

CREATE TABLE IF NOT EXISTS critique_atelier (
    critique_id INT NOT NULL REFERENCES critique(critique_id),
    atelier_id INT NOT NULL REFERENCES atelier(atelier_id),
    PRIMARY KEY(critique_id, atelier_id)
);
