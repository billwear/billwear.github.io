**wx** is a short but structured weather pull from `wttr.in`.

it produces output similar to this:

```
Sunny +93°F; +107°F; 62%; ↑9mph 1011hPa; 0.00 in; uv: 2
Dawn: 06:12:54 Sunrise: 06:38:49 Zenith: 12:56:47 Sunset: 19:15:02 Dusk: 19:40:54
```

copy it to `/usr/local/bin` so it can run everywhere.

here's the ~~code~~ script:

```
#!/bin/zsh

curl "wttr.in?format=%C+%t;+%f;+%h;+%w+%P;+%p;%20uv:+%u\nDawn:+%D%20Sunrise:+%S%20Zenith:+%z%20Sunset:+%s%20Dusk:+%d\n" 2>/dev/null
```

mine runs just fine using `ip geo-lookup > geoip database`, but that's weak. you might try using your city+state to get sensible results:

```
curl "wttr.in/Necaise+MS?...."
```

you might also have to pick a nearby city if `wttr.in` can't find you. exercise left to the reader.

<small>*This is free and unencumbered software released into the public domain.
For more information, please refer to <https://unlicense.org/>.*</small>

`wx` belongs to somebody else. check their license for yourself.

