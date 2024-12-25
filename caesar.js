// Encrypt function for Caesar Cipher
function runCaesarEncrypt() {
    const text = document.getElementById("caesar-text").value;
    const shift = parseInt(document.getElementById("caesar-key").value);

    if (!text || isNaN(shift)) {
        alert("Please enter valid text and a key!");
        return;
    }

    const result = caesarCipher(text, shift);
    document.getElementById("caesar-result").textContent = `Encrypted: ${result}`;
}

// Decrypt function for Caesar Cipher
function runCaesarDecrypt() {
    const text = document.getElementById("caesar-text").value;
    const shift = parseInt(document.getElementById("caesar-key").value);

    if (!text || isNaN(shift)) {
        alert("Please enter valid text and a key!");
        return;
    }

    const result = caesarCipher(text, -shift);
    document.getElementById("caesar-result").textContent = `Decrypted: ${result}`;
}

// General Caesar Cipher function for encryption and decryption
function caesarCipher(text, shift) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const result = text.split("").map(char => {
        const isUpperCase = alphabet.indexOf(char) < 26;
        const index = alphabet.indexOf(char);
        if (index === -1) {
            return char; // Non-alphabet characters remain unchanged
        }

        const base = isUpperCase ? 0 : 26;
        const newIndex = (index - base + shift + 26) % 26 + base;
        return alphabet[newIndex];
    });

    return result.join("");
}
