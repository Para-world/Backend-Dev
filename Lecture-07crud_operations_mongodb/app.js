const express = require('express');
const app = express();

const userModel = require('./usermodel');




app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.get('/create', async (req, res) => {
    let createduser = await userModel.create({
        name: 'jatin',
        email: 'jaton@gmail.com',
        username: 'jatin123',
        Age:20,
      address: 'delhi'
    })

    res.send(createduser);
   
 });


 app.get('/update', async (req, res) => {
    let updateduser = await userModel.findOneAndUpdate({name: 'jatin'}, {name: 'pyar sa jatin'})
    res.send(updateduser);
 });

 app.get('/read', async (req, res) => {
    //we can use findone also for viewing single data 
    //let readuser = await userModel.findOne({name: 'Rahul kumar'});
    let readuser = await userModel.find(); 
    res.send(readuser);
 });


 app.get('/delete', async (req, res) => {
    let deleteduser = await userModel.findOneAndDelete({name: 'jatin'});
    res.send(deleteduser);
 });





app.listen(3000, () => {
    console.log('Server is running on port 3000');
});