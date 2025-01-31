import React from 'react';
import styles from './index.module.scss';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onInstall: () => void;
}

const ModalPWA: React.FC<ModalProps> = ({ show, onClose, onInstall }) => {
  if (!show) return null;

  return (
    <div className={styles.modalPWA}>
      <div className="modal">
        <h2>Install PWA</h2>
        <p>Do you want to install this app?</p>
        <button onClick={onInstall}>Yes, Install</button>
        <button onClick={onClose}>No, Thanks</button>
      </div>
    </div>
  );
};

export default ModalPWA;
