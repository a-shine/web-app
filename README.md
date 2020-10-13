# General Purpose Web App Template
## Architecture

Solution **Stack** = set of software subsystems or components needed to create a complete platform.

### What is a DAP Stack Application?

It is an alternative stack to the MEAN stack for Full-stack web app development compromised of 3 component subsystems: **D**jango, **A**ngular & **P**ostgreSQL. Angular is used for the front-end (client side), Django is used as a back-end API (using the Django Rest Framework library) and PostreSQL as a database solution.

DAP is a powerful stack, as Django provides a robust back-end with a huge set of functionality that is well documented in addition to working well with PosgreSQL and Angular is a very powerful front-end tool.

### Docker-rising the Stack

To simplify the development experience and facilitate pushing to production, the stack is Docker-ised. This allows a developer to easily work on the whole stack on his/her local machine and push to production on a stack that matches the development stack. It can be thought of as a virtual environment for the entire solution.

We need 3 containers in the stack:

- Angular (running on a Node.js base image)
- Django (running on a Python 3 base image)
- PostgreSQL (running on the provided pre-configured image)

## AWS
For this environment we are using several AWS services, these include:
- RDS - to host and manage our Postgresql database
- ECR - for storing container images
- ECS (with Fargate) - to run and manager the containers

As well as all the services that the above depend on.

Fargate is a service that runs on top of ECS that manages the ECS Cluster for you reducing workload and cost.

## Project Structure & Organisation

```
web-app/
	backend/
		backend/ (Django project configuration)
		Dockerfile
		manage.py
		requirements.txt
	frontend/
		src/
			app/
				auth/
				core/
				shared/
			assets/
			environments/
			custom-theme.scss
			index.html
		./dockerignore
		Dockerfile
		package.json
    prod/
		containers/
		infra/
		scripts/
	.editorconfig
	.gitignore
	docker-compose.yml
	README.md
```

### Angular Organisation Philosophy

* Modules are a great way to organise an application and extend it with capabilities from external libraries.
* NgModules consolidate components, directives, and pipes into cohesive blocks of functionality, each focused on a feature area, application business domain, workflow, or common collection of utilities.
* Modules can also add services to the application. Such services might be internally developed, like something you'd develop yourself or come from outside sources, such as the Angular router and HTTP client.
* Modules can be loaded eagerly when the application starts or lazy loaded asynchronously by the router.
* The root module is all you need in a simple application with a few components. As the app grows, you refactor the root module into feature modules that represent collections of related functionality. You then import these modules into the root module.
* Feature modules are NgModules for the purpose of organising code.
* A feature module is an organisational best practice, as opposed to a concept of the core Angular API. A feature module delivers a cohesive set of functionality focused on a specific application need such as a user workflow, routing, or forms. While you can do everything within the root module, feature modules help you partition the app into focused areas. A feature module collaborates with the root module and with other modules through the services it provides and the components, directives, and pipes that it shares.
* The declarations array in a module is available for you to add declarables, which are components, directives, and pipes that belong exclusively to this particular module. 
* To incorporate the feature module into your app, you have to let the root module, app.module.ts, know about it. To import it into the AppModule, add it to the imports in app.module.ts and to the imports array.
* Now the AppModule knows about the feature module. If you were to add any service providers to the feature module, AppModule would know about those too, as would any other feature modules. However, NgModules don’t expose their components. (Abstraction)
* By default, NgModules are eagerly loaded, which means that as soon as the app loads, so do all the NgModules, whether or not they are immediately necessary. For large apps with lots of routes, consider lazy loading—a design pattern that loads NgModules as needed. Lazy loading helps keep initial bundle sizes smaller, which in turn helps decrease load times.
  https://angular.io/guide/lazy-loading-ngmodules
* Creating shared modules allows you to organise and streamline your code. You can put commonly used directives, pipes, and components into one module and then import just that module wherever you need it in other parts of your app.
  https://angular.io/guide/sharing-ngmodules

#### Focused View on the Angular project structure

```
app/ (module)
	auth/ (module)
		login/ (component)
		logout/ (component)
		register/ (component)
		auth-guard.service.ts (service)
		auth.service.ts (service)
		auth.module.ts
	core/ (module)
		core.module.ts
	shared/ (module)
		_interfaces/
	app-rounting.module.ts
	app.component.html
	app.module.ts
```

## Workflow

### Getting up and running

1. Clone repository or use as template in Github.

```git clone https://github.com/a-shine/web-app.git```

1. In the directory edit the `project.env` by setting appropriate values.

1. Create a `prod.env` (no need to create a `dev.env` as dummy/correct values are already set)

1. Set the desired `prod.env` variables from this template.
```
# Database
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
DB_PORT=

# Backend
SECRET_KEY=

# Frontend
API_ENDPOINT=

# Infrastructure
AWS_REGION=
AWS_ACCOUNT_ID=
```

1. With `aws-cli` and `ecs-cli` installed, authenticate, using `aws configure` in the command line or by copying auth credentials to the local `~/.aws/credentials` file.

1. Upload container images to AWS ECR with:
```
./prod/scripts/create-ecr-repos.sh
```

1. Get AWS infrastructure up and running with:
```
./prod/scripts/create-infra.sh
```

That's it, you have a full development to production workflow. You can work on the web app locally and when finished you can push to an already live production stack.

### Local Development

In the project repository run `docker-compose up`. This command orchestrates the startup of each service in the stack configures the network so they can communicate.

<span style='color:orange'>WARNING:</span> On first run, the image for each service is built because they do not already exist on the system. To rebuild the images you must use `docker-compose build` or `docker-compose up --build`.

To exit out of the container shell use `ctrl+c`

You start with a blank database. Populate as you wish. The database is not a mounted volume so if you run `docker-compose down` the database data will disappear between sessions.

#### Making changes

The `docker-compose run` command is used to run commands directly on the container (think of it like a VM).

By running: `docker-compose run <name of service> bash` you access the Bach terminal of the container.

To exit the Bach terminal type: `exit`.

**`backend` (Django) service**

Installing Python libraries:
1. Add the the library name with the desired version range in the `backend/requirements.txt`
1. `docker-compose down`
1. `docker-compose build`
1. `docker-compose up`

Running Django commands:
1. `docker-compose run backend bash`
1. Run any Django command as you normally would
1. Exit by running `exit` command

You can create a Django Admin user:
1. `docker-compose run backend python manage.py migrate`
1. `docker-compose run backend python manage.py createsuperuser` - and enter credentials
1. Exit by running `exit` command

**`frontend` (Angular/Node) service**

Installing `npm`/`ng` packages:
1. `docker-compose run frontend bash`
1. `npm install <package>` or `ng <command>`
1. Exit by running `exit` command
1. `docker-compose down`
1. `docker-compose build`
1. `docker-compose up`

Creating a new module:

Creating a new component:

<span style='color:orange'>WARNING:</span>  You may experience some permission issues when editing file on your local machine (because the file were created `ng g <component/module/...>` in the container. 
To solve this run: `sudo chown -R $USER:$USER .` on the local machine from the repository.

### Setting up production

Pre-requisites: 
* Install aws-cli
* Authenticate aws-cli

New New Workdflow
1. Set values in create-ecr-repos and update-ecr-values
Upload images to ECR
1. from `/prod` dir run script to create ECR Registries
`./scripts/create-ecr-repos.sh`
2. from `/prod` dir build and push them with the following script
`./scripts/update-ecr-repos.sh`
1. Upload iam.yml to AWS stack online
`aws cloudformation create-stack --stack-name ecsIAM --template-body file://$PWD/iam.yml --capabilities CAPABILITY_IAM --region <REGION>`
1. Upload infra.yml and add values indicated to AWS Stack online (don't forget to add :latest tag to images)
1. Because Angular is client side - it is not possible to dynamically set the APIUrl after you build the image so you will need to manually add the prod api url once it comes into existance during the cloudformation creation 
	1. Once the whole infrastrastructure is up and running copy the Backend Service DNS Name and paste it into the frontend `environment.prod.ts` file (adding `http://` to the beggining
	1. then update the image: `./script/update-ecr-image.sh` 
	1. restart the frontend service: <FOLLOW INSTRUCTIONS in Pushing to production (below), update service, frontend >


**Updating Stack:**
`aws cloudformation update-stack --stackname <VALUE> --template-body <VALUE>` or from the AWS Web Interface

### Pusing to production
1. Authenticate with the aws-cli.
1. `cd prod/` directory (having to actively move into the `prod/` directory is a security measure to prevent accidental pushing updates - the ECR Repositories can only be updated from within the `prod/` directory).
1. from within the prod dir () Update images `./scripts/update-ecr-repos.sh`
1. Update service:
	* backend: 
		1. `aws ecs update-service --cluster <CLUSTER> --service backend-service --force-new-deployment --region <REGION> --desired-count 2`
		1. `./scripts/stop-old-service.sh <CLUSTER> <REGION> backend-service` - Stops old tasks, which will then be replaced by new updated tasks where the image will be reassede and updated
	* frontend:
		1. `aws ecs update-service --cluster <CLUSTER> --service frontend-service --force-new-deployment --region <REGION> --desired-count 2`
		1. `./scripts/stop-old-service.sh <CLUSTER> <REGION> frontend-service` - Stops old tasks, which will then be replaced by new updated tasks where the image will be reassede and updated

To scale up you can increase the desired count and the load balancer while balance between all the different tasks. This can also be done in an automated fashion using Cloud Watch (see Service Auto Scalling documentation)

### Notes
Added PWA compatibility: https://medium.com/poka-techblog/turn-your-angular-app-into-a-pwa-in-4-easy-steps-543510a9b626