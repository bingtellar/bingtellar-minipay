from web3 import Web3
import os
import json


def getAccount():
    provider_url = os.environ.get("CELO_TESTNET_PROVIDER_URL")
    w3 = Web3(Web3.HTTPProvider(provider_url))

    account = w3.eth.account.create()
    json_format = {
        'address': account.address,
        'private_key': Web3.to_hex(account._private_key),
        #'objects': dir(account)
    }
    return json.dumps(json_format)


if __name__ == '__main__':
    print(getAccount())


