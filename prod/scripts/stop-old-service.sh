#!/usr/bin/env bash

OLD_TASK_IDS=$(aws ecs list-tasks --cluster $1 --desired-status RUNNING --region $2 --service $3 | egrep "task/" | sed -E "s/.*task\/(.*)\"/\1/" | sed -z 's/\n/ /g')
IFS=', ' read -r -a array <<< "$OLD_TASK_IDS"
for element in "${array[@]}"
do
    echo "$(aws ecs stop-task --cluster $1 --task ${element} --region $2)"
done