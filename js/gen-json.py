import requests
from collections import OrderedDict
import json

base_url = 'http://api.bandcamp.com/api/album/2/info?key=brestlingrmogottrafeggja&album_id=';
album_ids = ['1122636432', '1147351318', '116669455']
albums = []

for id in album_ids:
    r = requests.get(base_url + id)
    if r.status_code == 200:
        album = r.json()
        album['small_art_url'] = album['small_art_url'][:-5] + '7.jpg'
        album['large_art_url'] = album['large_art_url'][:-5] + '5.jpg'
        if album['tracks'][-1]['title'].startswith('Album Preview:'):
            del album['tracks'][-1]
        albums.append((id, album))
    else:
        raise Exception('Unable to reach server.')

file = open("albums.json", "w")
file.write(json.dumps(OrderedDict(albums)))
file.close()
