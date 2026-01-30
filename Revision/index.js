

const fs = require("fs");

// SYNC (READING THE FILE)
// const result = fs.readFileSync("./contacts.txt" , "utf-8");
// console.log(result);

// ASYNC (READING THE FILE)
// const result = fs.readFile("./contacts.txt" , "utf-8" ,(err, result) => {
//     if(err){
//         console.log("error occured",err);
//     } else{
//         console.log(result);
//     }
// });

// SYNC (APPENDING)
fs.appendFileSync("./text.txt", `heyy there \n`)