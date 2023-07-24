import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" }); //un autre mystere de l'univers, un trou de verre est présent dans ce dossier visiblement

const MYSQL_HOST = process.env.MYSQLDB_HOST_SERVER || "localhost";
const MYSQL_DATABASE = process.env.MYSQLDB_DATABASE || "vecoleo";
const MYSQL_USER = process.env.MYSQLDB_USER || "root";
const MYSQL_PASS = process.env.MYSQLDB_ROOT_PASSWORD || "root";

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};

const SERVER_HOSTNAME = process.env.API_NODEJS_BACK_HOST || 'localhost';
const SERVER_PORT = process.env.API_NODEJS_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const MAILADRESS = process.env.MAIL || "projetmailjulienecole@gmail.com"
const MAILMDP = process.env.MAIL_MDP || "julienEcole"

const MAILER = {
    mail: MAILADRESS,
    mailMdp : MAILMDP
};

const config = {
    mysql: MYSQL,
    server: SERVER,
    mailer : MAILER
};

export default config;
