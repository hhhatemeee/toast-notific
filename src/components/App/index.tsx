import React, { useEffect, useRef, useState } from 'react';

import { ToastPortal } from '../../components';
import { Mode } from '../ToastPortal';

import styles from './styles.module.css';

interface IToastMessage {
  mode: Mode;
  message: string;
}

interface propsRef {
  addMessage: (toast: IToastMessage) => void;
}

export const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [mode, setMode] = useState<Mode>('info');
  const [autoClose, setAutoClose] = useState<boolean>(false);
  const toastRef = useRef<propsRef | null>(null);

  const onAddToast = (): void => {
    toastRef.current?.addMessage({ mode, message: text });
  }

  return (
    <div className={styles.main}>
      <h1>Portals and Toast</h1>
      <div className={styles.content}>
        <img
          alt="toaster"
          src="/assets/toaster.svg"
          className={styles.toaster}
        />
        <form
          onSubmit={e => {
            e.preventDefault();
            if (text) {
              onAddToast();
            }
          }}
        >
          <div className={styles.autoClose}>
            <input
              type="checkbox"
              checked={autoClose}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAutoClose(e.target.checked)}
            />
            <label>Auto Close</label>
          </div>

          <select value={mode} onChange={e => {
            setMode(e.target.value)
          }}
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <input
            type="text"
            value={text}
            placeholder="Toast Value"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          />

          <button >Submit</button>
        </form>
      </div>
      <ToastPortal ref={toastRef} autoCloseTime={3000} autoClose={autoClose} />
    </div>
  );
};