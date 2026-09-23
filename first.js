//varibles//
// let var const//

// var fruits= "banana"

// var fruits="apple"

// var fruits = "magngo"

// console.log(fruits)

// //where var was declared with one keyword  with multiples values

// let user = "rakesh"
// let age = 26
// let address= "oldcity" 

// console.log(user)

// console.log(age)

// console.log(address)

// let profile
//    { name:"rakesh"
//     age:26
//     address:"oldcity"}

//     // where the let will can all the values in one keywoed with a profile   

//     const username = "rakeshmca"

//     console.log(username)

//     const password = "rakesh1234"

//     console.log(password)

//     //where the const was one varible with one value with fixed vladation//

//     //arthmetic

//     let number1 = 10

//     let number2 = 20

//     let add =number1+number2
    
//     console.log(add)
    
//     //at the same process can we subract ,add,multiple,div//
//     // arthmatic method defined in mathmatic logicals   //

//     let arr= "rakesh12345"

//     console.log (arr)
//     //arr can read the tottal srting and number etc//

//     //comparsion//

//     let number = 10<9

//     console.log(number)

//     let number3 = 10>9
//     console.log(number3)

//     let id

//  console.log(id)

//  let tool = "tools"

//  console.log(tool)

//  // javascript where the page will connect  the web page to intertared another webpage with the tag of script tag
//  // by the frontend and backend process

//  let ID = ["RAKESH" , 26 ,  "hyd"]

//  console.log(ID)
//  const games = {  
//    cricket : "abhishek",
//    biker : "race"
//   }

// console.log(games);

// console.log( typeof(games))// the method to know about data type , typeof(),array.isarray)

// let user = "rakeshmcA"

// let password = "rakesh12345"

// if(user =="rakeshmcA" && password =="rakesh12345"){
//    console.log("login sucessfull")
// }else {
//    console.log("user not found")}

// arthmetic//

// var a = 10 
// a++
// var b = 20
// b++
// console.log(a+b)

// let employe = "rakesh"
// let department = ""

// if(department=="IT"){
//    console.log("he is woking");
// }else if(department == "HR"){
//    console.log("he is not working")
// }
// else{
//    console.log("not found")
// }
 
 
// function structure//
// function fun(name){
//    console.log(name)
// }
// fun("rakesh")

// normal function//

// //with parameters//

// function bike(brand ,year){
//    console.log("royal enfield + 2022")
//    console.log("yamaha+2023")
//    console.log("pulsar+2024")
// }
// bike()

// // arrow function// //without parameter//
//  const employe = () =>{
//    console.log("he is working")
//  };

// employe()
 
// with parameter//

// const employe=(name,department)=>{
//  console.log("name:rakesh")
//  console.log("working:omega")
// }
// employe()

//  anonoymous function //
//  without parameters//
  
//  const profile=function(){
//   console.log("rakesh is a fresher to the company")
//  } 

//  profile()

//  // with parameter//

//  const profile1=function(name,salary){
//      console.log("name:giri babu")
//    console.log("salary:57300")
// }
// profile1()

// callback
 
// function greet (name,callback){
//   console.log("hello","rakesh");
//   callback();
// }
// function message(){
//   console.log("welcome to javascript")
// }
// greet("name","message")

function greet(name){
  console.log("hey"+ name);
}
function user (callback){
  callback("rakesh McA");
}
user(greet);

// function id(send){
//   console.log("welcome"+name)
// }
// function profile(callback){
//   callback("RAKESH MCA")
// }
// profile(id)

// function greet(name) {
//     console.log("Hello " + name);
// }

// function user(callback) {
//     callback("Rakesh");
// }

// user(greet);

// function details(id,callback){
//   console.log( "employe","rakeshMCA6280");
//   callback();
// }
// function group(){
//   console.log("rng");
// }
// details("id",group)

// IIFE IMMEDIATETLY INVOKED FUNCTION EXPRESSION//

// (function(){
//   console.log("function excuted immediately")
// })();

// (function(name){
//   console.log( "hello"+"rakesh")
// })();

// // return function//

// function add(a,b){
//   return a+b;
// }
// let result = add(10,20);

// console.log(result);


// const arr = ["first", "second","third", "fourth"]
// for(let i = arr.length -1; i>=0; i--){
//   console.log(arr)
// } 

// MAP = to used to create a new array by changing ,transforming every element\

// const arr = ["first", "second","third", "fourth"]
// for(let i = arr.length -1; i>=0; i--){
//   console.log(arr)
// }

// let fruits = ["Apple", "Mango", "Banana"];

// let result = fruits.map((item) => {
//     return item
// });

// console.log(result);

// let numbers = [5,10,15,20,25,30,35,40]

// let multiple = numbers.map((run) =>{
//     return run * 5
// })
// console.log(multiple)

// let number = [5,10,15,20,25,30,35,40]

// let add = numbers.map((run) =>{
//     return run + 5
// })
// console.log(add)

// // find method in javascript return is a array that satisty a provided testing functions

// let number =[ 2,4,6,8,10]

// let add = number.find((item)=>{
//     return item > 5
// });
// console.log(add)

// let employes=[
//     { name : "rakesh", salary: 50000},
//     { name : "satish",salary : 51000},
//     { name : "sai krishna",salary:52000},
// ]
// let profile=employes.find((item)=>{
// return item.name === "satish"
// })
// console.log(profile)

// filter reates a new array containing only the elements from the 
//  original array that pass a specific condition//

// let some =  [2,6 ,8 ,10,3,1,13]

// let find = some.filter((go)=>{
//     return go <  10;
// });

// console.log(find)

// let employes = [
//     { name:"jai",salary:30000},
//     { name: "balu",salary: 40000},
//     { name : "shanker",salary:50000},
// ]
// let details = employes.filter((find)=>{
//     return find.salary>35000
// })

// console.log(details)

// Destrcturing array//

//  let fruits = ["mango, banana , dragon"];
//  let [fruit1, fruit2,fruit3]=fruits;
//   console.log(fruit1);
//   console.log(fruit2);
//   console.log(fruit3);

//   // destructuring object //

//   let employe={
//      name: "ramolla rakesh",
//      age: "24",
//      salary:30000,
//   }
//   let {name,age,salary}=employe;

//   console.log(name);
//   console.log(age);
//   console.log(salary);

//   spread with array //

//   let numbers = [10,20,30];

//   let newnumbers = [...numbers];

//   console.log(newnumbers)

//   let fruits = ["mango","apple","orange"]

//   let vegetables= ["carrot","cucumber","beetroot"]

//   let both = [...fruits,...vegetables]

//   console.log(both)

//   let value = [ 20,30,40]

//   let newvalue=[10,...value,50]

//   console.log(newvalue)
