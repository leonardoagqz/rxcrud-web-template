FROM node:16.13.0-alpine as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --no-optional

COPY . ./
RUN npm rum build

FROM nginx:stable-alpine as server

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]