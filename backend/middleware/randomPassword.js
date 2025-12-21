// random password 20 december.

const Password = () => {
  let mypass = "";

  let codes = "qwertyuiopasdfghjklzxcvbnm";

  let codelength = codes.length;

  for (let i = 0; i <= 7; i++) {
    let num = Math.floor(Math.random() * codelength); 
    mypass += codes.charAt(num); 
  }

  return mypass; 
}

module.exports = {
    Password
}