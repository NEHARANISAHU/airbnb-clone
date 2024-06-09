const mongoose=require("mongoose");
const initDB=require("./data.js");
const Listing=require("../models/listings.js");

main()
.then(console.log("mongodb is connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

const initDb=async()=>{
   await Listing.deleteMany({});
   await Listing.insertMany(initDB.data);
   console.log("Data was initialized");
}

initDb();