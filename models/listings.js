const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ListingSchema=new Schema({
    title:{
    type:String,
    required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/a-palm-tree-is-silhouetted-against-a-cloudy-sky-1EZvmpxwkQ0",
        set:(v) => v ===""? "https://unsplash.com/photos/a-palm-tree-is-silhouetted-against-a-cloudy-sky-1EZvmpxwkQ0":v,
    },
    price:Number,
    location:String,
    country:String  
})

const Listing=mongoose.model("Listing",ListingSchema);
module.exports=Listing;