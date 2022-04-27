// Type for notification style
export type Mode = 'warning' | 'error' | 'success' | 'info';

/** Interface for the hook UseToastPortal
 * @property {boolean} loaded - Flag indicating whether the div element was mounted
 * @property {string} portalId - unique identifier for the div element 
 */
export interface UseToastPortal {
  loaded: boolean;
  portalId: string;
}

/**
 * Toast Data Interface
 * @prop {string }id - unique id for toast
 * @prop {union} mode - Controls toast styles. 'warning' | 'error' | 'success' | 'info'
 * @prop {string} message - The message displayed in the notification  
 */
export interface IToast {
  id: string;
  mode: Mode;
  message: string;
};

/**
 * @prop {boolean} autoClose - defines whether to close toasts automatically or not
 * @prop {number} autoCloseTime - defines when to close toasts
 */
export type IToastPortal = {
  autoClose?: boolean;
  autoCloseTime: number;
};

// Interface for the first prop on forwardRef<'this',...>
// manual: https://dev.to/carlosrafael22/using-refs-in-react-functional-components-part-2-forwardref-useimperativehandle-3naa
export interface ToastPortalHandle {
  addMessage: (toast: IToast) => void;
};

/**
 * Advanced interface for a separate Toast Notification component
 * @prop {function onClose(id:string):void} onClose - defines what happens on taost click
 * @prop {boolean} autoClose - The flag on which the animation of the toast depends
 * @prop {number} autoCloseTime - For calculate the animation
 */
export interface IToastComponent extends IToast {
  onClose: (id: string) => void;
  autoClose?: boolean;
  autoCloseTime: number;
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

/**
 * @param {boolean} autoClose -  Whether to close the toast yourself
 * @param {number} autoCloseTime -  Time in ms after how long to close the toast
 * @param {function} setToasts -  Change the state of toasts
 * @param {IToast} toasts - state toasts
 */
export interface IUseToastAutoCloseArgs {
  autoClose?: boolean;
  autoCloseTime: number;
  setToasts: React.Dispatch<React.SetStateAction<IToast[]>>;
  toasts: IToast[];
}