import React from "react"
import styled from "styled-components"
import { drizzleReactHooks } from "drizzle-react"

import { GlobalStyle } from "../styles/Global"
import Flip from "./Flip"

const StyledContainer = styled.div`
  align-items: center;
  display: grid;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 40px;
  grid-template-columns: minmax(300px, auto);
  justify-contents: space-between;
  justify-items: center;
  margin: 2rem;
`

const StyledHeader = styled.header`
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 5px 5px 25px grey;
  display: flex;
  flex-direction: column;
  padding: 32px;
  text-align: center;

  h1 {
    white-space: nowrap;
  }
`

const StyledFooter = styled.footer`
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 5px 5px 25px grey;
  display: flex;
  justify-content: center;
  padding: 16px;
  width: fit-content;

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

  const inProgress = record.currentFlip.underway

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <StyledHeader>
          <h1>ChainFlipper</h1>
        </StyledHeader>
        <Flip
          address={address}
          inProgress={inProgress}
          flip={record.currentFlip}
        />
        <StyledFooter>
          <p>Wins: {record.wins}</p>
          <p>Losses: {record.losses}</p>
        </StyledFooter>
      </StyledContainer>
    </>
  )
}

export default App
