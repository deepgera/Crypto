const { Rate,Result} =require('./schema');


async function AddRate(body) {
  const res = await Rate.insertMany(body);
  console.log(res);
  return res;
}

async function AddResult(body) {
  const res = await Result.insertMany(body);
  console.log(res);
  return res;
}


module.exports={ AddRate, AddResult };
