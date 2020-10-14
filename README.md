# General Purpose Web Application Template

## Information

### Introduction 

The purpose of this project is to create a template that can be used for all sorts of different web projects without the need to develop a whole new workflow. It minimises the setup time and helps you get up and running with a rudimentary Django/Angular/Postgres stack, an authentication system, CI/CD production environment that integrates with AWS and much more... You can start development from the get go and very quickly start using your web app with a pre-configured route to production. This means you can spend time implementing your actual ideas and features, solve innovative solutions and create new products as quickly as possible.

**Key Words:**

- Django
- Django Rest Framework
- Angular & Angular CLI
- Postgres
- Docker/Docker-Compose
- AWS (ECS Fargate)
- Solution Stack
- Development/Production workflow
- Containerisation
- Scaling
- CI/CD

### Architecture

#### Introducing the DAP (or PAD) stack

The DAP stack is an alternative to the commonly used MEAN stack for Full-stack web app development. It consists of 3 component subsystems: **D**jango, **A**ngular & **P**ostgres. 

The Angular framework is used for the front-end (client-side) part of the web application. Django in conjunction with the Django Rest Framework make up the back-end part of the solution and Postgres database technology used.

Angular was chosen as it's a powerful fully featured (albeit heavy) client-side application framework, which is open-source and backed by Google nonetheless. Django is a truly fantastic web framework which has so much business logic already integrated and an active, helpful community. Finally, Postgres was chosen as it integrates extremely well with Django and is quickly becoming an industry open standard for database systems.

#### Docker-rising the stack

To simplify the development experience and facilitate pushing to production, the stack is 'Docker-ised'. This allows developers to work across the entirety of the stack on their local machines and keeps a consistent environment between development and production which reduces the risk of bugs and failures. It can be thought of as a virtual environment for the entire solution.

The stack here consists of:

- Angular (running on a Node image pulled from the Docker Hub)
- Django (running on a Python 3 image pulled from the Docker Hub)
- Postgres (running on a pre-configured image pulled from the Docker Hub)

In development these containers are orchestrated by Docker-Compose and in production by AWS' very own container orchestration technology ECS with Fargate.

#### AWS

It is undeniable that AWS is the biggest and most feature rich hosting platform it also comes with a steep learning curb. So included in the repository are pre-configured CloudFormation files that sets-up the entire infrastructure required to run the stack in production. Fundamentally the app is still made of the same three components (Angular, Django and Postgres) but in production a little more infrastructure is required to robustly orchestrate and serve the app to the client. Some of these services are listed bellow:

- ECR - Used to store and update docker images so they can be pulled for production.
- ECS - AWS' proprietary container orchestration system. ECS is a little complex as it is tightly linked with other AWS services. It runs on top of EC2, and when used in 'Fargate mode' it is fully managed by AWS which simplifies system administration significantly.
- RDS - AWS' Relational Database System that hosts our Postgres database and automatically configures backups.

### Project Structure & Organisation

As you can see in the repository file-system, the project is broken down into 3 main directories: `backend/`, `frontend/` and `prod/`. The  `backend/` and `frontend/`contain all the actual code that will create your web application and determine its function and features and the `prod/` directory contains the files necessary for the app to be pushed to production.

The `docker-compose.yml` file in the root of the repository will be how you mostly interact with the project as a developer. 

### Angular Organisation Philosophy

This is merely a suggestion as to how one might organise the angular file-system.

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

**Focused view on the Angular file-system**

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

### Development

#### Setup

1. Clone repository from GitHub or use as a [use as a template](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

```bash
git clone https://github.com/a-shine/web-app.git
```

That's it, you have a full development workflow with Docker-Compose (see [below](#####Using Docker-Compose)). You can work on the web app locally and easily and continuously push features to production (after having [setup the production workflow](###Production))

#### Active Development

##### Docker-Compose build, up & down

At first, it is necessary for the images for each service to be built (as instructed by the `Dockerfile`) because they do not already exist on the system. In the root of the repository run:

```
docker-compose build
```

This command will have to be run for every subsequent change made to the `Dockerfiles` and when installing new Python (to the back-end) or `npm` packages (to the front-end).

To bring the whole stack to life, run:

```bash
docker-compose up
```

This command orchestrates the startup of each service in the stack and configures a network that allows them to communicate with one another.

To exit out of the container shell use `ctrl+c`.

You start with a blank database. Populate as you wish. If you wish to start afresh on a new database run:

```
docker-compose down
```

*<span style='color:orange'>NOTE:</span> **Data retention**: In development, it is useful to quickly delete a database and start clean when there are data conflicts resulting from tests and developmental changes. Hence the Docker-Compose configuration for the Postgres database is setup to NOT retain data.*

##### Running a container in the terminal

To run commands directly on the container (think of it like a VM or an SSH connection to a machine), run:

````bash
docker-compose run <NAME_OF_SERVICE> bash
````

The NAME_OF_SERVICE can be:

- `db`
- `backend`
- `frontend`

To exit the Bash terminal type: `exit`.

##### `backend` (Django) Modifications

***Creating a Django Admin user:***

1. `docker-compose run backend python manage.py migrate`
1. `docker-compose run backend python manage.py createsuperuser` - and enter credentials

***Installing Python libraries:***

1. Add the the library name with the desired version range in the `backend/requirements.txt`
1. `docker-compose down`
1. `docker-compose build`
1. `docker-compose up`

***Running Django commands:***

1. `docker-compose run backend bash`
1. Run any Django command as you normally would e.g. `python manage.py makemigrations`, `python manage.py migrate`...
1. Exit the Bash terminal by typing: `exit`.

##### `frontend` (Angular) Modifications

***Installing `npm`/`ng` packages:***

1. `docker-compose run frontend bash`
1. `npm install <package>` or `ng <command>`
1. Exit by typing `exit`
1. `docker-compose down`
1. `docker-compose build`
1. `docker-compose up`

***Creating a new module:***

1. `docker-compose run frontend bash`
1. `ng g m <AUTH/CORE/SHARED>/<MODULE_NAME>`
1. Exit by typing `exit`

***Creating a new component:***

1. `docker-compose run frontend bash`
1. `ng g c <AUTH/CORE/SHARED>/<COMPENENT_NAME>`
1. Exit by typing `exit`

*<span style='color:orange'>NOTE:</span> **CLI Component Generation**: The Angular CLI seems to automatically put a component with a matching name with that of the module in the module folder so it is not necessary to write the module folder if it matches the component.*

*<span style='color:red'>WARNING:</span>  You may experience some permission issues when generating Modules and Components as they are generated from within the Docker containers hence they are owned by the Docker container user. To solve, on the local machine (i.e. not from within the Docker container) run the following command from the root of the repository.*

```bash
sudo chown -R $USER:$USER .
```

### Production

#### Pre-requisites

- An [AWS Account](https://aws.amazon.com/)

- The [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed on your local development machine

- The AWS CLI needs to be authenticated either by copying credentials into `~/.aws/credentials` or running:

  ```bash
  aws configure
  ```

#### Setup

1. Enter into the `prod/` directory of the repository.
   
2. Set the <AWS_REGION> and <ECR_PREFIX> in `scripts/create-ecr-repos.sh`.

   * The AWS_REGION can be of choice e.g. us-east-1, us-west-2... It is worth noting that prices vary from region to region. 
   * The ECR_PREFIX should be something recognisable to the specific project (e.g. project-cactus). It allows you to organise your images in AWS ECR from other projects.

3. Create the AWS ECR repositories by running:

   ```bash
   ./scripts/create-ecr-repos.sh
   ```

4. Set the same <AWS_REGION> and <ECR_PREFIX> in `scripts/update-ecr-repos.sh`. In addition, set the <AWS_ACCOUNT_ID>.

   * The AWS_ACCOUNT_ID can be found by going to the AWS ECR web interface and looking at the string of numbers in the URI of the created ECR images.

5. Build and push the images to AWS ECR by running:

   ```bash
   ./scripts/update-ecr-repos.sh
   ```

   *<span style='color:red'>WARNING:</span>  You have to run the `./scripts/update-ecr-repos.sh` script from within  `prod/` as it uses context and relative file paths to build and push the images. Having to actively move into the `prod/` directory when pushing new image is a security measure to prevent accidental pushing unwanted updates hence the ECR images can only be updated from within the `prod/` directory.*

6. Still within the `prod/` directory run: 

   ```bash
   aws cloudformation create-stack --stack-name ecsIAM --template-body file://$PWD/iam.yml --capabilities CAPABILITY_IAM --region <REGION>
   ```

   Make sure to keep <REGION> consistent throughout the setup.

7. Login to the AWS web interface and go to the CloudFormation portal.

   1. Create a new stack.

   2. Chose to upload a template, and upload `infra.yml` (from within `prod/`)

   3. Follow the instructions and add the parameters.

      * Set the Stack Name as the name of the project.

      * Set the `BackendPythonImage` as the URI of the `backend-python-image` uploaded to AWS ECR (this can be found on the ECR portal of the web interface).

        *<span style='color:red'>WARNING:</span> Be sure to add `:latest` to the end of the URI to make sure the stack always uses the latest image*

      * Do the same with the `BackendWebImage` (and URI for `backend-web-image`) and `FrontendWebImage`  (and URI for `frontend-web-image`) parameters.

      * Assign the database settings as desired. The database is not made publicly available (not internet facing) so the security of the user and password is not crucial, whoever, it may be useful to set if you were ever to make the database publicly available so as to be able to access it from development machines and perform administration and tests.

      * Set the `ECSClusterName` as the name of the project e.g. `project-cactus`. This will be referenced as <CLUSTER> when pushing updates.

8. Because Angular is client-side (that is it is run on the client computer), it is not possible to dynamically set the API URL after you build the image so you will need to manually add the prod API URL once it comes into existence during the CloudFormation stack creation. This only needs to be done once, cause once you provided the backend DNS it won't change over the life-cycle of the stack.
   1. Once the whole infrastructure is up and running copy the `backend-service` Load Balanced DNS Name (as found by navigating on the AWS ECS portal of the web interface) and paste it into `frontend/src/environments/environment.prod.ts` in place of <backend-service_DNS> (making sure to keep the `http://` at the beginning).
   2. Go through the steps in the [Pushing updates to production section](####Pushing updates to production CI/CD (sort of)).

#### Updating Stack

If you chose to make changes to the `infra.yml`, such as modifying port listeners to enable HTTPS access, you can do so and then update the stack with the following command:

```bash
aws cloudformation update-stack --stackname <VALUE> --template-body file://$PWD/infra.yml
```

Alternatively this can be done from the AWS web interface.

#### Pushing updates to production CI/CD (sort of)

1. Authenticate with the AWS CLI.

1. From within the `prod/`, update the images with:

   ````bash
   ./scripts/update-ecr-repos.sh
   ````

1. Finally update the service. It is not necessary to update both the front-end and back-end services every time you wish to push an update. If you have only made modifications to the Django back-end it is only necessary to update the back-end service and vice-versa for the front-end.

   * Back-end: 
     1. Run the following command to launch a new deployment so that the container images a reevaluated and hence updated. The <CLUSTER> is that set in the Production, Setup, bullet-point 7.3.
     
        ```bash
        aws ecs update-service --cluster <CLUSTER> --service backend-service --force-new-deployment --region <REGION> --desired-count 2
        ```
     
     1. Then to stops old tasks, which will then be replaced by new updated tasks run:
     
        ````bash
        ./scripts/stop-old-tasks.sh <CLUSTER> <REGION> backend-service
        ````
   * Front-end:
     1. Run the following command to launch a new deployment so that the container images a reevaluated and hence updated. The <CLUSTER> is that set in the Production, Setup, bullet-point 7.3.

        ```bash
        aws ecs update-service --cluster <CLUSTER> --service frontend-service --force-new-deployment --region <REGION> --desired-count 2
        ```

     1. Then to stops old tasks, which will then be replaced by new updated tasks run:

        ````bash
        ./scripts/stop-old-tasks.sh <CLUSTER> <REGION> frontend-service
        ````

#### Scaling Up

To scale up you can increase the `desired-count` when running the `aws ecs update-service ...` commands. This determines the amount of tasks generated and the AWS ELB (loadbalancer) (setup in the `infra.yml`) while then be able balance between all the different tasks to optimise usage. 

This can also be done in an automated fashion using Cloud Watch (see Service Auto Scaling documentation).

## Notes & References

### Definitions & Terms

**Solution Stack** = set of software subsystems or components needed to create a complete platform.

### Useful Links

#### Enabling HTTPS

Medium tutorial: https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

#### Progressive Web App (PWA)

A potentially powerful addition to the solution is to allow the Angular app to be PWA compatible. This will allow you to produce a single app that works on Web/Desktop, Android & IOS will only having to maintain one code base.

Adding PWA compatibility: https://medium.com/poka-techblog/turn-your-angular-app-into-a-pwa-in-4-easy-steps-543510a9b626
