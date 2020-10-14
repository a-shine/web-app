#!/usr/bin/env bash

AWS_PROFILE=default
AWS_REGION=<REGION>
ECR_PREFIX=<ECR_PREFIX>

containers=(backend-python-server backend-web-server frontend-web-server)
for container in "${containers[@]}"
do
aws --profile $AWS_PROFILE ecr create-repository --repository-name $ECR_PREFIX/$container --region $AWS_REGION
done
