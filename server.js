var SSH = require('simple-ssh');
var guarda = require("fs");

var ssh = new SSH({
    host: '192.168.61.105',
    user: 'german',
    pass: 'gerlop89'
});

ssh.exec('snr', {
    out: function(stdout) {
        //console.log(stdout);
        //eliminar espacios
      //  console.log(stdout.replace(/\s/g, ''));
   // let arreglo = stdout.split("\n").map(res => res.replace(/\s/g, '-'))
   // let result = arreglo.splice(1);
   let rex = stdout.split("\n").map(res => res.replace(/\s/g, ''))  
   rex = rex.filter(function( element ) {
    return element !== undefined;
 });
   let pre = rex.join().replace(/^[A-Za-z0-9]*$/).split(',').splice(1).filter(Boolean);
  
  // pre.array.forEach(element => {
  //  console.log(element);
 //  });
 //  let res =[]
 let numbers = []
 pre.forEach(i => {
        
    numbers.push(i)
})
let res = numbers.find( (i) => {
  
  if (i.includes("13/11.0/0")) {

  console.log(i.substring(9)); 
  }
  

})


console.log(numbers)
  //let complete = rex.join()+"";
  
    }
}).start();
