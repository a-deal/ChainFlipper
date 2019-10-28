import React from "react"
import styled from "styled-components"
import { drizzleReactHooks } from "drizzle-react"

import Account from "./Account"
import Flip from "./Flip"

const StyledContainer = styled.div`
  text-align: center;
  margin: 2rem;
`

const App = () => {
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    userAddress: drizzleState.accounts[0],
    balance: drizzleState.accountBalances[drizzleState.accounts[0]],
    record: drizzleState.record,
  }))

  return (
    <StyledContainer>
      <section>
        <h1>Welcome to ChainFlipper</h1>
        <p>The easiest way to earn money... If you’re feeling lucky!</p>
      </section>
      <Account
        account={{
          address: drizzleState.userAddress,
          balance: drizzleState.balance,
        }}
      />
      <Flip address={drizzleState.address} record={drizzleState.record} />
    </StyledContainer>
  )
}

export default App
