const express = require('express');
const mongoose = require('mongoose');
const UserDB = require('./models/user');

const PDFDocument = require('pdfkit');
const fs = require('fs');



const app = express();
// Setting up  view engine.
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));


// Connecting to database
mongoose.connect('mongodb+srv://testdb:testdb123@cluster0.uxyzv.mongodb.net/reportDb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    console.log('connected to database.');
})

// Setting up routes

app.get('/data', function(req,res){

    const user = new UserDB({
        name : "anubhav",
        studentid: "102",
        class: "10",
        section: "A",
        hindi: "78",
        english: "66",
        math: "44",
        science: "100",
        computer: "66"
    });
    user.save(function(err){
        if(err)
            res.send(err);
        else
            res.send('data saved');
    });

});



function makepdf(user){

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`${user.name}.pdf`));

    doc.image('logo.jpg', {
        fit: [150, 300],
        align: 'center',
        valign: 'top'
      });

      doc
      .fontSize(25)
      .text(`Name :  ${user.name}      Student ID : ${user.studentid}`, 100, 230);

      doc
      .fontSize(25)
      .text(`Class :  ${user.class}      Section : ${user.section}`, 100, 260);

    doc
    .fontSize(20)
    .text(`Hindi :  ${user.hindi}`, 100, 400);
    doc
    .fontSize(20)
    .text(`English :  ${user.english}`, 100, 430);
    doc
    .fontSize(20)
    .text(`Maths :  ${user.math}`, 100, 460);
    doc
    .fontSize(20)
    .text(`Science :  ${user.science}`, 100, 490);
    doc
    .fontSize(20)
    .text(`Computer :  ${user.computer}`, 100, 520);

    doc.end();


};

app.get('/', function(req,res){
    res.render('user');
})


app.post('/', function(req,res){

    const user = req.body.username;
    UserDB.findOne({name: user}, function(err, user){
        if(err)
            console.log(err);
        if(user){
            res.render('result',{user: user});
            makepdf(user);
        }
        else{
            res.send('Error in finding data');
        }
    })

});


app.post('/:name/download', function (req, res, next) {

    const user = req.params.name;
    res.download(`${user}.pdf`)

});

const PORT = process.env.PORT || 3004;
app.listen(PORT,()=>{
    console.log('Server is up on 3004');
});


