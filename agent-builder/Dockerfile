# ---------- Build Stage ----------
FROM node:20-alpine AS build

# Set work dir
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build Angular app for production
RUN npm run build -- --configuration production

# ---------- Run Stage ----------
FROM nginx:1.27-alpine

# If Angular CLI created dist/agent-builder/browser:
COPY --from=build /usr/src/app/dist/agent-builder/browser /usr/share/nginx/html

# If Angular CLI created dist/agent-builder only:
# COPY --from=build /usr/src/app/dist/agent-builder /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

