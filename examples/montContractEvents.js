require('dotenv').config({path: `${__dirname}/../.env`})

const { ethers } = require("ethers")
const { validate } = require("./utils/validateParameter.js")
const mont_abi = require("./abi/mont.json")

const QUICK_NODE_BSC_URL = process.env.QUICK_NODE_BSC_URL
const MONT_CONTRACT_ADDRESS = process.env.MONT_CONTRACT_EVENTS_EXAMPLE_MONT_BSC_ADDRESS


validate(QUICK_NODE_BSC_URL,"Quick Node BSC Url")
validate(MONT_CONTRACT_ADDRESS,"Mont Address")

getAllMontTransactions()


async function getAllMontTransactions(){
  const provider = new ethers.providers.JsonRpcProvider(QUICK_NODE_BSC_URL)
  const montContract = new ethers.Contract(MONT_CONTRACT_ADDRESS,mont_abi,provider)

  const montName = await montContract.name()
  const montSymbol = await montContract.symbol()
  const montDecimal = await montContract.decimals()

  console.log(`MONT Contract Name : ${montName}`)
  console.log(`MONT Contract Symbol : ${montSymbol}`)
  console.log(`MONT Contract Decimal : ${montDecimal}`)

  // eth_getLogs and eth_newFilter are limited to a 10,000 blocks range
  let filterPause = montContract.filters.Paused();
  let filterPauseData = await montContract.queryFilter(filterPause,0,10000)

  let filterUnpause = montContract.filters.Unpaused();
  let filterUnpauseData = await montContract.queryFilter(filterUnpause,0,10000)
  
  console.log(`MONT Contract Pause Filter Length : ${filterPauseData.length}`)
  console.log(`MONT Contract Unpause Filter Length : ${filterUnpauseData.length}`)
}

