const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/patcare")
.then(()=>{
  
})
.catch(()=>{
  console.log("Failed to connect");
})

const doctorschema=new mongoose.Schema({
  did:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  firstname:{type:String},
  lastname:{type:String},
  gender:{type:String},
  speciality:{type:String},
  dob:{type:Date},
  age:{type:Number},
  experience:{type:Number},
  education:{type:String},
  phno:{type:Number},
  email:{type:String},
  address:{type:String},
  zipcode:{type:Number}
})

const prescriptionschema=new mongoose.Schema({
  pid:{type:String},
  patientname:{type:String},
  did:{type:String},
  doctorname:{type:String},
  drugtype:{type:String},
  drugname:{type:String},
  drugdose:{type:Number},
  drugduration:{type:String},
  drugcomment:{type:String},
  drugtypei:{type:String},
  drugnamei:{type:String},
  drugdosei:{type:Number},
  drugdurationi:{type:String},
  drugcommenti:{type:String},
  testname:{type:String},
  testcomment:{type:String},
  testnamei:{type:String},
  testcommenti:{type:String}
})


const doctorcollection=new mongoose.model("doctor",doctorschema)
const prescriptioncollection=new mongoose.model("prescription",prescriptionschema)

module.exports={doctorcollection,prescriptioncollection}