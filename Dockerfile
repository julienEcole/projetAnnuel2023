FROM openjdk:11-jdk 

WORKDIR /app
COPY /src/pom.xml .
COPY src ./src
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get install -y default-mysql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mvn dependency:copy-dependencies package && mvn install && mvn package

CMD ["java", "./src/app/main.java"]

# CMD [ "java", "--module-path", "./target/", "--add-modules", "javafx.controls,javafx.fxml","./src/app/main.java" ]