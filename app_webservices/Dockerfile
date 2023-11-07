FROM node:20.5-bullseye

#Update SO
RUN apt-get update -y && apt-get upgrade -y
RUN npm install -g npm

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./src ./src
COPY ./tmp ./tmp
COPY ./.env ./
COPY ./package.json ./

RUN npm install
RUN npm install morgan --save

# If you are building your code for production
RUN npm ci --omit=dev

EXPOSE 8080
CMD ["node", "src/js/index.js"]