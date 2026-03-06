# Use the official Node.js image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev for building)
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 8080

# Keep only necessary dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy built application and custom server
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/lib ./lib

EXPOSE 8080

# Start the custom server
CMD ["node", "server.js"]
