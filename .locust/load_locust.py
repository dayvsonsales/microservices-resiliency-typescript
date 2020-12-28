from locust import task
from locust.contrib.fasthttp import FastHttpUser

from random import randint

class PlaylistRecommendation(FastHttpUser):    
    max_wait = 0
    min_wait = 0
    network_timeout = 1000
    connection_timeout = 1000

    @task
    def valid_cities(self):
        valid_cities = ["Maceio", "Porto Alegre", "Sao Paulo", "Recife", "Salvador"]
        city = valid_cities[randint(0, len(valid_cities) - 1)]
        self.client.get(f"/playlists/recommendation?city={city}")
        
