# FROM node:alpine
# WORKDIR '/app'
# COPY package.json .
# RUN npm install -g npm@7.8.0
# COPY . .
# CMD ["npm", "start"]

FROM node:latest as build
WORKDIR /usr/src/app
# COPY package.json /app/
COPY . /usr/src/app
# COPY package*.json /app/

# RUN npm install react
# RUN npm install -g agentkeepalive --save
RUN npm install react-router-dom --save
RUN npm install -g npm@7.9.0
RUN npm install react-scripts -g
RUN npm run build

#prepare nginx
FROM nginx:1.16.0-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

#fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]