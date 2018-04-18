#!/bin/bash
cat .env-tmpl \
  | sed "s/__GOOGLE_API_KEY__/$GOOGLE_API_KEY/" \
  | sed "s/__GOOGLE_AUTH_CLIENTID__/$GOOGLE_AUTH_CLIENTID/" \
  | sed "s/__APP_API_BASE__/$APP_API_BASE/" \
  > .env
