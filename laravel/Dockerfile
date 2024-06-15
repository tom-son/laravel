FROM --platform=linux/arm64 php:8.3.6-fpm-bullseye

RUN chown -R www-data:www-data /var/www/html

#COPY --chown=www-data:www-data laravel/ /var/www/html/
COPY --chown=www-data:www-data . /var/www/html/
