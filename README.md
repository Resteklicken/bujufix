# Vue.js on Render

This is a minimal Vue.js project bootstrapped with [vue-cli](https://cli.vuejs.org/guide/creating-a-project.html).

The sample app is deployed on Render at https://vue.onrender.com.

## Deployment

Alle Docker Dateien müssen in das root-Verzeichnis des Vue Projektes kopiert werden.  
Dann kann in diesem Verzeichnis mit
```  
docker-compose up --build   
```  
die App gebaut und auf localhost:8080 bereitgestellt oder mit
``` 
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```  
die Entwicklungsversion gestartet und auf localhost:8080 mit Hot Reloading genutzt werden.


## Datenbank

Login über Adminer mit
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

---