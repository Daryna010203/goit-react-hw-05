import ReactModal from 'react-modal';
import { useEffect } from 'react';

import css from './ImageModal.module.css';

const ImageModal = ({ isOpen, onRequestClose, imageUrl, imageAlt }) => {
  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onRequestClose]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      ariaHideApp={false}
    >
      <button onClick={onRequestClose} className={css.closeButton}>
        ✖
      </button>
      <img src={imageUrl} alt={imageAlt} className={css.largeImage} />
    </ReactModal>
  );
};

export default ImageModal;
