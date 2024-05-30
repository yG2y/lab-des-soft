#FROM ubuntu:latest as build
## Guilherme
#LABEL authors="Guilherme G2"
#RUN apt-get update
#RUN apt-get install openjdk-21-jdk -y
#
#COPY . .
#
#RUN apt-get install maven -y
#RUN mvn clean install -DskipTests
#
#FROM openjdk:21-jdk-slim
#
#EXPOSE 8080
#
#COPY --from=build target/*.jar app.jar
#
#ENTRYPOINT ["java", "-jar","app.jar"]

# Usar uma imagem base que já possui Maven e Java instalados, se possível
# Por exemplo, usar uma imagem oficial do Maven que já vem com Maven e OpenJDK instalados
FROM ubuntu:latest as build
# Guilherme
LABEL authors="Guilherme G2"

# Definir o diretório de trabalho no container
WORKDIR /app

# Primeiro copie o pom.xml para aproveitar o cache de camadas Docker se o pom.xml não mudar
COPY pom.xml .

# Copiar o diretório src completo para o container
COPY src src

# Executar Maven para construir o aplicativo, pulando testes
RUN mvn clean install

# Imagem final baseada no OpenJDK 21
FROM openjdk:21-jdk-slim

# Expõe a porta que o aplicativo usa
EXPOSE 8080

# Copiar o arquivo jar do estágio de construção para o estágio final
COPY --from=build /app/target/*.jar app.jar

# Comando para executar o aplicativo
ENTRYPOINT ["java", "-jar", "app.jar"]
