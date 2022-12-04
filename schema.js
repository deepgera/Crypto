const { default: mongoose } = require("mongoose")

mongoose.connect('mongodb+srv://deepak:deepak123@cluster0.rdcdm.mongodb.net/crypto?retryWrites=true&w=majority').then(()=>{
    console.log("connnected")
}).catch( (err)=> {
    console.log(err)
})

const RateSchema= new mongoose.Schema({
    Time:String,
    Price:String,
})
 


module.exports=mongoose.model('rate',RateSchema)