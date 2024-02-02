\c dbgel;

BEGIN;
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "clients" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS "clients_location" (
    "client_id" INT PRIMARY KEY,
    "lat" FLOAT NOT NULL,
    "lon" FLOAT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients (id)
);

CREATE TABLE IF NOT EXISTS "routes" (
    "id" SERIAL PRIMARY KEY,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "payload" VARCHAR NOT NULL
);

INSERT INTO "users"("id", "username", "password")
VALUES (1, 'admin', 'admin');

COMMIT;