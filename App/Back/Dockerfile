# Backend Dockerfile (Node.js environment)
FROM node:22-slim

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate types for Wrangler
RUN npx wrangler types

# The port is usually handled by Cloudflare, but for local container testing:
EXPOSE 8787

# Command to run the worker in dev mode or as a service
CMD ["npm", "run", "start"]
