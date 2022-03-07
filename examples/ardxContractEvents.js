require('dotenv').config({path:'../.env'})

const { ethers } = require("ethers")
const ardx_abi = require("./abi/ardx.json")

const NETWORK = process.env.MAIN_NETWORK
const INFURA_KEY = process.env.INFURA_KEY
const ARDX_ETHEREUM_ADDRESS = process.env.ARDX_CONTRACT_EVENTS_EXAMPLE_ARDX_ETHEREUM_ADDRESS




validateParameters()
getAllArdxTransactions()


async function getAllArdxTransactions(){

  const provider = new ethers.providers.InfuraProvider(NETWORK,INFURA_KEY)
  // provider.resetEventsBlock(0);

  const ardxContract = new ethers.Contract(ARDX_ETHEREUM_ADDRESS,ardx_abi,provider)

  let filterTransfer = ardxContract.filters.Transfer("0x8df47983472d23dc71425ae3cce0e88821046a64",null);
  let filterTransferData = await ardxContract.queryFilter(filterTransfer)

  let filterMint= ardxContract.filters.Mint();
  let filterMintData = await ardxContract.queryFilter(filterMint)

  let filterBurn= ardxContract.filters.Burn();
  let filterBurnData = await ardxContract.queryFilter(filterBurn)

  const ardxName = await ardxContract.name()
  const ardxSymbol = await ardxContract.symbol()
  const ardxDecimal = await ardxContract.decimals()

  console.log(`ARDX Contract Name : ${ardxName}`)
  console.log(`ARDX Contract Symbol : ${ardxSymbol}`)
  console.log(`ARDX Contract Decimal : ${ardxDecimal}`)

  // console.log(filterTransferData)
  console.log(`ARDX Contract Transfer Filter Length : ${filterTransferData.length}`)

  // console.log(filterMintData)
  console.log(`ARDX Contract Mint Filter Length : ${filterMintData.length}`)

  // console.log(filterBurnData)
  console.log(`ARDX Contract Burn Filter Length : ${filterBurnData.length}`)
}


function validateParameters(){
  if(NETWORK === ""){
    console.log("Network Is Empty")
    process.exit(1)
  }

  if(INFURA_KEY === ""){
    console.log("INFURA_KEY Is Empty")
    process.exit(1)
  }

  if(ARDX_ETHEREUM_ADDRESS === ""){
    console.log("ARDX Address Empty")
    process.exit(1)
  }

}

