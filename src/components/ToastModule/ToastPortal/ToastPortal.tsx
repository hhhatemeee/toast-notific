import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import { useToastPortal } from '../hooks';
import { uuid } from '../shared';
import { IToast, IToastPortal, ToastPortalHandle } from '../types';
import useToastAutoClose from '../hooks/useToastAutoClose';
import { Toast } from '../Toast';

import styles from './styles.module.css';

/**
 * @typedef {import('../types').ToastPortalHandle} ToastPortalHandle
 * @typedef {import('../types').IToastPortal} IToastPortal
 * @typedef {import('../types').IToast} IToast[]
 */

/**
 * The component uses Portal React and mounts toasts in the div,
 * which is the first in the body tree.
 * The component is wrapped in forwardRef so that you can pass the link to your parent
 * @type {ToastPortalHandle}
 * @type {IToastPortal}
 * @param {boolean} autoClose - Whether to close the toast yourself
 * @param {number} autoCloseTime - After how long to close the notification
 * forwardRef manual: https://learn-reactjs.ru/core/forwarding-refs
 * Typing in TS: https://dev.to/carlosrafael22/using-refs-in-react-functional-components-part-2-forwardref-useimperativehandle-3naa
 */
export const ToastPortal = forwardRef<ToastPortalHandle, IToastPortal>((
  {
    autoClose,
    autoCloseTime = 3000
  }: IToastPortal, ref) => {
  /**
   * State for managing all toasts
   * @type {IToast[]}
   */
  const [toasts, setToasts] = useState<IToast[]>([]);
  // Use the custom hook for get the portalId and loaded 
  const { loaded, portalId } = useToastPortal();

  // Use custom hook for checked do you want close the toast 
  useToastAutoClose({ autoClose, autoCloseTime, setToasts, toasts });

  /**
   * Function for removing a toast from toasts state by its id
   * @param {string} id - id of the toast to delete 
   */
  const removeToast = (id: string): void => {
    setToasts(toasts.filter((toast: IToast) => toast.id !== id));
  }

  // Passing addMessage method to parent. There we don't need toasts' id, that's why we use Omit
  useImperativeHandle(ref, () => ({
    addMessage(toast: Omit<IToast, 'id'>): void {
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
              autoCloseTime={autoCloseTime}
              autoClose={autoClose}
            />
          ))
        }
      </div>,
      document.getElementById(portalId)!,
    )
    : <></>
});

