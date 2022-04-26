import React, { forwardRef, RefObject, useEffect, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import { useToastPortal } from '../../hooks';
import { Toast } from '../../components';

import styles from './styles.module.css';
import { uuid } from '../../shared';

export type Mode = 'warning' | 'error' | 'success' | 'info';

interface IToast {
  id: string;
  mode: Mode;
  message: string;
}

type IToastPortal = {
  autoClose?: boolean;
  autoCloseTime?: number;
}

type ToastPortalHandle = {
  addMessage: (toast: IToast) => void;
}

export const ToastPortal = forwardRef<ToastPortalHandle, IToastPortal>((
  {
    autoClose,
    autoCloseTime = 5000
  }: IToastPortal, ref) => {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const { loaded, portalId } = useToastPortal();

  useEffect(() => {
    if (toasts.length && autoClose) {
      setTimeout(() => {
        setToasts((prev: IToast[]) => prev.filter((toast: IToast) => toast.id !== prev.at(0)?.id))
      }, autoCloseTime);
    }
  }, [toasts, autoCloseTime, autoClose])

  const removeToast = (id: string): void => {
    setToasts(toasts.filter((toast: IToast) => toast.id !== id));
  }

  useImperativeHandle(ref, () => ({
    addMessage(toast: IToast): void {
      setToasts([...toasts, { ...toast, id: uuid() }]);
    },
  }))

  return loaded
    ? ReactDOM.createPortal(
      <div className={styles.toastContainer}>
        {
          toasts.map((toast: IToast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              mode={toast.mode}
              onClose={removeToast}
            />
          ))
        }
      </div>,
      document.getElementById(portalId)!,
    )
    : <></>
});

