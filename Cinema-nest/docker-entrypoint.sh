#!/usr/bin/env sh
set -e

npx prisma migrate deploy

exec node dist/main.js
