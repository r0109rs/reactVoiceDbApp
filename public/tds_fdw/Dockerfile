FROM postgres:18.0
RUN apt-get update; \
    apt-get install -y libsybdb5 freetds-dev freetds-common; \
    rm -rf /var/lib/apt/lists/*
COPY ./tds_fdw-2.0.5/build/lib/* /usr/lib/postgresql/18/lib/
COPY ./tds_fdw-2.0.5/build/extension/* /usr/share/postgresql/18/extension/

