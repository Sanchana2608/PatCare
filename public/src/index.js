var express=require("express")
var bodyParser=require("body-parser")
const path=require("path")
var mongoose=require("mongoose")
const collection=require("./mongodb")
const alert = require('alert');
var flush=require('connect-flash');
var session=require('express-session');
const {collection1,appointmentcollection,drugcollection,testcollection,billcollection}=require("./patientdb")
const {doctorcollection,prescriptioncollection}=require("./doctordb")
const receptionistcollection=require("./receptionistdb")
let methodOverride= require('method-override')
const { pid } = require("process")

const app=express()
app.set('views', __dirname + '');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended:true
}))
app.use(session({
  secret:'secret',
  cookie:{maxAge:60000},
  resave: false,
  saveUninitialized: false
}));
app.use(flush());

app.use(methodOverride('_method'))



app.get("/signup",(req,res)=>{
  res.render("signup.html")   
})

app.get("/login",(req,res)=>{
  res.render("login.html")   
})

app.get("/add-patient",(req,res)=>{
  res.render("reg.html")   
})
app.get("/add-doc",(req,res)=>{
  res.render("adddoc.html")   
})
app.get("/add-rec",(req,res)=>{
  res.render("addrec.html")   
})

app.get("/book-appointment",(req,res)=>{

  res.render("bookappointment.html")   
})

app.post("/generate", async(req,res)=>{
  var appointmentid=req.body.aid;
  var billid=req.body.bid;
  var patientname=req.body.pname;
  var patientid=req.body.pid;
  var billdate=req.body.billdate;


  const check=await prescriptioncollection.findOne
  ({$and:[{appointmentid:req.body.aid},{patientname:req.body.pname}]});
  var drug=check.drugname;
  var drugdose=check.drugdose;
  var drugi=check.drugnamei;
  var drugdosei=check.drugdosei;
  var testname=check.testname;
  var testnamei=check.testnamei;

  const drugdetails=await drugcollection.findOne({name:drug});
  const drugdetails1=await drugcollection.findOne({name:drugi});
  
  const testdetails=await testcollection.findOne({name:testname});
  const testdetails1=await testcollection.findOne({name:testnamei});

  var drugammount=(drugdetails.ammount*drugdose)+(drugdetails1.ammount*drugdosei);
  var testammount=(testdetails.ammount)+(testdetails1.ammount);
  var doctorfee=250;
  var totalammount=drugammount+testammount+doctorfee;


  res.render('generatebill.html',
  {appointmentid,billid,patientname,patientid,billdate,drugammount,testammount,doctorfee,totalammount})
})


app.post("/savebill", async(req,res)=>{
  var pid=req.body.pid;
  var aid=req.body.aid;
  var patientname=req.body.pname;
  var data={
    "billid":req.body.billid,
    "billdate":req.body.billdate,
    "appointmentid":aid,
    "patientname":patientname,
    "patientid":pid,
    "doctorfee":req.body.doctorfee,
    "drugfee":req.body.drugfee,
    "testfee":req.body.testfee,
    "totalfee":req.body.totalfee
  }
  await billcollection.insertMany([data]);
  alert('bill saved successfully');
})



app.post("/prescription-form",async (req,res)=>{
  var pid=req.body.pid;
  var did=req.body.did;
  var patientname=req.body.name;
  var doctorname=req.body.doctorname;
  

  var drugtype=req.body.drugtype;
  var drugtypei=req.body.drugtypie;
  
  var drugname=req.body.drugname;
  var drugnamei=req.body.drugnamei;
  var drugdose=req.body.drugdose;
  var drugdosei=req.body.drugdosei;

  var drugduration=req.body.drugduration;
  var drugdurationi=req.body.drugdurationi;
  var drugcomment=req.body.drugcomment;
  var drugcommenti=req.body.drugcommenti;

  var testname=req.body.testname;
  var testcomment=req.body.testcomment;
  var testnamei=req.body.testnamei;
  var testcommenti=req.body.testcommenti;

  var data={
    "pid":pid,
    "patientname":patientname,
    "did":did,
    "doctorname":doctorname,
    "appointmentid":req.body.aid,
        
    "drugtype":drugtype,
    "drugname":drugname,
    "drugdose":drugdose,
    "drugduration":drugduration,
    "drugcomment":drugcomment,

    "drugtypei":drugtypei,
    "drugnamei":drugnamei,
    "drugdosei":drugdosei,
    "drugdurationi":drugdurationi,
    "drugcommenti":drugcommenti,

    "testname":testname,
    "testcomment":testcomment,
    "testnamei":testnamei,
    "testcommenti":testcommenti
  }
  await prescriptioncollection.insertMany([data]);
  alert('prescription saved  successfully');
  

})

var appointmentcounter=5;
app.post("/bookap",async (req,res)=>{
  appointmentcounter=appointmentcounter+1;
  var pid=req.body.pid;

  var patientname=req.body.name;
  var phno=req.body.phno;
  var email=req.body.email;
  var speciality=req.body.speciality;
  var doctorname=req.body.doctorname;
  var appointmentdate=req.body.appointmentdate;
  var appointmenttime=req.body.appointmenttime;
  var description=req.body.description;
  var requested="requested";

  var data={
    "appointmentid":appointmentcounter,
    "pid":pid,
    "patientname":patientname,
    "phno":phno,
    "email":email,
    "speciality":speciality,
    "doctorname":doctorname,
    "appointmentdate":appointmentdate,
    "appointmenttime":appointmenttime,
    "description":description,
    "status":requested
  }
  await appointmentcollection.insertMany([data]);
  alert('appointment requested successfully');


})

app.post("/signup",async (req,res)=>{
  var name=req.body.name;
  var password=req.body.password;
  var data={
    "name":name,
    "password":password
  }
  await collection1.insertMany([data]);
  alert('registered successfully');
  res.render('index.html')

})

app.post("/register",async (req,res)=>{
  var pid=req.body.pid;
  var fname=req.body.fname;
  var lname=req.body.lname;
  var password=req.body.password;
  var dob=req.body.dob;
  var age=req.body.age;
  var gender=req.body.gender;
  var bgrp=req.body.bgrp;
  var height=req.body.height;
  var weight=req.body.weight;
  var phno=req.body.phno;
  var email=req.body.email;
  var address=req.body.address;
  var zipcode=req.body.zipcode;
  var chronic=req.body.chronic;
  var allergy=req.body.allergy;

  var data={
    "pid":pid,
    "password":password,
    "firstname":fname,
    "lastname":lname,
    "dob":dob,
    "age":age,
    "gender":gender,
    "bgrp":bgrp,
    "height":height,
    "weight":weight,
    "phno":phno,
    "email":email,
    "address":address,
    "zipcode":zipcode,
    "chronic":chronic,
    "allergy":allergy
  }
  await collection1.insertMany([data]);
  console.log("database saved successfully");
  alert('patient added successfully');
  
})

app.post("/adddoctor",async (req,res)=>{
  var did=req.body.did;
  var fname=req.body.fname;
  var lname=req.body.lname;
  var password=req.body.password;
  var dob=req.body.dob;
  var age=req.body.age;
  var gender=req.body.gender;
  var speciality=req.body.speciality;
  var experience=req.body.experience;
  var education=req.body.education;
  var phno=req.body.phno;
  var email=req.body.email;
  var address=req.body.address;
  var zipcode=req.body.zipcode;


  var data={
    "did":did,
    "password":password,
    "firstname":fname,
    "lastname":lname,
    "dob":dob,
    "age":age,
    "gender":gender,
    "experience":experience,
    "speciality":speciality,
    "education":education,
    "phno":phno,
    "email":email,
    "address":address,
    "zipcode":zipcode
  }
  await doctorcollection.insertMany([data]);
  console.log("database saved successfully");
  alert('doctor added successfully');
  
})


app.post("/addreceptionist",async (req,res)=>{
  var rid=req.body.rid;
  var fname=req.body.fname;
  var password=req.body.password;
  var dob=req.body.dob;
  var age=req.body.age;
  var gender=req.body.gender;
  var experience=req.body.experience;
  var phno=req.body.phno;
  var email=req.body.email;
  var address=req.body.address;


  var data={
    "rid":rid,
    "password":password,
    "fullname":fname,
    "gender":gender,
    "dob":dob,
    "age":age,
    "experience":experience,
    "phno":phno,
    "email":email,
    "address":address
  }
  await receptionistcollection.insertMany([data]);
  console.log("database saved successfully");
  alert('receptionist added successfully');

  
})



app.get("/", (req, res) => {
  res.render("index.html");

}).listen(3000);
console.log("Listening on port 3000");



app.post("/login",async (req, res)=>{
  try{
    if(req.body.role=="admin"){
    const check=await collection.findOne({name:req.body.name});
    
    if(check.password==req.body.password){

      console.log("Login success");
      
      collection1.find().then(patientdata => {
            doctorcollection.find().then(doctordata => {
              receptionistcollection.find().then(receptionistdata =>{
                appointmentcollection.find().then(appointmentdata =>{
                  res.render('dashboard.html', 
                  {x: patientdata, a: doctordata, b:receptionistdata,k:appointmentdata})
                  alert('logged in successfully');
                }).catch(err => console.log(err))
                
            }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
      }

    else{
      console.log("Login failure");
      alert('log in failure');
    }}
    if(req.body.role=="doctor"){
      
      const check=await doctorcollection.findOne({did:req.body.name});
    
      if(check.password==req.body.password){
        console.log("Login success");

        appointmentcollection.find({$and:[{status:"requested"},{doctorname:check.firstname}]}).then(appointmentdata => {
          appointmentcollection.find({$and:[{status:"accepted"},{doctorname:check.firstname}]}).then(scheduled=>{
            res.render("doctordashboard.html",{check, x: appointmentdata,xsc: scheduled})
            alert('logged in successfully');
              }).catch(err => console.log(err))
          }).catch(err => console.log(err))
          
      }
      else{
        console.log("Login failure");
        alert('Invalid log in details');

      }
    }
    if(req.body.role=="receptionist"){
      const check=await receptionistcollection.findOne({rid:req.body.name});
    
      if(check.password==req.body.password){
        appointmentcollection.find().then(prescriptiondata =>{
          console.log("Login success");
          res.render("receptionistdashboard.html",{check,x:prescriptiondata})
          alert('logged in successfully');
        }).catch(err => console.log(err))
        
      }
      else{
        console.log("Login failure");
        alert('Invalid log in details');
      }
    }
    if(req.body.role=="patient"){
      const check=await collection1.findOne({pid:req.body.name});
    
      if(check.password==req.body.password){
        console.log("Login success");
        appointmentcollection.find({pid:req.body.name}).then(appointmentdata => {
          prescriptioncollection.find({pid:req.body.name}).then(prescriptiondata=>{
            res.render("patientdashboard.html",{check, x: appointmentdata,k:prescriptiondata})
            alert('logged in successfully');
          }).catch(err => console.log(err))
          
            }).catch(err => console.log(err))
      }
      else{
        console.log("Login failure");
        alert('Invalid log in details');
      }
    }
  }  
  catch{

    res.send("Invalid details")

  }
});




app.use('/',require('./server/routes/router'))