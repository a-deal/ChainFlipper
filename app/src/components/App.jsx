import React from "react"
import styled from "styled-components"
import { drizzleReactHooks } from "drizzle-react"

import Flip from "./Flip"

const StyledContainer = styled.div`
  display: grid;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 24px;
  grid-template-columns: 300px;
  justify-content: center;
  margin: 2rem;
`

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;

  h1 {
    margin-bottom: 24px;
    white-space: nowrap;
  }

  &:first-child {
    margin-bottom: 24px;
  }
`

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;

  p:first-child {
    margin-right: 16px;
  }
`

const App = () => {
  const { record, address } = drizzleReactHooks.useDrizzleState(
    drizzleState => ({
      userAddress: drizzleState.accounts[0],
      balance: drizzleState.accountBalances[drizzleState.accounts[0]],
      record: drizzleState.record,
    })
  )

  return (
    <StyledContainer>
      <StyledHeader>
        <h1>Welcome to ChainFlipper</h1>
        <p>The easiest way to earn money... If you’re feeling lucky!</p>
      </StyledHeader>
      <Flip address={address} inProgress={record.flipInProgress} />
      <StyledFooter>
        <p>Wins: {record.wins}</p>
        <p>Losses: {record.losses}</p>
      </StyledFooter>
    </StyledContainer>
  )
}

export default App
