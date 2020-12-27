FROM openjdk:8-jdk-alpine

ADD target/service-registration-and-discovery-service-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Expose the port
EXPOSE 8761