const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // J is excluded in Playfair Cipher

// Encrypt function for Playfair Cipher
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

// Decrypt function for Playfair Cipher
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

// Generate Playfair matrix based on the key
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

// Encrypt using Playfair Cipher
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

// Decrypt using Playfair Cipher
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

// Format the input text for Playfair Cipher (create pairs, handle duplicate letters and odd length)
function formatTextForPlayfair(text) {
    const sanitizedText = text.replace(/[^A-Z]/g, "");
    const pairs = [];
    let i = 0;

    while (i < sanitizedText.length) {
        const char1 = sanitizedText[i];
        const char2 = sanitizedText[i + 1] || "X"; // Use X if no second character
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

// Find the row and column of a character in the Playfair matrix
function findPosition(matrix, char) {
    for (let row = 0; row < matrix.length; row++) {
        const col = matrix[row].indexOf(char);
        if (col !== -1) return [row, col];
    }
    return [-1, -1]; // Not found
}
