function validate(env,envName){
  if(env === undefined){
    console.log(`${envName} not found`)
    process.exit(1)
  }
}

module.exports = { validate }
