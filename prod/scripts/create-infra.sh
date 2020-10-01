#!/usr/bin/env bash

aws cloudformation create-stack --stack-name projectnVPC --template-body file://$PWD/vpc.yml