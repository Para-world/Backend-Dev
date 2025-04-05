// Node.js File System (fs) 

const fs = require('node:fs'); // Import the File System module

// 1. Write to a file (creates or overwrites)
// fs.writeFile('hello.txt', 'Hello World! I am here to learn Node.js', function(err){
//     if (err) console.log(err);
//     else console.log('File created or overwritten successfully!');
// });

// 2. Append to a file
// fs.appendFile('hello.txt', '🎍🎍🎍🎍🎍🎍gift ', function(err){
//     if (err) console.log(err);
//     else console.log('Content appended!');
// });

// 3. Rename a file
// fs.rename('hello.txt', 'data.txt', function(err){
//     if (err) console.log(err);
//     else console.log('File renamed!');
// });

// 4. Copy a file
// fs.copyFile('./source/test.txt', './destination/bro.txt', function(err){
//     if (err) console.log(err.message);
//     else console.log('File copied!');
// });

// 5. Delete a file
// fs.unlink('./destination/bro.txt', function(err){
//     if (err) console.log(err);
//     else console.log('File deleted!');
// });

// 6. Remove a folder recursively
// fs.rm('./some-folder', { recursive: true }, function(err){
//     if (err) console.log(err);
//     else console.log('Folder removed!');
// });

// 7. Create a folder
// fs.mkdir('./new-folder', function(err){
//     if (err) console.log(err);
//     else console.log("Folder created!");
// });

// 8. Check if file/folder exists
// fs.access('./some-folder', function(err){
//     if (err) console.log('Not found:', err.message);
//     else console.log("It exists!");
// });

// 9. Read folder contents
// fs.readdir('./some-folder', function (err, files) {
//     if (err) console.log(err);
//     else console.log('Files:', files);
// });

// 10. Read file content
// fs.readFile('./file.txt', 'utf-8', function(err, data){
//     if (err) console.log(err);
//     else console.log('File content:', data);
// });

// 11. Get file stats/info
// fs.stat('./file.txt', function(err, stats){
//     if (err) console.log(err);
//     else console.log('Stats:', stats);
// });

// 12. Watch file for changes (event-driven)
// fs.watch('./file.txt', function(eventType, filename){
//     console.log(`File ${filename} changed. Event: ${eventType}`);
// });

// 13. Watch file with polling
fs.watchFile('./file.txt', function(curr, prev){
    console.log('File changed:');
    console.log('Previous Modified Time:', prev.mtime);
    console.log('Current Modified Time:', curr.mtime);
});
