require('dotenv').config({path: `${__dirname}/../.env`})


const { ethers } = require("ethers")
const { validate } = require("./utils/validateParameter.js")
const bip39 = require('bip39')



const NETWORK = process.env.MAIN_NETWORK
const INFURA_KEY = process.env.INFURA_KEY


validate(NETWORK,"Network")
validate(INFURA_KEY,"Infura Key")

createAccount()

async function createAccount(){
  const mnemonic = bip39.generateMnemonic()

  const provider = new ethers.providers.InfuraProvider(NETWORK,INFURA_KEY)
  const newWallet = new ethers.Wallet.fromMnemonic(mnemonic)

  const newWalletWithProvider = newWallet.connect(provider)

  console.log(`Mnemonic - ${newWallet.mnemonic.phrase}`)
  console.log(`Address - ${newWallet.address}`)
  console.log(`Private Key - ${newWallet.privateKey}`)
  console.log(`Public Key - ${newWallet.publicKey}`)

  console.log(`New Account Balance - ${await newWalletWithProvider.getBalance()}`)

  const oldWallet = new ethers.Wallet(newWallet.privateKey,provider)

  console.log(`Loaded Address - ${oldWallet.address}`)
  console.log(`Loaded Account Private Key - ${oldWallet.privateKey}`)
  console.log(`Loaded AccountPublic Key - ${oldWallet.publicKey}`)

  console.log(`Loaded Account Balance - ${await oldWallet.getBalance()}`)

}

