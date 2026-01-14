# --- ETAPA 1: Construcción ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copiamos solo lo necesario para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código fuente
COPY . .

# --- ETAPA 2: Producción ---
FROM node:18-alpine AS runtime
WORKDIR /app

# Variable de entorno para optimizar Node en producción
ENV NODE_ENV=production

# Instalamos solo dependencias de producción
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copiamos solo los archivos necesarios de la etapa anterior
COPY --from=builder /app/app.js ./
COPY --from=builder /app/public/ ./public/

# Exponemos el puerto de la app
EXPOSE 3000

# Cambiamos a usuario no root por seguridad
USER node

# Iniciamos la aplicación
CMD ["node", "app.js"]