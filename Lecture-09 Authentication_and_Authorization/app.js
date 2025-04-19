const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());



app.get('/', (req, res) => {


    //How to set cookie:
    // res.cookie("name","Deepak", { maxAge: 900000, httpOnly: true });
    // res.cookie("name","Deepak");


    //How to bcrypt password:

    // bcrypt.genSalt(10, function(err, salt) {
    //     // console.log(salt);
    //     bcrypt.hash("hatbenikal", salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         console.log(hash);
    //     });
    // });


    //how to compare passwords
    // bcrypt.compare("hatbenikal", "$2b$10$ihR2BEWs5GNSfBW5Pk1imO1W.jkL0yJFhdfc8asMtHXhrVuC.RG/q", function(err, result) {
    //     console.log(result);
    // });



    //jwt secret string should kept secret and not shared with anyone:
  let token = jwt.sign({email:"para@gmail.com"}, "secret");
  res.cookie("token", token);
//   console.log(token);
  res.send("Hello World!");

    // res.send("Hello World!");
});

app.get('/read', (req, res) => {
    // console.log(req.cookies); 
    // console.log(req.cookies.token);
   let data = jwt.verify(req.cookies.token,"secret" );
   console.log(data);
});




app.listen(3000, () => {
    console.log('app listening on port 3000!');
});


