FROM debian:latest

# Install Java
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Install MySQL
RUN apt-get update && apt-get install -y mariadb-server && service mariadb start && mysql -u root -e "CREATE DATABASE velovert"

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY ./app/package*.json ./

# Install dependencies
RUN npm install

COPY . /app

# Expose port
EXPOSE 3000

# Start server
CMD ["java", "main"]
