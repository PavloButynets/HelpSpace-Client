# Вибираємо образ Node.js для білду
FROM node:18-alpine as build

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо код та будуємо проєкт
COPY . .
RUN npm run build

# Вибираємо образ nginx для сервінгу
FROM nginx:1.21.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
