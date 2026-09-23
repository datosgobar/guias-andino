#!/usr/bin/env bash
# Comprueba que el stack de producción esté sano.
# Uso: ./verificar-stack.sh [URL]   (default https://localhost:8443)
# Correr desde la raíz de portal-andino-v2.
set -u
URL="${1:-https://localhost:8443}"
falla=0

ok()  { printf '  \033[32mOK\033[0m   %s\n' "$1"; }
mal() { printf '  \033[31mFALLA\033[0m %s\n' "$1"; falla=1; }

echo "Contenedores"
for s in nginx ckan ckan-worker db solr redis datapusher; do
  estado=$(docker compose ps --format '{{.Health}}{{.State}}' "$s" 2>/dev/null)
  case "$estado" in
    healthy*|running) ok "$s ($estado)" ;;
    *) mal "$s (${estado:-no existe})" ;;
  esac
done

echo "Endpoints"
for ruta in / /dataset /organization /api/action/status_show; do
  code=$(curl -ks -o /dev/null -w '%{http_code}' "$URL$ruta")
  [ "$code" = 200 ] && ok "$ruta" || mal "$ruta ($code)"
done

if docker compose exec -T ckan sh -c 'echo "$CKAN__PLUGINS"' | grep -qw harvest; then
  echo "Harvester"
  [ "$(curl -ks -o /dev/null -w '%{http_code}' "$URL/harvest")" = 200 ] && ok "/harvest" || mal "/harvest"
  for c in gather fetch; do
    docker compose exec -T ckan-worker supervisorctl status "ckan_${c}_consumer:*" | grep -q RUNNING \
      && ok "${c}-consumer" || mal "${c}-consumer"
  done
fi

exit $falla
