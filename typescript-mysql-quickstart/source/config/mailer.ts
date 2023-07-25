import * as nodemailer from 'nodemailer';
import config from './config';
import { NextFunction,Request, Response } from 'express';
import logging from './logging';

// Fonction pour envoyer un e-mail
export async function sendEmailInscription(mailDestinataire : string, token:string) :Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailer.mail,
      pass: config.mailer.mailMdp,
    },
  });
  logging.info("NO NAMESPACE","config.mailer.mail = ", config.mailer.mail) //DEBUG
  logging.info("NO NAMESPACE","config.mailer.mailMdp = ","config.mailer.mailMdp = " + config.mailer.mailMdp) //DEBUG

  const mailOptions = {
    from: config.mailer.mail,
    to: mailDestinataire, //TOSET
    subject: 'confirmation de la création du compte',
    html: `<h1>bonjour, veuillez cliquer le liens suivant afin de confirmer la création/modification de votre compte.</h1>
    <p> votre inscription a la plateforme vécoélo a bien été prise en compte, si vous ne comfirmez pas votre adresse mail en cliquant sur le lien suivant votre compte sera supprimé au bout de 1 jour. </p>
    <a href="${config.server.hostname}:${config.server.port}/confirm/${token}">le lien</a>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
  }
}

// Fonction à exécuter après l'envoi de l'e-mail
// function fonctionAExecuter() {
//   console.log('Fonction exécutée après l\'envoi de l\'e-mail !');
// }

// Appel de la fonction pour envoyer l'e-mail avant d'exécuter la fonction
// sendEmail()
//   .then(() => fonctionAExecuter())
//   .catch((error) => console.error('Erreur :', error));