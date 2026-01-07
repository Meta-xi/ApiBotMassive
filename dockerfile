# Usa una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install --only=production

# Copia el resto del código
COPY . .

# Compila el proyecto (si usas TypeScript)
RUN npm run build

# Expone el puerto (cambia si usas otro)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "run", "start:prod"]
