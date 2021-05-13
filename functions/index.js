const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Ipd6ZSIMOJ4cJjWD4B0wuS92XGuviqouAhtxVVINVMBr7U6lMp2Xf7dLclfTasx2UbIJ4ly7ZVLhBNDp7udslLX00Xvb2pQua");

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());


// - API routes
app.get('/', ( request, response ) => response.status(200).send
('hello world'));
app.post('/payment/create', async (request, response) => {
    try{
        const total = request.query.total;

        console.log('Payment Request Recieved BOOM!!! for this amount >>>', total);
    
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "inr",
        });
        console.log(paymentIntent.client_secret);
    
        response.status(201).send({
            clientSecret: paymentIntent.client_secret
        })
    }
    catch(e){
        console.log(e.message);
    }
    
})


// - listen command
exports.api = functions.https.onRequest(app);