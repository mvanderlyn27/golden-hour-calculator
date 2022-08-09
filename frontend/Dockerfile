FROM node:13.12.0-alpine AS builder
RUN mkdir /app
WORKDIR  /app
ENV PATH /app/node_modules/.bin:$PATH
ENV PATH /app/build/:$PATH
COPY . ./
RUN npm install --silent
#need to make it so based on the environment we build-prod, or not
#have a npm run script which checks env vars
#based on that run build-prod, or the dev run that rebuilds based on changes, and saves to /app/build
RUN npm run build-prod

#nginx
FROM nginx:1.19
COPY --from=builder /app/build /usr/share/nginx/html
#need to not copy html folder, but make it a volume
COPY --from=builder /app/nginx/templates /etc/nginx/templates
ENV API_HOST backend.photo-spot-backend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

