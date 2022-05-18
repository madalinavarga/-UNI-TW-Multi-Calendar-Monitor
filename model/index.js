const mongoose = require("mongoose");

async function initDB() {
  const uri =
    "mongodb+srv://student:student1234@tw.le9r8.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to DB!'))
    .catch(err => console.log('DB conn error:' + err))
}
  
module.exports = {
  initDB,
};
