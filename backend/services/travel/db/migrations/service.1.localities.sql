CREATE TABLE IF NOT EXISTS localities
(
    locality_id    SERIAL PRIMARY KEY,
    name           TEXT           NOT NULL,
    country_code   TEXT           NOT NULL,
    latitude       DECIMAL(16, 8) NOT NULL,
    longitude      DECIMAL(16, 8) NOT NULL,
    gmaps_place_id TEXT
);
