require('dotenv').config();

const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');

const port = process.env.PORT || 5000

app.use(logger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack) // Log the error stack for debugging
  res.status(500).send("Something broke!")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})


