const mongoose=require('mongoose');
const mongoURI="mongodb+srv://itenthusiastic37:2OB415FHaaiNUuPw@cluster0.xjiempt.mongodb.net/Cluster0";
async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
module.exports=connectToMongo;
