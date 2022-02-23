FROM nginx:1.20.2-alpine
COPY build /usr/share/nginx/html
COPY server.conf /etc/nginx/conf.d/default.conf
