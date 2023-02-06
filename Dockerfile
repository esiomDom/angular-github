FROM node:latest as build-stage
WORKDIR /app
COPY ./ .
FROM nginx:latest
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
USER nginx


FROM nginx:alpine

COPY ./dist/. /usr/share/nginx/html
