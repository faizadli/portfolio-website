This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## Database & Deploy ke Vercel (Gratis)

Proyek ini mendukung penyimpanan data `projects` dan `certificates` memakai Postgres dengan integrasi Vercel Postgres (free tier) melalui paket `@vercel/postgres`.

### Setup Database (Vercel Postgres)
- Buka Dashboard Vercel → Project ini → Storage → Tambahkan Postgres.
- Setelah terpasang, Vercel akan menyediakan environment variables seperti `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, `POSTGRES_USER`, dll.
- Di Settings → Environment Variables, pastikan variabel tersebut tersedia untuk `Production` dan `Preview`.

### Pengembangan Lokal
- Buat file `.env.local` dan salin nilai `POSTGRES_URL` dari Vercel (atau pakai Postgres lokal/Neon):

```
POSTGRES_URL="postgres://<user>:<password>@<host>:<port>/<database>"
```

- Jalankan dev server: `npm run dev`.

### Endpoint API
- `GET /api/projects` → daftar semua projects
- `POST /api/projects` → buat project baru (body JSON: `{ title, description?, url?, tags? }`)
- `GET /api/projects/:id` → detail project
- `PUT /api/projects/:id` → update project
- `DELETE /api/projects/:id` → hapus project

- `GET /api/certificates` → daftar semua certificates
- `POST /api/certificates` → buat certificate baru (body JSON: `{ name, issuer?, issued_at?, url?, skills? }`)
- `GET /api/certificates/:id` → detail certificate
- `PUT /api/certificates/:id` → update certificate
- `DELETE /api/certificates/:id` → hapus certificate

Contoh uji cepat (menggunakan curl):

```
curl http://localhost:3000/api/projects

curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title": "Portfolio Website", "url": "https://example.com", "tags": ["nextjs","ts"]}'
```

### Deploy ke Vercel (Gratis)
- Push repository ini ke GitHub/GitLab.
- Import ke Vercel → Link ke repo.
- Pastikan Storage Postgres terpasang dan ENV otomatis terhubung.
- Deploy. Free plan Vercel + Vercel Postgres (Neon) cukup untuk skenario CRUD ringan.
