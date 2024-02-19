FROM php:8.2.12-fpm

ARG user=user
ARG uid=1000

RUN apt-get update && apt-get install -y git \
	libzip-dev \
	curl \
	libpq-dev \
	libpng-dev \
	zip \
	unzip

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_pgsql pgsql zip bcmath gd

#RUN useradd -G www-data,root -u $uid -d /home/$user $user
#RUN mkdir -p /home/$user/.composer && \
#	chown -R $user:$user /home/$user

WORKDIR /var/www/html
#USER $user
