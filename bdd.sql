USE vecoleo;

CREATE TABLE IF NOT EXISTS role_utilisateur (
    role_utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT
);

CREATE TABLE IF NOT EXISTS utilisateur (
    utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    mdp TEXT NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    prenom TEXT,
    nom TEXT,
    role_utilisateur_id INT NOT NULL REFERENCES role_utilisateur(role_utilisateur_id)
);
CREATE TABLE IF NOT EXISTS type_ticket (
    type_ticket_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT
);

CREATE TABLE IF NOT EXISTS urgence (
    urgence_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT
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
    description_bug TEXT
);

CREATE TABLE IF NOT EXISTS image (
    image_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fichier_image BLOB NOT NULL,
    `description` TEXT,
    nom VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS ticket_image (
    image_id INT NOT NULL REFERENCES image(image_id),
    ticket_id INT NOT NULL REFERENCES ticket(ticket_id),
    PRIMARY KEY(ticket_id,image_id)
);

CREATE TABLE IF NOT EXISTS assignation (
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
    ticket_id INT NOT NULL REFERENCES ticket(ticket_id),
    PRIMARY KEY(utilisateur_id,ticket_id)

);

/*toutes la partie java au dessus*/

CREATE TABLE IF NOT EXISTS probleme (
    probleme_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    adresse TEXT NOT NULL,
    titre TEXT NOT NULL,
    `description` TEXT,
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id)
);

CREATE TABLE IF NOT EXISTS probleme_image (
    image_id INT NOT NULL REFERENCES image(image_id),
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    PRIMARY KEY (image_id, probleme_id)
);

CREATE TABLE IF NOT EXISTS probleme_service (
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    service_id INT NOT NULL REFERENCES service(service_id),
    PRIMARY KEY(service_id,probleme_id)
);

CREATE TABLE IF NOT EXISTS probleme_reparation_type (
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    reparation_type_id INT NOT NULL REFERENCES reparation_type(reparation_type_id),
    PRIMARY KEY(reparation_type_id,probleme_id)
);

/*partie probleme au dessus*/

CREATE TABLE IF NOT EXISTS atelier (
    atelier_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    adresse TEXT NOT NULL,
    horaire_ouverture TIME,
    horaire_fermeture TIME,
    nomAtelier VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS utilisateur_atelier (
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
    atelier_id INT NOT NULL REFERENCES atelier(atelier_id),
    PRIMARY KEY (utilisateur_id, atelier_id)
);

CREATE TABLE IF NOT EXISTS service (
    service_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    prix int NOT NULL,
    `description` TEXT NOT NULL,
    titreService TEXT NOT NULL,
    reparation_type_id INT NOT NULL REFERENCES reparation_type(reparation_type_id)
);

CREATE TABLE IF NOT EXISTS reparation_type (
    reparation_type_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre_reparation VARCHAR(255) NOT NULL UNIQUE,
    `description` TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notification (
    service_id INT NOT NULL REFERENCES `service`(service_id),
    probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
    is_readed BOOLEAN NOT NULL,
    PRIMARY KEY(service_id,probleme_id)
);

CREATE TABLE IF NOT EXISTS critique (
    critique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    note INT
);

CREATE TABLE IF NOT EXISTS critique_utilisateur (
    critique_id INT NOT NULL REFERENCES critique(critique_id),
    utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
    PRIMARY KEY (critique_id, utilisateur_id)
);

CREATE TABLE IF NOT EXISTS critique_atelier (
    critique_id INT NOT NULL REFERENCES critique(critique_id),
    atelier_id INT NOT NULL REFERENCES atelier(atelier_id),
    PRIMARY KEY(critique_id,atelier_id)
);