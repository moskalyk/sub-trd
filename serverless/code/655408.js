module.exports.serverless = async function (tradeBids) {
    /* ask side */
    const market = await db.kv('/data').get('asks')
    
    /*
        if there's a trade
    */
    let possibleTrades = []
    for(let i = 0; i < tradeBids.length; i++){
        const trades = JSON.parse(market).v.filter(m => m.amount <= tradeBids[i].amount && m.exchange.includes(tradeBids[i].item))
        possibleTrades.push(...trades)
    }

    /*
        utxo(ish)
    */
    let inputAmount = 0;

    for(let txo of tradeBids){
       inputAmount += txo.amount;
    }

    let marketThatWorks = possibleTrades
    let outputAmount = 0;
    
    for(let txo of marketThatWorks){
      outputAmount += txo.amount;
    }
    
    for(let txo of tradeBids){
       txo.spent = true;
    }

    let fee;
    
    let outputTrades = []
    let spent = 0

    if(possibleTrades.length > 0) {
        const history = await db.kv('/data').get('history')
        
        for(let i = 0; i < possibleTrades.length; i++){
            spent += possibleTrades[i].amount
            outputTrades.push(possibleTrades[i])
            fee = inputAmount - spent;

            if(spent >= inputAmount) break;
        }
        const placeBack = JSON.parse(history).v
        placeBack.push(...outputTrades)
        await db.kv('/data').put('history', placeBack)
    } else {
        /* plop on the bids market */
        const asks = await db.kv('/data').get('asks')
        await db.kv('/data').put('bids', JSON.parse(asks).v.push(...tradeBid))
    }
    
    return {trades: outputTrades, fee: fee, mult: .07 * possibleTrades.length / Math.min(JSON.parse(market).v.length, 25)};
};
