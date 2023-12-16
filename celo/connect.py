from web3 import Web3
from dotenv import load_dotenv
import os

from web3.exceptions import ExtraDataLengthError

import getAccount

load_dotenv()

w3 = Web3(Web3.HTTPProvider(os.environ.get('CELO_TESTNET_PROVIDER_URL')))


def getConnection():
    return w3.is_connected()


def getBalance(wallet_address):
    checksum_wallet = w3.to_checksum_address(wallet_address)
    return w3.eth.get_balance(checksum_wallet)


if __name__ == '__main__':
    wallet = '0x8bA16fB3A8dA003083Fa7025fefd59006DBf6750'
    print(getBalance(wallet))
