const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Encrypt function for Monoalphabetic Cipher
function runMonoalphabeticEncrypt() {
    const text = document.getElementById("mo-text").value.toUpperCase();
    const key = document.getElementById("mo-key").value.toUpperCase();
    if (!text || key.length !== 26 || !isValidKey(key)) {
        alert("Please enter valid text and a key of 26 unique alphabetic characters!");
        return;
    }
    const result = monoalphabeticEncrypt(text, key);
    document.getElementById("mo-result").textContent = `Encrypted: ${result}`;
}

// Decrypt function for Monoalphabetic Cipher
function runMonoalphabeticDecrypt() {
    const text = document.getElementById("mo-text").value.toUpperCase();
    const key = document.getElementById("mo-key").value.toUpperCase();
    if (!text || key.length !== 26 || !isValidKey(key)) {
        alert("Please enter valid text and a key of 26 unique alphabetic characters!");
        return;
    }
    const result = monoalphabeticDecrypt(text, key);
    document.getElementById("mo-result").textContent = `Decrypted: ${result}`;
}

// Monoalphabetic encryption logic
function monoalphabeticEncrypt(text, key) {
    let result = "";
    for (let char of text) {
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            result += key[index];
        } else {
            result += char; // Non-alphabetic characters remain unchanged
        }
    }
    return result;
}

// Monoalphabetic decryption logic
function monoalphabeticDecrypt(text, key) {
    let result = "";
    for (let char of text) {
        if (key.includes(char)) {
            const index = key.indexOf(char);
            result += alphabet[index];
        } else {
            result += char; // Non-alphabetic characters remain unchanged
        }
    }
    return result;
}

// Validate if the key is valid (26 unique alphabetic characters)
function isValidKey(key) {
    const uniqueChars = new Set(key);
    return uniqueChars.size === 26 && /^[A-Z]+$/.test(key);
}
