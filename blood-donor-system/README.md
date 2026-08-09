# BloodConnect — Secure Blood Donor Management System

Final-year project built with React + Vite and Spring Boot + MySQL.

## Major features
- JWT authentication with stateless Spring Security
- BCrypt password hashing
- Role-based access control (`DONOR`, `ADMIN`)
- Public donor discovery with privacy-safe donor summaries
- Blood-group compatibility matching
- Emergency blood requests with city-based matching
- Donor eligibility screening
- Blood-bank / center directory
- Admin center creation and verification
- Appointment, feedback and stock modules
- Responsive UX with dashboard-style cards, loading/error states and mobile navigation
- Swagger/OpenAPI documentation

## Run backend
1. Create MySQL database: `blood_donor_system`
2. Set environment variables:
   - `DB_USERNAME`
   - `DB_PASSWORD`
   - `JWT_SECRET` (32+ characters)
3. Run:
   `mvn spring-boot:run`

Backend: `http://localhost:8081`

Swagger: `http://localhost:8081/swagger-ui.html`

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Important security note
Do not commit real database passwords or JWT secrets. The project uses environment variables for both.
Public registration always creates a `DONOR`. Create/promote administrator accounts only through a controlled database/administrative process.

## Academic/project scope
The eligibility screen is a software screening aid, not medical clearance. Actual transfusion and donation decisions must be made by qualified medical professionals and blood banks.

## BloodConnect final workflow

- **Donor Login:** `/login` for normal donor accounts.
- **Admin Login:** `/admin-login` for the separate administrator entry point.
- **Demo admin:** `admin@bloodconnect.gov.in` / `Admin@123` (override with `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables).
- Emergency blood requests can be **created by authenticated donors**, but the request list and compatible donor details are **ADMIN-only**.
- Donor feedback can be submitted by authenticated donors; feedback is **ADMIN-only for viewing**.
- Appointment booking no longer asks users to manually enter a centre ID. It loads verified centres and links the booking to the donor profile associated with the logged-in email.
- Donor registration updates an existing donor profile when the email already exists, avoiding duplicate profiles.
- The donor search page displays the correct compatibility groups for the selected recipient blood group. Example: **B- recipient → B- and O- donors**.
- Eligibility is a pre-screening form covering age, weight, previous donation date and common deferral questions. It is only a demo pre-screen and does not replace clinical assessment.
- The visual theme is intentionally **dark red + white** with a government-portal style layout.
- The seeded directory includes multiple hospital/blood-centre names and demo donor records, including a B- donor in Erode so the compatibility workflow can be demonstrated.
