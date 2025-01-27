# Imagen base de Node.js para construir Angular
FROM node:20 AS build
WORKDIR /app

# Instalar dependencias y construir
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Imagen base de Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
# Expone el puerto de la aplicación
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
