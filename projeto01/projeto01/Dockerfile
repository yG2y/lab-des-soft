# Usar Ubuntu como imagem base
FROM ubuntu:latest as build

# Definir o autor da imagem
LABEL authors="Guilherme G2"

# Configurar locale para UTF-8
RUN apt-get update && apt-get install -y locales && locale-gen en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

# Atualizar pacotes e instalar o JDK e Maven
RUN apt-get install openjdk-21-jdk maven -y

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o arquivo pom.xml e o diretório src para o diretório /app
COPY pom.xml /app/
COPY src /app/src

# Executar Maven para construir o aplicativo
RUN mvn clean install

# Usar uma imagem base mais leve para a execução
FROM openjdk:21-jdk-slim

# Expor a porta que o aplicativo usa
EXPOSE 8080

# Copiar o arquivo jar construído na etapa anterior para a nova imagem
COPY --from=build /app/target/*.jar /app/app.jar

# Definir o comando de execução do aplicativo
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
