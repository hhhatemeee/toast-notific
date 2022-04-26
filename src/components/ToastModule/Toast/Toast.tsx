import React, { useMemo } from "react";

import { IToastComponent } from "../types";

import styles from './styles.module.css';

/**
 * Functional Component for Single Toast
 * @param {string} id - unique id for toast
 * @param {union} Mode - Controls toast styles. 'warning' | 'error' | 'success' | 'info'
 * @param {function onClose(id:string):void} - CallBack. Closes notification by id
 * @param {string} message - The message displayed in the notification  
 */
export const Toast: React.FC<IToastComponent> = ({
  id,
  mode,
  onClose,
  message
}) => {
  const classes = useMemo(() => [styles.toast, styles[mode]].join(' '), [mode]);

  const onCloseHandler = (): void => onClose(id);

  return <div className={classes} onClick={onCloseHandler}>
    <div className={styles.message}>
      {message}
    </div>
  </div>;
};

