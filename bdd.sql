USE vecoleo;

CREATE TABLE role_utilisateur (
    role_utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);
CREATE TABLE utilisateur (
    utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    mdp TEXT NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    role_utilisateur_id INT NOT NULL REFERENCES role_utilisateur(role_utilisateur_id)
);
CREATE TABLE type_ticket (
    type_ticket_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE urgence (
    urgence_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE etat (
    etat_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
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
    description TEXT,
    nom VARCHAR(255) NOT NULL UNIQUE
);