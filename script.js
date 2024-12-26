// Vigenère Cipher
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
            result += char;
        }
    }

    return result;
}
// Vernam Cipher
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

function vernamEncrypt(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += (text[i] ^ key[i]).toString();
    }
    return result;
}

function vernamDecrypt(text, key) {
    return vernamEncrypt(text, key);
}

function isValidBinary(input) {
    return /^[01]+$/.test(input);
}
// Polyalphabetic Cipher
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
            result += char;
        }
    }

    return result;
}
// Playfair Cipher
function runPlayfairEncrypt() {
    const text = document.getElementById("pf-text").value.toUpperCase().replace(/J/g, "I");
    const key = document.getElementById("pf-key").value.toUpperCase().replace(/J/g, "I");
    if (!text || !key) {
        alert("Please enter both text and key!");
        return;
    }
    const matrix = generatePlayfairMatrix(key);
    const result = playfairEncrypt(text, matrix);
    document.getElementById("pf-result").textContent = `Encrypted: ${result}`;
}

function runPlayfairDecrypt() {
    const text = document.getElementById("pf-text").value.toUpperCase().replace(/J/g, "I");
    const key = document.getElementById("pf-key").value.toUpperCase().replace(/J/g, "I");
    if (!text || !key) {
        alert("Please enter both text and key!");
        return;
    }
    const matrix = generatePlayfairMatrix(key);
    const result = playfairDecrypt(text, matrix);
    document.getElementById("pf-result").textContent = `Decrypted: ${result}`;
}

function generatePlayfairMatrix(key) {
    const matrix = [];
    const usedChars = new Set();
    const sanitizedKey = (key + alphabet).replace(/[^A-Z]/g, "");
    for (const char of sanitizedKey) {
        if (!usedChars.has(char)) {
            usedChars.add(char);
            if (matrix.length === 0 || matrix[matrix.length - 1].length === 5) {
                matrix.push([]);
            }
            matrix[matrix.length - 1].push(char);
        }
    }
    return matrix;
}

function playfairEncrypt(text, matrix) {
    const pairs = formatTextForPlayfair(text);
    let result = "";

    for (const pair of pairs) {
        const [row1, col1] = findPosition(matrix, pair[0]);
        const [row2, col2] = findPosition(matrix, pair[1]);

        if (row1 === row2) {
            result += matrix[row1][(col1 + 1) % 5];
            result += matrix[row2][(col2 + 1) % 5];
        } else if (col1 === col2) {
            result += matrix[(row1 + 1) % 5][col1];
            result += matrix[(row2 + 1) % 5][col2];
        } else {
            result += matrix[row1][col2];
            result += matrix[row2][col1];
        }
    }

    return result;
}

function playfairDecrypt(text, matrix) {
    const pairs = formatTextForPlayfair(text);
    let result = "";

    for (const pair of pairs) {
        const [row1, col1] = findPosition(matrix, pair[0]);
        const [row2, col2] = findPosition(matrix, pair[1]);

        if (row1 === row2) {
            result += matrix[row1][(col1 - 1 + 5) % 5];
            result += matrix[row2][(col2 - 1 + 5) % 5];
        } else if (col1 === col2) {
            result += matrix[(row1 - 1 + 5) % 5][col1];
            result += matrix[(row2 - 1 + 5) % 5][col2];
        } else {
            result += matrix[row1][col2];
            result += matrix[row2][col1];
        }
    }

    return result;
}

function formatTextForPlayfair(text) {
    const sanitizedText = text.replace(/[^A-Z]/g, "");
    const pairs = [];
    let i = 0;

    while (i < sanitizedText.length) {
        const char1 = sanitizedText[i];
        const char2 = sanitizedText[i + 1] || "X";
        if (char1 === char2) {
            pairs.push([char1, "X"]);
            i++;
        } else {
            pairs.push([char1, char2]);
            i += 2;
        }
    }

    return pairs;
}

function findPosition(matrix, char) {
    for (let row = 0; row < matrix.length; row++) {
        const col = matrix[row].indexOf(char);
        if (col !== -1) return [row, col];
    }
    return [-1, -1];
}
// Hill Cipher
function runHillEncrypt() {
    const text = document.getElementById("hill-text").value.toUpperCase().replace(/[^A-Z]/g, "");
    const keyInput = document.getElementById("hill-key").value;
    const key = parseKey(keyInput);

    if (!text || !key) {
        alert("Please enter valid text and a key (4 integers for a 2x2 matrix)!");
        return;
    }

    const result = hillCipherEncrypt(text, key);
    document.getElementById("hill-result").textContent = `Encrypted: ${result}`;
}

function runHillDecrypt() {
    const text = document.getElementById("hill-text").value.toUpperCase().replace(/[^A-Z]/g, "");
    const keyInput = document.getElementById("hill-key").value;
    const key = parseKey(keyInput);

    if (!text || !key) {
        alert("Please enter valid text and a key (4 integers for a 2x2 matrix)!");
        return;
    }

    const result = hillCipherDecrypt(text, key);
    document.getElementById("hill-result").textContent = `Decrypted: ${result}`;
}

function parseKey(keyInput) {
    const numbers = keyInput.split(",").map(Number);
    if (numbers.length !== 4 || numbers.some(isNaN)) {
        return null;
    }
    return [
        [numbers[0], numbers[1]],
        [numbers[2], numbers[3]]
    ];
}

function hillCipherEncrypt(text, key) {
    if (text.length % 2 !== 0) text += "X";

    let result = "";
    for (let i = 0; i < text.length; i += 2) {
        const pair = [alphabet.indexOf(text[i]), alphabet.indexOf(text[i + 1])];
        const encryptedPair = matrixMultiply(key, pair, 26);
        result += alphabet[encryptedPair[0]] + alphabet[encryptedPair[1]];
    }
    return result;
}

function hillCipherDecrypt(text, key) {
    const inverseKey = matrixInverse(key, 26);
    if (!inverseKey) {
        alert("The key matrix is not invertible. Decryption is not possible.");
        return "";
    }

    let result = "";
    for (let i = 0; i < text.length; i += 2) {
        const pair = [alphabet.indexOf(text[i]), alphabet.indexOf(text[i + 1])];
        const decryptedPair = matrixMultiply(inverseKey, pair, 26);
        result += alphabet[decryptedPair[0]] + alphabet[decryptedPair[1]];
    }
    return result;
}

function matrixMultiply(matrix, vector, mod) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        result.push((matrix[i][0] * vector[0] + matrix[i][1] * vector[1]) % mod);
    }
    return result;
}

function matrixInverse(matrix, mod) {
    const determinant = (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % mod;
    const determinantInverse = modInverse(determinant, mod);
    if (determinantInverse === null) return null;

    return [
        [(matrix[1][1] * determinantInverse) % mod, (-matrix[0][1] * determinantInverse) % mod],
        [(-matrix[1][0] * determinantInverse) % mod, (matrix[0][0] * determinantInverse) % mod]
    ].map(row => row.map(x => (x + mod) % mod));
}

// Monoalphabetic Cipher
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

function monoalphabeticEncrypt(text, key) {
    let result = "";
    for (let char of text) {
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            result += key[index];
        } else {
            result += char;
        }
    }
    return result;
}

function monoalphabeticDecrypt(text, key) {
    let result = "";
    for (let char of text) {
        if (key.includes(char)) {
            const index = key.indexOf(char);
            result += alphabet[index];
        } else {
            result += char;
        }
    }
    return result;
}

function isValidKey(key) {
    const uniqueChars = new Set(key);
    return uniqueChars.size === 26 && /^[A-Z]+$/.test(key);
}

// AutoKey Cipher
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

function autoKeyCipher(text, key, encrypt = true) {
    let result = "";
    let fullKey = key + (encrypt ? text : "");
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
            result += char;
        }
    }

    return result;
}

// Caesar Cipher
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

function caesarCipher(text, shift) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const result = text.split("").map(char => {
        const isUpperCase = alphabet.indexOf(char) < 26;
        const index = alphabet.indexOf(char);
        if (index === -1) {
            return char;
        }

        const base = isUpperCase ? 0 : 26;
        const newIndex = (index - base + shift + 26) % 26 + base;
        return alphabet[newIndex];
    });

    return result.join("");
}

// ElGamal Cipher
const p = 23, g = 5, x = 6;

function runElgamalEncrypt() {
    const plaintext = parseInt(document.getElementById("elgamal-text").value);

    if (isNaN(plaintext) || plaintext < 0 || plaintext >= p) {
        alert(`Please enter a valid plaintext number between 0 and ${p - 1}!`);
        return;
    }

    const result = elgamalEncrypt(plaintext);
    document.getElementById("elgamal-result").textContent = `Encrypted: (${result.c1}, ${result.c2})`;
}

function runElgamalDecrypt() {
    const ciphertext = document.getElementById("elgamal-result").textContent.replace("Encrypted: (", "").replace(")", "");
    const [c1, c2] = ciphertext.split(", ").map(Number);

    if (isNaN(c1) || isNaN(c2)) {
        alert("Please encrypt a valid plaintext first!");
        return;
    }

    const result = elgamalDecrypt(c1, c2);
    document.getElementById("elgamal-result").textContent = `Decrypted: ${result}`;
}

function elgamalEncrypt(m) {
    const k = Math.floor(Math.random() * (p - 2)) + 1;
    const y = modPow(g, x, p);
    const c1 = modPow(g, k, p);
    const c2 = (m * modPow(y, k, p)) % p;

    return { c1, c2 };
}

function elgamalDecrypt(c1, c2) {
    const s = modPow(c1, x, p);
    const sInverse = modInverse(s, p);
    const m = (c2 * sInverse) % p;
    return m;
}

function modPow(base, exp, mod) {
    let result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp % 2 === 1) result = (result * base) % mod;
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
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
        m = a % m;
        a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    return (x1 + m0) % m0;
}



