const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./routers/todo.routes')

dotenv.config({ path: './config.env' })

const db = process.env.DB
mongoose.set('strictQuery', true)
mongoose.connect(db, {
    useNewUrlParser: true,
}).then(() => console.log("--------DB Connected successfully--------")).catch((err) => console.log(err));

app.use(bodyParser.json())
app.use(cors())
app.use('/', router)

const port = process.env.PORT || 5100
app.listen(port, () => {
    console.log(`Server is runnig on http://localhost:${port} ...`);
})