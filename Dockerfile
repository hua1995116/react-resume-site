FROM node:14-alpine AS builder

WORKDIR /app
COPY . /app
RUN yarn install && yarn build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]