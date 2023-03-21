const { base64encode, base64decode } = require('nodejs-base64');
const args = require('args')
const axios = require('axios');

args
  .option('key', 'The name of the RSA-4096 key in vault', 'sign_key')
  .option('token', 'The vault token to use')
  .option('vault', 'The URL of vault', 'http://127.0.0.1:8200')
  .option('name', 'The name in the JWT payload', 'Tyler Allen')
  .option('sub', 'The sub in the JWT payload', '123456789')
const flags = args.parse(process.argv)

const header = {
    kid: "keyName_keyVersion",
    alg: "RS256"
}

const payload = {
    "sub": flags.sub,
    "name": flags.name,
    "iat": Date.now()
}

const header64 = base64encode(JSON.stringify(header))
const payload64 = base64encode(JSON.stringify(payload))

async function sign(){
    const rsp = await axios.post(`${flags.vault}/v1/transit/sign/${flags.key}`, {
        hash_algorithm: "sha2-256",
        signature_algorithm:"pkcs1v15",
        input: base64encode(`${header64}.${payload64}`)
    },{
        headers: {'X-Vault-Token': flags.token}
    })
    return (rsp.data.data.signature)
}


async function generateJwt(){
    const signature = await sign()
    const signature64 = base64encode(signature.replace(/vault:v.*:/g,''))
    return `${header64}.${payload64}.${signature64}`
    
}


async function run(){
    const jwt = await generateJwt()
    console.log(jwt)
}

run();
