FROM php:8.1-apache

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y zip unzip libpq-dev zlib1g-dev libpng-dev libzip-dev gnupg

#PHP Extension
RUN docker-php-ext-install zip
RUN docker-php-ext-install gd
RUN docker-php-ext-install bcmath

#Install XDebug
RUN pecl install xdebug && docker-php-ext-enable xdebug
RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_autostart=off" >> /usr/local/etc/php/conf.d/xdebug.ini

#Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN php -r "unlink('composer-setup.php');"

#Set working directory
WORKDIR /var/www/html
RUN mkdir -p /var/www/html/admin
RUN mkdir -p /var/www/html/admin/uploads

COPY ./.env ./admin
COPY ./composer.json ./admin

#APACHE Configuration
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html