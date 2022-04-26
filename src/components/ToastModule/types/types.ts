// Type for notification style
export type Mode = 'warning' | 'error' | 'success' | 'info';

//Interface for the hook UseToastPortal
export interface UseToastPortal {
  loaded: boolean;
  portalId: string;
}

// Toast Data Interface
export interface IToast {
  id: string;
  mode: Mode;
  message: string;
};

// types props for ToastPortal
export type IToastPortal = {
  autoClose?: boolean;
  autoCloseTime?: number;
};

// types for the first prop on forwardRef<'this',...>
// manual: https://dev.to/carlosrafael22/using-refs-in-react-functional-components-part-2-forwardref-useimperativehandle-3naa
export type ToastPortalHandle = {
  addMessage: (toast: IToast) => void;
};

// Advanced interface for a separate Toast Notification component
export interface IToastComponent extends IToast {
  onClose: (id: string) => void;
};

// Interface for creating a new toast
export interface IToastMessage {
  mode: Mode;
  message: string;
};

// Interface for UseRef which uses forwardRef
export interface propsRef {
  addMessage: (toast: IToastMessage) => void;
};

//Interface for custom hook UseToastAutoClose
export interface IUseToastAutoCloseArgs {
  autoClose?: boolean;
  autoCloseTime: number;
  setToasts: React.Dispatch<React.SetStateAction<IToast[]>>;
  toasts: IToast[];
}