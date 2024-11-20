
const express=require("express");
const mongoDB= require("./db/conexion.js")
const path= require("path")
const authRoutes=require("./routes/authRoutes.js")
const userRoutes=require("./routes/userRoutes.js")
const postRoutes=require("./routes/postRoutes.js")
const notificationRoutes=require("./routes/notificationRoutes.js")
const cloudinary=require("cloudinary");
const dotenv =require("dotenv");
const cookieParser = require('cookie-parser')

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

let app=express();
//app.use(cors());
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const port = process.env.PORT || 5000;
const dirname=path.resolve();
//console.log("dirname: ",dirname)


app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/notifications",notificationRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirname,"frontend","dist","index.html"))
    })
}

app.get('/', async function (req, res) {
   
                
        //await mongoDB.connect(process.env.mongo_uri)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.send(`ok`);
  

});

async function messageServer() {

    console.log(`Server is running at http://localhost:${port}`);

}


module.exports = { app, port, messageServer };