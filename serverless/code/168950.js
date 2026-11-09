module.exports.serverless = async function () {
    let asks = [
        {item: 'blast', dur_mont: 3*6, amount: 1000, exchange: ['house', 'tech', 'car', 'insurance']},
        {item: 'blast', dur_mont: 3*6, amount: 500, exchange: ['house', 'tech', 'car', 'insurance']},
        {item: 'blast', dur_mont: 3*6, amount: 200, exchange: ['house', 'tech', 'car', 'insurance']}
    ];
    
    let history = [];
    
    await db.kv('/data').put('asks', asks);
    await db.kv('/data').put('history', asks);
};
