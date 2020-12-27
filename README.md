# Playlists suggestions

This a RESTful API that receive as parameter either city name or lat long coordinates and returns a playlist suggestion according to the current temperature.  

It's based on iFood backend challenge and makes use of SOLID, DDD, KISS, DRY, and the Circuit Breaker pattern.

This project uses a microservice architecture with Service Registry, Self-registration, and API Gateway patterns (with Netflix Eureka and Zuul Proxy projects).

## Technologies

* Typescript
* Express
* Redis
* Spotify Web API
* Open Weather Maps API
* Opossum Circuit Breaker
* Netflix Eureka
* Zuul Proxy

## Using

* Run build_and_start.sh. 
* Go to http://localhost:8761 to see Eureka server running.   
* The zuul server is running in port 8762. 
* The http://localhost:3333 is the entry point of API, but you should use the zuul proxy to load balance the request to api
* Send a GET request to http://localhost:8762/api/playlists/recommendation with city or (lat, long) as query params

