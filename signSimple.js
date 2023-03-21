const { base64encode} = require('nodejs-base64');
const base64url = require('base64url');
const args = require('args')
const axios = require('axios');

args
  .option('key', 'The name of the RSA-4096 key in vault', 'sign_key')
  .option('jwt', 'The JWT to sign')
  .option('token', 'The vault token to use')
  .option('vault', 'The URL of vault', 'http://127.0.0.1:8200')
const flags = args.parse(process.argv)

async function sign(){
    const rsp = await axios.post(`${flags.vault}/v1/transit/sign/${flags.key}`, {
        hash_algorithm: "sha2-256",
        signature_algorithm:"pkcs1v15",
        input: base64encode(flags.jwt)
    },{
        headers: {'X-Vault-Token': flags.token}
    })
    return (rsp.data.data.signature)
}

async function generateJwt(){
    const signature = await sign()
    const signature64 = base64url.fromBase64(signature.replace(/vault:v.*:/g,''))
    return `${flags.jwt}.${signature64}`
}

async function run(){
    const jwt = await generateJwt()
    console.log(jwt)
}

run();
