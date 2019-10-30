import React from "react"
import styled from "styled-components"
import { drizzleReactHooks } from "drizzle-react"
import PropTypes from "prop-types"

import Coin from "./Coin"
import { FLIP_IN_PROGRESS } from "../actions"

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  button:first-child {
    margin-right: 16px;
  }
`

const Flip = ({ address, inProgress }) => {
  const { drizzle } = drizzleReactHooks.useDrizzle()
  const flip = drizzle.contracts.ChainFlipper.methods.flip

  const handleToss = async event => {
    const choice = event.target.dataset.tails ? 0 : 1
    drizzle.store.dispatch({ type: FLIP_IN_PROGRESS })
    const gas = await flip(choice).estimateGas({ from: address, gas: 6e6 })
    await flip(choice).send({ from: address, gas })
  }

  return (
    <section>
      <StyledButtonGroup>
        <button data-tails onClick={handleToss}>
          Tails
        </button>
        <button data-heads onClick={handleToss}>
          Heads
        </button>
      </StyledButtonGroup>
      <Coin isSpinning={inProgress} />
    </section>
  )
}

Flip.propTypes = {
  address: PropTypes.string,
  record: PropTypes.object,
  inProgress: PropTypes.bool,
}

export default Flip
