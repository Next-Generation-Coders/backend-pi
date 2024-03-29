#FROM node:16
#WORKDIR ./lutback
#COPY package*.json ./lutback
#COPY . .
#RUN npm i nodemon --force
#RUN npm install
#EXPOSE 3000
#CMD ["npm","run","dev"]

FROM node:16

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

COPY package*.json ./

RUN chown -R appuser:appuser /app

USER appuser

RUN mkdir -p /home/appuser/.npm-global/bin && \
    chown -R appuser:appuser /home/appuser/.npm-global

ENV PATH=/home/appuser/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/appuser/.npm-global

RUN npm install -g nodemon

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
