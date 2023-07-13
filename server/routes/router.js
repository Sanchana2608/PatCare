var express=require("express")
var bodyParser=require("body-parser")
const {collection1,appointmentcollection} = require("../../patientdb")
const {doctorcollection,prescriptioncollection} = require("../../doctordb")
const receptionistcollection = require("../../receptionistdb")
const route=express.Router()
const alert = require('alert');

  
  route.get("/edit/:pid",(req,res)=>{
    collection1.findOne({pid:req.params.pid})
    .then((x)=>{
      res.render('edit.html', {x}) 
    })
  })

  route.get("/edit-doc/:did",(req,res)=>{
    doctorcollection.findOne({did:req.params.did})
    .then((x)=>{
      res.render('editdoctor.html', {x}) 
    })
  })

  route.get("/edit-rec/:rid",(req,res)=>{
    receptionistcollection.findOne({rid:req.params.rid})
    .then((x)=>{
      res.render('editreceptionist.html', {x}) 
    })
  })

  route.get("/edit-appointment/:_id",(req,res)=>{
    appointmentcollection.findOne({_id:req.params._id})
    .then((x)=>{
      res.render('acceptappointment.html', {x}) 
    })
  })
  route.put('/edit-appointment/:_id', (req, res) => {
    appointmentcollection.updateOne({_id:req.params._id}, {$set:{
      status:"accepted" } })
      .then((x)=>{
        console.log("appointment accepted  successfully")
        alert('appointment accepted successfully');
       })
    
    });
    route.get("/reject-appointment/:_id",(req,res)=>{
      appointmentcollection.findOne({_id:req.params._id})
      .then((x)=>{
        res.render('rejectappointment.html', {x}) 
      })
    })
    route.put('/reject-appointment/:_id', (req, res) => {
      appointmentcollection.updateOne({_id:req.params._id}, {$set:{
        status:"rejected" } })
        .then((x)=>{
          console.log("appointment rejected successfully ")
          alert('appointment rejected successfully');
         })
      
      });

  
  route.get('prescription-details/:appointmentid', (req, res) => {
    console.log(appointmentid)
    prescriptioncollection.findOne({appointmentid:req.params.appointmentid})
      .then((x)=>{
        res.render('prescription.html', {x}) 
       })
      })


  
 
  route.put('/edit/:pid', (req, res) => {
    collection1.updateOne({pid:req.params.pid}, {$set:{
      password:req.body.password,
      firstname:req.body.fname,
      lastname:req.body.lname,
      dob:req.body.dob,
      age:req.body.age,
      gender:req.body.gender,
      bgrp:req.body.bgrp,
      height:req.body.height,
      weight:req.body.weight,
      phno:req.body.phno,
      email:req.body.email,
      address:req.body.address,
      zipcode:req.body.zipcode,
      chronic:req.body.chronic,
      allergy:req.body.allergy
    } })
    .then((x)=>{
      console.log("edited successfully")
      alert('patient edited successfully');
     })
  
  });

  route.put('/edit-doc/:did', (req, res) => {
    doctorcollection.updateOne({did:req.params.did}, {$set:{
      password:req.body.password,
      firstname:req.body.fname,
      lastname:req.body.lname,
      dob:req.body.dob,
      age:req.body.age,
      gender:req.body.gender,
      education:req.body.education,
      experience:req.body.experience,
      speciality:req.body.speciality,
      phno:req.body.phno,
      email:req.body.email,
      address:req.body.address,
      zipcode:req.body.zipcode
    } })
    .then((x)=>{
      console.log("edited successfully")
      alert('doctor edited successfully');
     })
  
  });

  route.put('/edit-rec/:rid', (req, res) => {
    receptionistcollection.updateOne({rid:req.params.rid}, {$set:{
      password:req.body.password,
      fullname:req.body.fname,
      dob:req.body.dob,
      age:req.body.age,
      gender:req.body.gender,
      experience:req.body.experience,
      phno:req.body.phno,
      email:req.body.email,
      address:req.body.address
    } })
    .then((x)=>{
      console.log("edited successfully")
      alert('receptionist edited successfully');
     })
  
  });


  route.delete('/delete-rec/:rid', (req, res) => {
    receptionistcollection.deleteOne({rid:req.params.rid})
    .then((y)=>{
      console.log("deleted successfully ")
      alert('receptionist deleted successfully');

     })
 
  });

  
  route.delete('/delete-doc/:did', (req, res) => {
    doctorcollection.deleteOne({did:req.params.did})
    .then((x)=>{
      console.log("deleted successfully successfully")
      alert('doctor deleted successfully');
     })
 
  });

  route.delete('/delete-pat/:pid', (req, res) => {
    collection1.deleteOne({pid:req.params.pid})
    .then((y)=>{
      console.log("deleted successfully successfully")
      alert('patient deleted successfully');
     })
 
  });



  


  module.exports=route
