FROM node:16
WORKDIR ./lutback
COPY package*.json ./
COPY .env .
COPY webpack.config.js .
COPY app.js .
COPY auth ./auth
COPY config ./config
COPY Controller ./Controller
COPY routes ./routes
COPY models ./models
COPY middlewares ./middlewares
RUN npm i nodemon --force
RUN npm install
EXPOSE 3000
CMD ["npm","run","dev"]
