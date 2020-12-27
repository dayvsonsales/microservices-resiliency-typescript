echo "Building Eureka Service using Maven";
cd eureka-server && mvn clean install && cd ..
echo "Finished Eureka build";

echo "Build Zuul Service using Maven";
cd zuul-server && mvn clean install && cd ..;
echo "Finished Zuul build";

echo "Executing docker-compose up command";
docker-compose up --build

echo "Success!";
