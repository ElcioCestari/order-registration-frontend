# ---- build stage ----
# Angular 13 only supports Node 12/14/16
FROM node:16 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npx ng build

# ---- runtime stage ----
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Writes assets/config.json from API_URL when the container starts
COPY docker/40-runtime-config.sh /docker-entrypoint.d/40-runtime-config.sh
RUN chmod +x /docker-entrypoint.d/40-runtime-config.sh
COPY --from=build /app/dist/order-registration-frontend/ /usr/share/nginx/html/

ENV API_URL=http://localhost:8080
EXPOSE 80
