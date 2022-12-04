const { default: mongoose } = require("mongoose")
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.rdcdm.mongodb.net/crypto?retryWrites=true&w=majority`).then(()=>{
    console.log("connnected")
}).catch( (err)=> {
    console.log(err)
})

const RateSchema= new mongoose.Schema({
    Time:String,
    Price:String,
})
 


module.exports=mongoose.model('rate',RateSchema)