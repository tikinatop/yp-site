FROM node
MAINTAINER KANU

WORKDIR /var/www

COPY package.json /var/www
RUN npm install
RUN npm install nodemon

#VOLUME .:/var/www

EXPOSE 3000

CMD ["./node_modules/.bin/nodemon", "app.js"]
