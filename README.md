# Playlists suggestions

This a RESTful API that receive as parameter either city name or lat long coordinates and returns a playlist suggestion according to the current temperature.  

It's based on iFood backend challenge and makes use of SOLID, DDD, KISS, DRY, and the Circuit Breaker pattern.

## Technologies

* Typescript
* Express
* Redis
* Spotify Web API
* Open Weather Maps API
* Opossum circuit breaker lib
* Netflix Eureka

## Using

* Run build_and_start.sh
* Go to http://localhost:8761 to see Eureka server running
* The http://localhost:3333 is the entry point of API
* Send a GET request to http://localhost:3333/playlists/recommendation with city or (lat, long) as query params

