FROM node:latest

# Set environment variables
ENV DB_HOST=localhost
ENV DB_POSR=5432
ENV DB_USER=postgre
ENV DB_PASSWORD=root
ENV DB_NAME=node_api

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY api/package.json .
RUN npm install

# Bundle app source
COPY api/index.js ./

# Expose the app port
EXPOSE 3000

# Set the default command ti start the app
CMD ["npm", "run", "dev"]