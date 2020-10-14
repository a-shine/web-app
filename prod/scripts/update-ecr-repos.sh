#!/usr/bin/env bash

AWS_REGION=<AWS_REGION>
AWS_ACCOUNT_ID=<AWS_ACCOUNT_ID>
ECR_PREFIX=<ECR_PREFIX>

# add check to make sure it only contimues if login is sucessful
login_status=$(aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com)

if [[ "$login_status" == *"ExpiredTokenException"* ]]; then
  echo "Not authenticated"
  break;
fi

containers=(backend-python-server backend-web-server frontend-web-server)
for container in "${containers[@]}"
do
  docker build -t $ECR_PREFIX/$container -f ./containers/$container/Dockerfile ../
  docker tag $ECR_PREFIX/$container:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_PREFIX/$container:latest
  docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_PREFIX/$container:latest
done
