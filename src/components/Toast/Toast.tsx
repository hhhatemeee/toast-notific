import React, { useMemo } from "react";

import styles from './styles.module.css';

type Mode = 'warning' | 'error' | 'success' | 'info'

interface IToast {
  id: string
  mode: Mode,
  onClose: (id: string) => void;
  message: string;
}

export const Toast: React.FC<IToast> = ({
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

