import json
import yaml
import string
import random

print("Project Name: ")
project_name=input()

print("Project ID: ")
project_id=input()

print("Django production admin user: ")
dj_admin_user=input()

print("AWS Region: ")
aws_region=input()

print("AWS Account ID: ")
aws_id=input()


prod_gen = {'PROJECT_NAME' : 'null', 'PROJECT_ID' : 'null', 'API_ENDPOINT' : 'null', 'DB_ENDPOINT' : 'null', 
                'DB_NAME' : 'null', 'DB_USER' : 'null', 'DB_PASS' : 'null', 'DJANGO_SECRET' : 'null', 'DJ_ADMIN_USER':'null', 
                'DJ_ADMIN_PASSWORD' : 'null', 'AWS_REGION':'null', 'AWS_ACCOUNT_ID':'null'}
    

def generator(size, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def dj_key_gen():
    return "".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)])


db_user = 'u' + generator(11)
db_pass = generator(24)
dj_admin_pass = generator(24)
dj_key = dj_key_gen()

prod_gen["PROJECT_NAME"] = project_name
prod_gen["PROJECT_ID"] = project_id
prod_gen["DB_NAME"] = project_id + "_prod"
prod_gen["DB_USER"] = db_user
prod_gen["DB_PASS"] = db_pass
prod_gen["DJANGO_SECRET"] = dj_key
prod_gen["DJ_ADMIN_USER"] = dj_admin_user
prod_gen["DJ_ADMIN_PASSWORD"] = dj_admin_pass
prod_gen["AWS_REGION"] = aws_region
prod_gen["AWS_ACCOUNT_ID"] = aws_id


# Configuring vpc.json
with open('./prod/infra/vpc.json', "r") as file:
    a = json.load(file)

a["Outputs"]["VPC"]["Export"]["Name"] = project_id + "-vpc"
a["Outputs"]["Subnet1"]["Export"]["Name"] = project_id + "-subnet1"
a["Outputs"]["Subnet2"]["Export"]["Name"] = project_id + "-subnet2"

with open('./prod/infra/vpc.json', "w") as file:
    json.dump(a, file)

# Configuring cluster.json
with open('./prod/infra/cluster.json', "r") as file:
    a = json.load(file)

a["Resources"]["ECSCluster"]["Properties"]["ClusterName"] = project_id
a["Resources"]["CloudWatchLogsGroup"]["Properties"]["LogGroupName"] = project_id
a["Outputs"]["Cluster"]["Export"]["Name"] = project_id + "-cluster"

with open('./prod/infra/cluster.json', "w") as file:
    json.dump(a, file)

# Configuring database.json
with open('./prod/infra/database.json', "r") as file:
    a = json.load(file)

a["Resources"]["Database"]["Properties"]["DBName"] = project_id + "_prod"
a["Resources"]["Database"]["Properties"]["MasterUsername"] = db_user
a["Resources"]["Database"]["Properties"]["MasterUserPassword"] = db_pass
a["Resources"]["DbSubnetGroup"]["Properties"]["DBSubnetGroupDescription"] = project_id + " - Subnet Group"
a["Resources"]["DbSubnetGroup"]["Properties"]["SubnetIds"][0]['Fn::ImportValue'] = project_id + "-subnet1"
a["Resources"]["DbSubnetGroup"]["Properties"]["SubnetIds"][1]['Fn::ImportValue'] = project_id + "-subnet2"
a["Resources"]["SecurityGroup"]["Properties"]["VpcId"]["Fn::ImportValue"] = project_id + "-vpc"
a["Outputs"]["databaseEndpoint"]["Export"]["Name"] = project_id + "-db"

with open('./prod/infra/database.json', "w") as file:
    json.dump(a, file)

# Configuring backend-lb-sg.json
with open('./prod/infra/backend-lb-sg.json', "r") as file:
    a = json.load(file)

a["Resources"]["LoadBalancer"]["Properties"]["Name"] = project_id + "-backend"
a["Resources"]["LoadBalancer"]["Properties"]["Subnets"][0]["Fn::ImportValue"] = project_id + "-subnet1"
a["Resources"]["LoadBalancer"]["Properties"]["Subnets"][1]["Fn::ImportValue"] = project_id + "-subnet1"
a["Resources"]["LoadBalancerSecurityGroup"]["Properties"]["VpcId"]['Fn::ImportValue'] = project_id + "-vpc"
a["Resources"]["DefaultTargetGroup"]["Properties"]["Name"] = project_id + "-backend"
a["Resources"]["DefaultTargetGroup"]["Properties"]["VpcId"]['Fn::ImportValue'] = project_id + "-vpc"
a["Resources"]["ContainerSecurityGroup"]["Properties"]["VpcId"]['Fn::ImportValue'] = project_id + "-vpc"
a["Outputs"]["databaseEndpoint"]["Export"]["Name"] = project_id + "-db"

with open('./prod/infra/backend-lb-sg.json', "w") as file:
    json.dump(a, file)


with open('./prod.yml', 'w') as file:
    prod_gen_list = yaml.dump(prod_gen, file)