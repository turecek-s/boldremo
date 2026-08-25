-- Add neighborhood as a structured enum field on leads, separate from free-text address.
-- Used for scheduling/routing views.

CREATE TYPE public.neighborhood AS ENUM (
  'Heights',
  'River Oaks',
  'Bellaire',
  'Kingwood',
  'Memorial',
  'Other'
);

ALTER TABLE public.leads
  ADD COLUMN neighborhood public.neighborhood;
