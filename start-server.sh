#!/bin/bash
cd /home/z/my-project
while true; do
  echo "Starting server at $(date)" >> /home/z/my-project/server-loop.log 2>&1
  npx next dev -p 3000 2>&1 | tee /home/z/my-project/dev.log
  echo "Server died at $(date), restarting in 2s..." >> /home/z/my-project/server-loop.log 2>&1
  sleep 2
done