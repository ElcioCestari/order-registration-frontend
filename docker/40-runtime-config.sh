#!/bin/sh
# Lets the same image talk to any API: main.ts reads assets/config.json before bootstrapping.
set -eu
mkdir -p /usr/share/nginx/html/assets
printf '{"apiUrl": "%s"}\n' "${API_URL}" > /usr/share/nginx/html/assets/config.json
echo "runtime config: apiUrl=${API_URL}"
