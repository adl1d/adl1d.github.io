const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Encrypt function for Vigenère Cipher
function runVigenereEncrypt() {
    const text = document.getElementById("vg-text").value.toUpperCase();
    const key = document.getElementById("vg-key").value.toUpperCase();
    if (!text || !key) {
        alert("Please enter both text and key!");
        return;
    }
    const result = vigenereCipher(text, key, true);
    document.getElementById("vg-result").textContent = `Encrypted: ${result}`;
}

// Decrypt function for Vigenère Cipher
function runVigenereDecrypt() {
    const text = document.getElementById("vg-text").value.toUpperCase();
    const key = document.getElementById("vg-key").value.toUpperCase();
    if (!text || !key) {
        alert("Please enter both text and key!");
        return;
    }
    const result = vigenereCipher(text, key, false);
    document.getElementById("vg-result").textContent = `Decrypted: ${result}`;
}

// General Vigenère Cipher function for both encryption and decryption
function vigenereCipher(text, key, encrypt = true) {
    let result = "";
    let keyIndex = 0;

    for (let char of text) {
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
