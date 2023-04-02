create table role(
    roleId INT PRIMARY KEY NOT NULL,
    intitule varchar(50) NOT NULL,
    description varchar(200)
),


/* table pour la partie java*/
create table type(
    typeId INT PRIMARY KEY NOT NULL,
    intitule varchar(50) NOT NULL,
    descriptionType varchar(200)
),

create table urgence (
    urgenceId INT PRIMARY KEY NOT NULL,
    titreUrgenceTicket varchar(50) NOT NULL,
    descriptionUrgence varchar(200)
),

create table etat (
    etatId INT PRIMARY KEY NOT NULL,
    titreEtatTicket varchar(50) NOT NULL
    descriptionEtat varchar(100),
    
),

create table ticket(
    ticketId INT PRIMARY KEY NOT NULL,
    descriptionBug varchar(500),
)



create table image (
    imageId INT PRIMARY KEY NOT NULL,
    fichierImage blob NOT NULL,
    descriptionImage varchar(100),
    nom varchar(50) NOT NULL,
)