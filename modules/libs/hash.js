const crypto = require('crypto');

/**
 * get encrypt key from process env params if exists or use default
 * @returns {string}
 */
const getEncryptionKey = () => {
    const def = 'YCaXyvSZUYu7R98d2Lu0mfuX4JqziLG3';
    let key = '';
    if (process.env.ENCRYPTION_KEY && typeof process.env.ENCRYPTION_KEY === "string") {
        key = process.env.ENCRYPTION_KEY;
    }
    key += def;
    return key.substr(0, 32);
};

const ENCRYPTION_KEY = getEncryptionKey();
const IV_LENGTH = 16; // For AES, this is always 16


class Hash {

    static getRandomString(length = 8) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length);
    }

    static hash(str, salt) {
        if (!salt || typeof salt !== "string") {
            salt = this.getRandomString(8);
        }
        const hash = crypto.createHmac('sha512', salt);
        /** Hashing algorithm sha512 */
        hash.update(str);
        const value = hash.digest('hex');
        return {
            salt: salt,
            hash: value
        };
    }

    static encrypt(text) {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    static decrypt(text) {
        let textParts = text.split(':');
        let iv = new Buffer(textParts.shift(), 'hex');
        let encryptedText = new Buffer(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }


}

module.exports = Hash;