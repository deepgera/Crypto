const { default: mongoose } = require("mongoose")

mongoose.connect('mongodb://localhost:27017/nodejspractice').then(()=>{
    console.log("connnected")
}).catch( (err)=> {
    console.log(err)
})

const RateSchema= new mongoose.Schema({
    Time:String,
    Price:String,
})
 


module.exports=mongoose.model('rate',RateSchema)