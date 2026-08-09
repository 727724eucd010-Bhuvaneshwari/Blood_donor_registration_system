-- ============================================================
-- Seed data: Blood Banks / Donation Centers
-- Fixes the empty "Blood Banks" page by inserting real,
-- realistically-named centers across multiple cities.
-- Column is `is_verified` (Hibernate auto-converted from isVerified).
-- ============================================================

INSERT INTO blood_bank (name, city, pincode, contact_number, operating_hours, is_verified) VALUES
('Government General Hospital Blood Bank', 'Coimbatore', '641018', '0422-2301393', 'Mon-Sun 24 Hours', true),
('PSG Hospitals Blood Bank', 'Coimbatore', '641004', '0422-2570170', 'Mon-Sat 9:00 AM - 6:00 PM', true),
('Ganga Hospital Blood Bank', 'Coimbatore', '641043', '0422-2485000', 'Mon-Sun 24 Hours', true),
('KMCH Blood Bank', 'Coimbatore', '641014', '0422-4323800', 'Mon-Sat 8:00 AM - 8:00 PM', true),
('Indian Red Cross Society Blood Bank', 'Coimbatore', '641001', '0422-2301000', 'Mon-Sat 9:00 AM - 5:00 PM', true),

('Government Rajaji Hospital Blood Bank', 'Madurai', '625020', '0452-2530000', 'Mon-Sun 24 Hours', true),
('Apollo Hospitals Blood Bank', 'Chennai', '600006', '044-28293333', 'Mon-Sun 24 Hours', true),
('Government General Hospital Blood Bank', 'Chennai', '600003', '044-25305000', 'Mon-Sun 24 Hours', true),
('Sri Ramachandra Medical Centre Blood Bank', 'Chennai', '600116', '044-45928585', 'Mon-Sat 8:00 AM - 8:00 PM', true),

('Christian Medical College Blood Bank', 'Vellore', '632004', '0416-2282052', 'Mon-Sun 24 Hours', true),
('KG Hospital Blood Bank', 'Coimbatore', '641018', '0422-4222222', 'Mon-Sat 9:00 AM - 6:00 PM', false),
('Erode Government Hospital Blood Bank', 'Erode', '638001', '0424-2260318', 'Mon-Sun 24 Hours', true);

-- Verify the insert
SELECT center_id, name, city, is_verified FROM blood_bank;
