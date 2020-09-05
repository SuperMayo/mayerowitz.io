import React from "react"
import styled from "styled-components"

const BurgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 25px;
  @media (min-width: 960px) {
    display: none;
  }
`

const Layer = styled.div`
  height: 3px;
  width: 100%;
  background-color: black;
  border-radius: 1px;
`

const Burger = () => (
  <BurgerContainer role="button">
    <Layer />
    <Layer />
    <Layer />
  </BurgerContainer>
)

export default Burger
