const express=require("express");
const app=express();
const mongoose=require("mongoose");
const port=3000;
const Listing=require("./models/listings.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));


app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})

main()
.then(console.log("mongodb is connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

app.get("/",(req,res)=>{
    res.send("Hi! I am root");
})

app.delete("/listings/:id",async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listing");
})

app.get("/listing/:id/edit",async(req,res)=>{
  let {id}=req.params;
  let listings=await Listing.findById(id);
  res.render("edit.ejs",{listings});
})

app.put("/listings/:id",async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listing/${id}`);
})

app.post("/listing",async(req,res)=>{
  let listing=new Listing(req.body.listing);
  await listing.save();
  res.redirect("/listing");
})

app.get("/listing",async(req,res)=>{
    let Alllistings=await Listing.find({});
    res.render("index.ejs",{Alllistings});
})


app.get("/listing/new",(req,res)=>{
  res.render("new.ejs");
})

app.get("/listing/:id",async (req,res)=>{
  let {id}=req.params;
  let listings=await Listing.findById(id);
  res.render("show.ejs",{listings});
})