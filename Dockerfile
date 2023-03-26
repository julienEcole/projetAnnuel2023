# Utiliser l'image officielle OpenJDK avec Java 11
FROM openjdk:11

# Installer MariaDB
RUN apt-get update && \
    apt-get install -y mariadb-server

# Installer JavaFX via le gestionnaire de paquets Maven
COPY pom.xml /
RUN apt-get install -y maven && \
    mvn dependency:go-offline

# Copier les sources de l'application Java
COPY src /main.java
WORKDIR /

# Compiler l'application avec Maven
RUN mvn package

# Exposer le port MariaDB (MySQL)
EXPOSE 3306

# Définir la commande de démarrage
CMD ["bash", "-c", "service mariadb start && java -jar target/mon_application-1.0-SNAPSHOT.jar"]