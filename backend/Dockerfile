FROM node:14


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 3001

COPY . .

# Run the application
CMD [ "node", "server.mjs" ]  
