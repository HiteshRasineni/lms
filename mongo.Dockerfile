FROM mongo:7.0

# Copy initialization script
COPY ./mongo-init/init.js /docker-entrypoint-initdb.d/

EXPOSE 27017
