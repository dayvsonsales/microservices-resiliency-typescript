FROM openjdk:8-jdk-alpine

ADD target/zuul-server*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]

EXPOSE 8762