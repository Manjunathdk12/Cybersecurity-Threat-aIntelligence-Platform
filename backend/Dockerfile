# Use Node.js as base image for backend since it's a Node + Python app
FROM node:18

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Set python alias
RUN ln -s /usr/bin/python3 /usr/bin/python

# Set working directory
WORKDIR /app

# Copy package files and install Node dependencies
COPY package*.json ./


# Copy the rest of the backend files
COPY . .

# Install Python dependencies (use --break-system-packages)
RUN pip3 install --break-system-packages -r requirements.txt

# Expose backend port
EXPOSE 5000

# Start the server
RUN npm install

CMD ["npm", "start"]
