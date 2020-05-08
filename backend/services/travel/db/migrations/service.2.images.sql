CREATE TABLE IF NOT EXISTS images
(
    image_id    BIGSERIAL PRIMARY KEY,
    url         TEXT    NOT NULL,
    priority    INTEGER NOT NULL DEFAULT 0,
    title       TEXT,
    comment     TEXT,
    locality_id INTEGER REFERENCES localities (locality_id)
);
