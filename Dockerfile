#Imagen de NODE
FROM node:18

#Directorio TRabajo
WORKDIR /app

#Copiar archivos package.json
COPY package*.json ./

#Instalar dependencias
RUN npm install

#COpiar el resto de archivos
COPY . .

#Exponer el puerto 4678
EXPOSE 4678

#Ejecutar aplicacion
CMD ["node","app.js"]