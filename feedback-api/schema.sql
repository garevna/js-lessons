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
  -- An answer belongs to the question it answers, and a question can collect
  -- several of them. Without this the thread is a flat log where, after a
  -- dozen exchanges, nobody can tell what answers what.
  parent_id INTEGER,
  -- 'reader' wrote it on the site, 'author' answered from Telegram
  side      TEXT NOT NULL CHECK (side IN ('reader', 'author')),
  text      TEXT NOT NULL,
  page      TEXT,                     -- the lesson it was asked from
  created   INTEGER NOT NULL,
  -- The id Telegram gave the post. An answer arrives as a reply to it, and
  -- that is the only thing tying the answer back to its thread.
  tg_message_id INTEGER,
  -- The post's text as it now stands in the channel. Editing a message in
  -- Telegram means sending the whole of it again, and Telegram will not tell
  -- you what is in it, so the copy is kept here.
  tg_text TEXT
);

CREATE INDEX IF NOT EXISTS messages_by_thread ON messages (thread_id, id);
CREATE INDEX IF NOT EXISTS messages_by_telegram ON messages (tg_message_id);

-- A short diary of what Telegram sent and what was made of it.
--
-- The webhook has to answer 200 to almost everything - an update it cannot
-- use is not an error, and anything else makes Telegram retry forever - so
-- without a record here a silent webhook and a working one look identical
-- from the outside. Ten rows is enough to see the last attempt.
CREATE TABLE IF NOT EXISTS hook_events (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  created INTEGER NOT NULL,
  ok      INTEGER NOT NULL,   -- 1 = the secret matched
  kind    TEXT,               -- channel_post, message, callback_query...
  detail  TEXT                -- what happened to it
);
CREATE INDEX IF NOT EXISTS messages_by_parent ON messages (parent_id);

-- Settings that outlive a deployment. Today there is one, inbox_chat: the
-- group or channel the questions are posted to, set by writing /here in it.
CREATE TABLE IF NOT EXISTS settings (
  key     TEXT PRIMARY KEY,
  value   TEXT NOT NULL,
  updated INTEGER NOT NULL
);
