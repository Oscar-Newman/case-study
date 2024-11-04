require('dotenv').config()

const chalk = require('chalk')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const databaseRoutes = require('./src/app/databaseRoutes');

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres REST API developed for case-study.' })
})

app.use(databaseRoutes)

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(chalk.blueBright(`\nApp running on port`) + chalk.yellowBright(` ${port}.`))
})