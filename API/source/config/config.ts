import * as dotenv from "dotenv";
import * as mysql from 'mysql';

dotenv.config({ path: "../.env" });

const MYSQL_HOST = process.env.MYSQLDB_HOST_SERVER || "db";
const MYSQL_DATABASE = process.env.MYSQLDB_DATABASE || "mydb";
const MYSQL_USER = process.env.MYSQLDB_USER || "root";
const MYSQL_PASS = process.env.MYSQLDB_PASS || "root"; // Utilisation de "pass" au lieu de "password"
const MYSQL_PORT = 3308;

// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_DATABASE,
  port: MYSQL_PORT
});
console.log(connection);
console.log(MYSQL_PORT);

const SERVER_HOSTNAME = process.env.API_NODEJS_BACK_HOST || 'localhost';
const SERVER_PORT = process.env.API_NODEJS_PORT || 1337;
const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};
const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  pass: MYSQL_PASS,
  port: MYSQL_PORT
};
const config = {
  mysql: MYSQL,
  server: SERVER
};
export default config;