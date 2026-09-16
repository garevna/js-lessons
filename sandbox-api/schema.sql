-- The practice backend keeps two kinds of thing: records the lessons read and
-- write as JSON, and the avatar files uploaded by the FormData lesson.
--
-- D1 rather than KV, and the reason is worth writing down. KV was the obvious
-- first choice and it is the wrong one: it is eventually consistent, and
-- measured against the deployed Worker a POST took about a minute to become
-- visible — 0 of 6 reads found it immediately, 0 of 6 after twenty seconds, 6
-- of 6 after sixty-five. The lessons POST a user and read it back on the next
-- line, so a minute is not a delay, it is a broken exercise.

CREATE TABLE IF NOT EXISTS records (
  collection TEXT NOT NULL,
  id         TEXT NOT NULL,
  value      TEXT,             -- JSON; NULL marks a delete, which has to
                               -- outlive the seed rather than remove a row
  expires    INTEGER,          -- unix seconds; NULL never expires
  PRIMARY KEY (collection, id)
);

CREATE TABLE IF NOT EXISTS files (
  login    TEXT PRIMARY KEY,
  name     TEXT,
  type     TEXT,
  data     BLOB,
  expires  INTEGER
);

CREATE INDEX IF NOT EXISTS records_expires ON records (expires);
