const express = require('express');
const router = require('./routes/userRoute');
const app = express()
const bodyParser = require('body-parser')
const logger = require('./utils/logger')

const port = 5000;

app.use(logger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})


