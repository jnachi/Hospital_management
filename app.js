const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const ObjectId=mongodb.ObjectID

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views',path.join(__dirname, 'views'))
app.set('view engine','hbs')

global.gusername=" "
global.dep=" "

router.get('',function(req,res){
    res.sendFile(path.join(__dirname,'/public/Home.html'));
  
});

router.get('/Hospital',function(req,res){
    res.sendFile(path.join(__dirname,'/public/Hospital.html'));
  
});

router.get('/Patientlogin',function(req,res){
    res.sendFile(path.join(__dirname,'/public/Patientlogin.html'));
    gusername=" "
    dep=" "
  
});

router.get('/Newaccount',function(req,res){
    res.sendFile(path.join(__dirname,'/public/Newaccount.html'));
  
});

router.get('/Patient',function(req,res){
    res.sendFile(path.join(__dirname,'/public/Patient.html'));
});

router.get('/Appointment',function(req,res){
    res.render("Appointment") 
});

router.get('/Clinicallogin',function(req,res){
    res.sendFile(path.join(__dirname,'/public/Clinicianlogin.html'));
});

router.get('/Adminlogin',function(req,res){
    res.sendFile(path.join(__dirname,'/public/Adminlogin.html'));  
});

router.post('/contactus', function(req, res){
    var details = req.body;
    console.log(details)
        res.sendFile(path.join(__dirname,'/public/home1.html'));
        const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('contactus').insertOne(details , (err, result) => {
        if (err){
          return console.log('Unable to insert', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
      });
})  
});


router.post('/newpatient', function(req, res){
    var details = req.body;
    console.log(details)
        res.sendFile(path.join(__dirname,'/public/Home.html'));
        const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('Patient').insertOne(details , (err, result) => {
        if (err){
          return console.log('Unable to insert', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
      });
})  
});

router.post('/patientlog', function(req, res){
    var details = req.body;
    console.log(details)
        const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('Patient').findOne({username : details.username}, function(err, result){
        if(result ===null){
            res.end("Login invalid");
         }else if (result.username === req.body.username && result.password === req.body.password){
             gusername=req.body.username
         res.render("Patient");
       } else {
        res.sendFile(path.join(__dirname,'/public/Patientlogin.html'));
       }

      });
})  
});

router.post('/PatientApp', function(req, res){
    var details = req.body;
    details["username"]=gusername
    console.log(gusername)
    
        const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    
    db.collection('Appointment').insertOne(details , (err, result) => {
        if(result ===null){
            res.end("Login invalid");         
       } else {
        console.log(details)
        res.render("Patient");
       }
      });
})  
});

router.get('/viewappointment',function(req,res){
    res.render("viewappointment") 
});

router.get('/viewdata',function(req,res){
    const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log(gusername)


    const db = client.db(databaseName)
    var query = { username: gusername };
    db.collection('Appointment').find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });

})
});

router.get('/deleteappointment',function(req,res){
    res.render("deleteappointment") 
});

router.post('/delete1appointment',function(req,res){
    var d=JSON.parse(JSON.stringify(req.body))
    // console.log(d[0])
    const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)
    console.log((d[a]))
    for(var a=0;a<d.length;a++){
        var myquery = { _id: ObjectId (d[a]) };
        db.collection("Appointment").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
    });
    }
     
});
res.render("deleteappointment")
});

router.get('/editpatientroute',function(req,res){
    res.render("editpatient") 
});

router.post('/editpatient', function(req, res){
    var details = req.body;
    console.log(details)
        
        const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    var myquery = { username: gusername };
  var newvalues = { $set: details };
  db.collection("Patient").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
  });

})
res.render("Patient");  
});

router.post('/adminlog', function(req, res){
    var details = req.body;
    console.log(details)
        const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('Admin').findOne({username : details.username}, function(err, result){
        if(result ===null){
            res.end("Login invalid");
         }else if (result.username === req.body.username && result.password === req.body.password){
             gusername=req.body.username
         res.sendFile(path.join(__dirname,'/public/Admin.html'));
       } else {
        res.sendFile(path.join(__dirname,'/public/Adminlogin.html'));
       }

      });
})  
});

router.get('/accountdata',function(req,res){
    const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log(gusername)


    const db = client.db(databaseName)
    db.collection('Patient').find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });

})
});

router.get('/viewaccounts',function(req,res){
    res.render("accountview") 
});

router.get('/deleteaccount',function(req,res){
    res.render("deleteaccount") 
});

router.post('/delete1account',function(req,res){
    var d=JSON.parse(JSON.stringify(req.body))
    // console.log(d[0])
    const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)
    console.log((d[0]))
    for(var a=0;a<d.length;a++){
        var myquery = { _id: ObjectId (d[a]) };
        db.collection("Patient").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
    });
    }
     
});
res.render("deleteappointment")
});

router.post('/adddoc', function(req, res){
    var details = req.body;
    console.log(details)
        res.sendFile(path.join(__dirname,'/public/Admin.html'));
        const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('Doctor').insertOne(details , (err, result) => {
        if (err){
          return console.log('Unable to insert', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
      });
})  
});

router.get('/docdata',function(req,res){
    const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log(gusername)


    const db = client.db(databaseName)
    db.collection('Doctor').find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });

})
});

router.get('/viewdoc',function(req,res){
    res.render("viewdoc") 
});

router.get('/deldoc',function(req,res){
    res.render("deletedoc") 
});

router.post('/delete1doc',function(req,res){
    var d=JSON.parse(JSON.stringify(req.body))
    // console.log(d[0])
    const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)
    console.log((d[0]))
    for(var a=0;a<d.length;a++){
        var myquery = { _id: ObjectId (d[a]) };
        db.collection("Doctor").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
    });
    }
     
});
res.render("deletedoc")
});

router.post('/cliniclog', function(req, res){
    var details = req.body;
    console.log(details)
        const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('Doctor').findOne({username : details.username}, function(err, result){
        if(result ===null){
            res.end("Login invalid");
         }else if (result.username === req.body.username && result.password === req.body.password){
             gusername=req.body.username
             dep=result.hosdepartments
             res.sendFile(path.join(__dirname,'/public/Clinician.html'));
       } else {
        res.sendFile(path.join(__dirname,'/public/Clinicianlogin.html'));
       }

      });
})  
});

router.get('/clinicdata',function(req,res){
    const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Project'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log(dep)


    const db = client.db(databaseName)
    var query = { hosdepartments: dep };
    db.collection('Appointment').find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });

})
});
router.get('/viewclinic',function(req,res){
    res.render("clinicview") 
});

router.get('/delclininic',function(req,res){
    res.render("deleteclinic") 
});

app.use('/', router);

app.listen(process.env.port || 3000);