# Minimal Dockerfile for the database service
# Use the official Postgres image - docker-compose will provide environment variables
FROM postgres:15-alpine

# Expose the default Postgres port (documentational)
EXPOSE 5432

# Initialization SQL/scripts are mounted by docker-compose from ./database/init
# No additional build steps are required here.
