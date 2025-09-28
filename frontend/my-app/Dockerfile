# Use Node.js LTS as the base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and lock file first (for caching layers)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app source code
COPY . .

# Expose port 3000 for Next.js
EXPOSE 3000

# Default command will be overridden by docker-compose
CMD ["npm", "run", "dev"]
