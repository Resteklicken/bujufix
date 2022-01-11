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