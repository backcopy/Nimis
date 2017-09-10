let nimis = require('./nimis.js').call; 

const fs = require('fs');

async function foo(){
   try{
       let bar = await nimis(['read1me.md', 'pack1age.json', 'package-lock.json']); 
        console.log(bar);
       
   } catch(err){
       throw new Error(err); 
   }
    
}; 

foo();



//checkFileExists();