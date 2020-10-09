FROM node:latest

RUN mkdir -p /usr/backend

WORKDIR /usr/backend

COPY package.json . 

COPY . .

RUN npm install

VOLUME /backend/logfile

EXPOSE 4500

CMD ["node", "app.js"]
