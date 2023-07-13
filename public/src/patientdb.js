const { Timestamp } = require("mongodb");
const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/patcare")
.then(()=>{
  console.log("Mongodb connected");
})
.catch(()=>{
  console.log("Failed to connect");
})

const drugschema=new mongoose.Schema({
  name:{type:String},
  ammount:{type:Number}
})

const testschema=new mongoose.Schema({
  name:{type:String},
  ammount:{type:Number}
})

const billschema=new mongoose.Schema({
  billid:{type:String},
  billdate:{type:String},
  appointmentid:{type:String},
  patientname:{type:String},
  patientid:{type:String},
  doctorfee:{type:Number},
  drugfee:{type:Number},
  testfee:{type:Number},
  totalfee:{type:Number}

})

const patientnschema=new mongoose.Schema({
  pid:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  firstname:{type:String},
  lastname:{type:String},
  dob:{
    type:Date
  },
  age:{
    type:Number
  },
  gender:{type:String},
  bgrp:{type:String},
  height:{type:Number},
  weight:{type:Number},
  phno:{type:Number},
  email:{type:String},
  address:{type:String},
  zipcode:{type:Number},
  chronic:[{type:String}],
  allergy:[{type:String}]

})

const appointmentschema=new mongoose.Schema({
  appointmentid:{type:String},
  pid:{
    type:String,
    required:true
  },
  patientname:{type:String},
  phno:{type:Number},
  email:{type:String},
  speciality:{type:String},
  doctorname:{type:String},
  appointmentdate:{type:String},
  appointmenttime:{type:String},
  description:{type:String},
  status:{type:String}
})

const collection1=new mongoose.model("patient",patientnschema)
const appointmentcollection=new mongoose.model("appointment",appointmentschema)
const drugcollection=new mongoose.model("drug1",drugschema)
const testcollection=new mongoose.model("test",testschema)
const billcollection=new mongoose.model("bill",billschema)
module.exports={collection1,appointmentcollection,drugcollection,testcollection,billcollection}