const express=require('express')
const { connectDb } = require('./config/database')
const app=express()
const cors=require('cors')

const authRouter=require('./routes/authRouter')
const apiRouter=require('./routes/apiRouter')
let msg="hello"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)

app.listen(4000,async()=>{
    try {
        await connectDb();
        msg="connected"
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log('Error connecting to database:');
    }
    console.log("listening on port 4000")
})


app.use("/auth",authRouter);

app.use("/api",apiRouter);

app.get("/",(req,res)=>{
    res.send(msg)
})

app.get("/login",(req,res)=>{
    res.render("login.ejs")
})