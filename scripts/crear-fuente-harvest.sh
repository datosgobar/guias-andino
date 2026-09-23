#!/usr/bin/env bash
# Da de alta una fuente de harvest por API.
# Uso:
#   CKAN_URL=https://datos.ejemplo.gob.ar CKAN_TOKEN=xxx \
#   ./crear-fuente-harvest.sh <name> <url> <source_type> <owner_org> [frequency] [config_json]
# El token se genera en /user/<usuario>/api-tokens con un usuario sysadmin.
set -euo pipefail
: "${CKAN_URL:?Falta CKAN_URL}" "${CKAN_TOKEN:?Falta CKAN_TOKEN}"
[ $# -ge 4 ] || { sed -n 3,6p "$0"; exit 1; }

name=$1 url=$2 tipo=$3 org=$4 freq=${5:-MANUAL} config=${6:-}

# jq arma el JSON para no tener que escapar comillas a mano.
payload=$(jq -n --arg name "$name" --arg url "$url" --arg tipo "$tipo" \
  --arg org "$org" --arg freq "$freq" --arg config "$config" \
  '{name: $name, title: $name, url: $url, source_type: $tipo,
    owner_org: $org, frequency: $freq, config: $config}')

curl -fsS -X POST "$CKAN_URL/api/action/harvest_source_create" \
  -H "Authorization: $CKAN_TOKEN" -H 'Content-Type: application/json' \
  -d "$payload" | jq '.result | {id, name, url, source_type}'
