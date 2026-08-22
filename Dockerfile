# preview both — main (sketchy) on :8080, clean-modern on :8081
# docker build -t ed-preview . && docker run --rm -p 8080:8080 -p 8081:8081 ed-preview
# cloudflared tunnel --url http://localhost:8080  (sketchy)
# cloudflared tunnel --url http://localhost:8081  (clean)

FROM node:20-alpine AS base
RUN apk add --no-cache git

FROM base AS builder-main
WORKDIR /app
COPY . .
RUN git fetch origin || true
RUN git checkout origin/main
RUN npm ci
RUN npm run build
RUN mv dist /dist-main

FROM base AS builder-clean
WORKDIR /app
COPY . .
RUN git fetch origin || true
RUN git checkout origin/explore/clean-modern
RUN npm ci
RUN npm run build
RUN mv dist /dist-clean

FROM nginx:alpine
COPY --from=builder-main /dist-main /usr/share/nginx/main
COPY --from=builder-clean /dist-clean /usr/share/nginx/clean
COPY nginx.preview.conf /etc/nginx/nginx.conf
EXPOSE 8080 8081
CMD ["nginx", "-g", "daemon off;"]
