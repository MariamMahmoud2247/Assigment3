const fs = require("fs");

const stream = fs.createReadStream("./big.txt", { encoding: "utf8" });

stream.on("data", (chunk) => {
    console.log("Chunk:", chunk);
});


const fs = require("fs");

const readStream = fs.createReadStream("./source.txt");
const writeStream = fs.createWriteStream("./dest.txt");

readStream.pipe(writeStream);

console.log("File copied using streams");


const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./data.txt");
const writeStream = fs.createWriteStream("./data.txt.gz");

readStream.pipe(zlib.createGzip()).pipe(writeStream);

console.log("File compressed");

//1
The Event Loop is the core mechanism that allows Node.js to perform non-blocking operations.
It continuously checks the call stack and the callback queue, and executes tasks when the stack is empty.

//2
The Event Loop is the core mechanism that allows Node.js to perform non-blocking operations.
It continuously checks the call stack and the callback queue, and executes tasks when the stack is empty.

//3
Node.js sends the task to Libuv
Libuv handles it (using OS or thread pool)
When finished → result goes to callback queue
Event Loop moves it to the call stack
Then the callback is executed

//4
Code.js sends the task to Libuv
Libuv handles it (using OS or thread pool)
When finished → result goes to callback queue
Event Loop moves it to the call stack
Then the callback is executed

//5
The Thread Pool is a group of threads used by Libuv to handle heavy tasks like:

File operations
Encryption
DNS

//6

Blocking:
Code waits until the operation finishes
Stops execution of other code

Non-blocking:
Code continues executing without waiting
Uses callbacks or promise