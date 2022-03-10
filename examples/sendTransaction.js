require('dotenv').config({path: `${__dirname}/../.env`})


const { ethers } = require("ethers");
const { validate } = require("./utils/validateParameter.js")

const NETWORK = process.env.ROPSTEN_NETWORK
const INFURA_KEY = process.env.INFURA_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const RECIEVE_ADDRESS = process.env.SEND_TRANSACTION_EXAMPLE_RECIEVE_ADDRESS
const AMOUNT_IN_ETHER = process.env.SEND_TRANSACTION_EXAMPLE_RECIEVE_AMOUNT_IN_ETHER



validate(NETWORK,"Network")
validate(INFURA_KEY,"Infura Key")
validate(PRIVATE_KEY,"Private Key")
validate(RECIEVE_ADDRESS,"Recieve Address")
validate(AMOUNT_IN_ETHER,"Amount In Ether")




sendTransactionWithInfura(NETWORK,INFURA_KEY,PRIVATE_KEY,RECIEVE_ADDRESS,AMOUNT_IN_ETHER)


async function sendTransactionWithInfura(network,infura_key,private_key,recieve_address,amount){

  const provider = new ethers.providers.InfuraProvider(network,infura_key)
  const wallet = new ethers.Wallet(private_key, provider)

  const tx = await wallet.sendTransaction({
    to: recieve_address,
    value: ethers.utils.parseEther(amount)
  })

  console.log(`Transaction Hash : ${tx.hash}`)
  console.log(tx)
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

  if(PRIVATE_KEY === ""){
    console.log("PRIVATE_KEY Is Empty")
    process.exit(1)
  }

  if(RECIEVE_ADDRESS === ""){
    console.log("Recieve Address Is Empty")
    process.exit(1)
  }

  if(AMOUNT_IN_ETHER === ""){
    console.log("Amount Is Empty")
    process.exit(1)
  }
}
