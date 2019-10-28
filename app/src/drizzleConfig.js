import { Drizzle } from '@drizzle/store'

import ChainFlipper from './contracts/ChainFlipper.json'

const options = {
    web3: {
        block: false
    },
    contracts: [ChainFlipper],
    events: {
        ChainFlipper: [
            {
                eventName: 'LogPrediction',
                eventOptions: { fromBlock: 0, toBlock: 'latest' }
            },
            {
                eventName: 'LogResult',
                eventOptions: { fromBlock: 0, toBlock: 'latest' }
            }
        ]
    },
    polls: {
        accounts: 1500
    }
}

export const initializeDrizzle = () => {
    return new Drizzle(options)
}
