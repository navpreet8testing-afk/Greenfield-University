#!/bin/bash
cd /home/z/my-project
while true; do
  npx next dev -p 3000 2>&1 | tee dev.log
  echo "Server exited, restarting in 2s..." >> server-loop.log
  sleep 2
done
