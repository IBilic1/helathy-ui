FROM node:18.18.0 AS build

ARG REACT_APP_BACKEND=/api
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine

COPY --chown=nginx:nginx ./nginx.conf /etc/nginx/nginx1.conf
COPY --chown=nginx:nginx --from=build /app/build /usr/share/nginx/html

ARG BACKEND
ENV BACKEND=$BACKEND

RUN chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d
RUN chmod -R 777 /etc/nginx
RUN chmod -R 777 /var/cache/nginx
RUN chmod -R 777 /var/run
RUN chmod -R 777 /etc/nginx/conf.d

RUN apk --no-cache add gettext

EXPOSE 3000

USER nginx

CMD ["/bin/sh", "-c", "export BACKEND && envsubst '$$BACKEND' < /etc/nginx/nginx1.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]