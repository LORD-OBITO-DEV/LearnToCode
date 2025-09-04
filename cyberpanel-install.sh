#!/bin/bash
# Mise à jour du système
apt update && apt upgrade -y
apt install -y wget
# Télécharger et lancer l'installation officielle
wget http://cyberpanel.net/install.sh
chmod +x install.sh
bash install.sh
echo "✅ CyberPanel installé"
