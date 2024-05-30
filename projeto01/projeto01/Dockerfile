# Usar Ubuntu como imagem base
FROM ubuntu:latest as build

# Definir o autor da imagem
LABEL authors="Guilherme G2"

# Atualizar pacotes e instalar o JDK e Maven
RUN apt-get update && apt-get install openjdk-21-jdk maven -y

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar todo o conteúdo do diretório do projeto para o diretório /app
COPY . /app

# Listar conteúdo do diretório /app para debug
RUN ls -la /app

# Executar Maven para construir o aplicativo, dentro do diretório /app
RUN mvn clean install

# Usar uma imagem base mais leve para a execução
FROM openjdk:21-jdk-slim

# Expor a porta que o aplicativo usa
EXPOSE 8080

# Copiar o arquivo jar construído na etapa anterior para a nova imagem
COPY --from=build /app/target/*.jar /app/app.jar

# Definir o comando de execução do aplicativo
ENTRYPOINT ["java", "-jar", "/app/app.jar"]