# Starten der App

## Production

Für einen Production Build müssen die `docker-compose.yml` und `docker-compose.override.yml` in einem Verzeichnis mit folgender Ordnerstruktur liegen:

```
project
│   docker-compose.yml 
│   docker-compose.override.yml    
│
└───proxy
│       nginx_prod.conf
│       
│   
└───db
    │          
    └───secrets
            mariadb_databasename
            mariadb_password
            mariadb_root_password
            mariadb_username

``` 
Die `nginx_prod.conf` ist die nginx Konfiguration für den Reverse Proxy und die Secrets sind die Umgebungsvariablen für die Datenbank (Username, Passwort, Name der Datenbank und Root Passwort).  
Diese können auch in der `docker-compose.override.yml` durch eigene Umgebungsvariablen oder Secret Files ersetzt werden.  
Der restliche Quellcode wird **nicht** benötigt.

Um die App zu starten, benutzt man im Root Verzeichnis
```  
docker-compose up [-d]    
```  
Die App wird mit Hilfe der Images aus der Registry gestartet und das Frontend unter `localhost:8000` bereitgestellt.  
Adminer befindet sich unter `localhost:8000/admin`, ist aber auch über das Frontend zu erreichen. 

## Development

Um die Entwicklungsversion mit Hot Reloading zu nutzen, muss zunächst das git Repo geklont werden.   
Anschließend wird mit 
``` 
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up [-d] [--build] [--force-recreate]
```  
die App gestartet und ist auf `localhost:8000` zu erreichen.  
Adminer befindet sich unter `localhost:8000/admin`, ist aber auch über das Frontend zu erreichen.   
Änderungen am Frontend und Backend werden sofort sichtbar. Verändert man allerdings die package.json oder die Proxy Konfiguration, muss man die Images mit den Flags `--build --force-recreate` beim Starten neu bauen.

---
# Aufbau der App 
Die App startet in fünf Containern:
![Aufbau der App]('Aufbau der App.png' "Aufbau der App")

## Geschlossenes System  
Von den fünf Containern hat nur der NGINX Proxy eine Netzwerkverbindung nach außen. Alle anderen Container außer der MariaDB Container befinden sich in einem internen Docker Netzwerk. 

## Persistenz der Datenbank und netzwerklose Datenbankverbindung

Login über Adminer standardmäßig mit  
``` 
Server: localhost:/var/run/mysqld/mysqld.sock   
Username: awesomeuser oder root
Password: password oder super-secret
Database: bujufixdb
```
Die Verwendung von zwei Named Volumes im Datenbank Service  
```
volumes:
      - db:/var/run/mysqld
      - data:/var/lib/mysql
```
ermöglicht zum einen die netzwerklose Kommunikation zu Adminer und zum Backend über den mysqld Unix socket, zum anderen auch die Persistenz der Daten nach `docker-compose down` und `docker-compose up`.  
Mounted man nur ein  Volume in den socket, können die Services zwar miteinander kommunizieren, die Datenbank ist aber bei jedem Start wieder leer (trotz fehlendem `-v`Flag).  
Durch die fehlende Netzwerkanbindung der Datenbank wird mehr Datensicherheit erreicht.


