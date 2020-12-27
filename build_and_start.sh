echo "Building Eureka Service using Maven";
cd eurekaservice && mvn clean install && cd ..
echo "Finished Eureka build";

echo "Executing docker-compose up command";
docker-compose up

echo "Sucess!";