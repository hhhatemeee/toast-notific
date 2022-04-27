import React, { useEffect, useMemo, useState } from "react";
import cn from 'classnames';

import Icon from "../shared/Icon/Icon";
import { IToastComponent } from "../types";

import styles from './styles.module.css';

/** 
// * @typedef {import('../types').IToastComponent} IToastComponent
*/

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
  autoClose
}) => {
  // Memoizing classes array definition to prevent unnecessary re-rendering
  const classes = useMemo(() => [styles.toast, styles[mode]].join(' '), [mode]);
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
  }, [classes]);

  return (
    <div className={cn(classes, { [styles.fadeClose]: animation })} onClick={onCloseHandler}>
      <div className={styles.container}>
        <Icon name={mode} />
        <div className={styles[`${mode}-img`]} />
        <div className={styles.message}>
          {message}
        </div>
      </div>
      <div className={styles.row} style={animateDurationRunRow} />
    </div>
  )
};

