import React from "react"
import styled from "styled-components"
import { drizzleReactHooks } from "drizzle-react"
import PropTypes from "prop-types"

import Coin from "./Coin"
import { FLIP_IN_PROGRESS } from "../actions"

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  button {
    filter: alpha(opacity=80);
    font-size: 24px;
    padding: 16px;
    width: 100px;
  }

  button:hover:not(:disabled) {
    transform: scale3d(1.1, 1.1, -0.9);
    transition: all 0.25s ease-in;
  }

  button:disabled {
    opacity: 0.25;
    cursor: none;
  }
`

const StyledTailsButton = styled.button`
  background-color: black;
  color: white;
`

const StyledHeadsButton = styled.button`
  background-color: white;
  color: black;
`

const Flip = ({ address, inProgress, flip }) => {
  const { drizzle } = drizzleReactHooks.useDrizzle()
  const chainFlipper = drizzle.contracts.ChainFlipper.methods.flip

  const handleToss = async event => {
    const choice = event.target.dataset.tails ? 0 : 1
    drizzle.store.dispatch(FLIP_IN_PROGRESS)
    const gas = await chainFlipper(choice).estimateGas({
      from: address,
      gas: 6e6,
    })
    await chainFlipper(choice).send({ from: address, gas })
  }

  return (
    <section>
      <StyledButtonGroup>
        <StyledTailsButton
          disabled={inProgress}
          data-tails
          onClick={handleToss}
        >
          Tails
        </StyledTailsButton>
        <StyledHeadsButton
          disabled={inProgress}
          data-heads
          onClick={handleToss}
        >
          Heads
        </StyledHeadsButton>
      </StyledButtonGroup>
      <Coin isSpinning={inProgress} flipResult={flip.result} />
    </section>
  )
}

Flip.propTypes = {
  address: PropTypes.string,
  flip: PropTypes.object,
  inProgress: PropTypes.bool,
}

export default Flip
