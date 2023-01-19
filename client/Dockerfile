FROM node:17-alpine as builder

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .
RUN npm run build

#Stage 2.
FROM nginx:1.19.0-alpine
WORKDIR /usr/share/nginx/html

#Remove default nginx resources.
RUN rm /etc/nginx/conf.d/*
RUN rm -rf ./*

#copy first stage 
COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
