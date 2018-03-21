#!/bin/bash

WAITFOR=15;
TESTSITE_URL=$1

printf "waiting for $WAITFOR seconds before probing...\n"
sleep $WAITFOR

# Wait for Webdriver to start and ready to serve e2e request
until $(curl --output /dev/null --silent --head --fail http://localhost:4444); do
  if [ $(ps aux| grep java | grep 4444 | wc -l) -ne 1 ]; then
    printf "webdriver is not started\n"
    exit 1
  fi
  printf '.'
  sleep 5
done

printf '\n';
