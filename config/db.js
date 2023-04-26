const mongoose = require('mongoose');
const colors = require('colors');


//connect to mongoDB 
const connectDB = async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDB Database ${mongoose.connection.host}`.bgMagenta.white) //if you write :-> mongoose.connection.host than you can know the host name and port no.
    } catch (error) {
        console.log(`mongoDB connection error ${error}`.bgRed.white)  //if you write :->error in console so you can see the actual error
    }
} 


module.exports = connectDB;