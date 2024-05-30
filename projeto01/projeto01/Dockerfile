#FROM ubuntu:latest as build
## Guilherme
#LABEL authors="Guilherme G2"
#RUN apt-get update
#RUN apt-get install openjdk-21-jdk -y
#
#COPY . .
#
#RUN apt-get install maven -y
#RUN mvn clean install
#
#FROM openjdk:21-jdk-slim
#
#EXPOSE 8080
#
#COPY --from=build target/*.jar app.jar
#
#ENTRYPOINT ["java", "-jar","app.jar"]

# Usar a imagem base do OpenJDK para garantir que temos Java instalado
FROM openjdk:21-jdk as build

# Instalar Maven
RUN apt-get update && \
    apt-get install -y maven

# Definir o diretório de trabalho dentro do Docker
WORKDIR /app

# Copiar o arquivo pom.xml e o diretório src para o diretório de trabalho
COPY pom.xml /app/pom.xml
COPY src /app/src

# Executar Maven para construir o aplicativo
RUN mvn clean install -DskipTests

# Usar uma imagem base mais leve para a execução
FROM openjdk:21-jdk-slim

# Expor a porta que o aplicativo usa
EXPOSE 8080

# Copiar o arquivo jar construído na etapa anterior para a nova imagem
COPY --from=build /app/target/*.jar /app/app.jar

# Definir o comando de execução do aplicativo
ENTRYPOINT ["java", "-jar", "/app/app.jar"]