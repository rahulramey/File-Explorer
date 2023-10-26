#!/usr/bin/env node
let inputArr= process.argv.slice(2);
let fs= require("fs");
let path= require("path");
let helpObj= require("./commands/help");
let treeObj= require("./commands/tree");
let organizeObj= require("./commands/organize");



let command= inputArr[0];



switch (command){
    case "tree":
    treeObj.treekey(inputArr[1]);
    break;

    case "organize":
    organizeObj.organizekey(inputArr[1]);
    break;
    
    case "help":
    helpObj.helpKey(inputArr[1]);
    break;

    default:
    console.log("please enter right command");
    break;

}