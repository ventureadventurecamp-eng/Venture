# Venture Adventure • independent booking & accounts

This is a portable version for your own hosting account. It has **no ChatGPT login, Sites access policy, Workers or D1 dependency**. It has not been deployed externally yet. The old site is a separate deployment and is not modified by this package.

## What is included

- Gmail email + a new **Venture password** signup/login (not Google OAuth; never enter a Gmail password).
- Every signup starts **pending**. Admin approves and assigns Staff + Branch, or B2B + Company.
- Pending/rejected/disabled users cannot book. Disabling a user revokes sessions.
- Approved staff and B2B see seat availability and their booking form only. They cannot fetch passenger lists, accounts, payment data or admin routes.
- Admin has the existing accounts, expense, B2B company, payment, passenger Excel and approval screens.
- 7–15 November 2026 daily departures, configurable per bus as 49 or 45 seats, ₹9,000 / ₹8,000 / ₹7,000 for 2/3/4 sharing; additional tour/date/rate editing, multiple buses per tour/date, and a booking-only tour → date → bus → seat flow.
- Seat conflict protection through atomic database compare-and-swap.
- Persistent SQLite, password hashing using scrypt, hashed session tokens, HttpOnly/Secure cookies, same-origin mutation checks and login throttling.

## Deployment target

Use a **single Node/Docker server with a persistent disk**. A Render Blueprint (`render.yaml`) and Docker Compose + HTTPS proxy are included. A Google Compute Engine VM can also run the Docker Compose version.

Do not put this SQLite build on an ephemeral/serverless filesystem or scale to multiple application instances. Firebase Hosting/Google Sites static hosting alone cannot run this server. A different database adapter would be required for Cloud Run horizontal scaling.

## Render

1. Push this directory to your private Git repository, then use **New → Blueprint** in your Render account and select the repo.
2. The template requests a persistent disk and a paid `starter` service. **Review provider pricing and approve the plan in your account before deployment.** Nothing has been purchased or created automatically.
3. Set `ADMIN_EMAIL` to your admin Gmail address, `DB_PATH=/data/venture.sqlite` and `APP_ORIGIN=https://YOUR-SERVICE.onrender.com` (your actual assigned URL).
4. After deploy, use the service shell: `node scripts/create-admin.mjs`. It prompts for the admin password without printing it. The email must match `ADMIN_EMAIL`.
5. Open the external `/login` URL, log in as admin and start the workspace. Add your branch/company accounts.
6. Staff/B2B users sign up at `/login`. In **Settings → Signup approvals**, assign their account and approve. No Site sharing permission is required.

## Own VPS / Google Compute Engine VM

1. Install Docker and Compose on the VM; point a domain's DNS at its public IP.
2. Create a local `.env` containing `ADMIN_EMAIL=your-admin@gmail.com` and `DOMAIN=bookings.yourdomain.com`.
3. Allow inbound ports 80 and 443; keep port 3000 private.
4. Run `docker compose up -d --build`. Caddy obtains HTTPS certificates for your domain.
5. Run `docker compose exec app node scripts/create-admin.mjs`, using the same admin email.
6. Log in at `https://YOUR-DOMAIN/login`.

## Local development

Node 22.13+ or Node 24 LTS:

```sh
npm ci
export ADMIN_EMAIL=your-admin@gmail.com
export APP_ORIGIN=http://localhost:3000
export DB_PATH=./data/venture.sqlite
npm run create-admin
npm run dev
```

Use HTTPS for production. Production cookies are Secure and will not work on ordinary HTTP.

## Existing records

This package contains code and the departure configuration, **not your live database or personal records**. Your previous site’s records have not been copied or deleted. Export/migrate them explicitly before switching production traffic. Do not run two public booking systems for the same bus while they use separate databases.

A server-only `scripts/import-workspace.mjs` imports a trusted workspace JSON into the admin account. It backs up the current workspace row before replacing it, validates the seat and expense structures and reassigns the workspace owner. It does not import users or sessions. Run it only after provisioning the admin. Excel reports alone may not contain all data required for a complete migration.

## Password/admin recovery

Run `node scripts/create-admin.mjs` again in the server shell to reset the admin password and revoke admin sessions. Ordinary user password reset/email verification is **not integrated**. Admin should verify each user's identity before approval. Gmail addresses are validated syntactically, not via a Google email ownership check. Email reset links would require configuring an email provider or Firebase Auth.

## Backups

Back up the persistent database using SQLite's backup API/snapshots, and test restores. Never delete the Render disk or Docker data volume to redeploy. Keep database files, `.env`, session tokens and passwords out of Git and public downloads.

## Verification

Run `npm test` and `npm run build`. The package includes business calculation, seat privacy, duplicate seat and authentication tests. The production login/signup/approval/booking flow is also checked locally with test-only accounts. External hosting, DNS, HTTPS and real user sign-in still require verification in your chosen account.

## Provider references

- Next.js self-hosting: https://nextjs.org/docs/app/guides/self-hosting
- Render Blueprint reference: https://render.com/docs/blueprint-spec
- Render persistent disks: https://render.com/docs/disks
- Google Compute Engine containers: https://docs.cloud.google.com/compute/docs/containers

## 45-seat buses and additional buses

In Admin → Bus bookings, select a tour/date/bus and choose **Edit date / bus / rates**. Set 45 seats and select which of the eleven 4-seat rows to remove. The five-seat rear row stays. You may preserve original seat numbers (with a gap) or, on an unbooked bus, number the remaining seats 1–45. The editor previews the resulting layout.

A booked row cannot be removed. Use the admin manifest seat dropdown to move its passengers to free seats first. The server checks availability atomically. Numbering cannot be changed on a bus with reservations. Products sharing the same physical bus reference receive the same layout change together.

Use **Add another bus** to add Bus 2 on the same tour/date. Its capacity and seat occupancy are independent. Use **Add departure / tour** for an entirely new tour or date. Approved staff/B2B users see only Tour, Date, Bus, the seat map and booking form. No admin navigation, manifests, payment controls or configuration actions are sent to their page.
