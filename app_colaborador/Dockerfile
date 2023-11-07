FROM php:8.1.18-apache-bullseye

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y zip unzip libpq-dev zlib1g-dev libpng-dev libzip-dev gnupg

#PHP Extension
RUN docker-php-ext-install zip
RUN docker-php-ext-install gd
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo_mysql
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install pdo_pgsql pgsql && docker-php-ext-enable pdo_pgsql

#Install XDebug
RUN pecl install xdebug && docker-php-ext-enable xdebug
RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_autostart=off" >> /usr/local/etc/php/conf.d/xdebug.ini

#Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN php -r "unlink('composer-setup.php');"

#Install SqlServer PHP driver
RUN cat /etc/os-release \
    && apt-get update \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get install -y --no-install-recommends apt-transport-https \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get -y --no-install-recommends install unixodbc unixodbc-dev msodbcsql17

#Set working directory
WORKDIR /var/www/html
RUN mkdir -p /var/www/html/colab

#APACHE Configuration
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html