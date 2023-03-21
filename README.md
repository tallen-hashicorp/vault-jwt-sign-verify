# Vault JWT Sign Verify
The `verify.js` and `sign.js` scripts are examples of how to use Hashicorp Vault to sign and verify a JWT token. With Vault, you can leverage its Transit Secrets Engine to create a new RSA-4096 key that can be used to sign and verify your JWTs. This eliminates the need to store your JWT keys in your code, as it is instead stored securely in Vault.

The `verify.js` script allows you to verify a JWT by taking in the JWT and the name of the RSA-4096 key in Vault. You can also specify the version of the vault key, the vault token to use, and the URL of the vault.

The `sign.js` script allows you to generate a JWT by taking in the name of the RSA-4096 key in Vault. You can also specify the URL of the vault and payload paramaters.

The `signSimple.js` script allows you to easily sign an existing JWT using the RSA-4096 key in Vault.

# Verify.js
```
Usage: verify.js [options] [command]
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -h, --help            Output usage information
    -j, --jwt             The JWT to verify
    -k, --key [value]     The name of the RSA-4096 key in vault (defaults to "sign_key")
    -K, --keyVersion <n>  the version of the vault key (defaults to 1)
    -t, --token           The vault token to use
    -v, --vault           The URL of vault (defaults to "http://127.0.0.1:8200")
    -V, --version         Output the version number
```

# Sign.js
```
Usage: sign.js [options] [command]
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -h, --help          Output usage information
    -k, --key [value]   The name of the RSA-4096 key in vault (defaults to "sign_key")
    -n, --name [value]  The name in the JWT payload (defaults to "Tyler Allen")
    -s, --sub [value]   The sub in the JWT payload (defaults to "123456789")
    -t, --token         The vault token to use
    -v, --vault         The URL of vault (defaults to "http://127.0.0.1:8200")
    -V, --version       Output the version number
```

# Sign Simple
```
Usage: signSimple.js [options] [command]
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -h, --help         Output usage information
    -j, --jwt          The JWT to sign
    -k, --key [value]  The name of the RSA-4096 key in vault (defaults to "sign_key")
    -t, --token        The vault token to use
    -v, --vault        The URL of vault (defaults to "http://127.0.0.1:8200")
    -V, --version      Output the version number
```

# Vault Prerequisites
In order to sign and verify a JWT, you will need a vault RSA key. The [Vault Transit Secrets Engine](https://developer.hashicorp.com/vault/docs/secrets/transit) will be used to create the key and perform signing and verification.  
```bash
vault secrets enable transit
```

Next we will create a new RSA-4096 key called `sign_key`
```bash
vault write -f transit/keys/sign_key type="rsa-4096"
```

# Install
```bash
npm install
```

# To Generate a JWT using a vault key
Defaults to `http://127.0.0.1:8200`

Replace the `token` with your vault token
```bash
node sign.js --token h*******2
```

If you use another vault URL use:
```bash
node sign.js --token h*****2 --vault https://127.0.0.1:8200
```

# To Sign an exsiting JWT using a vault key
Replace the `token` and `jwt` with your vault token and a non signed JWT
```bash
node signSimple.js --token h*****2 --jwt e.sd
```

# To Verify a JWT using a vault key
Replace the `token` and `jwt` with your vault token and your signed JWT
```bash
node verify.js --token h*****2 --jwt asd.asd.asd
```