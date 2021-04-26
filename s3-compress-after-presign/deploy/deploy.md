yc apigatewayv2 get-apis

https://api.cloud.yandex.net/endpoints

# Создание профиля

### Создать токен
https://oauth.yandex.ru/verification_code#access_token

yc init
yc config profile create as006

yc config set folder-id b1gt***************
yc config set --token AQAAA*************

yc config set cloud-id b1gc**************
yc config profile get as006

### установить парсер json
sudo apt-get install jq

sudo adduser gayrat

# Запускать из корня
./deploy/first-setup-func.sh
./deploy/deploy.sh


