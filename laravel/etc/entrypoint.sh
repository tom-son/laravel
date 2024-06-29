#!/bin/sh
set -e

# run database migrations if sqlite database exist otherwise it'll create the sqlite database and migrate
php artisan migrate --force

# Since we overrode the docker ENTRYPOINT and CMD, we run it here
/usr/local/bin/docker-php-entrypoint php-fpm

exec "$@"
