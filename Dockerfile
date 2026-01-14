# --- ETAPA 1: Construcción (Build) ---
# Usamos alpine para reducir el tamaño de ~1GB a ~160MB
FROM node:18-alpine AS builder
WORKDIR /app

# Aprovechamos el caché de capas de Docker copiando solo los package files primero
COPY package*.json ./

# Instalamos todas las dependencias
RUN npm install

# Copiamos el resto del código del proyecto
COPY . .

# --- ETAPA 2: Producción (Runtime) ---
FROM node:18-alpine AS runtime
WORKDIR /app

# Copiamos solo los archivos de dependencias y el punto de entrada
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/app.js ./

# Instalamos solo dependencias de producción (sin devDependencies)
# y limpiamos el caché de npm en el mismo comando para ahorrar espacio
RUN npm install --omit=dev && npm cache clean --force

# Exponemos el puerto de la aplicación
EXPOSE 4678

# Ejecutamos con el usuario por defecto de node por seguridad (opcional pero recomendado)
USER node

# Comando para iniciar la aplicación
CMD ["node", "app.js"]