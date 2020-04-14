BACKUP_FRONTPAGE_STATS = """
     COPY frontpage_stats
       TO '/backup/frontpage_stats.csv'
DELIMITER ',' 
      CSV 
   HEADER
"""

LOAD_FRONTPAGE_STATS_FROM_BACKUP = """
CREATE TABLE _frontpage_stats (LIKE frontpage_stats INCLUDING DEFAULTS);

     COPY _frontpage_stats
     FROM '/backup/frontpage_stats.csv'
DELIMITER ',' 
      CSV 
   HEADER;

INSERT INTO frontpage_stats
     SELECT *
       FROM _frontpage_stats
ON CONFLICT
         DO NOTHING;

DROP TABLE _frontpage_stats;
"""
