import styled, { keyframes } from 'styled-components';
import { Position } from '../types';

const getAnimate = (animation: boolean, position: Position): Function => {
  if (!animation) {
    if (position === 'center' || position === 'bottom') {
      return fadeInY(position);
    }
    return fadeInX(position);
  }

  if (position === 'center' || position === 'bottom') {
    return fadeCloseY(position);
  }
  return fadeCloseX(position);
}


const fadeInX = (position: Position) => keyframes`
  0% {
    opacity: 0;
    transform: ${position === 'left' ? 'translateX(-400px)' : 'translateX(400px)'}

  }

  50% {
    opacity: .7;
    transform: translateX(-20px);
  }

  75% {
    opacity: .85;
    transform: translateX(20px);
  }

  100% {
    opacity: 1;
  }
`

const fadeInY = (position: Position) => keyframes`
  0% {
    opacity: 0;
    transform:${position === 'bottom' ? 'translateY(400px)' : 'translateY(-400px)'}
  }

  50% {
    opacity: .7;
    transform: translateY(-20px);
  }

  75% {
    opacity: .85;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
  }
`

export const fadeCloseX = (position: Position) => keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  50% {
    opacity: .7;
    transform:  ${position === 'left' ? 'translateX(20px)' : 'translateX(-20px)'};
  }

  100% {
    opacity: 0;
    transform: ${position === 'left' ? 'translateX(-400px)' : 'translateX(400px)'};
  }
`;

export const fadeCloseY = (position: Position) => keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  50% {
    opacity: .7;
    transform:  ${position === 'bottom' ? 'translateY(-20px)' : 'translateY(-20px)'};
  }

  100% {
    opacity: 0;
    transform: ${position === 'bottom' ? 'translateY(400px)' : 'translateY(-400px)'};
  }
`;


export const runRow = keyframes`
  0% {
    width: 100%;
  }

  100% {
    width: 0%;
  }
`;

export const ToastStyled = styled.div`
  width: 300px;
  min-height: 65px;
  position: relative;

  background-color: #fff;
  z-index:9999;
  opacity: 1;
  padding: 15px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 10%),
    0 2px 15px 0 rgb(0 0 0 / 5%);

  transition: 0.2s;
  animation: ${({ animation, position }) => getAnimate(animation, position)} .4s;

  &:hover{
    transition: 0.2s;
    transform: scale(0.95);
    box-shadow: 0px 0px 3px gray;
  }

  &.success{
    .row{
    background-color: #83bd92;
    }
  }

  &.warning{
    .row {
      background-color: #bda883;
    }
  }

  &.error {
    .row{
      background-color: #bd8383;
    }
  }

  &.info{
  .row {
    background-color: #8398bd;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  color: #000;

  svg {
  width: 35px;
  height: 35px;
  margin-right: 0.4em;
}
`;

export const Row = styled.div`
  animation: ${(props) => props.autoClose ? runRow : 'none'};
  animation-duration: ${(props) => props.autoClose ? props.autoCloseTime / 1000 + 's' : 'none'};
  width: ${props => props.autoClose ? 0 : '100%'};
  display: block;
  position: absolute;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  left: 0;
  bottom: 0;
  height: 5px;
`;