# design & print — Cloudflare Pages + Functions + D1

This is the Wrangler-ready rebuild. It uses static HTML/CSS/JavaScript, a Cloudflare Pages Function and Cloudflare D1. No PHP and no frontend build command are required.

## Pages
- `/` Home
- `/designing` Designing
- `/printing` Printing
- `/digital` Digital services
- `/contact` Contact form

## Deploy with Wrangler
Prerequisites: Node.js LTS and an active Cloudflare account.

1. Unzip this project and open a terminal in its root folder.
2. Install Wrangler: `npm install`
3. Authenticate: `npx wrangler login`
4. Create the D1 database: `npx wrangler d1 create design-and-print-db`
5. Copy the `database_id` shown by Cloudflare into `wrangler.jsonc`, replacing `REPLACE_WITH_YOUR_D1_DATABASE_ID`. Keep the binding name `DB`.
6. Create the table remotely: `npx wrangler d1 execute design-and-print-db --remote --file=./schema.sql`
7. Test locally: `npm run dev`
8. Deploy: `npm run deploy`

The project root contains both `public/` and `functions/`. Deploy the **project root using Wrangler**, not just the `public` folder: the function must be uploaded too.

## Git-connected Pages setup
If connecting a Git repository in Cloudflare Pages, set the build output directory to `public`, with no build command. In Pages project settings, add a D1 database binding:
- Variable name: `DB`
- Database: `design-and-print-db`

Make sure the `functions/` directory remains at the repository root alongside `public/`.

## Enquiry form
The form sends JSON to `POST /api/enquiry`. `functions/api/enquiry.js` validates input and inserts it into the `enquiries` table using a parameterized statement. It includes a honeypot field. The form stores submissions in D1; it does not send email notifications.

View enquiries:
`npx wrangler d1 execute design-and-print-db --remote --command="SELECT id, full_name, email, telephone, service, created_at FROM enquiries ORDER BY created_at DESC;"`

## Before launch
- Replace the D1 ID placeholder.
- Add a privacy policy explaining collection, use, retention and contact rights for submitted customer data.
- Test a real submission and verify the record in D1.
- Connect your custom domain in Pages and check HTTPS.
- Add your own portfolio photography or licensed images. Current product visuals are CSS mockups.
- Confirm print stocks, silk/gloss finishes, prices, quantities and delivery times before advertising them as guaranteed.
- Set up backups and restrict access to Cloudflare and the database.

The D1 database is separate from your existing MySQL database. This deployment writes enquiries to Cloudflare D1.
