FROM php:8.1-fpm
#8.2から8.1に変更
#COPY php.ini /usr/local/etc/php/ 左記消去(COPYは下に新たに記載)

RUN apt-get update \
  && apt-get install -y zlib1g-dev mariadb-client vim libzip-dev \
  && docker-php-ext-install zip pdo_mysql

#Composer install
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

COPY ./docker/php/php.ini /usr/local/etc/php/8.1/php.ini
#find / -name php.ini の結果、php/8.1/php.iniに変更

COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER 1

ENV COMPOSER_HOME /composer

ENV PATH $PATH:/composer/vendor/bin


WORKDIR /var/www

RUN composer global require "laravel/installer"


#FROM イメージの指定
#RUN 実行
#COPY ファイルのコピー
#ENV 環境変数の指定