# Vault JWT Sign Verify

Uses vault to sign or verify a JWT token

# Verify.js

```bash
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

```bash
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

# Vault Prerequisites

In order to sign and verify a JWT, you will need a vault RSA key. The [Vault Transit Secrets Engine](https://developer.hashicorp.com/vault/docs/secrets/transit) will be used to create the key and perform signing and verification.  

```bash
vault secrets enable transit
```

Next we will create a new RSA-4096 key called `sign_key`

```bash
vault write -f transit/keys/sign_key type="rsa-4096"

vault write -f transit/keys/sign_key/config deletion_allowed="true" exportable="true"
vault read /transit/export/signing-key/sign_key
```

# Install

```bash
npm install
```

# To Generate a JWT using a vault key

Defaults to `http://127.0.0.1:8200`

```bash
node sign.js --token h*******2
```

If you use another vault URL use:

```bash
node sign.js --token h*****2 --vault <https://127.0.0.1:8200>
```

# To Verify a JWT using a vault key

```bash
node verify.js --token h*****2 --jwt asd.asd.asd
```