
#Every docker file must start with a FROM instruction
#FROM initializes a new build stage and set the Base image for subsequent instructions.
FROM node:lts-alpine

#The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile
WORKDIR /app

#The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>
#<src>      <dest>    
COPY package*.json ./

COPY client/package*.json client/
#RUN instruction will execute any commands, the commands are run in a shell, which by default is /bin/sh -c on Linux or cmd /S /C on Windows
RUN npm install --prefix client --omit=dev

COPY server/package*.json server/
RUN npm install --prefix server --omit=dev

COPY client/ client/
RUN npm run build-docker --prefix client

COPY server/ server/

USER node

#the main purpose of a CMD is to provide defaults for an executing container
CMD [ "npm", "start", "--prefix", "server" ] 

EXPOSE 8000