FROM php:8.1-fpm

# Install dependencies and PHP extensions
RUN apt-get update \
  && apt-get install -y zlib1g-dev mariadb-client vim libzip-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev libmagickwand-dev \
  && docker-php-ext-install zip pdo_mysql \
  && docker-php-ext-install -j$(nproc) iconv exif \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd \
  && pecl install imagick \
  && docker-php-ext-enable imagick \
  # Download and install Composer
  && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
  && php composer-setup.php \
  && php -r "unlink('composer-setup.php');" \
  && mv composer.phar /usr/local/bin/composer \
  && composer global require "laravel/installer" \
  # Clean up
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Copy php.ini
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

# Set Environment Variables
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /composer
ENV PATH $PATH:/composer/vendor/bin

# Set Workdir
WORKDIR /var/www
