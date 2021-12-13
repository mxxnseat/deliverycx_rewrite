# Команды для запуска контейнера

```
билдим образы:
docker-compose up --build -d
```

```
в последствии дабы ускорить процесс пускаем все через команду:
docker-compose up -d
```

```
убить все контейнеры:
docker-compose down
```

```
убить все образы:
docker rmi -f $(docker images -a -g)
```

P.S
Все ендпоинты находятся по пути http://localhost/api/[endpoint]
