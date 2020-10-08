#############
### build ###
#############

# Create image based on the official Node 10 image from dockerhub
FROM node:current as build

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY ./frontend/package*.json /usr/src/app/

# Install dependecies
RUN npm install -g @angular/cli
RUN npm install
RUN npm audit fix

# Get all the code needed to run the app
COPY ./frontend /usr/src/app

# generate build
RUN ng build --prod --output-path=dist

############
### prod ###
############

# base image
FROM nginx:1.19-alpine

# Configure NGINX
COPY ./prod/containers/frontend-web-server/nginx.conf /etc/nginx/conf.d/default.conf

# copy artifact build from the 'build environment'
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# run nginx
CMD ["nginx", "-g", "daemon off;"]