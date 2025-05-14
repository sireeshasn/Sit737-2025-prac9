# Use the Node.js 18 LTS base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose app port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
