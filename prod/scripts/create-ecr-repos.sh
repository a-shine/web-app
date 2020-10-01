#!/usr/bin/env bash

AWS_PROFILE=default
AWS_REGION=us-east-1
ECR_PREFIX=project-n

containers=(backend-python-server backend-web-server frontend-web-server)
for container in "${containers[@]}"
do
aws --profile $AWS_PROFILE ecr create-repository --repository-name $ECR_PREFIX/$container --region $AWS_REGION
done
