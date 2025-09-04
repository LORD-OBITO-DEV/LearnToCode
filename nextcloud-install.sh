#!/bin/bash
apt update && apt upgrade -y
apt install -y apache2 mariadb-server libapache2-mod-php php php-mysql php-xml php-gd php-curl unzip wget
cd /var/www/
wget https://download.nextcloud.com/server/releases/nextcloud-28.0.0.zip
unzip nextcloud-28.0.0.zip
chown -R www-data:www-data nextcloud
echo "✅ Nextcloud installé"
