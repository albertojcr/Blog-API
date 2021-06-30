# Blog-API

Este repositorio contiene la práctica del blog organizada por capas.

## Instalación


```shell
make start
make phinx_migrate
make phinx_fixtures
```

Una vez instalada la aplicación y descargado y levantados los contenedores docker se puede acceder mediante la siguiente URL:
```
http://localhost:9200/home
```

## PHPMyAdmin
Se puede acceder a la instancia de PHPMyAdmin a través de la siguiente URL
```
http://localhost:9283
user: testuser
password: admin1234
```

## Comandos

### make up
Levanta los contenedores docker

### make down
Detiene los contenedores docker

### make bash
Ejecuta la consola en el contenedor php

