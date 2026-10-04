import dns from "dns";
dns.setServers(["8.8.8.8","8.8.4.4"]);
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/dbConfig.js";
import apiRoute from "./routes/apiRoute.js"
import ip from "ip";
import rateLimit from "express-rate-limit";

const app = express();
// rate limiter to limit the number
//  of requests from a single IP address
const ratelimiter=rateLimit({
    windowMs:5*60*1000,//5 min
    max:50,//max 50 requests in 5 min
});

app.use(ratelimiter);// apply rate limiter to all requests
app.use(express.json());

app.get('/',(req,res)=>{
    const ipaddr=ip.address();
    return res.status(200).json({
        success:true,
        message:"Welcome to Social Media API",
        ip:ipaddr
})
});

app.use('/api',apiRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
    connectDB();
});

// client --> make a req  LoadBalancer ----> server1,server2,