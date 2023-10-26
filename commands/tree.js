function tree(dirpath){

    // input -> directory path is given

    let despath;
     if(dirpath==undefined){
        treeHelper(process.cwd(), "");
        return;
     }else{
            let doesExist= fs.existsSync(dirpath);
            if(doesExist){
            
                treeHelper(dirpath, "")
            }
            else{
                console.log("kindly enter right path");
                return;
            }  
        }
            treeHelper(dirpath);
     }

function treeHelper(dirpath, indent){
    let isFile= fs.lstatSync(dirpath).isFile();
    if(isFile==true){
        let filename= path.basename(dirpath);
        console.log(indent,"├──", filename );
    }else{
       
        let dirName= path.basename(dirpath);
        console.log(indent,"├──", dirName );

        let children= fs.readdirSync(dirpath);
        for(let i=0; i<children.length; i++){
            
        let childrenPath= path.join(dirpath, children[i]);
        treeHelper(childrenPath,indent, "\t");
    
        }
    }
}
module.exports={
    treekey: tree
}