const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/patcare")
.then(()=>{
  console.log("Mongodb connected");
})
.catch(()=>{
  console.log("Failed to connect");
})

const receptionistschema=new mongoose.Schema({
  rid:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  fullname:{type:String},
  gender:{type:String},
  dob:{type:Date},
  age:{type:Number},
  experience:{type:Number},
  phno:{type:Number},
  email:{type:String},
  address:{type:String}
})

const receptionistcollection=new mongoose.model("receptionist",receptionistschema)

module.exports=receptionistcollection