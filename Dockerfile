
FROM node:14.0.0 as node

WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG IMAGE_TAG=dev
RUN npm run build -- --prod --configuration $IMAGE_TAG

# building nginx
FROM public.ecr.aws/nginx/nginx:1.20-alpine

# FROM nginx:1.12.2-alpine
COPY --from=node /app/dist/Hardware-Store /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf