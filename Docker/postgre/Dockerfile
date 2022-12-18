FROM postgres:latest

# set the default postgre user password
ENV POSTGRES_PASSWORD=root

# Set the default database to be created when the image is forst started
ENV POSTGRE_DB=node_api

# Expose the default PostgreSQL port
EXPOSE 5432

# Copy the SQL scripts to create tables and insert data
COPY init.sql /docker-entrypoint-initdb.d/