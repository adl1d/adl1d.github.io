const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Encrypt function for Polyalphabetic Cipher
function runPolyalphabeticEncrypt() {
    const text = document.getElementById("poly-text").value.toUpperCase();
    const key = document.getElementById("poly-key").value.toUpperCase();

    if (!text || !key) {
        alert("Please enter both text and key!");
        return;
    }

    const result = polyalphabeticCipher(text, key, true);
    document.getElementById("poly-result").textContent = `Encrypted: ${result}`;
}

// Decrypt function for Polyalphabetic Cipher
function runPolyalphabeticDecrypt() {
    const text = document.getElementById("poly-text").value.toUpperCase();
    const key = document.getElementById("poly-key").value.toUpperCase();

    if (!text || !key) {
        alert("Please enter both text and key!");
        return;
    }

    const result = polyalphabeticCipher(text, key, false);
    document.getElementById("poly-result").textContent = `Decrypted: ${result}`;
}

// Polyalphabetic Cipher function for both encryption and decryption
function polyalphabeticCipher(text, key, encrypt = true) {
    let result = "";
    let keyIndex = 0;

    for (const char of text) {
        if (alphabet.includes(char)) {
            const textIndex = alphabet.indexOf(char);
            const keyIndexValue = alphabet.indexOf(key[keyIndex % key.length]);
            const newIndex = encrypt
                ? (textIndex + keyIndexValue) % 26
                : (textIndex - keyIndexValue + 26) % 26;

            result += alphabet[newIndex];
            keyIndex++;
        } else {
            result += char; // Non-alphabet characters remain unchanged
        }
    }

    return result;
}
