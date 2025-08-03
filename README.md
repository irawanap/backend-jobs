🔐 Backend Jobs API

API ini menyediakan fitur otentikasi pengguna dan manajemen lowongan kerja (Jobs) menggunakan Node.js, Express.js, dan Prisma ORM.
🚀 Fitur

    ✅ Register & Login pengguna dengan validasi

    ✅ Autentikasi JWT (middleware protect)

    ✅ Buat lowongan pekerjaan (/api/jobs/create)

    ✅ Lihat semua pekerjaan (hanya user yang login)

    ✅ Lihat detail pekerjaan berdasarkan ID

    ✅ Struktur modular (routes, controllers, services, middleware)

    ✅ Logging middleware custom

    ✅ Validasi input pakai express-validator

🏗️ Arsitektur Folder

.
├── controllers/
│   ├── auth.controller.js
│   ├── job.controller.js
├── routes/
│   ├── auth.route.js
│   ├── job.route.js
├── services/
│   ├── job.service.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── validation.middleware.js
├── utils/
│   ├── logger.js
├── prisma/
│   ├── schema.prisma
├── test/
│   ├── jest.test.js
│   ├── setup.js
├── server.js
├── .env
├── package.json

📦 Instalasi

git clone https://github.com/username/backend-jobs-api.git
cd backend-jobs-api
npm install

⚙️ Setup Environment

Buat file .env dan isi:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret

Lalu jalankan Prisma:

npx prisma generate
npx prisma migrate dev --name init

🧪 Menjalankan Server

npm run dev

🧪 Testing (Jest)

npm test

🧾 Endpoint API
🔐 Auth

    POST /api/auth/register – Register user baru
    Body:

{
  "email": "user@example.com",
  "password": "password123"
}

POST /api/auth/login – Login dan dapatkan token
Body:

    {
      "email": "user@example.com",
      "password": "password123"
    }

🧑‍💼 Jobs (dengan token)

Tambahkan token JWT ke Authorization header:
Authorization: Bearer <token>

    GET /api/jobs/ – Lihat semua pekerjaan

    GET /api/jobs/:id – Lihat detail pekerjaan

    POST /api/jobs/create – Tambah pekerjaan
    Body:

    {
      "title": "Frontend Developer",
      "description": "Deskripsi pekerjaan",
      "location": "Jakarta"
    }

📮 Contoh Test Postman

Import collection JSON yang sudah disiapkan di folder test/postman_collection.json (jika tersedia), atau tes manual seperti:

    Register → Login → Copy token

    Buat job (pakai token)

    Lihat semua job → GET /api/jobs

    Cek satu job → GET /api/jobs/1

🛡️ License

MIT © 2025 - Irawan Aji Pangestu
