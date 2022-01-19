FROM node:14 as BASE

WORKDIR /backend

COPY package*.json ./

EXPOSE 8080

FROM BASE as PRODUCTION

RUN npm i

COPY . .

CMD ["node", "src/app.js"]

FROM BASE as DEV

WORKDIR /backend

RUN npm i

CMD [ "npm", "run", "start"]