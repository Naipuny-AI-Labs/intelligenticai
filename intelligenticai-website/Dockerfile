# Use the official Node.js image from Docker Hub as base for bun
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Next.js project using bun
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application using bun
CMD ["bun", "start"]
