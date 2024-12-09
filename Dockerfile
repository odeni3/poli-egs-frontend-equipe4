# Stage 1: Build
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app


# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
# RUN npm run dev

# Expose port 80
EXPOSE 3000
CMD [ "npm", "run", "dev" ]

