FROM node:22-alpine

WORKDIR /soko

COPY ./package.json /soko
COPY ./package-lock.json /soko

RUN npm install

COPY . /soko

EXPOSE 3000

CMD [ "npm", "run", "dev" ]