CREATE TABLE IF NOT EXISTS contact_messages (
  id          bigserial PRIMARY KEY,
  name        text        NOT NULL,
  email       text        NOT NULL,
  message     text        NOT NULL,
  ip          text,
  user_agent  text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
  ON contact_messages (created_at DESC);
