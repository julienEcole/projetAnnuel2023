FROM openjdk:11

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get install -y default-mysql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN  mvn package && mvn install


# CMD [ "java", "--module-path", "./target/", "--add-modules", "javafx.controls,javafx.fxml","./src/app/main.java" ]