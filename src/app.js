const express=require('express')
require("./db/conn");
const {Note, User} = require("./db/models/Schema");
const jwt = require('jsonwebtoken');
//acquriring route
const route=require('./routers/routes')


const app=express()


const PORT=process.env.PORT||3000

app.use(express.json());
app.use(route)





app.listen(PORT, () => console.log('Server running on port 3000'));