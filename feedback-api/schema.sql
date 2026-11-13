-- Threads and the messages in them.
--
-- A reader has no account here. The first question creates a thread, and the
-- browser keeps two strings: the thread's id, which travels in the open, and
-- its token, which does not. Reading a thread needs both, so knowing somebody
-- else's id is not enough to read their conversation.

CREATE TABLE IF NOT EXISTS threads (
  id       TEXT PRIMARY KEY,          -- short, public: shown in Telegram
  token    TEXT NOT NULL,             -- long, secret: kept in the reader's browser
  name     TEXT,                      -- what they asked to be called, if anything
  page     TEXT,                      -- the lesson the first question came from
  lang     TEXT,                      -- ua | ru | eng
  created  INTEGER NOT NULL,
  updated  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  thread_id TEXT NOT NULL,
  -- 'reader' wrote it on the site, 'author' answered from Telegram
  side      TEXT NOT NULL CHECK (side IN ('reader', 'author')),
  text      TEXT NOT NULL,
  page      TEXT,                     -- the lesson it was asked from
  created   INTEGER NOT NULL,
  -- The id Telegram gave the post. An answer arrives as a reply to it, and
  -- that is the only thing tying the answer back to its thread.
  tg_message_id INTEGER
);

CREATE INDEX IF NOT EXISTS messages_by_thread ON messages (thread_id, id);
CREATE INDEX IF NOT EXISTS messages_by_telegram ON messages (tg_message_id);
