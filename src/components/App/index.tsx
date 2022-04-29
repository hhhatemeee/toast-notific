import React, { useRef, useState } from 'react';

import { ToastPortal } from '../ToastModule';
import { Mode, Position, propsRef } from '../ToastModule/types';

import styles from './styles.module.css';

export const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [mode, setMode] = useState<Mode>('info');
  const [position, setPosition] = useState<Position>('right');
  const [autoClose, setAutoClose] = useState<boolean>(false);
  const toastRef = useRef<propsRef | null>(null);

  console.log(position);

  const onAddToast = (): void => {
    toastRef.current?.addMessage({ mode, message: text });
  };

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

          <select value={mode} onChange={(e: React.ChangeEvent<HTMLSelectElement & { value: Mode }>) => {
            setMode(e.target.value)
          }}
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <select value={position} onChange={(e: React.ChangeEvent<HTMLSelectElement & { value: Position }>) => {
            setPosition(e.target.value)
          }}
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
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
      <ToastPortal position={position} ref={toastRef} autoClose={autoClose} autoCloseTime={7000} />
    </div>
  );
};