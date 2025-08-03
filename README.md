<h1 align="center">💼 Job Tracking API</h1>

<p align="center">
  A simple RESTful API for managing tracking jobs apply, built with <b>Express.js</b>, <b>Prisma ORM</b>, and <b>PostgreSQL</b>.
</p>

---

## 📦 Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JSON Web Token (JWT)
- Middleware: body-parser, dotenv, etc.

---

## 📂 Folder Structure

```bash
.
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   └── job.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── routes/
│   ├── auth.route.js
│   ├── user.route.js
│   └── job.route.js
├── services/
│   └── job.service.js
├── test/
│   ├── jest.test.js
│   └── setup.js
├── prisma/
│   └── schema.prisma
├── utils/
│   └── logger.js
├── .env
├── server.js
└── README.md

## 🌐 API Endpoint

Project ini telah dideploy menggunakan **Railway**.

> 🟢 Base URL: `https://backend-jobs.railway.internal`

### Contoh Endpoint:
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/` | Tes koneksi server |
| `POST` | `/api/auth/register` | Register user baru |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/users` | Dapatkan semua data user |
| `POST` | `/api/jobs/create` | Tambahkan job baru |
| `GET` | `/api/jobs/:id` | Dapatkan detail job berdasarkan ID |
| `GET` | `/api/jobs` | Dapatkan semua job |

Kamu bisa menggunakan tools seperti **Postman** atau **cURL** untuk menguji endpoint-endpoint tersebut.
