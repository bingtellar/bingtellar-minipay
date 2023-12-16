from solcx import compile_standard, install_solc
import json

# Install Solidity compiler.
_solc_version = "0.8.19"
install_solc(_solc_version)

# Compile bingremit smart contract with solcx.
contract_url = 'bingremit.sol'
with open(contract_url, 'r') as f:
    contract_file = f.read()

compiled_sol = compile_standard(
    {
        "language": "Solidity",
        "sources": {
            "bingremit.sol": {
                "content": contract_file
            }
        },
        "settings": {
            "outputSelection": {
                "*": {
                    "*": ["metadata", "evm.bytecode", "evm.deployedBytecode", "abi"]
                }
            },
            "optimizer": {
                "enabled": True,
                "runs": 200
            }
        }
    },
    solc_version=_solc_version
)

if __name__ == "__main__":
    with open("compiled_sol.json", "w") as file:
        json.dump(compiled_sol, file)
