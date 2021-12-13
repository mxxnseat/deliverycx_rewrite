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
docker rmi -f $(docker images -a -q)
```

```
Запустить айко:
docker-compose -f ./docker-compose.iiko.yml up --build
```

P.S
Все ендпоинты находятся по пути http://localhost/api/[endpoint]
