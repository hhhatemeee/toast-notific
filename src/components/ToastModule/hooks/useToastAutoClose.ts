import { useEffect } from 'react';
import { IToast, IUseToastAutoCloseArgs } from '../types';

/**
 * Custom hook for auto close notification
 * @param {boolean} autoClose -  Whether to close the toast yourself
 * @param {number} autoCloseTime -  Time in ms after how long to close the toast
 * @param {function} setToasts -  Change the state of toasts
 * @param {array} toasts -  @typedef {import('../types').IToast[]} - state toasts
 */
const useToastAutoClose = ({
  autoClose,
  autoCloseTime,
  setToasts,
  toasts,
}: IUseToastAutoCloseArgs) => {
  useEffect(() => {
    if (toasts.length && autoClose) {
      setTimeout(() => {
        setToasts((prev: IToast[]) => (
          prev.filter((toast: IToast) => toast.id !== prev.at(0)?.id))
        )
      }, autoCloseTime);
    }
  }, [toasts, autoCloseTime]);
};

export default useToastAutoClose;