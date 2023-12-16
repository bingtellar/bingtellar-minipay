import web3.providers.eth_tester.middleware
from web3 import Web3
from dotenv import load_dotenv
import os
import json

from web3.middleware import geth_poa_middleware

load_dotenv()

w3 = Web3(Web3.HTTPProvider(os.environ.get('CELO_TESTNET_PROVIDER_URL')))
chain_id = 44787

wallet = os.environ.get('CELO_DEPLOYER_ADDRESS')
private_key = os.environ.get('CELO_DEPLOYER_PRIVATE_KEY')
nonce = w3.eth.get_transaction_count(wallet)
deploy_address = '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9'

with open('compiled_sol.json', 'r') as f:
    contract = json.loads(f.read())

w3.middleware_onion.inject(geth_poa_middleware, layer=0)

abi = contract['contracts']['bingremit.sol']['BingRemit']['abi']
bytecode = contract['contracts']['bingremit.sol']['BingRemit']['evm']['bytecode']['object']

#print(w3.eth.gas_price)
with open('remit_abi.json', 'w') as f:
    f.write(json.dumps(abi))

# bingremit_contract = w3.eth.contract(abi=abi, bytecode=bytecode)
# tx = {
#     'nonce': nonce,
#     'gas': 1000000,
#     'gasPrice': w3.eth.gas_price,
#     'chainId': chain_id
# }
#
# transaction = bingremit_contract.constructor(deploy_address).build_transaction(tx)
#
# # # Build the transaction
# signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
# transaction_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
# transaction_receipt = w3.eth.wait_for_transaction_receipt(transaction_hash)
# # # Get the contract address
# contract_address = transaction_receipt['contractAddress']
# print(f"Contract deployed at address: {contract_address}")
