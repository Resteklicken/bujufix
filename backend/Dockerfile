FROM node:14 as build-stage
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY .. .
RUN npm run build
