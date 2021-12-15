export function makeImageHelper(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

{
  /*
fail

{
  "path": "/movies/:movieId",
  "url": "/movies/101",
  "isExact": true,
  "params": {
      "movieId": "101"
  }
}
{
  "adult": false,
  "backdrop_path": "/k3lx69sRhlFZOQBPDRc52dZC4tn.jpg",
  "genre_ids": [
      12,
      28,
      878
  ],
  "id": 101299,
  "title": "The Hunger Games: Catching Fire",
  "original_language": "en",
  "original_title": "The Hunger Games: Catching Fire",
  "overview": "Katniss Everdeen has returned home safe after winning the 74th Annual Hunger Games along with fellow tribute Peeta Mellark. Winning means that they must turn around and leave their family and close friends, embarking on a \"Victor's Tour\" of the districts. Along the way Katniss senses that a rebellion is simmering, but the Capitol is still very much in control as President Snow prepares the 75th Annual Hunger Games (The Quarter Quell) - a competition that could change Panem forever.",
  "popularity": 49.966,
  "poster_path": "/xLOTc1DEMJseC2rGCk88Bjggg06.jpg",
  "release_date": "2013-11-15",
  "video": false,
  "vote_average": 7.425,
  "vote_count": 14465
}

{
    "adult": false,
    "backdrop_path": "/yWaUueQsfojYlA7NQowbcKlj2BE.jpg",
    "genre_ids": [
        28,
        18
    ],
    "id": 94380,
    "title": "Bad Ass",
    "original_language": "en",
    "original_title": "Bad Ass",
    "overview": "Decorated Vietnam hero, Frank Vega returns home only to get shunned by society leaving him without a job or his high school sweetheart. It's not until forty years later when an incident on a commuter bus makes him a local hero where he's suddenly celebrated once again. But his good fortune suddenly turns for the worse when his best friend is murdered and the police aren't doing anything about it.",
    "popularity": 14.641,
    "poster_path": "/d3b6f3OBRKTN6sOULUCQGNlIfBp.jpg",
    "release_date": "2012-04-12",
    "video": false,
    "vote_average": 5.721,
    "vote_count": 298
}
success
{
    "adult": false,
    "backdrop_path": "/qi5uMgCnv8mQobfzlh75BiVRjhc.jpg",
    "genre_ids": [
        80,
        18,
        28,
        53
    ],
    "id": 82682,
    "title": "Gangster Squad",
    "original_language": "en",
    "original_title": "Gangster Squad",
    "overview": "Los Angeles, 1949. Ruthless, Brooklyn-born mob king Mickey Cohen runs the show in this town, reaping the ill-gotten gains from the drugs, the guns, the prostitutes and — if he has his way — every wire bet placed west of Chicago. And he does it all with the protection of not only his own paid goons, but also the police and the politicians who are under his control. It’s enough to intimidate even the bravest, street-hardened cop… except, perhaps, for the small, secret crew of LAPD outsiders led by Sgt. John O’Mara and Jerry Wooters who come together to try to tear Cohen’s world apart.",
    "popularity": 14.12,
    "poster_path": "/1eW9kFSuTQfyMvZKtxlnwKRBvI.jpg",
    "release_date": "2013-01-10",
    "video": false,
    "vote_average": 6.327,
    "vote_count": 3346
}

{
    "adult": false,
    "backdrop_path": "/ohEJVI2cZ4TkPoRhIUTNijIo1sv.jpg",
    "genre_ids": [
        18,
        10749
    ],
    "id": 82023,
    "title": "Hotel Desire",
    "original_language": "de",
    "original_title": "Hotel Desire",
    "overview": "The story is about a woman who lives alone. Her son went to his father in another place. The first character is a maid in a hotel to serve the people. First, she got some serious problems in her job. She couldn't take care of both, her job and her son. Her supervisor solved some her problems because he was a good man and may like her. She was not rich and proud, she listened her colleague advice about sex because she didn't have sex for about seven years. She went accidentally to a room who a blind man is living. He was naked after a shower and he talked on his phone. after that, he looked for his socks but he touched the maid body that listened his conversation and be completely quiet. then they started to do sex.",
    "popularity": 19.027,
    "poster_path": "/nHVz2ME3HXn6vS7fHfugSudEsWX.jpg",
    "release_date": "2011-12-07",
    "video": false,
    "vote_average": 5.811,
    "vote_count": 66
}
{
    "path": "/movies/:movieId",
    "url": "/movies/82023",
    "isExact": true,
    "params": {
        "movieId": "82023"
    }
}*/
}

{
  /*
{"id":101299,"results":[{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 2 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"7MpfnxMb9zY","published_at":"2013-11-20 08:00:00 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008331"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 3 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"ItHIt4k8QPE","published_at":"2013-11-19 08:00:01 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008332"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 4 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"H12ZA6qFgx4","published_at":"2013-11-19 08:00:01 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008333"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 5 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"k56PXfY-3bw","published_at":"2013-11-19 08:00:01 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008334"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 6 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"igV2CIJlDK4","published_at":"2013-11-19 08:00:01 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008335"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 9 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"HhpgwBDNJRk","published_at":"2013-11-19 08:00:01 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008338"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 10 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"1mzOXTSLmak","published_at":"2013-11-19 08:00:01 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008339"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 11 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"I4DW-ieDOZY","published_at":"2013-11-19 08:00:01 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a368544800833a"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 1 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"56tXBExD-c4","published_at":"2013-11-19 08:00:00 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008330"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 7 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"9-yP94qQPvU","published_at":"2013-11-19 08:00:00 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008336"},{"iso_639_1":"en","iso_3166_1":"US","name":"DISTRICT 8 - A Message From The Capitol - The Hunger Games: Catching Fire (2013)","key":"0ENt0SAxmQw","published_at":"2013-11-19 08:00:00 UTC","site":"YouTube","size":720,"type":"Featurette","official":false,"id":"533ec6dcc3a3685448008337"},{"iso_639_1":"en","iso_3166_1":"US","name":"The Hunger Games: Catching Fire - EXCLUSIVE Final Trailer","key":"zoKj7TdJk98","published_at":"2013-10-28 01:58:16 UTC","site":"YouTube","size":1080,"type":"Trailer","official":true,"id":"533ec6dcc3a368544800832f"},{"iso_639_1":"en","iso_3166_1":"US","name":"The Hunger Games: Catching Fire - Official Trailer","key":"MkvUNfySGQU","published_at":"2013-07-21 21:00:07 UTC","site":"YouTube","size":1080,"type":"Trailer","official":true,"id":"533ec6dcc3a368544800832e"},{"iso_639_1":"en","iso_3166_1":"US","name":"The Hunger Games: Catching Fire - Exclusive Teaser Trailer","key":"jyPnQw_Lqds","published_at":"2013-04-15 03:07:17 UTC","site":"YouTube","size":1080,"type":"Trailer","official":true,"id":"533ec6dcc3a368544800832d"}]}
*/
}
