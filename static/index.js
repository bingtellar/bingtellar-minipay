var Web3 = require("web3");
var ContractKit = require("@celo/contractkit");

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = ContractKit.newKitFromWeb3(web3);

let address = "0x8bA16fB3A8dA003083Fa7025fefd59006DBf6750"
async function sendToken(address){
    let celotoken = await kit.contracts.getGoldToken();
    let celoBalance = await celotoken.balanceOf(address)

    return celoBalance.toString()
}

console.log(sendToken(address))
