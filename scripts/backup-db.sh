#!/usr/bin/env bash
# Vuelca las bases de CKAN y del datastore a ./backups/<fecha>/.
# Correr desde la raíz de portal-andino-v2.
set -euo pipefail

destino="backups/$(date +%Y%m%d-%H%M)"
mkdir -p "$destino"

# Los nombres se leen del entorno del contenedor db, no del .env:
# el .env tiene líneas con espacios que bash no puede cargar con source.
for var in CKAN_DB DATASTORE_DB; do
  base=$(docker compose exec -T db printenv "$var")
  docker compose exec -T db sh -c "pg_dump -U \"\$POSTGRES_USER\" -Fc $base" > "$destino/$base.dump"
  echo "$destino/$base.dump"
done
# No incluye el volumen ckan_storage (archivos subidos), que se resguarda aparte.
