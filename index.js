//bring in the express framework
let express =  require("express");
let bodyParser = require("body-parser");

// const res = require("express/lib/response");
let PORT = 4000;
//this is the port that my express application is going to listen on

//instantiate my application server
let app = express();
app.use(bodyParser.json())

//this will generate a random integer between 0 & 100000
//we don't really do this in production
//we are just doing this now, because when we learn about sql
//we will offload id generation to the database
let generate = function(){
let id = Math.random() = 1000000;
return parseInt(id);
}

/**
 * comment: Return a list of items. but only the names & descriptions for those items
verb: GET
route: /todos
data response: json array where every element contains
-name
-done / not done
ex: \{
    "name: "feed the dogs", "done": false),
    {"name: "clean the fish bowl", "done":true},
    {"name": "wash the dishes", "done": false }
}
 */

//start the application server and listen for requests
//on the defined port

/**
 * Returns a list of todo items, but only include the id, name, and status
 */
app.get("/users", function(req, res){
    console.log("GET / users");
    let results = ['Jane', 'Bob', 'Mike'];


//db is an array of todos (id, status, name, description)
//results array, I want it to have the same number of items as db[]
//for easy item in the db array, there should be an equivalent items 
//that only has the (status, id and name)
for (let i=0; i < userNames.length; i++){
let item = db[i];
let copy = {};
copy.id = item.id;
copy.name = item.name;
copy.done = item.done;
results.push(copy);
}
res.json(results);
})

app.get("users/:id", function(req, res){
    console.log("/GET / todos/",req.params.id)

    for(let i=0; i<userNames.length;i++){
        let item = db[i];
        if(item.id == req.params.id){
            found = item;
            break;
        }
    }

    if(found){
        res.json(found);
    }else{
        res.sendStatus(404);
    }
})

app.post("/users", function(req,res){
console.log("POST / users");
let json = req.body;
console.log("body =", json);
let newItem ={};
newItem.id = generateId();
newItem.name = json.name;
newItem.description = json.description;
newItem.done = false;
userNames.push(newItem);

//res.sendStatus(204);
res.json(newItem);
});

//start the app server and listen for requets
//on the defined port
app.listen(PORT, function(){
    console.log("App server started on port", PORT);
})





// let express = require('express')
// // const app = express()
// let port = 4000;
// let app = express();

// // const { users } = require('./state')

// //tell the app that we want to use the body parser to get json
// // app.use(bodyParser.json());

// let users = [
//   {
//     id:generateId(),
//     name: "Jack",
//     description: "Computer Geek",
//     done: false
//   },
//   {
//     id:generateId(),
//     name: "Jill",
//     description: "Software Developer",
//     done: false

//   }



// ];

// let generateId = function(){
//   let id= math.random () = userNames;
//   return parseInt(id);

// }
// //return a list of items, but only the ID..use verb GET


// //returns a list of users but only include id, name and status
// app.get("/users", function(req, res){
//   console.log("GET / users");
//   let results = [];


//   //users is an array of id items name, id
//   for(let i=0; i< users.length; i++){
//     let item = users[i];
//     let copy = {};
//     copy.id = item.id;
//     copy.name = item.name;
//     copy.done = item.done;
//     results.push(copy);
//   }
//   res.json(results);
// })

// /* END - create routes here */

// app.listen(PORT, function(){
//   console.log("Application server started on port", PORT);
// })