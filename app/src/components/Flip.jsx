import React from 'react'
import { drizzleReactHooks } from 'drizzle-react'
import PropTypes from 'prop-types'

Flip.propTypes = {
    address: PropTypes.String
}

const Flip = ({ address }) => {
    const { drizzle } = drizzleReactHooks.useDrizzle()
    const flip = drizzle.contracts.ChainFlipper.methods.flip

    const handleToss = async event => {
        const choice = event.target.dataset.tails ? 0 : 1

        const gas = await flip(choice).estimateGas({ from: address, gas })
        await flip(choice).send({ from: address, gas })
    }

    return (
        <section>
            <h2>The real meat and potatoes</h2>
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

export default Flip
