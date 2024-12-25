// ElGamal Cipher Parameters
const p = 23;  // A prime number
const g = 5;   // A primitive root modulo p
const x = 6;   // Private key

// Encrypt function for ElGamal Cipher
function runElgamalEncrypt() {
    const plaintext = parseInt(document.getElementById("elgamal-text").value);

    if (isNaN(plaintext) || plaintext < 0 || plaintext >= p) {
        alert(`Please enter a valid plaintext number between 0 and ${p - 1}!`);
        return;
    }

    const result = elgamalEncrypt(plaintext);
    document.getElementById("elgamal-result").textContent = `Encrypted: (${result.c1}, ${result.c2})`;
}

// Decrypt function for ElGamal Cipher
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

// ElGamal encryption
function elgamalEncrypt(m) {
    const k = Math.floor(Math.random() * (p - 2)) + 1; // Random session key
    const y = modPow(g, x, p); // Public key
    const c1 = modPow(g, k, p);
    const c2 = (m * modPow(y, k, p)) % p;

    return { c1, c2 };
}

// ElGamal decryption
function elgamalDecrypt(c1, c2) {
    const s = modPow(c1, x, p); // Shared secret
    const sInverse = modInverse(s, p);
    const m = (c2 * sInverse) % p;
    return m;
}

// Utility: Modular exponentiation
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

// Utility: Modular inverse using Extended Euclidean Algorithm
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
