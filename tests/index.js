const { TricRunner, TCLParser } = require('./lib/index')

require('../vfaasContext.js')
const instantiate = require('../serverless/code/168950.js')

const runExact = async () => {
    const trades = require('../../serverless/code/655408.js')
    const current = {item: 'house', dur_mont: 10*12, amount: 1000, exchange: ['blast', 'tech', 'car', 'insurance']}
    const ret = await trades.serverless([current])
    return ret.trades[0].amount
}

const runLess = async () => { 
    const trades = require('../../serverless/code/655408.js')
    const current = {item: 'house', dur_mont: 10*12, amount: 800, exchange: ['blast', 'tech', 'car', 'insurance']}
    const ret = await trades.serverless([current])
    return [ret.trades[0].amount, ret.trades[1].amount]
}

(async () => {
    const runner = new TricRunner()
    
    await runner.bundler('in the depths', [
        runExact,
        runLess
    ])
    
    const { assertEvalArgs: assert1 } = await runner.ill('equate to 1000')
    
    // beforeAll
    await instantiate.serverless()

    assert1(
        (await TCLParser('/tcl/index.tcl')).function, 
        (await TCLParser('/tcl/index.tcl')).output, 
        (await TCLParser('/tcl/index.tcl')).input
    )
    
    const { assertEvalArgs: assert2 } = await runner.ill('equate to 700')

    assert2(
        (await TCLParser('/tcl/runLess.tcl')).function, 
        (await TCLParser('/tcl/runLess.tcl')).output, 
        (await TCLParser('/tcl/runLess.tcl')).input
    )
})()
