import React, { useEffect, useMemo, useState } from "react";
import cn from 'classnames';

import Icon from "../shared/Icon/Icon";
import { IToastComponent } from "../types";
import { Container, Row, ToastStyled } from "./styles";


/**
 * Functional Component for individual Toast
 * @type {IToastComponent}
 */
export const Toast: React.FC<IToastComponent> = ({
  id,
  mode,
  onClose,
  message,
  autoCloseTime,
  autoClose,
  position
}) => {
  // Memoizing classes array definition to prevent unnecessary re-rendering
  const [animation, setAnimation] = useState<boolean>(false);

  const animateDurationRunRow = autoClose
    ? { animationDuration: autoCloseTime / 1000 + 's' }
    : { animation: 'none', width: '100%' };

  // Adds animation when closing
  const onCloseHandler = (): void => {
    setAnimation(true);
    setTimeout(() => onClose(id), 400);
  }



  // If autoclose = true, then the class with the closing animation is activated
  useEffect(() => {
    if (autoClose) {
      setTimeout(() => {
        setAnimation(true);
      }, autoCloseTime - 400);
    }
  }, [mode]);


  return (
    <ToastStyled
      onClick={onCloseHandler}
      className={mode}
      animation={animation}
      position={position}
    >
      <Container>
        <Icon name={mode} />
        {message}
      </Container>
      <Row className='row' style={animateDurationRunRow} autoClose={autoClose} />
    </ToastStyled>
  )
};

