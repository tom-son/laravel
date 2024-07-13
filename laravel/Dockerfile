FROM --platform=linux/arm64 php:8.3.6-fpm-bullseye

#COPY --chown=www-data:www-data laravel/ /var/www/html/
COPY --chown=www-data:www-data . /var/www/html/

# TODO Thompson - run compose install in build - exluding vendor?
RUN php artisan test

# https://laravel.com/docs/10.x/configuration#configuration-caching
#RUN php artisan config:cache
#RUN php artisan config:clear
RUN chown -R www-data:www-data /var/www/html

# a+x gives execute permission to everyone
RUN chmod a+x /var/www/html/etc/entrypoint.sh
CMD ["./etc/entrypoint.sh"]
