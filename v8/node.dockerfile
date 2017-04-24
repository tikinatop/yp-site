FROM node
MAINTAINER KANU

WORKDIR /var/www

COPY package.json /var/www
RUN npm install

#VOLUME .:/var/www

EXPOSE 3000

CMD ["node", "app.js"]
