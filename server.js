const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
const app = express();
app.use(express.json());
const { AddRate, AddResult } = require("./services");
const { response } = require("express");
const { Getdate, Getdatetime } = require("./helper");
const dotenv = require("dotenv");
dotenv.config();

app.get("/balance", async (req, res) => {
  const data = await axios.get(
    `https://api.etherscan.io/api?module=account&action=balance&address=${process.env.ADDRESS}&tag=latest&apikey=${process.env.API_KEY}`
  );
  console.log(data.data);
  res.send("balance calculated",data.data);
});

app.get("/getTransactions", async (req, res) => {
  const data = await axios.get(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API_KEY}`
  );
  console.log(data.data);
  res.send(data.data.result);
});

  let one =`https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API_KEY}` 
  let two =`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr` 
  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);

app.get("/getPrice", async (req, res) => {
  axios.all([requestOne, requestTwo]).then(
    axios.spread((...responses) => {
      const responseTrans = responses[0];
      const responseprice = responses[1];
      console.log(responseTrans.data.result);
      const data1=responseTrans.data.result;
      let tempvalue = JSON.stringify(responseprice.data);
      const myRe2 = new RegExp("((:))\\w+");
      const myArray = myRe2.exec(tempvalue);
      let value = myArray[0];
      value = value.slice(1);
      const price=parseInt(value);
      let balance=0
      data1.map((obj,idx)=>{
        if(obj.to===`${process.env.ADDRESS}`){
          console.log('amount credited : ',obj.value);
          balance =balance+parseInt(obj.value);
        } else if (obj.from==`${process.env.ADDRESS}` && idx!=0){
          console.log('amouont debited :', obj.value);
          balance =balance-parseInt(obj.value);
        }else {
          console.log("balance is zero as no transaction has occured yet, so can't debit amount")
        }
      })
      let obj={Price:price,Balance:balance}
      AddResult(obj)
      res.send(obj);
    }))
    .catch(error => {
      console.log(error);
      res.send(err)
    });
});

cron.schedule("* */10 * * * *", async () => {
  await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr"
    )
    .then(response => {
      let tempvalue = JSON.stringify(response.data);
      const myRe2 = new RegExp("((:))\\w+");
      const myArray = myRe2.exec(tempvalue);
      let value = myArray[0];
      value = value.slice(1);
      var date = Getdatetime();
      console.log({ Time: date, Price: value });
      const resp = { Time: date, Price: value };
      AddRate(resp)
        .then(data => {
          console.log("data added");
        })
        .catch(err => {
          console.log(err);
          console.log(err.response);
        });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(5000);
