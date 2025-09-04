#!/bin/bash
# Dépendances
apt update && apt upgrade -y
apt install -y curl unzip tar wget
# Installer Wings
curl -Lo wings https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_amd64
chmod +x wings
mv wings /usr/local/bin/wings
# Créer dossier Wings
mkdir -p /etc/pterodactyl
echo "✅ Pterodactyl Node (Wings) installé"
