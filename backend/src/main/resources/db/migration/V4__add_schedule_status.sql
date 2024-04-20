CREATE TYPE schedule_status AS ENUM ('upcoming', 'done', 'canceled', 'delayed');
ALTER TABLE calendar.public.schedules ADD COLUMN status schedule_status DEFAULT 'upcoming';