FROM node:current

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install -g @angular/cli
RUN npm install
RUN npm audit fix

COPY . /usr/src/app