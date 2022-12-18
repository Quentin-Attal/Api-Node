FROM postgres:latest

# set the default postgre user password
ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB nodeapi

# Expose the default PostgreSQL port
EXPOSE 5432

# Copy the SQL scripts to create tables and insert data
COPY init.sql /docker-entrypoint-initdb.d/