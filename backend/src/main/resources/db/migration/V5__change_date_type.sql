ALTER TABLE calendar.public.schedules ALTER COLUMN start_date TYPE TIMESTAMP WITH TIME ZONE USING start_date AT TIME ZONE 'UTC';
ALTER TABLE calendar.public.schedules ALTER COLUMN end_date TYPE TIMESTAMP WITH TIME ZONE USING end_date AT TIME ZONE 'UTC';
ALTER TABLE calendar.public.schedules ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE USING created_at AT TIME ZONE 'UTC';
ALTER TABLE calendar.public.schedules ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE USING updated_at AT TIME ZONE 'UTC';