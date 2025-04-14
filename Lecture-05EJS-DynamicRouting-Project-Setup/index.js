const express = require('express');
const app = express();
const path = require('path');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render("index")
});

app.get('/about', (req, res) => {
    res.render("about")
});

app.get('/author/:username', (req, res) => {
    res.send(`Welcome to ${req.params.username} profile`);
});

app.get('/profile/:username/:id', (req, res) => {
    res.send(`Welcome to ${req.params.username} profile with id ${req.params.id}`);
    // res.send(req.params);
});


app.listen(3000, () => {
    console.log("serveris running 🎉 on port 3000");
})

