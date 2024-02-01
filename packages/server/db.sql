\c dbgel;

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

CREATE TABLE IF NOT EXISTS "clients_address" (
    "id" SERIAL PRIMARY KEY,
    "client_id" INT NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" VARCHAR(100),
    "lat" FLOAT NOT NULL,
    "lon" FLOAT NOT NULL,
    CONSTRAINT fk_client_address FOREIGN KEY (client_id) REFERENCES clients (id)
);

INSERT INTO "users"("id", "username", "password")
VALUES (1, 'admin', 'admin');
