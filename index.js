const express= require('express')
const mongoose=require('mongoose')
const routes= require('./routes')

const app=express()
app.use(express.json())

// connecting mongo
mongoose.connect('mongodb://localhost:27017/stock-management',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('mongo connected'))

app.use('/api',routes)

app.listen(3000,()=>console.log('serving on port 3k'))