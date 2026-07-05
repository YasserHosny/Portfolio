# -------- build --------
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# -------- serve --------
FROM nginx:1.27-alpine AS runtime
ENV BACKEND_HOST=backend \
    BACKEND_PORT=8000

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist/portfolio-frontend/browser /usr/share/nginx/html

EXPOSE 80
