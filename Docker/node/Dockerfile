FROM node:latest

# Set environment variables
ENV DB_HOST=localhost
ENV DB_POSR=5432
ENV DB_USER=postgre
ENV DB_PASSWORD=root
ENV DB_NAME=node_api

# Create app directory 
WORKDIR /usr/scr/app

# Install app depenciencies
# A wildcard is used to ensure both package.json ANS package-lock.json are copied
COPY package.json ./

RUN npm install
RUN npm install nodemon --save-dev

# Bundle app source
COPY . .

# Expose the app port
EXPOSE 3000

# Set the default command ti start the app
CMD ["npm", "start"]