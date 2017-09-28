let nimis = require('./nimis.js').backup; 

(async () => {
   try{
       let bar = await nimis(['readme.md', 'secondFileToBackUp.md']); 
        console.log(bar);
       
   } catch(err){
        console.error(err);
    } 
    
})();