import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
// import bookRoutes from './routes/book';
import userRoutes from './routes/utilisateur'
import ticketRoute from './routes/ticket'

import notificationRoute from './routes/vecoleo/notification';

import atelierRoute from "./routes/vecoleo/profetionnel/atelier"
import utilisateur_atelierRoute from './routes/vecoleo/profetionnel/utilisateur_atelier';
import serviceRoute from './routes/vecoleo/profetionnel/service';

import problemeRoute from './routes/vecoleo/probleme/probleme';
import probleme_serviceRoute from './routes/vecoleo/probleme/probleme_service';
import probleme_imageRoute from './routes/vecoleo/probleme/probleme_service';
import commentaireRoute from './routes/vecoleo/probleme/commentaire';

import critiqueRoute from './routes/vecoleo/critique/critique';
import critique_atelierRoute from './routes/vecoleo/critique/critique_atelier';
import critique_utilisateurRoute from './routes/vecoleo/critique/critique_utilisateur';

const NAMESPACE = 'Server';
const router = express();

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
// router.use('/books', bookRoutes);
router.use("/utilisateur", userRoutes);
router.use("/ticket", ticketRoute)

router.use("/notification", notificationRoute)

router.use("/atelier", atelierRoute)
router.use("/service", serviceRoute)
router.use("/utilisateur_atelier",utilisateur_atelierRoute)

router.use("/probleme", problemeRoute)
router.use("/probleme_service", probleme_serviceRoute)
router.use("/probleme_image", probleme_imageRoute)
router.use("/commentaire", commentaireRoute)

router.use("/critique", critiqueRoute)
router.use("/critique_atelier", critique_atelierRoute)
router.use("/critique_utilisateur", critique_utilisateurRoute)

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
