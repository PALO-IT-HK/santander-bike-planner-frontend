#!/bin/bash
printf "`cat .env-tmpl`" \
  "$GOOGLE_API_KEY" \
  "$GOOGLE_AUTH_CLIENTID" \
  "$APP_API_BASE" \
  > .env
