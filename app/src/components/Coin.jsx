import React from "react"
import styled, { keyframes, css } from "styled-components"
import { darken } from "polished"
import PropTypes from "prop-types"

const diameter = 300
const edgeFaces = 80

const config = {
  thickness: 20,
  color: "#E8D0BB",
  frontImageURL:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/US_One_Cent_Obv.png/440px-US_One_Cent_Obv.png",
  backImageURL:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/US_One_Cent_Rev.png/440px-US_One_Cent_Rev.png",
  edgeFaceLength: (3.14 * diameter) / edgeFaces,
  turnTime: 1000,
}

const shine = keyframes`
  0%, 15% {
    transform: translateY(${diameter * 2}px) rotate(-40deg);
  }
  50% {
    transform: translateY(-${diameter}px) rotate(-40deg);
  }
`

const rotate3d = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`

const slideAndRotate = keyframes`
  0%, 100% {
    transform: perspective(1000px) rotateY(0deg) translateX(0px);
  }

  50% {
    transform: perspective(1000px) rotateY(180deg) translateX(20px);
  }
`

const coinAnimation = css`
  animation: ${props => (props.active ? rotate3d : slideAndRotate)}
    ${props => (props.active ? config.turnTime : config.turnTime * 8)}ms linear
    infinite;
`
const result = css`
  transform: ${props =>
    props.flipResult === "tails" ? "rotateY(180deg)" : "rotateY(0deg)"};
`

const StyledCoin = styled.div`
  position: relative;
  width: ${diameter}px;
  height: ${diameter}px;
  margin: 50px auto;
  transform-style: preserve-3d;
  ${props =>
    !props.active && props.flipResult.length ? result : coinAnimation};
  transition: all 0.3s;
`

const StyledCoinFace = styled.div`
  background-image: url(${props => props.imageURL});
  background-color: ${config.color};
  background-size: cover;
  border-radius: 50%;
  height: ${diameter}px;
  overflow: hidden;
  position: absolute;
  transform: translateZ(
      ${props =>
    props.back ? -(config.thickness / 2) : config.thickness / 2}px
    )
    rotateY(${props => (props.back ? "180deg" : "0deg")});
  width: ${diameter}px;

  &:after {
    content: "";
    position: absolute;
    left: -${diameter}px / 2;
    bottom: 100%;
    display: block;
    height: ${diameter}px / 1.5;
    width: ${diameter}px * 2;
    background: #fff;
    opacity: 0.3;
    animation: ${shine} linear ${config.turnTime / 2} infinite;
  }
`

const StyledCoinEdgeContainer = styled.div`
  > div {
    position: absolute;
    height: ${config.edgeFaceLength}px;
    width: ${config.thickness}px;
  }
`

const StyledCoinEdge = styled.div`
  background: ${props =>
    darken(
      (((props.index - edgeFaces / 2) * (props.index - edgeFaces / 2)) /
        ((edgeFaces * edgeFaces) / 4)) *
        100 *
        0.7,
      config.color
    )};
  transform: translateY(${diameter / 2 - config.edgeFaceLength / 2}px)
    translateX(${diameter / 2 - config.thickness / 2}px)
    rotateZ(${props => (360 / edgeFaces) * props.index + 90}deg)
    translateX(${diameter / 2}px) rotateY(90deg);
`

const StyledCoinShadow = styled.div`
  position: absolute;
  width: ${diameter}px;
  height: ${config.thickness}px;
  border-radius: 50%;
  background: #000;
  box-shadow: 0px 0px ${config.thickness * 5}px ${config.thickness * 5}px #000;
  opacity: 0.125;
  transform: rotateX(90deg) translateZ(-${diameter * 1.1}px) scale(0.5);
`

const Coin = ({ isSpinning = false, flipResult }) => {
  return (
    <StyledCoin
      diameter={diameter}
      flipResult={flipResult}
      turnTime={config.turnTime}
      active={isSpinning}
    >
      <StyledCoinFace imageURL={config.frontImageURL}></StyledCoinFace>
      <StyledCoinEdgeContainer>
        {Array.apply(null, Array(80)).map((v, i) => (
          <StyledCoinEdge key={i} index={i}></StyledCoinEdge>
        ))}
      </StyledCoinEdgeContainer>
      <StyledCoinFace back imageURL={config.backImageURL}></StyledCoinFace>
      <StyledCoinShadow></StyledCoinShadow>
    </StyledCoin>
  )
}

Coin.propTypes = {
  isSpinning: PropTypes.bool,
  flipResult: PropTypes.string,
}

export default Coin
