#!/usr/bin/env node
let fs= require("fs");
let path= require("path");
const { types } = require("util");
function organize(dirpath){


    let types = {
        media: ["mp4","mkv"],
        archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],   
        documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
        app: ['exe', 'dmg', 'pkg', "deb"]
       }

    // input -> directory path is given

    let despath;
     if(dirpath==undefined){
        despath=process.cwd();
        return;
     }else{
            let doesExist= fs.existsSync(dirpath);
            if(doesExist){
            
                // create -> organized_Files -> directory

                despath= path.join(dirpath,"organized_Files");
                if(fs.existsSync(despath)==false){
                fs.mkdirSync(despath);
               }
            }
            else{
                console.log("kindly enter right path");
                return;
            }  
        }
            organizeHelper(dirpath,despath);
     }

     // identify all the files present in the input directory (src)
function organizeHelper(src, dest){

    let childnames= fs.readdirSync(src);
     
    for(let i=0; i<childnames.length; i++){
        let childAddress= path.join(src, childnames[i]);

        let isFile= fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category=getCategory(childnames[i]);

            console.log(childnames[i], " belongs to this --> ", category);

                sendFiles(childAddress,dest,category);
        }
    }
}

function sendFiles(srcFilePath,dest,category ){
    // cut or copy files from src to organized_files

    let categoryPath= path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }

    let fileName= path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);

    console.log(fileName, " copied to ", category);

}

function getCategory(name){
    let ext= path.extname(name);
    ext= ext.slice(1);

    for(let type in types ){
        let cTypeArray= types[type];
        for(let i=0; i<cTypeArray.length; i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}

module.exports={
    organizekey :organize
}