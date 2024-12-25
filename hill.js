const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Encrypt function for Hill Cipher
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

// Decrypt function for Hill Cipher
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

// Parse key input into a 2x2 matrix
function parseKey(keyInput) {
    const numbers = keyInput.split(",").map(Number);
    if (numbers.length !== 4 || numbers.some(isNaN)) {
        return null; // Invalid key
    }
    return [
        [numbers[0], numbers[1]],
        [numbers[2], numbers[3]]
    ];
}

// Encrypt using Hill Cipher
function hillCipherEncrypt(text, key) {
    if (text.length % 2 !== 0) text += "X"; // Pad if odd-length

    let result = "";
    for (let i = 0; i < text.length; i += 2) {
        const pair = [alphabet.indexOf(text[i]), alphabet.indexOf(text[i + 1])];
        const encryptedPair = matrixMultiply(key, pair, 26);
        result += alphabet[encryptedPair[0]] + alphabet[encryptedPair[1]];
    }
    return result;
}

// Decrypt using Hill Cipher
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

// Matrix multiplication for 2x2 matrix and 2x1 vector
function matrixMultiply(matrix, vector, mod) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        result.push((matrix[i][0] * vector[0] + matrix[i][1] * vector[1]) % mod);
    }
    return result;
}

// Find modular inverse of a 2x2 matrix
function matrixInverse(matrix, mod) {
    const determinant = (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % mod;
    const determinantInverse = modInverse(determinant, mod);
    if (determinantInverse === null) return null;

    // Swap and negate for adjugate matrix
    return [
        [(matrix[1][1] * determinantInverse) % mod, (-matrix[0][1] * determinantInverse) % mod],
        [(-matrix[1][0] * determinantInverse) % mod, (matrix[0][0] * determinantInverse) % mod]
    ].map(row => row.map(x => (x + mod) % mod)); // Ensure values are positive
}

// Modular inverse using extended Euclidean algorithm
function modInverse(a, m) {
    let m0 = m, t, q;
    let x0 = 0, x1 = 1;

    if (m === 1) return null;

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
