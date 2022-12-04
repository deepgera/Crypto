const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
const app = express();
app.use(express.json());
const {AddRate}=require('./services')
const { response } = require("express");
const { Getdate, Getdatetime } = require("./helper");
const dotenv = require('dotenv');
dotenv.config();



app.get("/balance", async (req, res) => {
  const data = await axios.get(
    `https://api.etherscan.io/api?module=account&action=balance&address=${process.env.ADDRESS}&tag=latest&apikey=${process.env.API_KEY}`
  );
  console.log(data.data);
  res.send("balance calculated");
});

app.get("/hit", async (req, res) => {
  axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr")
      .then(response => {
        let tempvalue=JSON.stringify(response.data);
        const myRe2 = new RegExp('((:))\\w+');
        const myArray = myRe2.exec(tempvalue);
        let value=myArray[0];
        value=value.slice(1);
        var date=Getdatetime();
        console.log({Time:date,Price:value});
        const resp=({Time:date,Price:value});
        AddRate(resp).then((data)=>{
          console.log("data added")
        }).catch((err)=>{
            console.log(err)
        })
        res.send(resp);
    }).catch(error => {
        console.log(error);
    });
});

cron.schedule('* */10 * * * *',(async()=>{
    await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr")
      .then(response => {
        let tempvalue=JSON.stringify(response.data);
        const myRe2 = new RegExp('((:))\\w+');
        const myArray = myRe2.exec(tempvalue);
        let value=myArray[0];
        value=value.slice(1);
        var date=Getdatetime();
        console.log({Time:date,Price:value});
        const resp=({Time:date,Price:value});
        AddRate(resp).then((data)=>{
          console.log("data added")
        }).catch((err)=>{
            console.log(err);
            console.log(err.response);
        })
    }).catch(error => {
        console.log(error);
    });
}))

app.listen(5000);
