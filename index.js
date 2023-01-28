require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;
let bodyParser = require('body-parser');
let helmet = require('helmet');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors())
app.use(express.json());
app.set("view engine", "ejs");
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));
app.use('/', express.static('/'));

const routes = require('./routes/routes');
const routesU15 = require('./routes/routesU15');
const routesOstseeliga = require('./routes/routesOstseeliga');

app.use('/', routes)
app.use('/u15', routesU15)
app.use('/ostseeliga', routesOstseeliga)

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})