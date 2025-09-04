#!/bin/bash
# Mise à jour du système
apt update && apt upgrade -y
# Dépendances
apt install -y software-properties-common curl apt-transport-https ca-certificates gnupg lsb-release unzip tar git sudo
# Docker requis pour Wings
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
# NodeJS requis pour Wings
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
# Composer pour Panel
apt install -y php-cli php-mbstring php-bcmath php-curl php-xml php-gd php-zip php-mysql
apt install -y composer mariadb-server
# Création base de données Panel
mysql -e "CREATE DATABASE pterodactyl;"
# Téléchargement Panel
cd /var/www/
git clone https://github.com/pterodactyl/panel.git pterodactyl
cd pterodactyl
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
chown -R www-data:www-data /var/www/pterodactyl
echo "✅ Pterodactyl Panel installé"
