#!/bin/bash
# set -e

# if [ -n "${WAIT_FOR_IT}" ]; then
#   wait-for-it.sh mysql:3306
# fi

echo "running migrations"
python3 manage.py migrate

echo "starting $@"
exec "$@"