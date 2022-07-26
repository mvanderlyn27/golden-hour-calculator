FROM node:13.12.0-alpine AS builder
RUN mkdir /app
WORKDIR  /app
ENV PATH /app/node_modules/.bin:$PATH
ENV PATH /app/build/:$PATH
COPY . ./
RUN npm install --silent
RUN npm run build-prod

#nginx
FROM nginx:1.19
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/templates /etc/nginx/templates
EXPOSE 80
ENV API_HOST backend.photo-spot 
ENTRYPOINT ["nginx", "-g", "daemon off;"]

