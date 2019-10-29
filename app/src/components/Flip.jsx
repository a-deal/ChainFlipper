import React from 'react'
import { drizzleReactHooks } from 'drizzle-react'
import PropTypes from 'prop-types'

const Flip = ({ address, record }) => {
    const { drizzle } = drizzleReactHooks.useDrizzle()
    const flip = drizzle.contracts.ChainFlipper.methods.flip

    const handleToss = async event => {
        const choice = event.target.dataset.tails ? 0 : 1

        const gas = await flip(choice).estimateGas({ from: address, gas: 6e6 })
        await flip(choice).send({ from: address, gas })
    }

    return (
        <section>
            <h2>Current record</h2>
            <p>Wins: {record.wins}</p>
            <p>Losses: {record.losses}</p>
            <p>Let’s see flip in action</p>
            <button data-tails onClick={handleToss}>
        Tails
            </button>
            <button data-heads onClick={handleToss}>
        Heads
            </button>
        </section>
    )
}

Flip.propTypes = {
    address: PropTypes.string,
    record: PropTypes.object,
}

export default Flip
