
require('./vfaasContext.js')
const instantiate = require('./serverless/code/168950.js')
const trades = require('./serverless/code/655408.js')

;(async () => {
    const current = {item: 'house', dur_mont: 10*12, amount: 800, exchange: ['blast', 'tech', 'car', 'insurance']}
    console.log(await instantiate.serverless())
    console.log(await trades.serverless([current]))
    
})()
