import { useEffect, useState } from 'react';

import { IToast, IUseToastAutoCloseArgs } from '../types';

// Custom hook for auto close notification
const useToastAutoClose = ({
  autoClose,
  autoCloseTime,
  setToasts,
  toasts,
}: IUseToastAutoCloseArgs) => {
  // state for removing toast
  const [removing, setRemoving] = useState('');

  useEffect(() => {
    if (removing) {
      setToasts((prev: IToast[]) => prev.filter((toast: IToast) => toast.id !== removing));
    }
  }, [removing, setToasts]);

  useEffect(() => {
    if (autoClose && toasts.length) {
      const id = toasts[toasts.length - 1].id;
      setTimeout(() => setRemoving(id), autoCloseTime);
    }
  }, [toasts, autoClose, autoCloseTime]);
};

export default useToastAutoClose;