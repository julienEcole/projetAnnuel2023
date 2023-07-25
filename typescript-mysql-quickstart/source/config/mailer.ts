import * as nodemailer from 'nodemailer';
import config from './config';
import { NextFunction,Request, Response } from 'express';

// Fonction pour envoyer un e-mail
export async function sendEmailInscription(mailDestinataire : string, token:string) :Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailer.mail,
      pass: config.mailer.mailMdp,
    },
  });

  const mailOptions = {
    from: config.mailer.mail,
    to: mailDestinataire, //TOSET
    subject: 'confirmation de la création du compte',
    html: `<h1>bonjour, veuillez cliquer le liens suivant afin de confirmer la création/modification de votre compte.</h1>
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