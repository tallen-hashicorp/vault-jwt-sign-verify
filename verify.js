const { base64encode, base64decode } = require('nodejs-base64');
const base64url = require('base64url');
const args = require('args')
const axios = require('axios');

args
  .option('key', 'The name of the RSA-4096 key in vault', 'sign_key')
  .option('keyVersion', 'the version of the vault key', 1)
  .option('token', 'The vault token to use')
  .option('vault', 'The URL of vault', 'http://127.0.0.1:8200')
  .option('jwt', 'The JWT to verify')
const flags = args.parse(process.argv)

async function verify(input, signature){
    const rsp = await axios.post(`${flags.vault}/v1/transit/verify/${flags.key}`, {
        hash_algorithm: "sha2-256",
        signature_algorithm:"pkcs1v15",
        input,
        signature
    },{
        headers: {'X-Vault-Token': flags.token}
    })
    return rsp.data.data.valid
}

async function verifyJwt(jwt){
    const jwtHeader = jwt.split(".")[0]
    const jwtPayload = jwt.split(".")[1]
    const jwtSignature = base64url.toBase64(jwt.split(".")[2])
    const valid =verify(base64encode(`${jwtHeader}.${jwtPayload}`),`vault:v${flags.keyVersion}:${jwtSignature}`)
    return valid
}

async function run(){
    const valid = await verifyJwt(flags.jwt)
    console.log(valid)
}

run();
