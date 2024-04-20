CREATE TABLE IF NOT EXISTS schedules (
  id varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phone varchar(255) NOT NULL,
  observations text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_schedules_timestamp BEFORE UPDATE ON schedules FOR EACH ROW EXECUTE PROCEDURE update_timestamp();