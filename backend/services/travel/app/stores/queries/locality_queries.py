import os

CREATE_LOCALITY_QUERY = """
INSERT INTO localities (name, country_code, latitude, longitude, gmaps_place_id)
     VALUES (:name, :country_code, :latitude, :longitude, :gmaps_place_id)
  RETURNING locality_id, name, country_code, latitude, longitude, gmaps_place_id
"""

GET_LOCALITY_QUERY_TEMPLATE = """
   SELECT {fields}
     FROM localities
    WHERE locality_id = :locality_id
"""

GET_LOCALITIES_QUERY_TEMPLATE = """
   SELECT {fields}
     FROM localities
 ORDER BY {order_by_condition}
"""

UPDATE_LOCALITY_QUERY = """
   UPDATE localities
      SET {set_conditions}
    WHERE locality_id = :locality_id
RETURNING locality_id, name, country_code, latitude, longitude, gmaps_place_id
"""

DELETE_LOCALITY_QUERY = """
DELETE FROM localities
      WHERE locality_id = :locality_id
  RETURNING :locality_id
"""

BACKUP_LOCALITIES = f"""
     COPY localities 
       TO '{os.environ.get("POSTGRES_BACKUP") or '/backup'}/localities.csv' 
DELIMITER ',' 
      CSV 
   HEADER;
"""

LOAD_LOCALITIES_FROM_BACKUP = f"""
CREATE TABLE _localities (LIKE localities INCLUDING DEFAULTS);

     COPY _localities
     FROM '{os.environ.get("POSTGRES_BACKUP") or '/backup'}/localities.csv'
DELIMITER ',' 
      CSV 
   HEADER;

INSERT INTO localities
     SELECT *
       FROM _localities
ON CONFLICT
         DO NOTHING;

DROP TABLE _localities;

SELECT setval(
       pg_get_serial_sequence('localities','locality_id'), 
       (SELECT MAX(locality_id) FROM localities)
       );
"""
