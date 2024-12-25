// Vigenère Cipher
function runVigenereEncrypt() {
    const plaintext = document.getElementById("vg-text").value.toUpperCase();
    const key = document.getElementById("vg-key").value.toUpperCase();
    if (!plaintext || !key) return alert("Both fields are required!");
    const result = processVigenere(plaintext, key, (a, b) => (a + b) % 26);
    document.getElementById("vg-result").textContent = `Encrypted: ${result}`;
}

function runVigenereDecrypt() {
    const encryptedText = document.getElementById("vg-text").value.toUpperCase();
    const key = document.getElementById("vg-key").value.toUpperCase();
    if (!encryptedText || !key) return alert("Both fields are required!");
    const result = processVigenere(encryptedText, key, (a, b) => (a - b + 26) % 26);
    document.getElementById("vg-result").textContent = `Decrypted: ${result}`;
}

function processVigenere(text, key, operation) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    let keyIndex = 0;
    for (const char of text) {
        if (alphabet.includes(char)) {
            const textIdx = alphabet.indexOf(char);
            const keyIdx = alphabet.indexOf(key[keyIndex % key.length]);
            result += alphabet[operation(textIdx, keyIdx)];
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

// ElGamal Cipher
const p = 23;  // Prime number
const g = 5;   // Generator
const x = 6;   // Private key (can be changed)

function elgamalEncrypt(plaintext) {
    const k = Math.floor(Math.random() * (p - 2)) + 1;
    const y = modPow(g, x, p);
    const K = modPow(y, k, p);
    const m = strToNum(plaintext);
    const c1 = modPow(g, k, p);
    const c2 = (m * K) % p;
    return `(${c1},${c2})`;
}

function elgamalDecrypt(ciphertext) {
    const match = /^\((\d+),(\d+)\)$/.exec(ciphertext);
    if (!match) {
        alert("Invalid ciphertext format! Expected format: (c1,c2)");
        return "";
    }
    const c1 = parseInt(match[1]);
    const c2 = parseInt(match[2]);
    const s = modPow(c1, x, p);
    const sInverse = modInverse(s, p);
    const m = (c2 * sInverse) % p;
    return numToStr(m);
}

function modPow(base, exponent, modulus) {
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) result = (result * base) % modulus;
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

function modInverse(a, m) {
    let m0 = m, t, q;
    let x0 = 0, x1 = 1;
    if (m === 1) return 0;
    while (a > 1) {
        q = Math.floor(a / m);
        t = m;
        m = a % m; a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    return (x1 + m0) % m0;
}

function strToNum(str) {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        num += str.charCodeAt(i);
    }
    return num % p;
}

function numToStr(num) {
    return String.fromCharCode(num);
}

// Caesar Cipher
function runCaesarEncrypt() {
    const plaintext = document.getElementById("caesar-text").value;
    const key = parseInt(document.getElementById("caesar-key").value);
    if (!plaintext || isNaN(key)) return alert("Both fields are required!");
    const result = caesarShift(plaintext, key);
    document.getElementById("caesar-result").textContent = `Encrypted: ${result}`;
}

function runCaesarDecrypt() {
    const ciphertext = document.getElementById("caesar-text").value;
    const key = parseInt(document.getElementById("caesar-key").value);
    if (!ciphertext || isNaN(key)) return alert("Both fields are required!");
    const result = caesarShift(ciphertext, -key);
    document.getElementById("caesar-result").textContent = `Decrypted: ${result}`;
}

function caesarShift(text, shift) {
    return text
        .split("")
        .map(char => {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
            if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
            return char;
        })
        .join("");
}
