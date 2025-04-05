const fs = require('node:fs');

// fs.writeFile('hello.txt', 'Hello World! i am here to learn Node.js', function(err){
//     if (err) console.log(err);
//     else console.log('done!');
// })



// fs.appendFile('hello.txt', '🎍🎍🎍🎍🎍🎍gift ', function(err){
//     if (err) console.log(err);
//     else console.log('done!');
// })

// fs.rename('hello.txt', 'data.txt', function(err){
//     if (err) console.log(err);
//     else console.log('done!');
// })


// fs.copyFile('./Lecture-01 Node.js & File System Operations/Copy/test.txt', './Lecture-02 Learn About NPM/bro.txt', function(err){
//     if (err) console.log(err.message); //to get error in written format use err.message
//     else console.log('done!');
// })

// fs.unlink('./Lecture-01 Node.js & File System Operations/Copy/bro.txt', function(err){
//     if (err) console.log(err);
//     else console.log('done!');
// })

// fs.rm( './Lecture-01 Node.js & File System Operations/Copy',{recursive:true}, function(err){  
//     if (err) console.log(err);
//     else console.log('removed!');
// })


// fs.mkdir('./Lecture-01 Node.js & File System Operations/Copy', function(err){
//     if (err) console.log(err);                                                      //folder creation
//     else console.log("folder createrd!");
// } )


// fs.access('./Lecture-01 Node.js & File System Operations/Copy', function(err){ //check if the file or folder is present or not
//     if (err) console.log(err.message); //if not present it will throw an error
//     else console.log("present!");
// })
// fs.readdir('./Lecture-01 Node.js & File System Operations/Copy', function (err, files) {
//     if (err) console.log(err);
//     else console.log(files);     //to get the files in the directory
// });

// fs.readFile('./Lecture-01 Node.js & File System Operations/Copy/file.txt', 'utf-8', function(err, data){
//     if (err) console.log(err);
//     else console.log(data);            //to get the content of the file
// })

// fs.stat('./Lecture-01 Node.js & File System Operations/Copy/file.txt', function(err, stats){
//     if (err) console.log(err);
//     else console.log(stats);            //to get the stats of the file
// })

// fs.watch  it will watch the file and if any changes are made it will show the changes in the console


// fs.watch('./Lecture-01 Node.js & File System Operations/Copy/file.txt', function(err, data){
//     if (err) console.log(err);
//     else console.log(data);            //to get the stats of the file
// })

fs.watchFile('./Lecture-01 Node.js & File System Operations/Copy/file.txt', function(err, data){
    if (err) console.log(err);
    else console.log(data);            //to get the stats of the file

})

