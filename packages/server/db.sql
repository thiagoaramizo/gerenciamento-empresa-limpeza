\c dbgel;

CREATE TABLE IF NOT EXISTS "users" (
    "id" INT PRIMARY KEY NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "clients" (
    "id" INT PRIMARY KEY NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL
);

INSERT INTO "users"("id", "username", "password")
VALUES (1, 'admin', 'admin');
