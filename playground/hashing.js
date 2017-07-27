const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
var data = {
  id: 10
}

var token = jwt.sign(data, '123bc');
console.log(token)
var decoded = jwt.verify(token, '123bc');
console.log(decoded)

//
// var message = 'some message';
// var hash = SHA256(message);
//
// console.log(`${message}, ${hash}`)
//
//
// var data = {
//   id: 2
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somestring').toString()
// }
// var resultHash = SHA256(JSON.stringify(token.data) + 'somestring').toString();
// if(resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data has changed');
// }
