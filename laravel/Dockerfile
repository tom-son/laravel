FROM --platform=linux/arm64 php:8.3.6-fpm-bullseye

RUN chown -R www-data:www-data /var/www/html

#COPY --chown=www-data:www-data laravel/ /var/www/html/
COPY --chown=www-data:www-data . /var/www/html/

# run database migrations if sqlite database exist otherwise it'll create the sqlite database and migrate
RUN php artisan migrate --force
