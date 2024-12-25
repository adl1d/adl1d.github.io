CEASER CIPHER:
var caesarShiftencrypt = function (plaintext, enteredKey) {
  ciphertext = "";   
   var re = /[a-z]/;
 for(i=0; i<plaintext.length; i++){ 
     if(re.test(plaintext.charAt(i))) ciphertext += String.fromCharCode((plaintext.charCodeAt(i) - 97 + enteredKey)%26 + 97); 
     else ciphertext += plaintext.charAt(i); 
 } 
 return ciphertext; 
} 
var caesarShiftdecrypt = function (ciphertext, enteredKey) {
plaintext = "";    var re = /[a-z]/;
for(i=0; i<ciphertext.length; i++){ 
   if(re.test(ciphertext.charAt(i))) plaintext += String.fromCharCode((ciphertext.charCodeAt(i) - 97 + 26 - enteredKey)%26 + 97); 
   else plaintext += ciphertext.charAt(i); 
} 
return plaintext; 
}
function caesarcipherButtonFunction(){
   var enteredKey = parseInt(document.getElementById("enteredKey").value);
   var message = document.getElementById('inputMessage').value.toLowerCase();;
   if(enteredKey == "" || message == ""){
       alert("Please enter key and message to de ciphered/deciphered!");
       return;
     }
   var result = caesarShiftencrypt(message, enteredKey);
   document.getElementById('result').value = result; }
function caesardecipherButtonFunction(){
   var enteredKey = document.getElementById('enteredKey').value;
   var message = document.getElementById('inputMessage').value;
   if(enteredKey == "" || message == ""){
       alert("Please enter key and message to de ciphered/deciphered!");
       return;
     }
   var result = caesarShiftdecrypt(message, enteredKey);
   document.getElementById('result').value = result;
}
HILL:


function encrypt(plaintext, k)
{ 
    keys = k.split(" "); 
    if(plaintext.length % 2 == 1){ plaintext = plaintext + "x"; }    
    if(keys.length != 4){ alert("key should consist of 4 integers"); return; }
    for(i=0;i<4;i++) keys[i] = keys[i]%26;
    ciphertext="";
    for(i=0; i<plaintext.length; i+=2){ 
      ciphertext += String.fromCharCode((keys[0]*(plaintext.charCodeAt(i)-97) + keys[1]*(plaintext.charCodeAt(i+1)-97))%26 + 97); 
      ciphertext += String.fromCharCode((keys[2]*(plaintext.charCodeAt(i)-97) + keys[3]*(plaintext.charCodeAt(i+1)-97))%26 + 97); 
    } 
    return ciphertext; 
}

function decrypt(ciphertext, k)
{
    keys = k.split(" "); 
    if(ciphertext.length % 2 == 1){ alert("ciphertext is not divisible by 2 (wrong algorithm?)"); return; }
    if(keys.length != 4){ alert("key should consist of 4 integers"); return; }
    for(i=0;i<4;i++) keys[i] = keys[i]%26;
    det = keys[0]*keys[3] - keys[1]*keys[2];
    det = ((det%26)+26)%26;
    di=0;
    for(i=0;i<26;i++){ if((det*i)%26 == 1) di = i; }
    if(di == 0){alert("could not invert, try different key"); return; }
    ikeys = new Array(4);
    ikeys[0] = (di*keys[3])%26; ikeys[1] = (-1*di*keys[1])%26;
    ikeys[2] = (-1*di*keys[2])%26; ikeys[3] = di*keys[0];
    for(i=0;i<4;i++){ if(ikeys[i] < 0) ikeys[i] += 26; }
    plaintext="";
    for(i=0; i<ciphertext.length; i+=2){ 
      plaintext += String.fromCharCode((ikeys[0]*(ciphertext.charCodeAt(i)-97) + ikeys[1]*(ciphertext.charCodeAt(i+1)-97))%26 + 97); 
      plaintext += String.fromCharCode((ikeys[2]*(ciphertext.charCodeAt(i)-97) + ikeys[3]*(ciphertext.charCodeAt(i+1)-97))%26 + 97); 
    } 
    return plaintext;
}

function cipherButtonFunction(){
    var enteredKey = document.getElementById('enteredKey').value.toLowerCase().replace(/[^0-9 ]/g, "");
    var message = document.getElementById("inputMessage").value.toLowerCase().replace(/[^a-z]/g, "");
    if(enteredKey == "" || message == ""){
      alert("Please enter key and message to de ciphered/deciphered!");
      return;
    }
    var result = encrypt(message, enteredKey);
    document.getElementById("result").value = result;
  
  }
  
  // gets the message and key entered by user and deciphers it
  function decipherButtonFunction(){
    var enteredKey = document.getElementById('enteredKey').value.toLowerCase().replace(/[^0-9 ]/g, "");
    var message = document.getElementById("inputMessage").value.toLowerCase().replace(/[^a-z]/g, "");
    if(enteredKey == "" || message == ""){
      alert("Please enter key and message to de ciphered/deciphered!");
      return;
    }
  
    var result = decrypt(message, enteredKey);
    document.getElementById("result").value = result;
  }





VIGNEARE:


const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
let out = ""
for (var i = 0; i < this; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)]
  }

var encodeMessage = function (message, enteredKey) {

    var output = "";
  let nText = []
  let kText = []
  for (let i of message) {
    nText.push(alphabet.indexOf(i.toLowerCase()))
  }

  for (let i of enteredKey) {
    kText.push(alphabet.indexOf(i.toLowerCase()))
  }

  for (let i in nText) {
    output += alphabet[(nText[i] + kText[i]) % 26]
  }
    
  return output;
}

var decodeMessage = function (message, enteredKey) {
    var output = "";
  let nText = []
  let kText = []
  for (let i of message) {
    nText.push(alphabet.indexOf(i.toLowerCase()))
  }
  for (let i of enteredKey) {
    kText.push(alphabet.indexOf(i.toLowerCase()))
  }
  let out = ""
  for (let i in nText) {
    output += alphabet[(nText[i] - kText[i]) < 0 ? 26 + (nText[i] - kText[i]) : (nText[i] - kText[i]) % 26]
  }
  return output;
}

// gets the message and key entered by user and ciphers it
function cipherButtonFunction(){
  var enteredKey = document.getElementById('enteredKey').value;
  var message = document.getElementById("inputMessage").value;
  if(enteredKey == "" || message == ""){
    alert("Please enter key and message to de ciphered/deciphered!");
    return;
  }

  if (message.length != enteredKey.length) {
    alert("Text and Key have to be the same length.");
    return;
}
  var result = encodeMessage(message, enteredKey);
  document.getElementById("result").value = result;

}

// gets the message and key entered by user and deciphers it
function decipherButtonFunction(){
  var enteredKey = document.getElementById('enteredKey').value;
  var message = document.getElementById("inputMessage").value;

  if(enteredKey == "" || message == ""){
    alert("Please enter key and message to de ciphered/deciphered!");
    return;
  }

  if (message.length != enteredKey.length) {
    alert("Text and Key have to be the same length.");
    return;
}
  var result = decodeMessage(message, enteredKey);
  document.getElementById("result").value = result;
}


AUTOKEY:


function encrypt(message, key){    
  ciphertext="";
  for(i=0; i<message.length; i++){ 
      if(i < key.length){
          ciphertext += String.fromCharCode((((message.charCodeAt(i)-97) + (key.charCodeAt(i)-97)+26)%26)+97); 
      }else{
          ciphertext += String.fromCharCode((((message.charCodeAt(i)-97) + (message.charCodeAt(i-key.length)-97)+26)%26)+97);
      }    
  } 
  return ciphertext; 
}

function decrypt(message, key){    
  plaintext="";
  for(i=0; i<message.length; i++){ 
      if(i < key.length){
          plaintext += String.fromCharCode((((message.charCodeAt(i)-97) - (key.charCodeAt(i)-97)+26)%26)+97); 
      }else{
          plaintext += String.fromCharCode((((message.charCodeAt(i)-97) - (message.charCodeAt(i-key.length)-97)+26)%26)+97);
      }
  } 
  return plaintext; 
}

function cipherButtonFunction(){
  var message = document.getElementById('inputMessage').value.toLowerCase().replace(/[^a-z]/g, ""); 
  var enteredKey = document.getElementById('enteredKey').value.toLowerCase().replace(/[^a-z]/g, "");
  
if(enteredKey == "" || message == ""){
  alert("Please enter key and message to de ciphered/deciphered!");
  return;
}

var result = encrypt(message, enteredKey);
document.getElementById("result").value = result;
}

function decipherButtonFunction(){
  var message = document.getElementById('inputMessage').value.toLowerCase().replace(/[^a-z]/g, ""); 
  var enteredKey = document.getElementById('enteredKey').value.toLowerCase().replace(/[^a-z]/g, "");

if(enteredKey == "" || message == ""){
  alert("Please enter key and message to de ciphered/deciphered!");
  return;
}

var result = decrypt(message, enteredKey);
document.getElementById("result").value = result;
}


Vernam:


const cipher = ['01000001','01000010','01000011','01000100','01000101','01000110','01000111','01001000','01001001','01001010','01001011','01001100','01001101','01001110','01001111','01010000','01010001','01010010','01010011','01010100','01010101','01010110','01010111','01011000','01011001','01011010', '01100001', '01100010', '01100011', '01100100', '01100101', '01100110', '01100111', '01101000', '01101001', '01101010', '01101011', '01101100', '01101101', '011011110', '011011111', '01110000', '01110001', '01110010', '01110011', '01110100', '01110101', '01110110', '01110111', '01111000', '01111001', '01111010'];
const orig = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e' , 'f' , 'g' , 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var encodeMessage = function (message) {
  const final = [];
const split = message.split('');
for (let i = 0; i < split.length; i++) {
  const char = split[i];
  if (orig.includes(char)) {
    const index = orig.indexOf(char);
    final.push(cipher[index]);
  } else {
    final.push(char);
  }
}
return final.join('');
}

var decodeMessage = function (message) {
  const final = [];
const split = message.split('');
let charGroup = [];
for (let i = 0; i < split.length; i++) {
  const char = split[i]
  if (/[01]/.test(char)) {
    if (charGroup.length === 7) {
      charGroup.push(char)
      const index = cipher.indexOf(charGroup.join(''));
      final.push(orig[index]);
      charGroup = [];
    } else {
      charGroup.push(char);
    }
  } else {
    final.push(char);
  }
}
return final.join('');
}

// gets the message and key entered by user and ciphers it
function cipherButtonFunction(){
var message = document.getElementById("inputMessage").value;
if(message == ""){
  alert("Please enter message to de ciphered/deciphered!");
  return;
}

var result = encodeMessage(message);
document.getElementById("result").value = result;

}

// gets the message and key entered by user and deciphers it
function decipherButtonFunction(){
var message = document.getElementById("inputMessage").value;

if(message == ""){
  alert("Please enter message to de ciphered/deciphered!");
  return;
}

var result = decodeMessage(message);
document.getElementById("result").value = result;
}



MONO:


const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function monoalphabeticEncrypt(plaintext, key) {
  const substitutionMap = generateSubstitutionMap(key);
  let encryptedText = '';

  for (let i = 0; i < plaintext.length; i++) {
    if (plaintext[i] === ' ') {
      encryptedText += ' ';
    } else {
      const plainIndex = alphabet.indexOf(plaintext[i].toUpperCase());
      encryptedText += substitutionMap[plainIndex];
    }
  }

  return encryptedText;
}

function monoalphabeticDecrypt(encryptedText, key) {
  const substitutionMap = generateSubstitutionMap(key);
  let decryptedText = '';

  for (let i = 0; i < encryptedText.length; i++) {
    if (encryptedText[i] === ' ') {
      decryptedText += ' ';
    } else {
      const encryptedIndex = substitutionMap.indexOf(encryptedText[i].toUpperCase());
      decryptedText += alphabet[encryptedIndex];
    }
  }

  return decryptedText;
}

function generateSubstitutionMap(key) {
  key = key.toUpperCase().replace(/[^A-Z]/g, ''); // Remove non-alphabet characters
  key = [...new Set(key)]; // Remove duplicates
  const substitutionMap = key + alphabet.replace(new RegExp('[' + key + ']', 'g'), '');
  return substitutionMap;
}

// Example usage
const key = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const plaintext = 'HELLO WORLD';

const encryptedText = monoalphabeticEncrypt(plaintext, key);
console.log('Encrypted Text:', encryptedText);

const decryptedText = monoalphabeticDecrypt(encryptedText, key);
console.log('Decrypted Text:', decryptedText);



PLAYFAIR:


const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';

function runPlayfairEncrypt() {
  const plaintext = document.getElementById("pf_text").value.toUpperCase().replace(/J/g, 'I');
  const key = document.getElementById("pf_key").value.toUpperCase().replace(/J/g, 'I');

  if (plaintext.length === 0 || key.length === 0) {
    alert("Text and key fields cannot be empty!");
    return;
  }

  const matrix = generatePlayfairMatrix(key);
  const encryptedText = playfairEncrypt(plaintext, matrix);

  document.getElementById("pf_result").textContent = "Encrypted Text: " + encryptedText;
}

function runPlayfairDecrypt() {
  const encryptedText = document.getElementById("pf_text").value.toUpperCase().replace(/J/g, 'I');
  const key = document.getElementById("pf_key").value.toUpperCase().replace(/J/g, 'I');

  if (encryptedText.length === 0 || key.length === 0) {
    alert("Text and key fields cannot be empty!");
    return;
  }

  const matrix = generatePlayfairMatrix(key);
  const decryptedText = playfairDecrypt(encryptedText, matrix);

  document.getElementById("pf_result").textContent = "Decrypted Text: " + decryptedText;
}

function generatePlayfairMatrix(key) {
  key = key.replace(/J/g, 'I');
  key = key.toUpperCase();
  key = key.replace(/[^A-Z]/g, ''); // Remove non-alphabet characters
  key = [...new Set(key)]; // Remove duplicates
  const matrix = [];

  for (let i = 0; i < key.length; i++) {
    if (matrix.length === 0 || matrix[matrix.length - 1].length === 5) {
      matrix.push([]);
    }
    matrix[matrix.length - 1].push(key[i]);
  }

  for (let i = 0; i < alphabet.length; i++) {
    if (!key.includes(alphabet[i])) {
      if (matrix.length === 0 || matrix[matrix.length - 1].length === 5) {
        matrix.push([]);
      }
      matrix[matrix.length - 1].push(alphabet[i]);
    }
  }

  return matrix;
}

function playfairEncrypt(plaintext, matrix) {
  // Playfair encryption logic
  // ...
}

function playfairDecrypt(encryptedText, matrix) {
  // Playfair decryption logic
  // ...
}

// Example usage:
// Attach event listeners to encrypt and decrypt buttons
document.getElementById("pf_enc_btn").addEventListener("click", runPlayfairEncrypt);
document.getElementById("pf_denc_btn").addEventListener("click", runPlayfairDecrypt);





ELGAMAL:

const p = 23;  // Prime modulus
const g = 5;   // Generator
const x = 6;   // Private key

// Calculate y = g^x mod p
const y = modExp(g, x, p);

// Encrypts a message using ElGamal
function elGamalEncrypt(message, publicKey) {
  const k = getRandomNumber(p - 1); // Random number between 1 and p-2
  const c1 = modExp(publicKey.g, k, publicKey.p);
  const c2 = (message * modExp(publicKey.y, k, publicKey.p)) % publicKey.p;
  return { c1, c2 };
}

// Decrypts an ElGamal ciphertext
function elGamalDecrypt(ciphertext, privateKey) {
  const s = modExp(ciphertext.c1, privateKey, p);
  const sInverse = modInverse(s, p);
  const decryptedMessage = (ciphertext.c2 * sInverse) % p;
  return decryptedMessage;
}

// Helper function for modular exponentiation
function modExp(base, exponent, modulus) {
  if (modulus === 1) return 0; // Avoid division by zero
  let result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }
  return result;
}

// Helper function to calculate the modular inverse using Extended Euclidean Algorithm
function modInverse(a, m) {
  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  if (m === 1) return 0;

  while (a > 1) {
    const q = Math.floor(a / m);
    const temp = m;
    m = a % m;
    a = temp;
    temp = x0;
    x0 = x1 - q * x0;
    x1 = temp;
  }

  if (x1 < 0) x1 += m0;

  return x1;
}

// Helper function to generate a random number between 1 and max (inclusive)
function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

// Example usage
const publicKey = { p, g, y };
const plaintext = 10;

console.log("Public key:", publicKey);
const ciphertext = elGamalEncrypt(plaintext, publicKey);
console.log("Ciphertext:", ciphertext);

const decryptedMessage = elGamalDecrypt(ciphertext, x);
console.log("Decrypted message:", decryptedMessage);



POLY:

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function vigenereEncrypt(plaintext, key) {
  plaintext = plaintext.toUpperCase();
  key = key.toUpperCase();
  let encryptedText = '';

  for (let i = 0; i < plaintext.length; i++) {
    if (plaintext[i] === ' ') {
      encryptedText += ' ';
    } else {
      const plainIndex = alphabet.indexOf(plaintext[i]);
      const keyIndex = alphabet.indexOf(key[i % key.length]);
      const encryptedIndex = (plainIndex + keyIndex) % 26;
      encryptedText += alphabet[encryptedIndex];
    }
  }

  return encryptedText;
}

function vigenereDecrypt(encryptedText, key) {
  encryptedText = encryptedText.toUpperCase();
  key = key.toUpperCase();
  let decryptedText = '';

  for (let i = 0; i < encryptedText.length; i++) {
    if (encryptedText[i] === ' ') {
      decryptedText += ' ';
    } else {
      const encryptedIndex = alphabet.indexOf(encryptedText[i]);
      const keyIndex = alphabet.indexOf(key[i % key.length]);
      const decryptedIndex = (encryptedIndex - keyIndex + 26) % 26;
      decryptedText += alphabet[decryptedIndex];
    }
  }

  return decryptedText;
}

// Example usage
const key = 'KEY';
const plaintext = 'HELLO WORLD';

const encryptedText = vigenereEncrypt(plaintext, key);
console.log('Encrypted Text:', encryptedText);

const decryptedText = vigenereDecrypt(encryptedText, key);
console.log('Decrypted Text:', decryptedText);



DES:


const key = [0x12, 0x34, 0x56]; // 24-bit key (3 bytes)
const numRounds = 8;

function blockCipherEncrypt(plaintext) {
  const blocks = splitIntoBlocks(plaintext);
  const encryptedBlocks = [];

  for (const block of blocks) {
    let currentBlock = block.slice(); // Copy the block
    for (let round = 0; round < numRounds; round++) {
      currentBlock = roundFunction(currentBlock, key);
    }
    encryptedBlocks.push(currentBlock);
  }

  return concatenateBlocks(encryptedBlocks);
}

function blockCipherDecrypt(ciphertext) {
  const blocks = splitIntoBlocks(ciphertext);
  const decryptedBlocks = [];

  for (const block of blocks) {
    let currentBlock = block.slice(); // Copy the block
    for (let round = 0; round < numRounds; round++) {
      currentBlock = roundFunction(currentBlock, key, true);
    }
    decryptedBlocks.push(currentBlock);
  }

  return concatenateBlocks(decryptedBlocks);
}

function roundFunction(block, roundKey, decrypt = false) {
  for (let i = 0; i < block.length; i++) {
    if (decrypt) {
      block[i] = (block[i] - roundKey[i]) & 0xFF; // Decrypt
    } else {
      block[i] = (block[i] + roundKey[i]) & 0xFF; // Encrypt
    }
  }
  return block;
}

function splitIntoBlocks(data) {
  const blockSize = 3; // 24-bit block size
  const blocks = [];
  for (let i = 0; i < data.length; i += blockSize) {
    const block = data.slice(i, i + blockSize);
    while (block.length < blockSize) {
      block.push(0); // Pad with zeros if needed
    }
    blocks.push(block);
  }
  return blocks;
}
function concatenateBlocks(blocks) {
  const concatenated = [];
  for (const block of blocks) {
    concatenated.push(...block);
  }
  return new Uint8Array(concatenated);
}

const plaintext = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xAB]); // 48-bit plaintext
console.log('Plaintext:', plaintext);

const ciphertext = blockCipherEncrypt(plaintext);
console.log('Ciphertext:', ciphertext);

const decryptedPlaintext = blockCipherDecrypt(ciphertext);
console.log('Decrypted Plaintext:', decryptedPlaintext);


