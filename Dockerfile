FROM node
FROM node
WORKDIR /home/nodejs/app
COPY . .
RUN npm install --production
CMD [ "npm", "start" ]

