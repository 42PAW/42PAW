#!/bin/bash
USER_HOME=/home/ec2-user
PROJECT_NAME=pet
SPRING_BOOT_PROCESS_ID= $(lsof | grep '.jar' | awk '{print $2}' | head -n 1)

kill $SPRING_BOOT_PROCESS_ID
java -jar -Dspring.profiles.active=prod ./deploy/pet-*.jar &