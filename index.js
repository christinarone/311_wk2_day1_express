//bring in the express framework
let express =  require("express");
let bodyParser = require("body-parser");

// const res = require("express/lib/response");
let PORT = 8000;
//this is the port that my express application is going to listen on

//instantiate my application server
let app = express();
app.use(bodyParser.json())

// let db = [];
// //this will generate a random integer between 0 & 100000
// //we don't really do this in production
// //we are just doing this now, because when we learn about sql
// //we will offload id generation to the database
let generateId = function(){
let id = Math.random() * 1000000;
return parseInt(id);
}

let users = [
  {
    "_id": generateId (),
    "name": "Dale Cooper",
    "occupation": "FBI Agent",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  },
  {
    "_id": generateId (),
        "name": "Spike Spiegel",
        "occupation": "Bounty Hunter",
        "avatar": "http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337"
  },
{
  "_id": generateId (),
  "name": "Wirt",
  "occupation": "adventurer",
  "avatar": "http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg"
},
{
  "_id": generateId (),
  "name": "Michael Myers",
  "occupation": "Loving little brother",
  "avatar": "http://vignette2.wikia.nocookie.net/villains/images/e/e3/MMH.jpg/revision/latest?cb=20150810215746"
},
{
  "_id": generateId (),
  "name": "Dana Scully",
  "occupation": "FBI Agent",
  "avatar": "https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg"
}
];

app.get("/users/:id", function(req, res){
    console.log("GET / users", req.params.id)
    


//db is an array of todos (id, status, name, description)
//results array, I want it to have the same number of items as db[]
//for easy item in the db array, there should be an equivalent items 
//that only has the (status, id and name)
let found;
//loop through the array and find the item whose id matches the id from the path parameter
for (let i=0; i < users.length; i++){
let item = users[i];
if(item.id == req.params.id){
  found = item;
  break;
}
}
//if found is truthy, that means we found the item

    if(found){
        res.json(found);
    } else {
      //otherwise we return a 404
        res.sendStatus(404);
    }
})

app.post("/users", function(req,res){
console.log("POST / users");
let json = req.body;
console.log("body = ", json);
let newItem = {};
newItem.id = generateId();
newItem.name = json.name;
newItem.description = json.description;
newItem.done = false;
users.push(newItem);

//res.sendStatus(204);
res.json(newItem);
});

//delete the item by id
app.delete("/users/:id", function(req,res){
  console.log("DELETE / user/", req.params.id);
//loop through the users array until we find the index of the item we want to delete
let index = -1;
for(let i=0; i<users.length; i++){
let item = users[i];
if(item.id == req.params.id){
  index = i;
  break;
}
}
let found = null;
//if the index >-1, that means we found an item we want to delete
if(index > -1){
  //use splice to remove the item at the index we found
  //remember that splice returns an array. In our case it will be an array of 1 item
  //so we use [0] to get the object and store that in the found variable
  found = users.splice(index, 1)[0];
}
//return the found on the response
//if no item was deleted, found will be null
res.json(found);
})
// update the name, description, and done status of an item by id
//NOTE: this will clear out the description and name of the itemif it 
//is not passed into the request body
app.put("/users/:id", function(req, res){
  console.log("PUT / users", req.params.id);
  let json = req.body;

  //first we find the item we want to update
  let found;
  for(let i=0; i< users.length; i++){
    let item = users[i];
    if(item.id == req.params.id){
      found = item;
      break;
    }
  }
//if found is truthy, that means we have an item to update
if(found){
  //update the name and the description based on what is in the request body
  found.name = json.name;
  found.description = json.description;

  //only update the done flag to be true, if the request body has done as true
  //otherwise we set it to false
  if (json.done == true){
    found.done = true;
  } else {
    found.done = false;
  }

  //we don't have to push it back to the array because the item is already in the array
  //we are updating the same item that is in the array
  //send the new version of the item back
  res.json(found);
}else {
  //if found is falsy, that means we didn't find an item to update
  //so we return a 404
  res.sendStatus(404);
}

})
//start the app server and listen for requets
//on the defined port
app.listen(PORT, function(){
    console.log("App server started on port", PORT);
})




























// const express = require('express');
// const app = express();
// app.get('/',(req, res) => {
//   res.send('Users');
// });

// app.get('/api/Users', (req, res) => {
//   res.send(["Jane", "Bob", "Phil"]);
// });

// app.listen(4000, () => console.log('Listening on port 4000...'));