FROM node:14-alpine AS builder

WORKDIR /app

ENV REACT_APP_URL_SERVER=https://duonglt.api.internship.designveloper.com
# ENV REACT_APP_URL_SERVER=http://localhost:5000
ENV PORT=80

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]