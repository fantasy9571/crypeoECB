const crypto = require('crypto')

module.exports = {
    encrypt({
        params, key, keyPattern, negation = false,
    } = {}) {
        try {
            if (typeof key !== 'string' || !key) {
                return 'Provided "key" must be a non-empty string'
            }
            const newParams = JSON.parse(JSON.stringify(params))
            const paramsKeys = Object.keys(params)
            if (negation) {
                paramsKeys.forEach((item) => {
                    if (keyPattern.split('|').indexOf(item) === -1) {
                        const cipher = crypto.createCipher('aes192', key)
                        let crypted = cipher.update(params[item], 'utf8', 'hex')
                        crypted += cipher.final('hex')
                        newParams[item] = crypted
                    }
                })
            } else if (keyPattern) {
                keyPattern.split('|').forEach((item) => {
                    if (params[item]) {
                        const cipher = crypto.createCipher('aes192', key)
                        let crypted = cipher.update(params[item], 'utf8', 'hex')
                        crypted += cipher.final('hex')
                        newParams[item] = crypted
                    }
                })
            } else {
                paramsKeys.forEach((item) => {
                    const cipher = crypto.createCipher('aes192', key)
                    let crypted = cipher.update(params[item], 'utf8', 'hex')
                    crypted += cipher.final('hex')
                    newParams[item] = crypted
                })
            }
            return newParams
        } catch (error) {
            return 'encrypt is fail check values'
        }
    },
    decrypt({
        params, key, keyPattern, negation = false,
    } = {}) {
        try {
            if (typeof key !== 'string' || !key) {
                return 'Provided "key" must be a non-empty string'
            }
            const newParams = JSON.parse(JSON.stringify(params))
            const paramsKeys = Object.keys(params)
            if (negation) {
                paramsKeys.forEach((item) => {
                    if (keyPattern.split('|').indexOf(item) === -1) {
                        const decipher = crypto.createDecipher('aes192', key)
                        let decrypted = decipher.update(params[item], 'hex', 'utf8')
                        decrypted += decipher.final('utf8')
                        newParams[item] = decrypted
                    }
                })
            } else if (keyPattern) {
                keyPattern.split('|').forEach((item) => {
                    if (params[item]) {
                        const decipher = crypto.createDecipher('aes192', key)
                        let decrypted = decipher.update(params[item], 'hex', 'utf8')
                        decrypted += decipher.final('utf8')
                        newParams[item] = decrypted
                    }
                })
            } else {
                paramsKeys.forEach((item) => {
                    const decipher = crypto.createDecipher('aes192', key)
                    let decrypted = decipher.update(params[item], 'hex', 'utf8')
                    decrypted += decipher.final('utf8')
                    newParams[item] = decrypted
                })
            }
            return newParams
        } catch (error) {
            return 'decrypt is fail, check values'
        }
    },
}
