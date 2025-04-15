# Use Node 22 as the base image
FROM node:22-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port your app runs on
EXPOSE 7000

# Start the app
CMD ["npm", "start"]
