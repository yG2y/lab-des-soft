# Usar Ubuntu como imagem base
FROM ubuntu:latest as build

# Definir o autor da imagem
LABEL authors="Guilherme G2"

# Atualizar pacotes e instalar o JDK e Maven
RUN apt-get update && apt-get install openjdk-21-jdk maven -y

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o arquivo pom.xml e o diretório src para o diretório /app
COPY projeto01/projeto01/pom.xml /app/
COPY projeto01/projeto01/src /app/src

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
