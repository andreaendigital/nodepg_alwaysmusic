create database alwaysmusic;

\c alwaysmusic;

CREATE TABLE estudiantes (
    rut VARCHAR(14) PRIMARY KEY,
    nombre VARCHAR(25),
    curso VARCHAR(25),
    nivel INT
);