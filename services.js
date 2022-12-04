const Model = require('./schema');

async function AddRate(body){
    const res=await Model.insertMany(body);
    console.log(res);
    return res;
}

module.exports = {AddRate}