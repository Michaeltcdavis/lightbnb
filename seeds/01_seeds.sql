INSERT INTO users (name, email, password)
VALUES ('mike', 'a@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('cal', 'b@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('greg', 'c@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (
  owner_id,
  title,
  description,
  thumbnail_photo_url,
  cover_photo_url,
  cost_per_night,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms,
  country,
  street,
  city,
  province,
  post_code,
  active
  )
VALUES (
  1,
  'House A',
  'A gorgeous house',
  'www.photoa.com',
  'www.photoacover.com',
  10000,
  2,
  2,
  2,
  'Canada',
  'Pape',
  'Toronto',
  'Ontario',
  'M4M 2W7',
  TRUE
  ),
  (
  2,
  'House B',
  'An okay house',
  'www.photob.com',
  'www.photobcover.com',
  5000,
  1,
  1,
  1,
  'Canada',
  'Boulton',
  'Toronto',
  'Ontario',
  'M4M 2W8',
  TRUE
  ),
  (
  1,
  'House C',
  'You want to stay HERE?',
  'www.photoc.com',
  'www.photoccover.com',
  1000,
  0,
  1,
  1,
  'Canada',
  'Gerrard',
  'Toronto',
  'Ontario',
  'M4M 2W9',
  TRUE
  );

INSERT INTO reservations (
  start_date, 
  end_date, 
  property_id, 
  guest_id
  )
VALUES 
  ('2022-08-23', '2022-08-31', 1, 2),
  ('2022-09-01', '2022-09-03', 2, 3),
  ('2022-10-15', '2022-10-17', 3, 1);

INSERT INTO property_reviews (
  rating, 
  message, 
  property_id, 
  guest_id,
  reservation_id
  )
VALUES 
  (1, 'It was absolutely disgusting', 3, 2, 1),
  (3, 'It was pretty okay', 2, 1, 2),
  (5, 'So amazing, I wish I lived here', 1, 3, 3);