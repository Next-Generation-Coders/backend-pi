FROM node:16
WORKDIR ./lutback
COPY package*.json ./lutback
COPY . .
RUN npm i nodemon --force
RUN npm install
#=======
#COPY package*.json /app
#RUN npm install nodemon
#RUN npm install
#COPY . /app
#WORKDIR /app
#>>>>>>> origin/youssef
EXPOSE 3000
CMD ["npm","run","dev"]
