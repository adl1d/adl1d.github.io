const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Encrypt function for AutoKey Cipher
function runAutoKeyEncrypt() {
    const text = document.getElementById("ak-text").value.toUpperCase();
    const key = document.getElementById("ak-key").value.toUpperCase();
    if (!text || !key) {
        alert("Please enter both text and key!");
        return;
    }
    const result = autoKeyCipher(text, key, true);
    document.getElementById("ak-result").textContent = `Encrypted: ${result}`;
}

// Decrypt function for AutoKey Cipher
function runAutoKeyDecrypt() {
    const text = document.getElementById("ak-text").value.toUpperCase();
    const key = document.getElementById("ak-key").value.toUpperCase();
    if (!text || !key) {
        alert("Please enter both text and key!");
        return;
    }
    const result = autoKeyCipher(text, key, false);
    document.getElementById("ak-result").textContent = `Decrypted: ${result}`;
}

// General AutoKey Cipher function for both encryption and decryption
function autoKeyCipher(text, key, encrypt = true) {
    let result = "";
    let fullKey = key + (encrypt ? text : ""); // Extend key with plaintext during encryption
    let keyIndex = 0;

    for (const char of text) {
        if (alphabet.includes(char)) {
            const textIdx = alphabet.indexOf(char);
            const keyIdx = alphabet.indexOf(fullKey[keyIndex % fullKey.length]);
            const newIdx = encrypt
                ? (textIdx + keyIdx) % 26
                : (textIdx - keyIdx + 26) % 26;
            result += alphabet[newIdx];
            keyIndex++;
        } else {
            result += char; // Non-alphabetic characters remain unchanged
        }
    }

    return result;
}
