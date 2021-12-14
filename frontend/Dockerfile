FROM node:13.12.0-alpine AS builder
RUN mkdir /app
WORKDIR  /app
ENV PATH /app/node_modules/.bin:$PATH
ENV PATH /app/build/:$PATH
COPY . ./
RUN npm install --silent
RUN npm run build-prod

#nginx
FROM nginx:1.15
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d
COPY --from=builder /app/nginx/conf.d /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

