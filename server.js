
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let votes = {
  azure:0,
  aws:0,
  gcp:0
};

app.get("/",(req,res)=>{
  res.render("index");
});

app.get("/quiz",(req,res)=>{
  res.render("quiz");
});

app.post("/vote",(req,res)=>{
  const choice = req.body.cloud;
  if(votes[choice] !== undefined){
    votes[choice]++;
  }
  res.redirect("/results");
});

app.get("/results",(req,res)=>{
  res.render("results",{votes});
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log("Server running on port "+port);
});
