FROM node:16
COPY package*.json /app
RUN npm install nodemon
RUN npm install
COPY . /app
WORKDIR /app
EXPOSE 3000
CMD ["npm","run","dev"]
