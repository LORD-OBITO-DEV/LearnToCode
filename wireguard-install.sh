#!/bin/bash
apt update && apt upgrade -y
apt install -y wireguard qrencode
echo "✅ Wireguard installé"
