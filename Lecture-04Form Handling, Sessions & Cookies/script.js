const express = require('express');
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/',function (req, res){
    res.send('Hello World');
});

app.get('/about',function (req, res){
    res.send('About Us');
}
);

app.get('/contact',function (req, res){
    res.send('Contact Us');
}
);

app.get('/services',function (req, res,next){
    next(new Error('Service not available'));
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
}
);

