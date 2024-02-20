FROM php:8.2.12-fpm

ARG user=www
ARG uid=1000
ARG gid=1000

RUN groupadd -g $gid $user && \
    useradd -u $uid -g $gid -m $user
USER $user

RUN apt-get update && apt-get install -y git \
	libzip-dev \
	curl \
	libpq-dev \
	libpng-dev \
	zip \
	unzip

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_pgsql pgsql zip bcmath gd



WORKDIR /var/www/html

