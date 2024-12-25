// Encrypt function for Vernam Cipher (Binary)
function runVernamEncrypt() {
    const text = document.getElementById("vernam-text").value;
    const key = document.getElementById("vernam-key").value;

    if (!text || !key || !isValidBinary(text) || !isValidBinary(key) || text.length !== key.length) {
        alert("Please enter valid binary text and key of equal length!");
        return;
    }

    const result = vernamEncrypt(text, key);
    document.getElementById("vernam-result").textContent = `Encrypted: ${result}`;
}

// Decrypt function for Vernam Cipher (Binary)
function runVernamDecrypt() {
    const text = document.getElementById("vernam-text").value;
    const key = document.getElementById("vernam-key").value;

    if (!text || !key || !isValidBinary(text) || !isValidBinary(key) || text.length !== key.length) {
        alert("Please enter valid binary text and key of equal length!");
        return;
    }

    const result = vernamDecrypt(text, key);
    document.getElementById("vernam-result").textContent = `Decrypted: ${result}`;
}

// Vernam Cipher encryption (binary XOR)
function vernamEncrypt(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += (text[i] ^ key[i]).toString(); // XOR operation
    }
    return result;
}

// Vernam Cipher decryption (same as encryption for XOR)
function vernamDecrypt(text, key) {
    return vernamEncrypt(text, key); // Encryption and decryption are identical in XOR
}

// Validate binary input
function isValidBinary(input) {
    return /^[01]+$/.test(input); // Check if input contains only 0s and 1s
}
