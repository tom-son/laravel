FROM node:20.14.0-slim AS build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.24.0-bullseye

COPY nginx/etc/default.conf.template /etc/nginx/templates/
COPY nginx/etc/default.conf /etc/nginx/nginx.conf

WORKDIR /var/www/html
COPY --from=build /app/dist /var/www/html
