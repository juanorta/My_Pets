FROM node:alpine
WORKDIR '/app'
COPY package.json .
RUN npm install -g npm@7.8.0
COPY . .
CMD ["npm", "start"]