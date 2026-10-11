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

CREATE TABLE IF NOT EXISTS testimonials (
  id           bigserial PRIMARY KEY,
  quote        text    NOT NULL,
  author       text    NOT NULL,
  role         text,
  company      text,
  avatar_url   text,
  rating       smallint CHECK (rating IS NULL OR (rating BETWEEN 1 AND 5)),
  featured     boolean NOT NULL DEFAULT false,
  position     integer NOT NULL DEFAULT 0,
  active       boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS testimonials_visible_idx
  ON testimonials (position, id) WHERE active;

-- Keep updated_at fresh on any edit.
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS testimonials_set_updated_at ON testimonials;
CREATE TRIGGER testimonials_set_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Sample rows so the section isn't empty on first run. Delete or edit freely.
INSERT INTO testimonials (quote, author, role, company, rating, featured, position)
SELECT * FROM (VALUES
  ('The system they built cut our paperwork down to a fraction of what it used to be. Our team actually enjoys using it.', 'Sarah Mitchell', 'Operations Manager', 'Bluefin Logistics', 5, true, 1),
  ('Responsive, clear communication from start to finish, and the result works exactly as promised.', 'James O''Brien', 'Founder', 'OB Dental', 5, false, 2),
  ('I was skeptical about switching away from our old setup, but the migration was painless and the new dashboard is a joy to use.', 'Priya Naidoo', 'Office Manager', 'Naidoo & Co', 4, false, 3)
) AS seed (quote, author, role, company, rating, featured, position)
WHERE NOT EXISTS (SELECT 1 FROM testimonials);

-- Extra placeholder rows to preview the layout and scroll. Delete freely:
--   DELETE FROM testimonials WHERE author LIKE 'Placeholder %';
INSERT INTO testimonials (quote, author, role, company, position)
SELECT q.quote, q.author, q.role, q.company, q.position
FROM (VALUES
  ('They listened to how we actually work and built around it. Six months in, nothing has needed a rework.', 'Placeholder One', 'Project Lead', 'Harbourview Consulting', 4),
  ('Setup took an afternoon and the whole team was using it that week. No training required, which I did not expect.', 'Placeholder Two', 'IT Support', 'Creekside Accountants', 5),
  ('Our reporting used to take a full day every month. Now it takes about fifteen minutes and nobody can miss it.', 'Placeholder Three', 'Finance Director', 'Meridian Supply', 6),
  ('Clear pricing, honest timelines, and it was done on the day they said it would be. Rare these days.', 'Placeholder Four', 'Managing Director', 'Bayfront Realty', 7),
  ('The dashboard makes things visible that we never had before. It changed how we run our morning meetings.', 'Placeholder Five', 'Team Lead', 'Northgate Studios', 8),
  ('I asked for something quite specific and it came back better than I had described it. They get the details.', 'Placeholder Six', 'Product Owner', 'Lantern Digital', 9),
  ('Support has been the standout. A question on a Friday gets an answer before the weekend, every time.', 'Placeholder Seven', 'Administrator', 'Palm Court Hospitality', 10),
  ('We had tried two other vendors before this. Nothing came close on reliability or day-to-day usability.', 'Placeholder Eight', 'COO', 'Ironline Manufacturing', 11),
  ('It just works. That is the review. The team stopped sending support tickets within the first month.', 'Placeholder Nine', 'Systems Manager', 'Aldergate Legal', 12),
  ('From the first call to go-live, communication was clear and there were no surprises. Would work with them again.', 'Placeholder Ten', 'Founder', 'Solstice Events', 13)
) AS q (quote, author, role, company, position)
WHERE NOT EXISTS (
  SELECT 1 FROM testimonials WHERE author LIKE 'Placeholder %'
);
