#cryptoecb
基于node.js 内置crypto模块 实现Object对象加解密

示例：
```
//参数:
{   params: {
        name: '张三',
        sex: '男'
        phone: '13312345678',
        idcard: '300123201811263018',
      }, //必填
    key: 'secret key', //必填 加密解密必须是相同的key 请保管好
    keyPattern:'',   //选填 默认加密对象中所有的键值 格式：'phone|idcard'
    negation: Bool  //选填 默认为false, 作用：取反操作
}
```
##如何使用
```
npm i cryptoecb -S
```
1、加密encrypt
```
const cryptoecb = require('cryptoecb')

const key = '0fCTbJBOAWg1r9YiKV3UScMjdeX7GZPl'
const objPramas = {
    params: {
        name: '张三',
        sex: '男',
        phone: '13312345678',
        idcard: '300123201811263018',
      },
    key,
    keyPattern:'phone|idcard' 
}
const encryptResult = cryptoecb.encrypt(objPramas)
console.log(encryptResult)
{
    "name": "张三",
    "sex": "男",
    "phone": "6dd9388a4476276e48d784685899e660",
    "idcard": "fc39704898abcd602f9585aaf0c0862f84980d538b6d4df8bbee7f4c65c34422"
}
```
2、解密 decrypt
```

const objPramas = {
    params: encryptResult,
    key,
    keyPattern:'phone|idcard' 
}
const decryptRsult = cryptoecb.decrypt(objPramas)
console.log(decryptRsult)
{
    "name": "张三",
    "sex": "男",
    "phone": "13312345678",
    "idcard": "300123201811263018"
}
```
