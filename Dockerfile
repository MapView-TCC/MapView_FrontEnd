FROM node:21 AS build
WORKDIR /app

COPY package*.json ./


RUN npm install

COPY src ./src

RUN npm run build --prod


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*


COPY --from=build /app/dist/MapView_FrontEnd /usr/share/nginx/html

# Expõe a porta que o Nginx irá usar
EXPOSE 4200

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
