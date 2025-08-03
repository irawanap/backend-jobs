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
