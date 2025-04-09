// const express = require('express')


// const app = express()

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

// app.listen(3000, () => {
//   console.log('Server is running on port 3000')
// })


//  const express = require('express');                        // we import the express module from node_modules folder and we store it in a variable called express
//  const app = express();                                      // we create a variable called app and we store the express function in it

//  app.get('/', (req, res) => {                                // we create a get request handler and we pass it a path and a callback function
//    res.send('Hello you are on the home page');                // we send a response to the client
//  });


//  app.get('/about', (req, res) => {                          // reqest handler was a middle ware
//     res.send('Hello you are on the about page✌️');              // we send a response to the client when the user visits the about page. We can also send a html file here.
//      });





   //   app.listen(3000, () => {                                    // we run a function inside the listen to get the callback console message
   //      console.log('Server is running on port 3000')
   //   }
   //   );
    //From this we are going to install nodemon to run the server automatically when we make changes to the code. We can do this by running the command npm install nodemon -g golobal package.
    // to run this nodemon we use the command nodemon script.js. This will run the server and watch for changes in the code. If we make any changes to the code, it will automatically restart the server.(npx nodemon script.js)

    





    //Middleware✌️✌️✌️

    const express = require('express');
    const app = express();

     app.use(function (req, res, next) {            // we create a middleware function that will run for every request that comes to the server
        console.log('Middleware function is running');            // we log a message to the console
        next();                                                // we call the next function to pass the request to the next middleware or route handler
     });


     app.use(function (req, res, next) {            // we create a middleware function that will run for every request that comes to the server
        console.log('Middleware2 function is running');            // we log a message to the console
        next();                                                // we call the next function to pass the request to the next middleware or route handler
     });
   app.get('/',function (req, res)  {
      res.send('Hello you are on the home page');                // we send a response to the client  
   });

  
   app.get('/about',function (req, res)  {                          // reqest handler was a middle ware
      res.send('Hello you are on the about page✌️');              // we send a response to the client when the user visits the about page. We can also send a html file here.
   });


  app.get('/contact',function (req, res)  {                          // reqest handler was a middle ware
      res.send('Hello you are on the contact page✌️');              // we send a response to the client when the user visits the about page. We can also send a html file here.
   });
   app.get('/services',function (req, res,next)  {                          // reqest handler was a middle ware
         return next(new Error('Error occurred'));        
   });


   app.use((err, req, res, next) => {                     // we create a middleware function that will run for every request that comes to the server
      console.error(err.stack);                          // we log the error to the console
      res.status(500).send('Something broke!');           // we send a response to the client with a status code of 500 and a message
   });






   app.listen(3000, () => {                                    // we run a function inside the listen to get the callback console message 
      console.log('Server is running on port 3000')
   }
   );
    
   