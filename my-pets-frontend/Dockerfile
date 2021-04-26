FROM node:latest as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g npm@7.9.0
RUN npm install react -g
COPY package.json /usr/src/app
COPY package-lock.json ./
RUN npm install react-scripts@3.4.0 -g
COPY . /usr/src/app


RUN npm run build

#prepare nginx
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

#fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
