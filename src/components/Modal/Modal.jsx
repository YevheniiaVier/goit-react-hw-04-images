import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, Backdrop, LargeImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ clickedImg, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalContent>
        <ModalImage image={clickedImg} />
      </ModalContent>
    </Backdrop>,
    modalRoot
  );
};

export const ModalImage = ({ image }) => {
  const { largeImageURL, tags, id } = image;
  return <LargeImage src={largeImageURL} alt={tags} id={id} />;
};
