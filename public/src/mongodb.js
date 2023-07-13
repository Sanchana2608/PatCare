const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/patcare")
.then(()=>{
  console.log("Mongodb connected");
})
.catch(()=>{
  console.log("Failed to connect");
})

const loginschema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }

})

const collection=new mongoose.model("loginusers",loginschema)

module.exports=collection