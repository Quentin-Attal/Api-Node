FROM node:latest

# Set environment variables
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USER=docker
ENV DB_PASSWORD=docker
ENV DB_NAME=nodeapi

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