FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN npm run ng -- build --base-href /s.raaber/onlinereservation/

FROM nginx:latest
COPY --from=build /usr/local/app/dist/front /usr/share/nginx/html
EXPOSE 80